#!/bin/bash

# Install Foundry if not already installed
if ! command -v forge &> /dev/null; then
    echo "Installing Foundry..."
    curl -L https://foundry.paradigm.xyz | bash
    source ~/.bashrc
    ~/.foundry/bin/foundryup
    export PATH="$PATH:$HOME/.foundry/bin"
    echo "Foundry installed successfully"
else
    echo "Foundry already installed"
fi

# Verify installation
forge --version