#!/bin/bash

# Set up environment
export HOME=${HOME:-/tmp}
export PATH="$PATH:$HOME/.foundry/bin:/usr/local/bin"

# Install Foundry if not already installed
if ! command -v forge &> /dev/null; then
    echo "Installing Foundry..."

    # Create .foundry directory if it doesn't exist
    mkdir -p $HOME/.foundry/bin

    # Download and install foundryup
    curl -L https://foundry.paradigm.xyz -o /tmp/foundry-install
    bash /tmp/foundry-install

    # Run foundryup to install forge, cast, anvil
    if [ -f "$HOME/.foundry/bin/foundryup" ]; then
        $HOME/.foundry/bin/foundryup
    else
        echo "foundryup not found, trying direct download..."
        # Fallback: download binaries directly
        curl -L https://github.com/foundry-rs/foundry/releases/latest/download/foundry_nightly_linux_amd64.tar.gz -o /tmp/foundry.tar.gz
        tar -xzf /tmp/foundry.tar.gz -C $HOME/.foundry/bin/
        chmod +x $HOME/.foundry/bin/*
    fi

    export PATH="$PATH:$HOME/.foundry/bin"
    echo "Foundry installation completed"
else
    echo "Foundry already installed"
fi

# Verify installation
if command -v forge &> /dev/null; then
    forge --version
    echo "Foundry is ready!"
else
    echo "Foundry installation failed"
    exit 1
fi