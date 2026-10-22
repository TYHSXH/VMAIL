"""Local DeepSeek credentials. Never expose the key in API responses or logs."""
from __future__ import annotations

import base64
import ctypes
import json
import os
from pathlib import Path
import threading
from uuid import uuid4


MODELS = ("deepseek-flash", "deepseek-v4-pro")


def _protect(data: bytes, decrypt: bool = False) -> bytes:
    if os.name != "nt":
        raise ValueError("此系统暂不支持加密记住密钥，请取消勾选，仅在本次运行中使用。")
    from ctypes import wintypes

    class Blob(ctypes.Structure):
        _fields_ = [("size", wintypes.DWORD), ("data", ctypes.POINTER(ctypes.c_byte))]

    buffer = ctypes.create_string_buffer(data)
    source = Blob(len(data), ctypes.cast(buffer, ctypes.POINTER(ctypes.c_byte)))
    target = Blob()
    crypt = ctypes.windll.crypt32
    function = crypt.CryptUnprotectData if decrypt else crypt.CryptProtectData
    function.argtypes = [ctypes.POINTER(Blob), ctypes.c_void_p, ctypes.c_void_p,
                         ctypes.c_void_p, ctypes.c_void_p, wintypes.DWORD, ctypes.POINTER(Blob)]
    function.restype = wintypes.BOOL
    if not function(ctypes.byref(source), None, None, None, None, 1, ctypes.byref(target)):
        raise ValueError("无法使用 Windows 加密存储，请取消记住密钥后重试。")
    try:
        return ctypes.string_at(target.data, target.size)
    finally:
        free = ctypes.windll.kernel32.LocalFree
        free.argtypes = [ctypes.c_void_p]
        free.restype = ctypes.c_void_p
        free(target.data)


class CredentialStore:
    def __init__(self, path: Path):
        self.path = path
        self.lock = threading.RLock()
        self.key = ""
        self.model = MODELS[0]
        self.remember = False
        self.loaded = False
        self.notice = ""

    def _load(self):
        if self.loaded:
            return
        self.loaded = True
        if self.path.exists():
            try:
                payload = json.loads(_protect(base64.b64decode(self.path.read_bytes()), decrypt=True))
                self.key = payload["key"]
                self.model = payload["model"] if payload["model"] in MODELS else MODELS[0]
                self.remember = True
            except Exception:
                self.notice = "已保存的密钥无法解密，请重新绑定（更换电脑或 Windows 用户后需要重新绑定）。"

    def status(self):
        with self.lock:
            self._load()
            return {"configured": bool(self.key), "model": self.model, "remember": self.remember,
                    "can_remember": os.name == "nt", "notice": self.notice}

    def snapshot(self):
        with self.lock:
            self._load()
            if not self.key:
                raise ValueError("请先在连接设置中填写 DeepSeek API Key。")
            return self.key, self.model

    def save(self, key: str, model: str, remember: bool):
        with self.lock:
            self._load()
            key = key.strip() or self.key
            if not 10 <= len(key) <= 512 or any(c.isspace() or ord(c) < 33 or ord(c) > 126 for c in key):
                raise ValueError("请输入有效的 API Key；这里不填写账户密码。")
            if model not in MODELS:
                raise ValueError("请选择支持的 DeepSeek 模型。")
            if remember:
                encrypted = base64.b64encode(_protect(json.dumps({"key": key, "model": model}).encode()))
                self.path.parent.mkdir(parents=True, exist_ok=True)
                temporary = self.path.with_name(f".{uuid4().hex}.tmp")
                try:
                    temporary.write_bytes(encrypted)
                    temporary.replace(self.path)
                finally:
                    temporary.unlink(missing_ok=True)
            else:
                self.path.unlink(missing_ok=True)
            self.key, self.model, self.remember, self.notice = key, model, remember, ""
            return self.status()

    def clear(self):
        with self.lock:
            self.path.unlink(missing_ok=True)
            self.key, self.remember, self.notice, self.loaded = "", False, "", True
            return self.status()
