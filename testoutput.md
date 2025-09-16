2025-09-15T05:36:00.349990744Z #14 65.31 npm warn deprecated @walletconnect/ethereum-provider@2.12.2: Reliability and performance improvements. See: https://github.com/WalletConnect/walletconnect-monorepo/releases
2025-09-15T05:36:01.853586783Z #14 66.81 npm warn deprecated @walletconnect/sign-client@2.17.1: Reliability and performance improvements. See: https://github.com/WalletConnect/walletconnect-monorepo/releases
2025-09-15T05:36:02.605815902Z #14 67.55 npm warn deprecated @safe-global/safe-ethers-lib@1.9.4: WARNING: This package is now bundled in @safe-global/protocol-kit. Please, follow the migration guide https://docs.safe.global/safe-core-aa-sdk/protocol-kit/reference/v1
2025-09-15T05:40:22.252995659Z #14 327.2 
2025-09-15T05:40:22.25303869Z #14 327.2 > backend@1.0.0 postinstall
2025-09-15T05:40:22.25304788Z #14 327.2 > prisma generate
2025-09-15T05:40:22.253054851Z #14 327.2 
2025-09-15T05:40:23.155093261Z #14 328.1 Error: Could not find Prisma Schema that is required for this command.
2025-09-15T05:40:23.155118872Z #14 328.1 You can either provide it with `--schema` argument, set it as `prisma.schema` in your package.json or put it into the default location.
2025-09-15T05:40:23.155125462Z #14 328.1 Checked following paths:
2025-09-15T05:40:23.155130912Z #14 328.1 
2025-09-15T05:40:23.155136022Z #14 328.1 schema.prisma: file not found
2025-09-15T05:40:23.155141293Z #14 328.1 prisma/schema.prisma: file not found
2025-09-15T05:40:23.155146193Z #14 328.1 prisma/schema: directory not found
2025-09-15T05:40:23.155151053Z #14 328.1 
2025-09-15T05:40:23.155158763Z #14 328.1 See also https://pris.ly/d/prisma-schema-location
2025-09-15T05:40:23.155164723Z #14 328.1 npm error code 1
2025-09-15T05:40:23.155169573Z #14 328.1 npm error path /app
2025-09-15T05:40:23.155174364Z #14 328.1 npm error command failed
2025-09-15T05:40:23.155179134Z #14 328.1 npm error command sh -c prisma generate
2025-09-15T05:40:23.155185474Z #14 328.1 npm notice
2025-09-15T05:40:23.155190794Z #14 328.1 npm notice New major version of npm available! 10.8.2 -> 11.6.0
2025-09-15T05:40:23.155195634Z #14 328.1 npm notice Changelog: https://github.com/npm/cli/releases/tag/v11.6.0
2025-09-15T05:40:23.155200474Z #14 328.1 npm notice To update run: npm install -g npm@11.6.0
2025-09-15T05:40:23.155205255Z #14 328.1 npm notice
2025-09-15T05:40:23.155211205Z #14 328.1 npm error A complete log of this run can be found in: /root/.npm/_logs/2025-09-15T05_34_55_177Z-debug-0.log
2025-09-15T05:40:24.384847865Z #14 ERROR: process "/bin/sh -c npm install" did not complete successfully: exit code: 1
2025-09-15T05:40:24.384881906Z ------
2025-09-15T05:40:24.384888616Z  > [ 9/11] RUN npm install:
2025-09-15T05:40:24.384894436Z 328.1 npm error code 1
2025-09-15T05:40:24.384901697Z 328.1 npm error path /app
2025-09-15T05:40:24.384908157Z 328.1 npm error command failed
2025-09-15T05:40:24.384914707Z 328.1 npm error command sh -c prisma generate
2025-09-15T05:40:24.384920657Z 328.1 npm notice
2025-09-15T05:40:24.384927337Z 328.1 npm notice New major version of npm available! 10.8.2 -> 11.6.0
2025-09-15T05:40:24.384933238Z 328.1 npm notice Changelog: https://github.com/npm/cli/releases/tag/v11.6.0
2025-09-15T05:40:24.384939548Z 328.1 npm notice To update run: npm install -g npm@11.6.0
2025-09-15T05:40:24.384945608Z 328.1 npm notice
2025-09-15T05:40:24.384952278Z 328.1 npm error A complete log of this run can be found in: /root/.npm/_logs/2025-09-15T05_34_55_177Z-debug-0.log
2025-09-15T05:40:24.384957728Z ------
2025-09-15T05:40:24.387189938Z Dockerfile:33
2025-09-15T05:40:24.387212679Z --------------------
2025-09-15T05:40:24.387219709Z   31 |     
2025-09-15T05:40:24.387226129Z   32 |     # Install Node.js dependencies (including dev for building)
2025-09-15T05:40:24.387232099Z   33 | >>> RUN npm install
2025-09-15T05:40:24.38724644Z   34 |     
2025-09-15T05:40:24.38726077Z   35 |     # Copy application code
2025-09-15T05:40:24.387276521Z --------------------
2025-09-15T05:40:24.387287111Z error: failed to solve: process "/bin/sh -c npm install" did not complete successfully: exit code: 1
2025-09-15T05:40:24.413816718Z error: exit status 1