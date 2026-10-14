"""Student launcher: check the port, then open the browser when ready."""
import socket
import threading
import time
import urllib.request
import webbrowser

import uvicorn


def main() -> int:
    with socket.socket() as probe:
        try:
            probe.bind(("127.0.0.1", 8000))
        except OSError:
            print("端口 8000 已被占用。若 VMAIL 已启动，请直接打开 http://127.0.0.1:8000；否则关闭占用此端口的程序后重试。")
            return 1

    def open_when_ready() -> None:
        for _ in range(60):
            try:
                with urllib.request.urlopen("http://127.0.0.1:8000/api/health", timeout=1) as response:
                    if response.status == 200:
                        webbrowser.open("http://127.0.0.1:8000")
                        return
            except OSError:
                time.sleep(.25)

    threading.Thread(target=open_when_ready, daemon=True).start()
    uvicorn.run("backend.main:app", host="127.0.0.1", port=8000)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
