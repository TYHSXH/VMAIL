"""Static resource accounting matching backend.simulator._model_source."""
import json
from pathlib import Path
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parent
LIMIT = 128 * 1024 * 1024


def resource_bytes(folder, entry):
    folder = Path(folder).resolve()

    def resolve(raw):
        path = (folder / raw).resolve()
        if not path.is_relative_to(folder) or not path.is_file():
            raise ValueError(f"Missing or external resource: {raw}")
        return path

    def expand(path, seen):
        root = ET.parse(path).getroot()
        for parent in list(root.iter()):
            for child in list(parent):
                if child.tag == "include":
                    target = resolve(child.get("file", ""))
                    if target in seen or len(seen) > 32:
                        raise ValueError("Recursive or excessively deep include")
                    included = expand(target, seen | {target})
                    index = list(parent).index(child)
                    parent.remove(child)
                    for node in list(included):
                        parent.insert(index, node)
                        index += 1
        return root

    path = resolve(entry)
    root = expand(path, {path})
    compiler = root.find("compiler")
    directories = {kind: compiler.get(kind + "dir", compiler.get("assetdir", "")) if compiler is not None else "" for kind in ("mesh", "texture")}
    directories["flexcomp"] = directories["mesh"]
    directories["skin"] = directories["hfield"] = compiler.get("assetdir", "") if compiler is not None else ""
    return sum(resolve(str(Path(directories.get(node.tag, "")) / node.get("file"))).stat().st_size for node in root.iter() if "file" in node.attrib)


def audit(catalog):
    results = []
    for model in catalog["models"]:
        sizes, errors = {}, {}
        for item in model["xml_files"]:
            entry = item["path"]
            if ET.parse(ROOT / model["folder"] / entry).getroot().tag != "mujoco":
                continue
            try:
                sizes[entry] = resource_bytes(ROOT / model["folder"], entry)
            except (ValueError, OSError) as exc:
                errors[entry] = str(exc)
        results.append({"id": model["id"], "resource_bytes_by_xml": sizes, "over_limit": {entry: size for entry, size in sizes.items() if size > LIMIT}, "errors": errors})
    return {"limit_bytes": LIMIT, "accounting": "Expanded XML file attributes, counted per occurrence as in backend/simulator.py; XML text and unused files excluded.", "models": results}


if __name__ == "__main__":
    report = audit(json.loads((ROOT / "catalog.json").read_text(encoding="utf-8")))
    print(json.dumps(report, ensure_ascii=False, indent=2))
