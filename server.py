#!/usr/bin/env python3
"""
DEMO START-UP - Local Development Server
Launches a lightweight local HTTP server and automatically opens the browser.
"""

import http.server
import socketserver
import webbrowser
import os
import sys

PORT = 8000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        # Enable caching-friendly or no-cache headers for dev
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

def run_server():
    os.chdir(DIRECTORY)
    
    # Try preferred port, find next available if busy
    port = PORT
    max_attempts = 10
    httpd = None
    
    for attempt in range(max_attempts):
        try:
            # Allow address reuse to avoid TIME_WAIT socket errors
            socketserver.TCPServer.allow_reuse_address = True
            httpd = socketserver.TCPServer(("", port), Handler)
            break
        except OSError:
            port += 1

    if not httpd:
        print(f"Error: Could not bind to any port between {PORT} and {PORT + max_attempts}.")
        sys.exit(1)

    url = f"http://localhost:{port}/index.html"
    print("=" * 60)
    print("  🛡️  DEMO START-UP - SMART QR VEHICLE SHIELD (INDIA)")
    print("=" * 60)
    print(f"  Server started successfully!")
    print(f"  Local URL:  {url}")
    print(f"  Root Dir:   {DIRECTORY}")
    print("  Press Ctrl+C to stop the server.")
    print("=" * 60)

    # Open in browser automatically
    try:
        webbrowser.open(url)
    except Exception:
        pass

    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServer shutting down gracefully.")
        httpd.server_close()

if __name__ == "__main__":
    run_server()
