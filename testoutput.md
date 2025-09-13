2025-09-13T21:04:35.182842709Z     at Object.<anonymous> (/opt/render/project/src/backend/dist/config/passport.js:19:24)
2025-09-13T21:04:35.18284587Z     at Module._compile (node:internal/modules/cjs/loader:1730:14)
2025-09-13T21:04:35.18284951Z     at Object..js (node:internal/modules/cjs/loader:1895:10)
2025-09-13T21:04:35.18285263Z     at Module.load (node:internal/modules/cjs/loader:1465:32)
2025-09-13T21:04:35.18285545Z     at Function._load (node:internal/modules/cjs/loader:1282:12)
2025-09-13T21:04:35.18285866Z     at TracingChannel.traceSync (node:diagnostics_channel:322:14)
2025-09-13T21:04:35.182862Z     at wrapModuleLoad (node:internal/modules/cjs/loader:235:24)
2025-09-13T21:04:35.1828652Z     at Module.require (node:internal/modules/cjs/loader:1487:12)
2025-09-13T21:04:35.18286854Z 
2025-09-13T21:04:35.18287132Z Node.js v22.16.0
2025-09-13T21:04:35.248701118Z npm error Lifecycle script `start` failed with error:
2025-09-13T21:04:35.248769849Z npm error code 1
2025-09-13T21:04:35.24882792Z npm error path /opt/render/project/src/backend
2025-09-13T21:04:35.248988964Z npm error workspace backend@1.0.0
2025-09-13T21:04:35.249029055Z npm error location /opt/render/project/src/backend
2025-09-13T21:04:35.249072535Z npm error command failed
2025-09-13T21:04:35.249108986Z npm error command sh -c node dist/index.js
2025-09-13T21:04:47.032867054Z ==> No open ports detected, continuing to scan...
2025-09-13T21:04:47.140264351Z ==> Docs on specifying a port: https://render.com/docs/web-services#port-binding
2025-09-13T21:04:47.413326866Z ==> Exited with status 1
2025-09-13T21:04:47.428246455Z ==> Common ways to troubleshoot your deploy: https://render.com/docs/troubleshooting-deploys
2025-09-13T21:04:49.965857824Z ==> Running 'cd backend && npm start'
2025-09-13T21:04:50.25194162Z 
2025-09-13T21:04:50.25197826Z > backend@1.0.0 start
2025-09-13T21:04:50.251982041Z > node dist/index.js
2025-09-13T21:04:50.251983781Z 
2025-09-13T21:04:51.458083081Z /opt/render/project/src/node_modules/passport-oauth2/lib/strategy.js:87
2025-09-13T21:04:51.458103962Z   if (!options.clientID) { throw new TypeError('OAuth2Strategy requires a clientID option'); }
2025-09-13T21:04:51.458110602Z                            ^
2025-09-13T21:04:51.458113992Z 
2025-09-13T21:04:51.458118492Z TypeError: OAuth2Strategy requires a clientID option
2025-09-13T21:04:51.458124912Z     at Strategy.OAuth2Strategy (/opt/render/project/src/node_modules/passport-oauth2/lib/strategy.js:87:34)
2025-09-13T21:04:51.458127342Z     at new Strategy (/opt/render/project/src/node_modules/passport-github2/lib/strategy.js:62:18)
2025-09-13T21:04:51.458129662Z     at Object.<anonymous> (/opt/render/project/src/backend/dist/config/passport.js:19:24)
2025-09-13T21:04:51.458131812Z     at Module._compile (node:internal/modules/cjs/loader:1730:14)
2025-09-13T21:04:51.458133892Z     at Object..js (node:internal/modules/cjs/loader:1895:10)
2025-09-13T21:04:51.458136913Z     at Module.load (node:internal/modules/cjs/loader:1465:32)
2025-09-13T21:04:51.458140702Z     at Function._load (node:internal/modules/cjs/loader:1282:12)
2025-09-13T21:04:51.458144133Z     at TracingChannel.traceSync (node:diagnostics_channel:322:14)
2025-09-13T21:04:51.458147243Z     at wrapModuleLoad (node:internal/modules/cjs/loader:235:24)
2025-09-13T21:04:51.458150323Z     at Module.require (node:internal/modules/cjs/loader:1487:12)
2025-09-13T21:04:51.458153363Z 
2025-09-13T21:04:51.458156393Z Node.js v22.16.0
2025-09-13T21:04:51.521754381Z npm error Lifecycle script `start` failed with error:
2025-09-13T21:04:51.521798592Z npm error code 1
2025-09-13T21:04:51.521854944Z npm error path /opt/render/project/src/backend
2025-09-13T21:04:51.521999467Z npm error workspace backend@1.0.0
2025-09-13T21:04:51.522044448Z npm error location /opt/render/project/src/backend
2025-09-13T21:04:51.522068328Z npm error command failed
2025-09-13T21:04:51.52213335Z npm error command sh -c node dist/index.js