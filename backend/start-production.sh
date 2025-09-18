#!/bin/bash

echo "🚀 Starting PragmaDAO Backend in Production Mode"
echo "================================================"

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

echo "✅ Docker is running"

# Setup Foundry Docker image for optimal performance
echo "🔧 Setting up Foundry Docker image..."
./setup-foundry-docker.sh

if [ $? -eq 0 ]; then
    echo "✅ Foundry Docker setup completed successfully"
else
    echo "⚠️  Foundry Docker setup failed, but continuing with fallback mode"
fi

# Build the project
echo "🔨 Building TypeScript project..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build completed successfully"
else
    echo "❌ Build failed"
    exit 1
fi

# Start the server
echo "🌟 Starting the backend server..."
echo "Server will be available at http://localhost:3003"
echo "Tests will run with optimal performance!"
echo ""
npm run start