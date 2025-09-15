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
    else
        echo "❌ Foundry installation failed"
    fi
fi

# Show final PATH and forge status
echo "Final PATH: $PATH"
if command -v forge &> /dev/null; then
    echo "✅ forge command available"
else
    echo "❌ forge command not available"
fi

# Start the application
echo "🚀 Starting application..."
node dist/index.js