# Use Ubuntu 22.04 with newer GLIBC that supports Foundry
FROM ubuntu:22.04

# Install Node.js 18 and system dependencies
RUN apt-get update && apt-get install -y \
    curl \
    git \
    build-essential \
    ca-certificates \
    gnupg \
    lsb-release \
    && rm -rf /var/lib/apt/lists/*

# Install Node.js 18
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs

# Install Foundry
RUN curl -L https://foundry.paradigm.xyz | bash
ENV PATH="/root/.foundry/bin:$PATH"
RUN foundryup

# Verify Foundry installation
RUN forge --version

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install Node.js dependencies (including dev for building)
RUN npm install --legacy-peer-deps

# Copy application code
COPY . .

# Build TypeScript
RUN npm run build

# Expose port
EXPOSE 3003

# Start the application
CMD ["npm", "start"]