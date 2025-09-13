2025-09-13T03:28:52.600273984Z ==> Cloning from https://github.com/PragmaDAO/pragmaDAO-website
2025-09-13T03:28:54.119629101Z ==> Syncing Git submodules
2025-09-13T03:28:54.843691383Z ==> Checking out commit 2e1bc509f4dcc372ae7b62ace59b8c96f04f6254 in branch main
2025-09-13T03:28:56.004628926Z ==> Using Node.js version 22.16.0 (default)
2025-09-13T03:28:56.031902995Z ==> Docs on specifying a Node.js version: https://render.com/docs/node-version
2025-09-13T03:28:57.903535792Z ==> Running build command 'cd backend && npm install'...
2025-09-13T03:31:13.832132846Z 
2025-09-13T03:31:13.832158037Z added 1287 packages, and audited 1289 packages in 2m
2025-09-13T03:31:13.832203938Z 
2025-09-13T03:31:13.832221668Z 216 packages are looking for funding
2025-09-13T03:31:13.832242649Z   run `npm fund` for details
2025-09-13T03:31:14.180202655Z 
2025-09-13T03:31:14.180226885Z 25 vulnerabilities (2 low, 18 high, 5 critical)
2025-09-13T03:31:14.180230975Z 
2025-09-13T03:31:14.180235545Z To address issues that do not require attention, run:
2025-09-13T03:31:14.180239296Z   npm audit fix
2025-09-13T03:31:14.180242685Z 
2025-09-13T03:31:14.180246476Z To address all issues (including breaking changes), run:
2025-09-13T03:31:14.180250536Z   npm audit fix --force
2025-09-13T03:31:14.180253866Z 
2025-09-13T03:31:14.180258246Z Run `npm audit` for details.
2025-09-13T03:31:16.267361349Z ==> Uploading build...
2025-09-13T03:31:44.489561176Z ==> Uploaded in 11.7s. Compression took 16.6s
2025-09-13T03:31:44.565906249Z ==> Build successful 🎉
2025-09-13T03:31:46.662774594Z ==> Deploying...
2025-09-13T03:32:29.373454856Z ==> Running 'cd backend && npm start'
2025-09-13T03:32:29.710976968Z 
2025-09-13T03:32:29.711000239Z > backend@1.0.0 start
2025-09-13T03:32:29.711003469Z > node dist/index.js
2025-09-13T03:32:29.711005499Z 
2025-09-13T03:32:29.78906812Z node:internal/modules/cjs/loader:1404
2025-09-13T03:32:29.789090661Z   throw err;
2025-09-13T03:32:29.789094231Z   ^
2025-09-13T03:32:29.789096721Z 
2025-09-13T03:32:29.789099961Z Error: Cannot find module '/opt/render/project/src/backend/dist/index.js'
2025-09-13T03:32:29.789102711Z     at Function._resolveFilename (node:internal/modules/cjs/loader:1401:15)
2025-09-13T03:32:29.789105521Z     at defaultResolveImpl (node:internal/modules/cjs/loader:1057:19)
2025-09-13T03:32:29.789108461Z     at resolveForCJSWithHooks (node:internal/modules/cjs/loader:1062:22)
2025-09-13T03:32:29.789112531Z     at Function._load (node:internal/modules/cjs/loader:1211:37)
2025-09-13T03:32:29.789115392Z     at TracingChannel.traceSync (node:diagnostics_channel:322:14)
2025-09-13T03:32:29.789118552Z     at wrapModuleLoad (node:internal/modules/cjs/loader:235:24)
2025-09-13T03:32:29.789121852Z     at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:171:5)
2025-09-13T03:32:29.789125652Z     at node:internal/main/run_main_module:36:49 {
2025-09-13T03:32:29.789128742Z   code: 'MODULE_NOT_FOUND',
2025-09-13T03:32:29.789132372Z   requireStack: []
2025-09-13T03:32:29.789135002Z }
2025-09-13T03:32:29.789137152Z 
2025-09-13T03:32:29.789139492Z Node.js v22.16.0
2025-09-13T03:32:29.794786549Z npm error Lifecycle script `start` failed with error:
2025-09-13T03:32:29.794898193Z npm error code 1
2025-09-13T03:32:29.794957034Z npm error path /opt/render/project/src/backend
2025-09-13T03:32:29.795172021Z npm error workspace backend@1.0.0
2025-09-13T03:32:29.795274734Z npm error location /opt/render/project/src/backend
2025-09-13T03:32:29.795302645Z npm error command failed
2025-09-13T03:32:29.795377997Z npm error command sh -c node dist/index.js
2025-09-13T03:32:42.526614828Z ==> Exited with status 1
2025-09-13T03:32:42.545321956Z ==> Common ways to troubleshoot your deploy: https://render.com/docs/troubleshooting-deploys
2025-09-13T03:32:44.918630118Z ==> Running 'cd backend && npm start'
2025-09-13T03:32:45.204553563Z 
2025-09-13T03:32:45.204572723Z > backend@1.0.0 start
2025-09-13T03:32:45.204575193Z > node dist/index.js
2025-09-13T03:32:45.204576784Z 
2025-09-13T03:32:45.230032297Z node:internal/modules/cjs/loader:1404
2025-09-13T03:32:45.230047607Z   throw err;
2025-09-13T03:32:45.230050098Z   ^
2025-09-13T03:32:45.230051798Z 
2025-09-13T03:32:45.230054278Z Error: Cannot find module '/opt/render/project/src/backend/dist/index.js'
2025-09-13T03:32:45.230056128Z     at Function._resolveFilename (node:internal/modules/cjs/loader:1401:15)
2025-09-13T03:32:45.230058038Z     at defaultResolveImpl (node:internal/modules/cjs/loader:1057:19)
2025-09-13T03:32:45.230059918Z     at resolveForCJSWithHooks (node:internal/modules/cjs/loader:1062:22)
2025-09-13T03:32:45.230062268Z     at Function._load (node:internal/modules/cjs/loader:1211:37)
2025-09-13T03:32:45.230063908Z     at TracingChannel.traceSync (node:diagnostics_channel:322:14)
2025-09-13T03:32:45.230065648Z     at wrapModuleLoad (node:internal/modules/cjs/loader:235:24)
2025-09-13T03:32:45.230067978Z     at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:171:5)
2025-09-13T03:32:45.230070888Z     at node:internal/main/run_main_module:36:49 {
2025-09-13T03:32:45.230073128Z   code: 'MODULE_NOT_FOUND',
2025-09-13T03:32:45.230075398Z   requireStack: []
2025-09-13T03:32:45.230077108Z }
2025-09-13T03:32:45.230078648Z 
2025-09-13T03:32:45.230080279Z Node.js v22.16.0
2025-09-13T03:32:45.288956451Z npm error Lifecycle script `start` failed with error:
2025-09-13T03:32:45.289030814Z npm error code 1
2025-09-13T03:32:45.289094546Z npm error path /opt/render/project/src/backend
2025-09-13T03:32:45.289328322Z npm error workspace backend@1.0.0
2025-09-13T03:32:45.289434416Z npm error location /opt/render/project/src/backend
2025-09-13T03:32:45.289482287Z npm error command failed
2025-09-13T03:32:45.289541219Z npm error command sh -c node dist/index.js