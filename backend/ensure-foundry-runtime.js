const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const https = require('https');

async function ensureFoundryAtRuntime() {
    console.log('=== Ensuring Foundry is Available ===');

    // Check if forge is already available
    try {
        execSync('forge --version', { stdio: 'pipe' });
        console.log('✅ Foundry already available');
        return true;
    } catch (error) {
        console.log('❌ Foundry not found, installing...');
    }

    // Determine installation directory
    const homeDir = process.env.HOME || '/tmp';
    const foundryDir = path.join(homeDir, '.foundry');
    const binDir = path.join(foundryDir, 'bin');

    // Ensure directory exists
    if (!fs.existsSync(binDir)) {
        fs.mkdirSync(binDir, { recursive: true });
    }

    try {
        // Download Foundry binaries directly
        console.log('📥 Downloading Foundry binaries...');
        const tarPath = '/tmp/foundry.tar.gz';

        await downloadFile(
            'https://github.com/foundry-rs/foundry/releases/latest/download/foundry_nightly_linux_amd64.tar.gz',
            tarPath
        );

        console.log('📦 Extracting binaries...');
        execSync(`tar -xzf ${tarPath} -C ${binDir}`, { stdio: 'inherit' });

        // Make binaries executable
        execSync(`chmod +x ${binDir}/*`, { stdio: 'inherit' });

        // Add to PATH for current process
        process.env.PATH = `${binDir}:${process.env.PATH}`;

        // Verify installation
        execSync(`${binDir}/forge --version`, { stdio: 'inherit' });

        console.log('✅ Foundry installed successfully!');
        console.log(`Foundry binaries available at: ${binDir}`);

        // Clean up
        fs.unlinkSync(tarPath);

        return true;

    } catch (error) {
        console.error('❌ Failed to install Foundry:', error.message);
        return false;
    }
}

function downloadFile(url, dest) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);

        https.get(url, (response) => {
            if (response.statusCode === 302 || response.statusCode === 301) {
                // Follow redirect
                return downloadFile(response.headers.location, dest).then(resolve).catch(reject);
            }

            if (response.statusCode !== 200) {
                reject(new Error(`HTTP ${response.statusCode}: ${response.statusMessage}`));
                return;
            }

            response.pipe(file);

            file.on('finish', () => {
                file.close();
                resolve();
            });

            file.on('error', (err) => {
                fs.unlink(dest, () => {}); // Delete partial file
                reject(err);
            });
        }).on('error', reject);
    });
}

module.exports = { ensureFoundryAtRuntime };