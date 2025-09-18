#!/usr/bin/env node

const { exec } = require('child_process');
const { promisify } = require('util');
const execAsync = promisify(exec);

async function ensureFoundryImage() {
    console.log('🔍 Checking for pragma-foundry:latest image...');

    try {
        // Check if image exists
        await execAsync('docker inspect pragma-foundry:latest');
        console.log('✅ pragma-foundry:latest found locally');
        return true;
    } catch (error) {
        console.log('❌ pragma-foundry:latest not found, building it...');

        try {
            // Build the image
            console.log('🔨 Building pragma-foundry:latest image...');
            const { stdout, stderr } = await execAsync('docker build -f Dockerfile.foundry -t pragma-foundry:latest .');
            console.log('Build output:', stdout);
            if (stderr) console.log('Build stderr:', stderr);

            // Verify it was built
            await execAsync('docker inspect pragma-foundry:latest');
            console.log('✅ pragma-foundry:latest built successfully');
            return true;
        } catch (buildError) {
            console.error('❌ Failed to build pragma-foundry:latest:', buildError.message);
            return false;
        }
    }
}

if (require.main === module) {
    ensureFoundryImage().then(success => {
        process.exit(success ? 0 : 1);
    });
}

module.exports = ensureFoundryImage;