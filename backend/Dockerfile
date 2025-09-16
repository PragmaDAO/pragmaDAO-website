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

# Set execute permissions on Foundry binaries - be more explicit
RUN chmod 755 /root/.foundry/bin/forge /root/.foundry/bin/anvil /root/.foundry/bin/cast /root/.foundry/bin/chisel
RUN ls -la /root/.foundry/bin/

# Verify Foundry installation and permissions
RUN forge --version

# Ensure Foundry is available in runtime PATH
ENV PATH="/root/.foundry/bin:$PATH"

# Set working directory
WORKDIR /app

# Copy package files and npm configuration
COPY package*.json .npmrc ./

# Copy Prisma schema (needed for postinstall script)
COPY prisma ./prisma/

# Install Node.js dependencies (including dev for building)
RUN npm install

# Copy application code
COPY . .

# Build TypeScript
RUN npm run build

# Expose port
EXPOSE 3003

# Start the application
CMD ["npm", "start"]