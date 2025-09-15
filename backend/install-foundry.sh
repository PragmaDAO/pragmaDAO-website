#!/bin/bash
set -e  # Exit on any error

echo "=== Foundry Installation Script ==="

# Set up environment
export HOME=${HOME:-/app}
export FOUNDRY_DIR="$HOME/.foundry"
export PATH="$FOUNDRY_DIR/bin:$PATH"

echo "HOME: $HOME"
echo "FOUNDRY_DIR: $FOUNDRY_DIR"
echo "PATH: $PATH"

# Create .foundry directory
echo "Creating Foundry directory..."
mkdir -p "$FOUNDRY_DIR/bin"

# Check if forge is already available
if command -v forge &> /dev/null; then
    echo "✅ Foundry already installed"
    forge --version
    exit 0
fi

echo "🔧 Installing Foundry..."

# Method 1: Try the official installer
echo "Trying official Foundry installer..."
if curl -L https://foundry.paradigm.xyz | bash; then
    echo "✅ Official installer completed"

    # Source the environment to get foundryup
    if [ -f "$HOME/.bashrc" ]; then
        source "$HOME/.bashrc" 2>/dev/null || true
    fi

    # Try to run foundryup
    if [ -f "$FOUNDRY_DIR/bin/foundryup" ]; then
        echo "Running foundryup..."
        "$FOUNDRY_DIR/bin/foundryup"
        echo "✅ foundryup completed"
    fi
else
    echo "⚠️ Official installer failed, trying direct download..."
fi

# Method 2: Direct binary download as fallback
if ! command -v forge &> /dev/null; then
    echo "🔄 Downloading Foundry binaries directly..."

    # Download the latest release
    curl -L "https://github.com/foundry-rs/foundry/releases/latest/download/foundry_nightly_linux_amd64.tar.gz" \
         -o /tmp/foundry.tar.gz

    # Extract to foundry bin directory
    tar -xzf /tmp/foundry.tar.gz -C "$FOUNDRY_DIR/bin/"

    # Make binaries executable
    chmod +x "$FOUNDRY_DIR/bin"/*

    # Clean up
    rm -f /tmp/foundry.tar.gz

    echo "✅ Direct download completed"
fi

# Final verification
echo "🔍 Verifying installation..."
export PATH="$FOUNDRY_DIR/bin:$PATH"

if command -v forge &> /dev/null; then
    echo "✅ SUCCESS: Foundry installed successfully!"
    echo "Forge version:"
    forge --version
    echo "Foundry binaries location: $FOUNDRY_DIR/bin"
    ls -la "$FOUNDRY_DIR/bin/"
else
    echo "❌ FAILED: Foundry installation failed"
    echo "Contents of $FOUNDRY_DIR/bin/:"
    ls -la "$FOUNDRY_DIR/bin/" || echo "Directory not found"
    exit 1
fi

echo "=== Installation Complete ==="