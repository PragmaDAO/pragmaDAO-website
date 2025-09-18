#!/bin/bash

# Start Docker daemon in background
dockerd &

# Wait for Docker daemon to be ready
echo "Waiting for Docker daemon to start..."
until docker info > /dev/null 2>&1; do
    sleep 1
done
echo "Docker daemon is ready!"

# Build the pragma-foundry image if it doesn't exist
if ! docker image inspect pragma-foundry:latest > /dev/null 2>&1; then
    echo "Building pragma-foundry:latest image..."
    docker build -f Dockerfile.foundry -t pragma-foundry:latest .
    echo "pragma-foundry:latest image built successfully!"
fi

# Start the Node.js application
echo "Starting Node.js application..."
exec npm start