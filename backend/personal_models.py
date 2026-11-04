"""Independent local model copies, kept outside the distributed course library."""
from pathlib import Path, PurePosixPath
from uuid import uuid4
import hashlib
import shutil
import threading
import yaml

from .workspace import MODELS_DIR
from .task_io import TaskValidationError, _read_yaml

MODEL_LOCK = threading.RLock()


def _metadata(folder):
    if folder.is_symlink() or not folder.resolve().is_relative_to(MODELS_DIR.resolve()):
        raise TaskValidationError("个人模型路径无效。")
    return _read_yaml(folder / "resource.yaml") if (folder / 'resource.yaml').is_file() else {}


def _write_metadata(folder, metadata):
    temporary = folder / f".resource-{uuid4().hex}.tmp"
    try:
        temporary.write_text(yaml.safe_dump(metadata, allow_unicode=True, sort_keys=False), encoding="utf-8")
        temporary.replace(folder / "resource.yaml")
    finally:
        temporary.unlink(missing_ok=True)


def personal_models(include_hidden=False):
    models = []
    with MODEL_LOCK:
        folders = {path.parent for pattern in ('*/resource.yaml', '*/model.xml') for path in MODELS_DIR.glob(pattern)}
        for folder in sorted(folders):
            if folder.name.startswith('.'):
                continue
            try:
                meta = _metadata(folder)
                if meta.get('hidden') and not include_hidden:
                    continue
                entries = meta.get('entries', ['model.xml'])
                if not isinstance(entries, list) or not entries or any(not isinstance(entry, str) or not entry.endswith('.xml') or not (folder / entry).resolve().is_relative_to(folder.resolve()) or not (folder / entry).is_file() for entry in entries):
                    continue
                models.append({'id': f'personal_{folder.name}', 'title': str(meta.get('title', folder.name)), 'folder': str(folder.resolve()), 'entrypoints': entries, 'xml_files': [{'path': entry} for entry in entries]})
            except (TaskValidationError, OSError, ValueError):
                continue
    return models


def model_choices():
    return [{'model_id': model['id'], 'title': model['title'], 'entry': entry} for model in personal_models() for entry in model['entrypoints']]


def save_model(xml=None, filename='', model_id=None, entry=None, title=''):
    from .preview import prepare_preview, library_models, LIBRARY_ROOT
    identity = f'{model_id}/{entry}' if model_id else f'xml:{xml}'
    folder = MODELS_DIR / f'm_{hashlib.sha256(identity.encode()).hexdigest()[:24]}'
    with MODEL_LOCK:
        MODELS_DIR.mkdir(parents=True, exist_ok=True)
        if folder.exists():
            meta = _metadata(folder)
            meta['hidden'] = False
            _write_metadata(folder, meta)
            return {'model_id': f'personal_{folder.name}', 'entry': meta.get('entries', ['model.xml'])[0], 'title': meta.get('title', folder.name), 'existing': True}
        payload = prepare_preview(xml, filename, model_id, entry, binary_assets=True)
        staging = MODELS_DIR / f'.import-{uuid4().hex}'
        try:
            staging.mkdir()
            (staging / 'model.xml').write_text(payload['xml'], encoding='utf-8')
            for name, blob in payload['assets'].items():
                relative = PurePosixPath(name.replace('\\', '/'))
                if relative.is_absolute() or '..' in relative.parts or ':' in name or relative.as_posix() in {'model.xml', 'resource.yaml'}:
                    raise TaskValidationError('模型资源路径无效。')
                target = staging.joinpath(*relative.parts)
                target.parent.mkdir(parents=True, exist_ok=True)
                target.write_bytes(blob)
            if model_id:
                original = next((model for model in library_models() if model['id'] == model_id), None)
                if original:
                    source_folder = (LIBRARY_ROOT / original['folder']).resolve()
                    for name in ('LICENSE', 'LICENSE.txt', 'SOURCE.md', 'NOTICE'):
                        source = source_folder / name
                        if source.is_file() and not source.is_symlink() and not (staging / name).exists():
                            shutil.copyfile(source, staging / name)
            meta = {'title': title.strip() or Path(filename).stem or payload['name'], 'entries': ['model.xml'], 'source_model': model_id or '', 'source_entry': entry or '', 'hidden': False}
            _write_metadata(staging, meta)
            staging.rename(folder)
            return {'model_id': f'personal_{folder.name}', 'entry': 'model.xml', 'title': meta['title'], 'existing': False}
        finally:
            if staging.exists() and staging.resolve().parent == MODELS_DIR.resolve():
                shutil.rmtree(staging)


def hide_model(model_id):
    with MODEL_LOCK:
        model = next((model for model in personal_models() if model['id'] == model_id), None)
        if model is None:
            raise TaskValidationError('个人模型不存在，请刷新列表。')
        folder = Path(model['folder'])
        meta = _metadata(folder)
        meta['hidden'] = True
        _write_metadata(folder, meta)
        return {'hidden': True}
