"""Built-in branding assets shared by new tasks, edits and template downloads."""
from pathlib import Path
import shutil
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
DEFAULT_LOGO = "assets/logo-black.png"
LOGO_ASSETS = {
    DEFAULT_LOGO: ROOT / "assets/logos/logo-black.png",
    "assets/logo-gray.png": ROOT / "assets/logos/logo-gray.png",  # Existing task compatibility.
}


def referenced_logos(xml: str) -> dict[str, Path]:
    paths = {node.get("file") for node in ET.fromstring(xml).iter("texture")}
    return {name: source for name, source in LOGO_ASSETS.items() if name in paths}


def copy_brand_assets(folder: Path, xml: str) -> None:
    for name, source in referenced_logos(xml).items():
        target = folder / name
        if not target.exists():
            target.parent.mkdir(parents=True, exist_ok=True)
            shutil.copyfile(source, target)
