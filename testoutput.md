2025-09-13T18:08:27.331641863Z ==> Cloning from https://github.com/PragmaDAO/pragmaDAO-website
2025-09-13T18:08:28.150866146Z ==> Syncing Git submodules
2025-09-13T18:08:28.73072107Z ==> Checking out commit 18767b5f3f6b5627195a5f63ad39f08f643147e6 in branch main
2025-09-13T18:08:46.164010036Z ==> Using Node.js version 22.16.0 (default)
2025-09-13T18:08:46.18949985Z ==> Docs on specifying a Node.js version: https://render.com/docs/node-version
2025-09-13T18:08:48.046754173Z ==> Running build command 'cd backend && npm install && npm run build'...
2025-09-13T18:10:48.520608304Z 
2025-09-13T18:10:48.520642336Z added 1287 packages, and audited 1289 packages in 2m
2025-09-13T18:10:48.520654366Z 
2025-09-13T18:10:48.520669906Z 216 packages are looking for funding
2025-09-13T18:10:48.520676216Z   run `npm fund` for details
2025-09-13T18:10:48.869969516Z 
2025-09-13T18:10:48.870001547Z 25 vulnerabilities (2 low, 18 high, 5 critical)
2025-09-13T18:10:48.870012297Z 
2025-09-13T18:10:48.870020217Z To address issues that do not require attention, run:
2025-09-13T18:10:48.870026688Z   npm audit fix
2025-09-13T18:10:48.870030278Z 
2025-09-13T18:10:48.870034328Z To address all issues (including breaking changes), run:
2025-09-13T18:10:48.870039768Z   npm audit fix --force
2025-09-13T18:10:48.870044028Z 
2025-09-13T18:10:48.870048778Z Run `npm audit` for details.
2025-09-13T18:10:49.145810278Z 
2025-09-13T18:10:49.145833419Z > backend@1.0.0 build
2025-09-13T18:10:49.145837759Z > tsc
2025-09-13T18:10:49.145841189Z 
2025-09-13T18:10:51.635986482Z src/index.ts(1,20): error TS2307: Cannot find module 'dotenv' or its corresponding type declarations.
2025-09-13T18:10:51.636152506Z src/index.ts(16,18): error TS7016: Could not find a declaration file for module 'cors'. '/opt/render/project/src/node_modules/cors/lib/index.js' implicitly has an 'any' type.
2025-09-13T18:10:51.636160726Z   Try `npm i --save-dev @types/cors` if it exists or add a new declaration (.d.ts) file containing `declare module 'cors';`
2025-09-13T18:10:51.636175057Z src/index.ts(18,21): error TS7016: Could not find a declaration file for module 'express-session'. '/opt/render/project/src/node_modules/express-session/index.js' implicitly has an 'any' type.
2025-09-13T18:10:51.636183497Z   Try `npm i --save-dev @types/express-session` if it exists or add a new declaration (.d.ts) file containing `declare module 'express-session';`
2025-09-13T18:10:51.636205638Z src/routes/admin.ts(2,24): error TS2305: Module '"@prisma/client"' has no exported member 'DiscountType'.
2025-09-13T18:10:51.636218268Z src/routes/auth.ts(3,20): error TS7016: Could not find a declaration file for module 'bcryptjs'. '/opt/render/project/src/node_modules/bcryptjs/index.js' implicitly has an 'any' type.
2025-09-13T18:10:51.636224808Z   Try `npm i --save-dev @types/bcryptjs` if it exists or add a new declaration (.d.ts) file containing `declare module 'bcryptjs';`
2025-09-13T18:10:51.636269599Z src/routes/auth.ts(4,17): error TS7016: Could not find a declaration file for module 'jsonwebtoken'. '/opt/render/project/src/node_modules/jsonwebtoken/index.js' implicitly has an 'any' type.
2025-09-13T18:10:51.636276109Z   Try `npm i --save-dev @types/jsonwebtoken` if it exists or add a new declaration (.d.ts) file containing `declare module 'jsonwebtoken';`
2025-09-13T18:10:51.636279809Z src/routes/code.ts(3,22): error TS7016: Could not find a declaration file for module 'archiver'. '/opt/render/project/src/node_modules/archiver/index.js' implicitly has an 'any' type.
2025-09-13T18:10:51.63630255Z   Try `npm i --save-dev @types/archiver` if it exists or add a new declaration (.d.ts) file containing `declare module 'archiver';`
2025-09-13T18:10:51.63630509Z src/routes/code.ts(5,17): error TS7016: Could not find a declaration file for module 'jsonwebtoken'. '/opt/render/project/src/node_modules/jsonwebtoken/index.js' implicitly has an 'any' type.
2025-09-13T18:10:51.63630716Z   Try `npm i --save-dev @types/jsonwebtoken` if it exists or add a new declaration (.d.ts) file containing `declare module 'jsonwebtoken';`
2025-09-13T18:10:51.636405663Z src/routes/code.ts(16,34): error TS7006: Parameter 'err' implicitly has an 'any' type.
2025-09-13T18:10:51.636537496Z src/routes/code.ts(16,39): error TS7006: Parameter 'user' implicitly has an 'any' type.
2025-09-13T18:10:51.636542906Z src/routes/code.ts(122,31): error TS7006: Parameter 'snippet' implicitly has an 'any' type.
2025-09-13T18:10:51.636549596Z src/routes/code.ts(122,40): error TS7006: Parameter 'index' implicitly has an 'any' type.
2025-09-13T18:10:51.636565167Z src/routes/oauth.ts(3,17): error TS7016: Could not find a declaration file for module 'jsonwebtoken'. '/opt/render/project/src/node_modules/jsonwebtoken/index.js' implicitly has an 'any' type.
2025-09-13T18:10:51.636571277Z   Try `npm i --save-dev @types/jsonwebtoken` if it exists or add a new declaration (.d.ts) file containing `declare module 'jsonwebtoken';`
2025-09-13T18:10:51.636667839Z src/routes/payments.ts(3,17): error TS7016: Could not find a declaration file for module 'jsonwebtoken'. '/opt/render/project/src/node_modules/jsonwebtoken/index.js' implicitly has an 'any' type.
2025-09-13T18:10:51.636673509Z   Try `npm i --save-dev @types/jsonwebtoken` if it exists or add a new declaration (.d.ts) file containing `declare module 'jsonwebtoken';`
2025-09-13T18:10:51.636676029Z src/routes/profile.ts(3,17): error TS7016: Could not find a declaration file for module 'jsonwebtoken'. '/opt/render/project/src/node_modules/jsonwebtoken/index.js' implicitly has an 'any' type.
2025-09-13T18:10:51.636682479Z   Try `npm i --save-dev @types/jsonwebtoken` if it exists or add a new declaration (.d.ts) file containing `declare module 'jsonwebtoken';`
2025-09-13T18:10:51.636687299Z src/routes/profile.ts(4,20): error TS7016: Could not find a declaration file for module 'bcryptjs'. '/opt/render/project/src/node_modules/bcryptjs/index.js' implicitly has an 'any' type.
2025-09-13T18:10:51.63669027Z   Try `npm i --save-dev @types/bcryptjs` if it exists or add a new declaration (.d.ts) file containing `declare module 'bcryptjs';`
2025-09-13T18:10:51.63669862Z src/routes/profile.ts(18,34): error TS7006: Parameter 'err' implicitly has an 'any' type.
2025-09-13T18:10:51.63670168Z src/routes/profile.ts(18,39): error TS7006: Parameter 'user' implicitly has an 'any' type.
2025-09-13T18:10:51.636707Z src/routes/progress.ts(3,17): error TS7016: Could not find a declaration file for module 'jsonwebtoken'. '/opt/render/project/src/node_modules/jsonwebtoken/index.js' implicitly has an 'any' type.
2025-09-13T18:10:51.63670975Z   Try `npm i --save-dev @types/jsonwebtoken` if it exists or add a new declaration (.d.ts) file containing `declare module 'jsonwebtoken';`
2025-09-13T18:10:51.67389108Z npm error Lifecycle script `build` failed with error:
2025-09-13T18:10:51.673951492Z npm error code 2
2025-09-13T18:10:51.674006113Z npm error path /opt/render/project/src/backend
2025-09-13T18:10:51.674160997Z npm error workspace backend@1.0.0
2025-09-13T18:10:51.674190488Z npm error location /opt/render/project/src/backend
2025-09-13T18:10:51.674219208Z npm error command failed
2025-09-13T18:10:51.674264719Z npm error command sh -c tsc
2025-09-13T18:10:51.690178549Z ==> Build failed 😞
2025-09-13T18:10:51.690197699Z ==> Common ways to troubleshoot your deploy: https://render.com/docs/troubleshooting-deploys