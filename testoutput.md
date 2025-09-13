2025-09-13T19:24:35.359814735Z added 1289 packages, and audited 1291 packages in 2m
2025-09-13T19:24:35.359831855Z 
2025-09-13T19:24:35.359836515Z 217 packages are looking for funding
2025-09-13T19:24:35.359842985Z   run `npm fund` for details
2025-09-13T19:24:35.696426854Z 
2025-09-13T19:24:35.696457085Z 25 vulnerabilities (2 low, 18 high, 5 critical)
2025-09-13T19:24:35.696461205Z 
2025-09-13T19:24:35.696465855Z To address issues that do not require attention, run:
2025-09-13T19:24:35.696469575Z   npm audit fix
2025-09-13T19:24:35.696473605Z 
2025-09-13T19:24:35.696477395Z To address all issues (including breaking changes), run:
2025-09-13T19:24:35.696481725Z   npm audit fix --force
2025-09-13T19:24:35.696485035Z 
2025-09-13T19:24:35.696489015Z Run `npm audit` for details.
2025-09-13T19:24:35.939275225Z 
2025-09-13T19:24:35.939296486Z > backend@1.0.0 build
2025-09-13T19:24:35.939299956Z > tsc
2025-09-13T19:24:35.939303006Z 
2025-09-13T19:24:38.36784875Z src/index.ts(16,18): error TS7016: Could not find a declaration file for module 'cors'. '/opt/render/project/src/node_modules/cors/lib/index.js' implicitly has an 'any' type.
2025-09-13T19:24:38.36787582Z   Try `npm i --save-dev @types/cors` if it exists or add a new declaration (.d.ts) file containing `declare module 'cors';`
2025-09-13T19:24:38.367975742Z src/index.ts(18,21): error TS7016: Could not find a declaration file for module 'express-session'. '/opt/render/project/src/node_modules/express-session/index.js' implicitly has an 'any' type.
2025-09-13T19:24:38.367983572Z   Try `npm i --save-dev @types/express-session` if it exists or add a new declaration (.d.ts) file containing `declare module 'express-session';`
2025-09-13T19:24:38.367989913Z src/routes/admin.ts(2,24): error TS2305: Module '"@prisma/client"' has no exported member 'DiscountType'.
2025-09-13T19:24:38.368044994Z src/routes/auth.ts(3,20): error TS7016: Could not find a declaration file for module 'bcryptjs'. '/opt/render/project/src/node_modules/bcryptjs/index.js' implicitly has an 'any' type.
2025-09-13T19:24:38.368051834Z   Try `npm i --save-dev @types/bcryptjs` if it exists or add a new declaration (.d.ts) file containing `declare module 'bcryptjs';`
2025-09-13T19:24:38.368059804Z src/routes/auth.ts(4,17): error TS7016: Could not find a declaration file for module 'jsonwebtoken'. '/opt/render/project/src/node_modules/jsonwebtoken/index.js' implicitly has an 'any' type.
2025-09-13T19:24:38.368086915Z   Try `npm i --save-dev @types/jsonwebtoken` if it exists or add a new declaration (.d.ts) file containing `declare module 'jsonwebtoken';`
2025-09-13T19:24:38.368128686Z src/routes/code.ts(3,22): error TS7016: Could not find a declaration file for module 'archiver'. '/opt/render/project/src/node_modules/archiver/index.js' implicitly has an 'any' type.
2025-09-13T19:24:38.368181487Z   Try `npm i --save-dev @types/archiver` if it exists or add a new declaration (.d.ts) file containing `declare module 'archiver';`
2025-09-13T19:24:38.368194687Z src/routes/code.ts(5,17): error TS7016: Could not find a declaration file for module 'jsonwebtoken'. '/opt/render/project/src/node_modules/jsonwebtoken/index.js' implicitly has an 'any' type.
2025-09-13T19:24:38.368196837Z   Try `npm i --save-dev @types/jsonwebtoken` if it exists or add a new declaration (.d.ts) file containing `declare module 'jsonwebtoken';`
2025-09-13T19:24:38.368235358Z src/routes/oauth.ts(3,17): error TS7016: Could not find a declaration file for module 'jsonwebtoken'. '/opt/render/project/src/node_modules/jsonwebtoken/index.js' implicitly has an 'any' type.
2025-09-13T19:24:38.368242458Z   Try `npm i --save-dev @types/jsonwebtoken` if it exists or add a new declaration (.d.ts) file containing `declare module 'jsonwebtoken';`
2025-09-13T19:24:38.368365401Z src/routes/payments.ts(3,17): error TS7016: Could not find a declaration file for module 'jsonwebtoken'. '/opt/render/project/src/node_modules/jsonwebtoken/index.js' implicitly has an 'any' type.
2025-09-13T19:24:38.368371281Z   Try `npm i --save-dev @types/jsonwebtoken` if it exists or add a new declaration (.d.ts) file containing `declare module 'jsonwebtoken';`
2025-09-13T19:24:38.368548975Z src/routes/profile.ts(3,17): error TS7016: Could not find a declaration file for module 'jsonwebtoken'. '/opt/render/project/src/node_modules/jsonwebtoken/index.js' implicitly has an 'any' type.
2025-09-13T19:24:38.368554565Z   Try `npm i --save-dev @types/jsonwebtoken` if it exists or add a new declaration (.d.ts) file containing `declare module 'jsonwebtoken';`
2025-09-13T19:24:38.368562295Z src/routes/profile.ts(4,20): error TS7016: Could not find a declaration file for module 'bcryptjs'. '/opt/render/project/src/node_modules/bcryptjs/index.js' implicitly has an 'any' type.
2025-09-13T19:24:38.368566185Z   Try `npm i --save-dev @types/bcryptjs` if it exists or add a new declaration (.d.ts) file containing `declare module 'bcryptjs';`
2025-09-13T19:24:38.368590636Z src/routes/progress.ts(3,17): error TS7016: Could not find a declaration file for module 'jsonwebtoken'. '/opt/render/project/src/node_modules/jsonwebtoken/index.js' implicitly has an 'any' type.
2025-09-13T19:24:38.368593206Z   Try `npm i --save-dev @types/jsonwebtoken` if it exists or add a new declaration (.d.ts) file containing `declare module 'jsonwebtoken';`
2025-09-13T19:24:38.407746734Z npm error Lifecycle script `build` failed with error:
2025-09-13T19:24:38.407815566Z npm error code 2
2025-09-13T19:24:38.407861057Z npm error path /opt/render/project/src/backend
2025-09-13T19:24:38.40800212Z npm error workspace backend@1.0.0
2025-09-13T19:24:38.40801113Z npm error location /opt/render/project/src/backend
2025-09-13T19:24:38.408053641Z npm error command failed
2025-09-13T19:24:38.408135552Z npm error command sh -c tsc
2025-09-13T19:24:38.422864608Z ==> Build failed 😞
2025-09-13T19:24:38.422894619Z ==> Common ways to troubleshoot your deploy: https://render.com/docs/troubleshooting-deploys