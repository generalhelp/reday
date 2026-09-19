"""Minimal development server for the RE:DAY prototype.

Runs without third-party packages. It serves files from ../frontend and exposes
GET /api/status so the repository contains a small, real backend entry point.
"""

from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import json
import os

ROOT = Path(__file__).resolve().parents[1]
FRONTEND = ROOT / "frontend"
HOST = "127.0.0.1"
PORT = int(os.environ.get("PORT", "8000"))


class ReDayHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(FRONTEND), **kwargs)

    def do_GET(self):
        if self.path == "/api/status":
            payload = json.dumps(
                {
                    "project": "RE:DAY",
                    "status": "prototype",
                    "mechanics": ["time-loop", "persistent-memory", "branching-choices"],
                }
            ).encode("utf-8")
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Content-Length", str(len(payload)))
            self.end_headers()
            self.wfile.write(payload)
            return
        super().do_GET()


if __name__ == "__main__":
    server = ThreadingHTTPServer((HOST, PORT), ReDayHandler)
    print(f"RE:DAY is running at http://{HOST}:{PORT}")
    print(f"API status: http://{HOST}:{PORT}/api/status")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nStopping RE:DAY server.")
        server.server_close()
