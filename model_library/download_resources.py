"""Download pinned model assets; write only beneath this model_library folder."""
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path, PurePosixPath
import hashlib
import json
import posixpath
import re
import shutil
import time
import urllib.parse
import urllib.request
from uuid import uuid4

ROOT = Path(__file__).resolve().parent
DATE = "2026-10-15"
HEADERS = {"User-Agent": "VMAIL-Model-Resource-Collection"}


def blob_sha(data):
    return hashlib.sha1(b"blob " + str(len(data)).encode() + b"\0" + data).hexdigest()


def raw_url(repo, commit, path):
    return f"https://raw.githubusercontent.com/{repo}/{commit}/" + urllib.parse.quote(path, safe="/")


def local_path(folder, upstream, prefix):
    relative = posixpath.relpath(upstream, prefix)
    if relative == ".." or relative.startswith("../") or PurePosixPath(relative).is_absolute():
        raise ValueError(f"Resource is outside model prefix: {upstream}")
    target = (folder / relative).resolve()
    if not target.is_relative_to(folder.resolve()) or not target.is_relative_to(ROOT):
        raise ValueError(f"Unsafe resource destination: {target}")
    return target


def fetch(key, metadata, destinations):
    repo, commit, upstream = key
    data = None
    for target in destinations:
        if target.is_file():
            cached = target.read_bytes()
            if blob_sha(cached) == metadata["sha"]:
                data = cached
                break
    if data is None:
        error = None
        for attempt in range(4):
            try:
                request = urllib.request.Request(raw_url(*key), headers=HEADERS)
                with urllib.request.urlopen(request, timeout=90) as response:
                    data = response.read()
                if blob_sha(data) != metadata["sha"]:
                    raise ValueError(f"Upstream Git blob hash mismatch: {upstream}")
                break
            except (OSError, ValueError) as exc:
                error = exc
                data = None
                time.sleep(min(attempt + 1, 3))
        if data is None:
            raise RuntimeError(f"Failed downloading {upstream}: {error}")
    lfs_pointer = None
    if data.startswith(b"version https://git-lfs.github.com/spec/v1"):
        lfs_pointer = data.decode()
        expected = re.search(r"oid sha256:([0-9a-f]+)", lfs_pointer).group(1)
        url = f"https://media.githubusercontent.com/media/{repo}/{commit}/" + urllib.parse.quote(upstream, safe="/")
        with urllib.request.urlopen(urllib.request.Request(url, headers=HEADERS), timeout=120) as response:
            data = response.read()
        if hashlib.sha256(data).hexdigest() != expected:
            raise ValueError(f"Git LFS content hash mismatch: {upstream}")
    checksum = hashlib.sha256(data).hexdigest()
    for target in destinations:
        if target.is_file() and hashlib.sha256(target.read_bytes()).hexdigest() == checksum:
            continue
        target.parent.mkdir(parents=True, exist_ok=True)
        temporary = target.with_name(target.name + ".vmail-download-" + uuid4().hex)
        try:
            temporary.write_bytes(data)
            temporary.replace(target)
        finally:
            temporary.unlink(missing_ok=True)
    return {"upstream_path": upstream, "bytes": len(data), "sha256": checksum, "git_blob_sha": metadata["sha"], "raw_url": raw_url(*key), "lfs": lfs_pointer is not None}


