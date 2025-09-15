#!/bin/bash

echo "=== Simple Foundry Installation ==="
echo "Environment: HOME=$HOME, USER=$USER, PWD=$PWD"

# Handle different environments (local vs Render)
if [ -w "$HOME" ]; then
    FOUNDRY_DIR="${HOME}/.foundry"
else
    # If HOME is not writable, use /tmp
    FOUNDRY_DIR="/tmp/.foundry"
    echo "⚠️ HOME not writable, using /tmp for Foundry installation"
fi

BIN_DIR="${FOUNDRY_DIR}/bin"

echo "Using Foundry directory: $FOUNDRY_DIR"

# Create directories with proper permissions
echo "Creating directories..."
mkdir -p "$BIN_DIR" || {
    echo "❌ Failed to create $BIN_DIR"
    echo "Trying alternative location..."
    FOUNDRY_DIR="/tmp/foundry-$(date +%s)"
    BIN_DIR="${FOUNDRY_DIR}/bin"
    mkdir -p "$BIN_DIR" || {
        echo "❌ Failed to create alternative directory"
        exit 1
    }
}

# Check if forge already exists
if [ -f "$BIN_DIR/forge" ]; then
    echo "✅ Foundry already installed at $BIN_DIR"
    "$BIN_DIR/forge" --version
    exit 0
fi

# Download and extract Foundry binaries directly
echo "Downloading Foundry binaries..."
TEMP_DIR="/tmp/foundry-install-$$"
mkdir -p "$TEMP_DIR"
cd "$TEMP_DIR"

# Try download with better error handling
if curl -L "https://github.com/foundry-rs/foundry/releases/latest/download/foundry_nightly_linux_amd64.tar.gz" -o foundry.tar.gz; then
    echo "✅ Download successful"
else
    echo "❌ Download failed"
    rm -rf "$TEMP_DIR"
    exit 1
fi

echo "Extracting binaries..."
if tar -xzf foundry.tar.gz; then
    echo "✅ Extraction successful"
else
    echo "❌ Extraction failed"
    rm -rf "$TEMP_DIR"
    exit 1
fi

echo "Installing binaries to $BIN_DIR..."
# Move binaries that exist
for binary in forge cast anvil chisel; do
    if [ -f "$binary" ]; then
        mv "$binary" "$BIN_DIR/" && echo "✅ Installed $binary"
    else
        echo "⚠️ $binary not found in archive"
    fi
done

# Make all binaries executable
chmod +x "$BIN_DIR"/* 2>/dev/null || echo "⚠️ Could not chmod some files"

echo "Cleaning up..."
cd /
rm -rf "$TEMP_DIR"

# Verify installation
echo "Verifying installation..."
if [ -f "$BIN_DIR/forge" ]; then
    echo "✅ Foundry installed successfully!"
    echo "Forge location: $BIN_DIR/forge"
    ls -la "$BIN_DIR/" || echo "Could not list directory"

    # Test forge
    if "$BIN_DIR/forge" --version; then
        echo "✅ Forge is working!"

        # Update PATH for this session and future ones
        export PATH="$BIN_DIR:$PATH"

        # Try to make PATH persistent
        echo "export PATH=\"$BIN_DIR:\$PATH\"" >> ~/.bashrc 2>/dev/null || echo "Could not update .bashrc"

        echo "✅ Installation complete!"
        echo "Foundry binaries available at: $BIN_DIR"
        echo "Current PATH includes: $PATH"

    else
        echo "❌ Forge installed but not working"
        exit 1
    fi
else
    echo "❌ Installation failed - forge binary not found"
    exit 1
fi

echo "=== Installation Complete ==="