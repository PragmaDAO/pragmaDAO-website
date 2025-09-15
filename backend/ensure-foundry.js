const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const https = require('https');

async function ensureFoundry() {
    return new Promise((resolve, reject) => {
        // Check if forge is already available
        exec('which forge', (error, stdout, stderr) => {
            if (!error && stdout.trim()) {
                console.log('Foundry already installed at:', stdout.trim());
                resolve(stdout.trim());
                return;
            }

            console.log('Foundry not found, installing...');

            // Create foundry directory
            const foundryDir = path.join(process.env.HOME || '/tmp', '.foundry', 'bin');
            if (!fs.existsSync(foundryDir)) {
                fs.mkdirSync(foundryDir, { recursive: true });
            }

            // Download forge binary directly
            const forgeUrl = 'https://github.com/foundry-rs/foundry/releases/latest/download/foundry_nightly_linux_amd64.tar.gz';
            const tempFile = '/tmp/foundry.tar.gz';

            const file = fs.createWriteStream(tempFile);
            https.get(forgeUrl, (response) => {
                response.pipe(file);
                file.on('finish', () => {
                    file.close();

                    // Extract the tar.gz
                    exec(`tar -xzf ${tempFile} -C ${foundryDir}`, (extractError) => {
                        if (extractError) {
                            reject(new Error(`Failed to extract Foundry: ${extractError.message}`));
                            return;
                        }

                        // Make binaries executable
                        exec(`chmod +x ${foundryDir}/*`, (chmodError) => {
                            if (chmodError) {
                                console.warn('Warning: Could not make binaries executable:', chmodError.message);
                            }

                            // Add to PATH for this process
                            process.env.PATH = `${foundryDir}:${process.env.PATH}`;

                            // Verify installation
                            exec(`${foundryDir}/forge --version`, (verifyError, verifyStdout) => {
                                if (verifyError) {
                                    reject(new Error(`Foundry installation verification failed: ${verifyError.message}`));
                                } else {
                                    console.log('Foundry installed successfully:', verifyStdout.trim());
                                    resolve(`${foundryDir}/forge`);
                                }
                            });
                        });
                    });
                });
            }).on('error', (err) => {
                reject(new Error(`Failed to download Foundry: ${err.message}`));
            });
        });
    });
}

module.exports = { ensureFoundry };