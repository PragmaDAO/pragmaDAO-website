#!/bin/bash

# Ensure Foundry is in PATH
export PATH="$HOME/.foundry/bin:$PATH"

# Verify forge is available
if command -v forge &> /dev/null; then
    echo "✅ Foundry available for testing"
    forge --version
else
    echo "⚠️ Warning: Foundry not found in PATH"
    echo "PATH: $PATH"
    echo "Checking common locations..."
    ls -la "$HOME/.foundry/bin/" 2>/dev/null || echo "~/.foundry/bin not found"
fi

# Start the application
echo "🚀 Starting application..."
node dist/index.js