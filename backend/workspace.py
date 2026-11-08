"""Private workspace paths. A fresh checkout always starts with empty libraries."""
from pathlib import Path
from uuid import uuid4

ROOT = Path(__file__).resolve().parents[1]
LOCAL_ROOT = ROOT / ".local"
TASKS_DIR = LOCAL_ROOT / "tasks"
MODELS_DIR = LOCAL_ROOT / "models"


def ensure_tasks(tasks_dir: Path = TASKS_DIR) -> Path:
    tasks_dir.mkdir(parents=True, exist_ok=True)
    manifest = tasks_dir / "manifest.yaml"
    try:
        with manifest.open("x", encoding="utf-8") as handle:
            handle.write("tasks: []\n")
    except FileExistsError:
        pass
    return tasks_dir


def migrate_legacy_tasks(root: Path = ROOT) -> int:
    """Explicit, reversible migration for existing installations; never runs on startup."""
    from .task_io import list_tasks, _read_yaml
    import yaml
    root = root.resolve()
    legacy = root / 'tasks'
    entries = list_tasks(legacy)
    if not entries:
        return 0
    target = ensure_tasks(root / '.local/tasks')
    for entry in entries:
        source = legacy / entry['id']
        if source.is_symlink() or source.resolve().parent != legacy.resolve() or not source.is_dir():
            raise ValueError(f"Invalid legacy task folder: {entry['id']}")
        if (target / entry['id']).exists():
            raise ValueError(f"Personal task already exists; nothing moved: {entry['id']}")
    paths = (legacy / 'manifest.yaml', target / 'manifest.yaml')
    originals = {path: path.read_bytes() for path in paths}
    old_manifest = _read_yaml(paths[0])
    personal = _read_yaml(paths[1])
    personal.setdefault('tasks', []).extend(entries)
    moved = []
    try:
        for entry in entries:
            source, destination = legacy / entry['id'], target / entry['id']
            if destination.resolve().parent != target.resolve():
                raise ValueError('Migration destination is outside personal workspace.')
            source.rename(destination)
            moved.append(entry['id'])
        old_manifest['tasks'] = []
        for path, payload in ((paths[1], personal), (paths[0], old_manifest)):
            temporary = path.with_name(f'.manifest-{uuid4().hex}.tmp')
            try:
                temporary.write_text(yaml.safe_dump(payload, allow_unicode=True, sort_keys=False), encoding='utf-8')
                temporary.replace(path)
            finally:
                temporary.unlink(missing_ok=True)
    except Exception:
        for task_id in reversed(moved):
            (target / task_id).rename(legacy / task_id)
        for path, data in originals.items():
            path.write_bytes(data)
        raise
    return len(entries)


if __name__ == '__main__':
    import argparse
    parser = argparse.ArgumentParser(description='Manage the private VMAIL workspace.')
    parser.add_argument('--migrate', action='store_true', help='Move legacy tasks into .local/tasks, preserving all files and results.')
    if parser.parse_args().migrate:
        print(f'Migrated {migrate_legacy_tasks()} tasks into .local/tasks.')
