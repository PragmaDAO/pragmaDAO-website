# Use Ubuntu 22.04 with newer GLIBC that supports Foundry
FROM ubuntu:22.04

# Set non-interactive frontend to avoid prompts
ENV DEBIAN_FRONTEND=noninteractive

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

# Install and set up Foundry in a single layer
RUN curl -L https://foundry.paradigm.xyz | bash && \
    /root/.foundry/bin/foundryup

ENV PATH="/root/.foundry/bin:${PATH}"

# Verify Foundry installation
RUN forge --version

# Create a non-root user and group
RUN groupadd --system --gid 1001 nodejs
RUN useradd --system --uid 1001 --gid nodejs nodejs

# Create app directory
RUN mkdir -p /app

# Set working directory
WORKDIR /app

# Copy package files and npm configuration
COPY package*.json .npmrc ./

# Copy Prisma schema (needed for postinstall script)
COPY prisma ./prisma/

# Change ownership of app directory before installing dependencies
RUN chown -R nodejs:nodejs /app

# Switch to non-root user
USER nodejs

# Install Node.js dependencies
RUN npm install

# Copy application code and change ownership
USER root
COPY --chown=nodejs:nodejs . .
USER nodejs

# Build TypeScript
RUN npm run build

# Expose port
EXPOSE 3003

# Start the application
CMD ["npm", "start"]
