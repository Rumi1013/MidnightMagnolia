#!/bin/bash

# Midnight Magnolia Dashboard Launcher
# Opens the dashboard in your default browser

DASHBOARD_DIR="$(cd "$(dirname "$0")" && pwd)"
APP_FILE="$DASHBOARD_DIR/dashboard_app.py"

echo ""
echo "=========================================="
echo "🌙 MIDNIGHT MAGNOLIA DASHBOARD"
echo "=========================================="
echo ""

# Check if Flask is installed
python3 -c "import flask" 2>/dev/null
if [ $? -ne 0 ]; then
    echo "📦 Installing Flask..."
    pip3 install flask > /dev/null 2>&1
    echo "✓ Flask installed"
fi

echo "🚀 Starting dashboard..."
echo "📊 Opening at http://localhost:8888"
echo ""
echo "💡 Tip: You can keep this terminal open, or close it to stop the dashboard"
echo ""

# Run the Flask app
python3 "$APP_FILE"
