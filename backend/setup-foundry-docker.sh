#!/bin/bash

echo "🔧 Setting up Foundry Docker image for fast testing..."

# Check if the image already exists
if docker images | grep -q "pragma-foundry.*latest"; then
    echo "✅ pragma-foundry:latest image already exists"
else
    echo "🐳 Building pragma-foundry:latest image..."
    docker build -f Dockerfile.foundry -t pragma-foundry:latest .
    echo "✅ pragma-foundry:latest image built successfully"
fi

# Test the image
echo "🧪 Testing the image..."
if docker run --rm pragma-foundry:latest forge --version > /dev/null 2>&1; then
    echo "✅ pragma-foundry:latest image is working correctly"
    echo "🚀 Ready for instant Solidity testing!"
else
    echo "❌ Error: pragma-foundry:latest image is not working"
    exit 1
fi