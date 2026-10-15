"""Read-only preview access to the curated local model library."""
import base64
import json
import struct
from pathlib import Path

from .simulator import SimulationError, _model_source

LIBRARY_ROOT = Path(__file__).resolve().parents[1] / "model_library"


def library_models():
    path = LIBRARY_ROOT / "catalog.json"
    return json.loads(path.read_text(encoding="utf-8"))["models"] if path.is_file() else []


def preview_choices():
    return [{"id": m["id"], "title": m["title"], "entries": m["entrypoints"]} for m in library_models()]


def with_joint_limits(payload):
    # The current WASM package cannot expose bool arrays through Embind.
    # Send authoritative compiled flags, including inherited MJCF defaults.
    import mujoco
    assets = {name: blob if isinstance(blob, bytes) else base64.b64decode(blob) for name, blob in payload["assets"].items()}
    model = mujoco.MjModel.from_xml_string(payload["xml"], assets)
    payload["joint_limits"] = model.jnt_limited.astype(bool).tolist()
    return payload


def prepare_preview(xml=None, filename="", model_id=None, entry=None, binary_assets=False):
    models = library_models()
    selected = None
    if model_id:
        selected = next((m for m in models if m["id"] == model_id), None)
        if selected is None:
            raise SimulationError("模型库中没有这个模型，请刷新后重试。")
        if entry not in [item["path"] for item in selected["xml_files"]]:
            raise SimulationError("请选择模型目录内已收录的 XML 入口。")
    else:
        if not xml or len(xml.encode("utf-8")) > 16 * 1024 * 1024:
            raise SimulationError("请选择不超过 16 MiB 的 XML 文件。")
        normalized = xml.lstrip("\ufeff").replace("\r\n", "\n").strip()
        matches = []
        for model in models:
            for item in model["xml_files"]:
                if Path(item["path"]).name != Path(filename).name:
                    continue
                path = LIBRARY_ROOT / model["folder"] / item["path"]
                if path.read_text(encoding="utf-8-sig").strip() == normalized:
                    matches.append((model, item["path"]))
        if len(matches) == 1:
            selected, entry = matches[0]
        elif len(matches) > 1:
            raise SimulationError("此 XML 在多个库目录中相同，请使用“从模型库选择”指定完整模型。")
        else:
            import xml.etree.ElementTree as ET
            try:
                document = ET.fromstring(xml)
            except ET.ParseError as exc:
                raise SimulationError(f"XML 格式错误：{exc}") from exc
            if document.tag != "mujoco":
                raise SimulationError("请选择以 <mujoco> 为根节点的模型。")
            missing = list(dict.fromkeys(node.get("file") for node in document.iter() if "file" in node.attrib))
            if missing:
                raise SimulationError("未匹配到库内原始 XML，无法自动定位配套文件：" + "、".join(missing[:8]) + "。请从模型库选择完整模型；库外模型请按任务包方式加载配套文件。")
            return with_joint_limits({"xml": xml, "assets": {}, "name": filename or "模型预览"})

    folder = (LIBRARY_ROOT / selected["folder"]).resolve()
    path = (folder / entry).resolve()
    if not folder.is_relative_to(LIBRARY_ROOT.resolve()) or not path.is_relative_to(folder):
        raise SimulationError("模型路径超出资料库。")
    prepared, assets = _model_source({"path": str(folder), "model_xml": path.read_text(encoding="utf-8")})
    return with_joint_limits({"xml": prepared, "assets": assets if binary_assets else {name: base64.b64encode(blob).decode("ascii") for name, blob in assets.items()}, "name": f"{selected['title']} · {entry}"})


def pack_preview(payload):
    """Length-prefixed UTF-8 manifest followed by original binary assets."""
    assets = payload["assets"]
    manifest = {"xml": payload["xml"], "name": payload["name"], "joint_limits": payload.get("joint_limits", []), "assets": [{"name": name, "bytes": len(blob)} for name, blob in assets.items()]}
    header = json.dumps(manifest, ensure_ascii=False).encode("utf-8")
    return b"".join([struct.pack("<I", len(header)), header, *assets.values()])
