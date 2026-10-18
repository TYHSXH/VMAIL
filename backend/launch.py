"""Student launcher: check the port, then open the browser when ready."""
import os
import socket
import threading
import time
import urllib.request
import webbrowser

import uvicorn


def main() -> int:
    try:
        port = int(os.environ.get("VMAIL_PORT", "8000"))
        if not 1 <= port <= 65535:
            raise ValueError
    except ValueError:
        print("VMAIL_PORT must be an integer between 1 and 65535.")
        return 1
    with socket.socket() as probe:
        try:
            probe.bind(("127.0.0.1", port))
        except OSError:
            print(f"端口 {port} 已被占用。若 VMAIL 已启动，请直接打开 http://127.0.0.1:{port}；否则关闭占用此端口的程序后重试。")
            return 1

    def open_when_ready() -> None:
        for _ in range(60):
            try:
                with urllib.request.urlopen(f"http://127.0.0.1:{port}/api/health", timeout=1) as response:
                    if response.status == 200:
                        webbrowser.open(f"http://127.0.0.1:{port}")
                        return
            except OSError:
                time.sleep(.25)

    if os.environ.get("VMAIL_SKIP_BROWSER") != "1":
        threading.Thread(target=open_when_ready, daemon=True).start()
    uvicorn.run("backend.main:app", host="127.0.0.1", port=port)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
