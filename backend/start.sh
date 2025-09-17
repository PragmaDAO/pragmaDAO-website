#!/bin/bash

echo "=== Starting PragmaDAO Backend ==="

# Check multiple possible Foundry locations
FOUNDRY_LOCATIONS=(
    "$HOME/.foundry/bin"
    "/tmp/.foundry/bin"
    "/opt/render/.foundry/bin"
    "/tmp/foundry-*/bin"
)

FOUNDRY_PATH=""
for location in "${FOUNDRY_LOCATIONS[@]}"; do
    # Handle glob patterns
    for expanded_path in $location; do
        if [ -f "$expanded_path/forge" ]; then
            FOUNDRY_PATH="$expanded_path"
            echo "✅ Found Foundry at: $FOUNDRY_PATH"
            break 2
        fi
    done
done

# Set up PATH with found Foundry location
if [ -n "$FOUNDRY_PATH" ]; then
    export PATH="$FOUNDRY_PATH:$PATH"
    echo "✅ Foundry available for testing"
    "$FOUNDRY_PATH/forge" --version

    # Also ensure /usr/local/bin is in PATH (where Dockerfile installs forge)
    export PATH="/usr/local/bin:$PATH"
else
    echo "⚠️ Warning: Foundry not found in any expected location"
    echo "PATH: $PATH"
    echo "Checking all locations..."
    for location in "${FOUNDRY_LOCATIONS[@]}"; do
        echo "  $location: $(ls -la "$location" 2>/dev/null || echo 'not found')"
    done

    # Try to install Foundry if not found
    echo "🔧 Attempting to install Foundry..."
    if ./install-foundry-simple.sh; then
        echo "✅ Foundry installation successful"
        # Try to find it again
        for location in "${FOUNDRY_LOCATIONS[@]}"; do
            for expanded_path in $location; do
                if [ -f "$expanded_path/forge" ]; then
                    export PATH="$expanded_path:$PATH"
                    echo "✅ Found newly installed Foundry at: $expanded_path"
                    break 2
                fi
            done
        done

        # Ensure /usr/local/bin is in PATH (where Dockerfile should install forge)
        export PATH="/usr/local/bin:$PATH"
    else
        echo "❌ Foundry installation failed"
    fi
fi

# Ensure /usr/local/bin is always in PATH as final fallback
export PATH="/usr/local/bin:$PATH"

# Show final PATH and forge status
echo "Final PATH: $PATH"
if command -v forge &> /dev/null; then
    echo "✅ forge command available"
    forge --version
else
    echo "❌ forge command not available"
    echo "Checking if forge exists in common locations:"
    ls -la /usr/local/bin/forge 2>/dev/null || echo "  /usr/local/bin/forge: not found"
    ls -la ~/.foundry/bin/forge 2>/dev/null || echo "  ~/.foundry/bin/forge: not found"
fi

# Start the application
echo "🚀 Starting application..."
node dist/index.js