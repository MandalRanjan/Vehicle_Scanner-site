#!/usr/bin/env bash
# ======================================================================
#  DEMO START-UP - Smart QR Vehicle Contact Stickers (India)
#  Linux / macOS Startup Script
# ======================================================================

set -e
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$DIR"

echo "======================================================================"
echo "   DEMO START-UP - Smart QR Vehicle Contact Stickers (India)"
echo "======================================================================"
echo ""

if command -v python3 &>/dev/null; then
    echo "Python 3 detected. Starting server with python3 server.py..."
    python3 server.py
elif command -v python &>/dev/null; then
    echo "Python detected. Starting server with python server.py..."
    python server.py
else
    echo "Python not detected. Opening index.html directly in your default browser..."
    if command -v xdg-open &>/dev/null; then
        xdg-open "$DIR/index.html"
    elif command -v open &>/dev/null; then
        open "$DIR/index.html"
    else
        echo "Please open '$DIR/index.html' in your browser."
    fi
fi
