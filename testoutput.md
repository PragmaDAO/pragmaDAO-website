2025-09-16T05:33:31.323333978Z #19 3.906 npm error     at async #nodeFromEdge (/usr/lib/node_modules/npm/node_modules/@npmcli/arborist/lib/arborist/build-ideal-tree.js:1037:19)
2025-09-16T05:33:31.323340389Z #19 3.906 npm error     at async #buildDepStep (/usr/lib/node_modules/npm/node_modules/@npmcli/arborist/lib/arborist/build-ideal-tree.js:901:11)
2025-09-16T05:33:31.32336385Z #19 3.906 npm error     at async Arborist.buildIdealTree (/usr/lib/node_modules/npm/node_modules/@npmcli/arborist/lib/arborist/build-ideal-tree.js:181:7)
2025-09-16T05:33:31.32336854Z #19 3.906 npm error     at async Promise.all (index 1)
2025-09-16T05:33:31.32337213Z #19 3.906 npm error     at async Arborist.reify (/usr/lib/node_modules/npm/node_modules/@npmcli/arborist/lib/arborist/reify.js:131:5) {
2025-09-16T05:33:31.32337646Z #19 3.906 npm error   code: 'EACCES',
2025-09-16T05:33:31.32338028Z #19 3.906 npm error   errno: 'EACCES',
2025-09-16T05:33:31.32338414Z #19 3.906 npm error   syscall: 'mkdir',
2025-09-16T05:33:31.32338792Z #19 3.906 npm error   path: '/home/nodejs',
2025-09-16T05:33:31.323391281Z #19 3.906 npm error   type: 'system',
2025-09-16T05:33:31.323394361Z #19 3.906 npm error   requiredBy: '.'
2025-09-16T05:33:31.323398591Z #19 3.906 npm error }
2025-09-16T05:33:31.323401741Z #19 3.906 npm error
2025-09-16T05:33:31.323405961Z #19 3.906 npm error The operation was rejected by your operating system.
2025-09-16T05:33:31.323412201Z #19 3.906 npm error It is likely you do not have the permissions to access this file as the current user
2025-09-16T05:33:31.323415501Z #19 3.906 npm error
2025-09-16T05:33:31.323419122Z #19 3.906 npm error If you believe this might be a permissions issue, please double-check the
2025-09-16T05:33:31.323422212Z #19 3.906 npm error permissions of the file and its containing directories, or try running
2025-09-16T05:33:31.323425342Z #19 3.906 npm error the command again as root/Administrator.
2025-09-16T05:33:31.323428472Z #19 3.908 npm notice
2025-09-16T05:33:31.323431692Z #19 3.908 npm notice New major version of npm available! 10.8.2 -> 11.6.0
2025-09-16T05:33:31.323434802Z #19 3.908 npm notice Changelog: https://github.com/npm/cli/releases/tag/v11.6.0
2025-09-16T05:33:31.323438212Z #19 3.908 npm notice To update run: npm install -g npm@11.6.0
2025-09-16T05:33:31.323441972Z #19 3.908 npm notice
2025-09-16T05:33:31.323446023Z #19 3.909 npm error Log files were not written due to an error writing to the directory: /home/nodejs/.npm/_logs
2025-09-16T05:33:31.323450013Z #19 3.909 npm error You can rerun the command with `--loglevel=verbose` to see the logs in your terminal
2025-09-16T05:33:31.526310277Z #19 ERROR: process "/bin/sh -c npm install" did not complete successfully: exit code: 1
2025-09-16T05:33:31.526341148Z ------
2025-09-16T05:33:31.526347458Z  > [13/15] RUN npm install:
2025-09-16T05:33:31.526352798Z 3.906 npm error If you believe this might be a permissions issue, please double-check the
2025-09-16T05:33:31.526357959Z 3.906 npm error permissions of the file and its containing directories, or try running
2025-09-16T05:33:31.526363409Z 3.906 npm error the command again as root/Administrator.
2025-09-16T05:33:31.526368659Z 3.908 npm notice
2025-09-16T05:33:31.526374339Z 3.908 npm notice New major version of npm available! 10.8.2 -> 11.6.0
2025-09-16T05:33:31.526379839Z 3.908 npm notice Changelog: https://github.com/npm/cli/releases/tag/v11.6.0
2025-09-16T05:33:31.52638496Z 3.908 npm notice To update run: npm install -g npm@11.6.0
2025-09-16T05:33:31.52638997Z 3.908 npm notice
2025-09-16T05:33:31.52639535Z 3.909 npm error Log files were not written due to an error writing to the directory: /home/nodejs/.npm/_logs
2025-09-16T05:33:31.52640028Z 3.909 npm error You can rerun the command with `--loglevel=verbose` to see the logs in your terminal
2025-09-16T05:33:31.52640536Z ------
2025-09-16T05:33:31.530756121Z Dockerfile:53
2025-09-16T05:33:31.530781522Z --------------------
2025-09-16T05:33:31.530804413Z   51 |     
2025-09-16T05:33:31.530810503Z   52 |     # Install Node.js dependencies
2025-09-16T05:33:31.530815244Z   53 | >>> RUN npm install
2025-09-16T05:33:31.530819244Z   54 |     
2025-09-16T05:33:31.530823784Z   55 |     # Copy application code and change ownership
2025-09-16T05:33:31.530827824Z --------------------
2025-09-16T05:33:31.530832194Z error: failed to solve: process "/bin/sh -c npm install" did not complete successfully: exit code: 1
2025-09-16T05:33:31.555450745Z error: exit status 1