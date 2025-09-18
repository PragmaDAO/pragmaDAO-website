# Use Ubuntu 22.04 with newer GLIBC that supports Foundry
FROM ubuntu:22.04

# Set non-interactive frontend to avoid prompts
ENV DEBIAN_FRONTEND=noninteractive

# Install Node.js 18, Docker, and system dependencies
RUN apt-get update && apt-get install -y \
    curl \
    git \
    build-essential \
    ca-certificates \
    gnupg \
    lsb-release \
    apt-transport-https \
    && rm -rf /var/lib/apt/lists/*

# Install Docker
RUN curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg \
    && echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null \
    && apt-get update \
    && apt-get install -y docker-ce docker-ce-cli containerd.io \
    && rm -rf /var/lib/apt/lists/*

# Install Node.js 18
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs

# Create a non-root user and group first, add to docker group
RUN groupadd --system --gid 1001 nodejs
RUN useradd --system --uid 1001 --gid nodejs nodejs
RUN usermod -aG docker nodejs

# Install Foundry to /usr/local/bin (accessible to all users)
RUN curl -L https://foundry.paradigm.xyz | bash && \
    /root/.foundry/bin/foundryup && \
    cp /root/.foundry/bin/* /usr/local/bin/ && \
    chmod +x /usr/local/bin/forge /usr/local/bin/cast /usr/local/bin/anvil /usr/local/bin/chisel

# Verify Foundry installation works for nodejs user
RUN su nodejs -c "forge --version"

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

# Copy startup script
COPY --chown=nodejs:nodejs start-with-docker.sh /app/start-with-docker.sh
RUN chmod +x /app/start-with-docker.sh

# Start the application with Docker daemon
CMD ["/app/start-with-docker.sh"]
