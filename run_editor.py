#!/usr/bin/env python3
"""
Guru Maps Style Studio - Local Launcher & Real Vector Tile Caching Proxy
Starts a multi-threaded HTTP server with on-disk caching for real OpenStreetMap vector tiles.
"""

import http.server
import socketserver
import webbrowser
import urllib.request
import ssl
import os
import re
import sys

PORT = 8080
ROOT_DIR = os.path.dirname(os.path.abspath(__file__))
CACHE_DIR = os.path.join(ROOT_DIR, ".tile_cache")
os.makedirs(CACHE_DIR, exist_ok=True)

SSL_CTX = ssl._create_unverified_context()
OFM_TILE_BASE = "https://tiles.openfreemap.org/planet/20261101_080013_pt"


class ThreadedHTTPServer(socketserver.ThreadingMixIn, socketserver.TCPServer):
    allow_reuse_address = True
    daemon_threads = True


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT_DIR, **kwargs)

    def do_GET(self):
        # 1. Proxy & Disk-Cache Real OpenStreetMap Vector Tiles: /tiles/{z}/{x}/{y}.pbf
        m = re.match(r"^/tiles/(\d+)/(\d+)/(\d+)\.pbf", self.path)
        if m:
            z, x, y = m.groups()
            cache_file = os.path.join(CACHE_DIR, f"{z}_{x}_{y}.pbf")
            data = None

            if os.path.exists(cache_file) and os.path.getsize(cache_file) > 0:
                with open(cache_file, "rb") as f:
                    data = f.read()
            else:
                remote_url = f"{OFM_TILE_BASE}/{z}/{x}/{y}.pbf"
                try:
                    req = urllib.request.Request(
                        remote_url,
                        headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"}
                    )
                    with urllib.request.urlopen(req, timeout=12, context=SSL_CTX) as resp:
                        data = resp.read()
                    if data:
                        with open(cache_file, "wb") as f:
                            f.write(data)
                except Exception as e:
                    print(f"[Tile Proxy] Warning fetching {remote_url}: {e}")
                    self.send_response(204)
                    self.end_headers()
                    return

            self.send_response(200)
            self.send_header("Content-Type", "application/x-protobuf")
            self.send_header("Content-Length", str(len(data)))
            self.end_headers()
            self.wfile.write(data)
            return

        # 2. Fallback for missing font glyph ranges (/editor/fonts/{fontstack}/{range}.pbf)
        if self.path.startswith("/editor/fonts/") and self.path.endswith(".pbf"):
            range_name = self.path.split("/")[-1]
            local_path = os.path.join(ROOT_DIR, "editor", "fonts", range_name)
            if not os.path.exists(local_path):
                local_path = os.path.join(ROOT_DIR, "editor", "fonts", "0-255.pbf")
            if os.path.exists(local_path):
                with open(local_path, "rb") as f:
                    data = f.read()
                self.send_response(200)
                self.send_header("Content-Type", "application/x-protobuf")
                self.send_header("Content-Length", str(len(data)))
                self.end_headers()
                self.wfile.write(data)
                return

        return super().do_GET()

    def end_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
        super().end_headers()

    def log_message(self, format, *args):
        # Keep console output clean
        pass


import threading


def main():
    os.chdir(ROOT_DIR)
    servers = []
    bound_ports = []

    for p in (8080, 8081, 8082):
        try:
            srv = ThreadedHTTPServer(("", p), Handler)
            servers.append(srv)
            bound_ports.append(p)
        except OSError:
            continue

    if not servers:
        print("Error: Could not bind to any port in 8080-8082.")
        sys.exit(1)

    primary_port = bound_ports[0]
    url = f"http://localhost:{primary_port}/editor/index.html"
    print("=" * 60)
    print("  [Guru Maps Style Studio] Real OSM Vector Server Started!")
    print(f"  Listening on ports: {bound_ports}")
    print(f"  URL: {url}")
    print("  Press Ctrl+C to stop.")
    print("=" * 60)

    for srv in servers[1:]:
        t = threading.Thread(target=srv.serve_forever, daemon=True)
        t.start()

    if "--no-browser" not in sys.argv:
        webbrowser.open(url)

    try:
        servers[0].serve_forever()
    except KeyboardInterrupt:
        for srv in servers:
            srv.server_close()


if __name__ == "__main__":
    main()
