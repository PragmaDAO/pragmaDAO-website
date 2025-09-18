#!/usr/bin/env node

const { exec } = require('child_process');
const { promisify } = require('util');
const fs = require('fs');
const path = require('path');

const execAsync = promisify(exec);

async function installFoundry() {
    // Skip installation in development or if already installed
    if (process.env.NODE_ENV !== 'production') {
        console.log('🏠 Development environment detected, skipping Foundry installation');
        return;
    }

    try {
        // Check if forge is already available
        await execAsync('forge --version', { timeout: 5000 });
        console.log('✅ Foundry already installed and available');
        return;
    } catch (error) {
        console.log('📦 Installing Foundry for production use...');
    }

    try {
        // Install foundryup first
        console.log('⬇️  Downloading foundryup installer...');
        await execAsync('curl -L https://foundry.paradigm.xyz | bash', {
            timeout: 60000,
            env: { ...process.env, PATH: `${process.env.PATH}:/usr/local/bin:/tmp/.foundry/bin` }
        });

        // Run foundryup to install foundry tools
        console.log('🔨 Installing Foundry tools...');
        await execAsync('~/.foundry/bin/foundryup', {
            timeout: 120000,
            env: { ...process.env, PATH: `${process.env.PATH}:/usr/local/bin:/tmp/.foundry/bin:~/.foundry/bin` }
        });

        // Verify installation
        await execAsync('~/.foundry/bin/forge --version', { timeout: 5000 });
        console.log('✅ Foundry successfully installed during build');

        // Create a cache file to indicate successful installation
        const cacheDir = path.join(__dirname, '..', '.foundry-cache');
        fs.mkdirSync(cacheDir, { recursive: true });
        fs.writeFileSync(path.join(cacheDir, 'installed'), new Date().toISOString());

    } catch (error) {
        console.warn('⚠️  Failed to install Foundry during build:', error.message);
        console.warn('   Tests will attempt runtime installation if needed');
    }
}

// Only run if this script is executed directly
if (require.main === module) {
    installFoundry().catch(console.error);
}

module.exports = { installFoundry };