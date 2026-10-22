"""Machine-local conversations, persisted atomically without credentials."""
from __future__ import annotations

from contextlib import contextmanager, closing
from datetime import datetime, timezone
import json
from pathlib import Path
import re
import sqlite3

from fastapi import HTTPException


class ConversationStore:
    def __init__(self, path: Path):
        self.path = path

    @contextmanager
    def database(self):
        try:
            self.path.parent.mkdir(parents=True, exist_ok=True)
            with closing(sqlite3.connect(self.path, timeout=15)) as database:
                with database:
                    database.execute("CREATE TABLE IF NOT EXISTS conversations "
                                     "(id TEXT PRIMARY KEY, title TEXT NOT NULL, updated TEXT NOT NULL, state TEXT NOT NULL)")
                    yield database
        except (OSError, sqlite3.Error):
            raise HTTPException(500, "对话记录读写失败，请检查 .local 目录的权限和磁盘空间；当前页面内容仍保留。") from None

    @staticmethod
    def check_id(conversation_id):
        if not re.fullmatch(r"[a-zA-Z0-9_-]{1,64}", conversation_id):
            raise HTTPException(400, "无效的对话编号。")

    def list(self):
        with self.database() as database:
            return [dict(zip(("id", "title", "updated"), row)) for row in database.execute(
                "SELECT id, title, updated FROM conversations ORDER BY updated DESC, id")]

    def read(self, conversation_id):
        self.check_id(conversation_id)
        with self.database() as database:
            row = database.execute("SELECT state FROM conversations WHERE id=?", (conversation_id,)).fetchone()
        if row is None:
            raise HTTPException(404, "该对话已删除，请重新选择。")
        try:
            return json.loads(row[0])
        except ValueError:
            raise HTTPException(500, "该对话记录损坏，请保留 .local/assistant-history.sqlite3 供排查。") from None

    def save(self, conversation_id, state):
        self.check_id(conversation_id)
        payload = json.dumps(state, ensure_ascii=False, allow_nan=False)
        if len(payload.encode("utf-8")) > 64 * 1024 * 1024:
            raise HTTPException(413, "当前对话超过 64 MiB，未保存本次内容；请新建对话并精简图片。")
        title = next((item["content"] for item in state["messages"] if item["role"] == "user"), state.get("input", ""))
        title = " ".join(title.split())[:60] or "新对话"
        updated = datetime.now(timezone.utc).isoformat()
        with self.database() as database:
            database.execute("INSERT INTO conversations VALUES (?, ?, ?, ?) ON CONFLICT(id) DO UPDATE SET "
                             "title=excluded.title, updated=excluded.updated, state=excluded.state",
                             (conversation_id, title, updated, payload))
        return {"id": conversation_id, "title": title, "updated": updated}

    def delete(self, conversation_id):
        self.check_id(conversation_id)
        with self.database() as database:
            database.execute("PRAGMA secure_delete=ON")
            database.execute("DELETE FROM conversations WHERE id=?", (conversation_id,))
        return {"deleted": True}
