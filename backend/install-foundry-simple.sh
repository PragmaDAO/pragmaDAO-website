#!/bin/bash
set -e

echo "=== Simple Foundry Installation ==="

# Set up directories
FOUNDRY_DIR="${HOME}/.foundry"
BIN_DIR="${FOUNDRY_DIR}/bin"

echo "Creating directories..."
mkdir -p "$BIN_DIR"

# Download and extract Foundry binaries directly
echo "Downloading Foundry binaries..."
cd /tmp
curl -L "https://github.com/foundry-rs/foundry/releases/latest/download/foundry_nightly_linux_amd64.tar.gz" -o foundry.tar.gz

echo "Extracting binaries..."
tar -xzf foundry.tar.gz

echo "Installing binaries..."
mv forge cast anvil chisel "$BIN_DIR/"
chmod +x "$BIN_DIR"/*

echo "Cleaning up..."
rm -f foundry.tar.gz

# Verify installation
echo "Verifying installation..."
if [ -f "$BIN_DIR/forge" ]; then
    echo "✅ Foundry installed successfully!"
    echo "Forge location: $BIN_DIR/forge"
    ls -la "$BIN_DIR/"

    # Test forge
    "$BIN_DIR/forge" --version && echo "✅ Forge is working!"
else
    echo "❌ Installation failed"
    exit 1
fi

echo "=== Installation Complete ==="