def main():
    catalog_path = ROOT / "catalog.json"
    catalog = json.loads(catalog_path.read_text(encoding="utf-8"))
    index = json.loads((ROOT / ".resource-source-index.json").read_text(encoding="utf-8"))
    jobs = {}
    model_jobs = {}
    for model in catalog["models"]:
        repo, commit, prefix = model["repo"], model["commit"], model["prefix"]
        repository = index["repositories"][repo]
        if repository["commit"] != commit:
            raise ValueError("Pinned source version changed")
        files = {entry["path"]: entry for entry in repository["files"]}
        needed = set(model.get("missing_resources", []))
        needed.update(model.get("original_missing_resources", []))
        needed.update(item["upstream_path"] for item in model.get("resource_files", []))
        # Keep complete companion assets directories, including associated
        # materials and per-asset notices, rather than only visible mesh files.
        if repo.endswith("mujoco_menagerie"):
            needed.update(path for path in files if path.startswith(prefix + "/assets/"))
        needed.update(path for path in files if path.startswith(prefix + "/") and re.search(r"/(?:LICENSE(?:\.[^/]*)?|NOTICE(?:\.[^/]*)?|COPYING(?:\.[^/]*)?)$", path, re.I))
        needed.discard(model["license_path"])
        folder = (ROOT / model["folder"]).resolve()
        if not folder.is_relative_to(ROOT):
            raise ValueError("Model folder is outside model_library")
        keys = []
        for upstream in sorted(needed):
            if upstream in model["files"]:
                continue
            if upstream not in files:
                raise ValueError(f"Missing upstream file in pinned source tree: {upstream}")
            key = (repo, commit, upstream)
            target = local_path(folder, upstream, prefix)
            if key not in jobs:
                jobs[key] = {"metadata": files[upstream], "destinations": []}
            jobs[key]["destinations"].append(target)
            keys.append(key)
        model_jobs[model["id"]] = keys
    total = sum(job["metadata"].get("size", 0) for job in jobs.values())
    if shutil.disk_usage(ROOT).free < total * 1.2:
        raise RuntimeError("Insufficient free disk space for model resources")
    print(json.dumps({"resource_files_to_fetch": len(jobs), "upstream_bytes": total}), flush=True)
    completed = {}
    errors = []
    with ThreadPoolExecutor(max_workers=6) as executor:
        futures = {executor.submit(fetch, key, job["metadata"], job["destinations"]): key for key, job in jobs.items()}
        for future in as_completed(futures):
            key = futures[future]
            try:
                completed[key] = future.result()
            except Exception as exc:
                errors.append({"source": key, "error": str(exc)})
            if (len(completed) + len(errors)) % 40 == 0:
                print(json.dumps({"downloaded": len(completed), "failed": len(errors), "total": len(jobs)}), flush=True)
    if errors:
        (ROOT / "resource_download_errors.json").write_text(json.dumps(errors, ensure_ascii=False, indent=2), encoding="utf-8")
        raise RuntimeError(f"{len(errors)} resource downloads failed; rerun to resume verified files")

    referenced_failures = []
    for model in catalog["models"]:
        folder = ROOT / model["folder"]
        resources = []
        for key in model_jobs[model["id"]]:
            entry = dict(completed[key])
            entry["path"] = local_path(folder, key[2], model["prefix"]).relative_to(folder.resolve()).as_posix()
            entry["url"] = f'https://github.com/{model["repo"]}/blob/{model["commit"]}/{key[2]}'
            resources.append(entry)
        model.setdefault("original_missing_resources", model.get("missing_resources", []))
        missing = []
        for reference in model["references"]:
            path = local_path(folder, reference["upstream_path"], model["prefix"])
            reference["local_path"] = path.relative_to(folder.resolve()).as_posix()
            reference["downloaded"] = path.is_file()
            if not path.is_file():
                missing.append(reference["upstream_path"])
        if missing:
            referenced_failures.extend(missing)
        model["missing_resources"] = sorted(set(missing))
        model["resource_files"] = resources
        model["resource_bytes"] = sum(item["bytes"] for item in resources)
        model["resources_updated_on"] = DATE
        status = "XML 与配套文件资源已齐全，可整组复制"
        if model["required_plugins"]:
            status += "；另需原生插件支持"
        model["collection_status"] = status
        model["runtime_verification"] = "已核对文件引用与资源哈希；未验证物理仿真或 VMAIL 浏览器兼容性"

        # Report the resource size of the entry XML's include closure, since
        # the workbench currently caps browser-model resources at 128 MiB.
        xml_by_upstream = {item["upstream_path"]: item["path"] for item in model["xml_files"]}
        references_by_xml = {}
        for reference in model["references"]:
            references_by_xml.setdefault(reference["from_xml"], []).append(reference)
        entry_sizes = {}
        for entrypoint in model["entrypoints"]:
            pending, seen, assets = [entrypoint], set(), set()
            while pending:
                xml = pending.pop()
                if xml in seen:
                    continue
                seen.add(xml)
                for reference in references_by_xml.get(xml, []):
                    upstream = reference["upstream_path"]
                    if upstream in xml_by_upstream:
                        pending.append(xml_by_upstream[upstream])
                    elif reference["downloaded"]:
                        assets.add(reference["local_path"])
            entry_sizes[entrypoint] = sum((folder / path).stat().st_size for path in assets)
        model["entrypoint_resource_bytes"] = entry_sizes
        large_entries = [name for name, size in entry_sizes.items() if size > 128 * 1024 * 1024]
        model["exceeds_vmail_current_128mib_resource_limit"] = large_entries
        (folder / "resource_manifest.json").write_text(json.dumps({"updated_on": DATE, "resources": resources, "entrypoint_resource_bytes": entry_sizes}, ensure_ascii=False, indent=2), encoding="utf-8")
        (folder / "dependencies.json").write_text(json.dumps({"references": model["references"], "required_plugins": model["required_plugins"], "missing_resources": model["missing_resources"]}, ensure_ascii=False, indent=2), encoding="utf-8")
        source_path = folder / "SOURCE.md"
        source = source_path.read_text(encoding="utf-8")
        source = re.sub(r"- 文件状态：.*", f"- 文件状态：**{status}**。", source)
        source = re.sub(r"- 运行状态：.*", f'- 运行状态：{model["runtime_verification"]}。', source)
        section = "## 外部依赖\n\n"
        section += f"配套资源已下载到原始相对路径，新增 {len(resources)} 个文件，合计 {model['resource_bytes'] / 1024 / 1024:.2f} MiB。复制本目录的全部内容（包括 assets 和 LICENSE），不要只复制入口 XML。\n\n"
        section += "文件引用已核对；原始 XML 未作修改。`dependencies.json` 列出引用，`resource_manifest.json` 记录下载来源、文件大小与 SHA-256。\n"
        if model["required_plugins"]:
            section += "\n仍需插件：" + "、".join(f"`{p}`" for p in model["required_plugins"]) + "。XML 与网格齐全不代表浏览器 WASM 一定支持；插件二进制没有下载。\n"
        if large_entries:
            section += "\n**VMAIL 资源大小提示：**" + "、".join(f"`{p}`" for p in large_entries) + " 的引用资源超过当前工作台 128 MiB 上限。创建任务时需评估资源上限和加载性能，或在保持质量、惯量及关键接触几何正确的前提下简化视觉网格。\n"
        source = re.sub(r"## 外部依赖\n[\s\S]*?(?=## 转为学习任务)", section + "\n", source)
        source = source.replace("补齐任务配置和资源。", "补齐任务配置，并保留整个 assets 等资源目录。")
        source_path.write_text(source, encoding="utf-8", newline="\n")
    if referenced_failures:
        raise RuntimeError(f"Referenced files still missing: {referenced_failures}")

    catalog["policy"] = "收录固定版本的原始 XML、配套网格/纹理/材料文件和许可证；不下载二进制插件、训练权重或控制脚本。"
    catalog["resources_updated_on"] = DATE
    catalog["resource_files"] = sum(len(model["resource_files"]) for model in catalog["models"])
    catalog["resource_bytes"] = sum(model["resource_bytes"] for model in catalog["models"])
    catalog_path.write_text(json.dumps(catalog, ensure_ascii=False, indent=2), encoding="utf-8")
    readme_path = ROOT / "README.md"
    readme = readme_path.read_text(encoding="utf-8")
    readme = readme.replace("# MuJoCo 工程与机器人 XML 资料库", "# MuJoCo 工程与机器人模型资料库")
    readme = re.sub(r"本目录收录 \*\*\d+ 组案例、\d+ 个原始 XML 文件\*\*.*?，供理论力学", f"本目录收录 **{len(catalog['models'])} 组案例、{catalog['xml_files']} 个原始 XML 文件**，配套资源已于 {DATE} 补齐（{catalog['resource_files']} 个文件，约 {catalog['resource_bytes'] / 1024 / 1024:.1f} MiB），供理论力学", readme)
    readme = re.sub(r"- \*\*只收集 XML\*\*：.*", "- **整组复制**：XML 引用的网格、纹理等资源已补齐，并保留上游相对目录结构。创建任务时，复制选中模型目录的全部内容，包括 assets、XML 和 LICENSE；不要只复制 scene.xml。", readme)
    readme = readme.replace("适合研究的问题及缺失资源", "适合研究的问题及资源状态")
    readme = readme.replace("`catalog.json` 另记录文件 SHA-256 与固定版本下载地址。", "`catalog.json` 与各目录的 `resource_manifest.json` 另记录 XML / 资源的 SHA-256、大小和固定版本下载地址。")
    readme = readme.replace("XML 已逐个做语法解析和文件引用静态整理", "XML 已逐个做语法解析，文件引用已核对，新增资源已与上游 Git 文件哈希核对")
    if "- 资源完整不等于当前 VMAIL" not in readme and "已按课程需求移除" not in readme:
        readme = readme.replace("- 为课程中的常规 MuJoCo 使用", "- 资源完整不等于当前 VMAIL 能直接支持所有模型。部分模型的资源超过工作台现有 128 MiB 上限，各模型 SOURCE.md 已具体提示；需在创建任务时评估加载性能与上限，不能通过破坏惯性或接触参数来让它勉强运行。\n- 不包含训练策略、控制脚本和插件二进制；需插件的模型仍有明确标记。\n- 为课程中的常规 MuJoCo 使用")
    categories = {}
    for model in catalog["models"]:
        categories.setdefault(model["category"], []).append(model)
    table = "## 模型目录\n\n"
    for category in sorted(categories):
        models = categories[category]
        table += f"### {models[0]['category_zh']}\n\n| 案例 | 类型 | 可研究的问题 | 文件状态 |\n| --- | --- | --- | --- |\n"
        for model in models:
            table += f"| [{model['title']}]({model['folder']}/SOURCE.md) | {model['kind']} | {model['topics']} | {model['collection_status']} |\n"
        table += "\n"
    readme = readme.split("## 模型目录")[0] + table
    readme_path.write_text(readme, encoding="utf-8", newline="\n")
    prompt_path = ROOT / "AI_TASK_PROMPT.md"
    prompt = prompt_path.read_text(encoding="utf-8")
    prompt = prompt.replace("资料库只收集 XML，模型可能缺少网格、纹理或插件。\n请先指出具体缺项、上游地址和兼容性问题，再决定如何补齐。", "资料库已补齐 XML 配套的网格、纹理等文件，复制时保留整个模型目录的相对结构。\n请读取 SOURCE.md 与 resource_manifest.json，检查入口、插件、工作台 128 MiB 资源上限等兼容性问题；插件二进制和控制策略不包含在资料库内。")
    prompt_path.write_text(prompt, encoding="utf-8", newline="\n")
    print(json.dumps({"models": len(catalog["models"]), "xml_files": catalog["xml_files"], "resource_files": catalog["resource_files"], "resource_bytes": catalog["resource_bytes"], "missing_references": len(referenced_failures), "groups_with_entries_above_128mib": [m["id"] for m in catalog["models"] if m["exceeds_vmail_current_128mib_resource_limit"]]}), flush=True)


if __name__ == "__main__":
    main()
