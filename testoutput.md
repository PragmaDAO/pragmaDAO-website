/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/passport-oauth2/lib/strategy.js:87
  if (!options.clientID) { throw new TypeError('OAuth2Strategy requires a clientID option'); }
                           ^

TypeError: OAuth2Strategy requires a clientID option
    at Strategy.OAuth2Strategy (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/passport-oauth2/lib/strategy.js:87:34)
    at new Strategy (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/node_modules/passport-github2/lib/strategy.js:62:18)
    at Object.<anonymous> (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/backend/dist/config/passport.js:19:24)
    at Module._compile (node:internal/modules/cjs/loader:1233:14)
    at Module._extensions..js (node:internal/modules/cjs/loader:1287:10)
    at Module.load (node:internal/modules/cjs/loader:1091:32)
    at Module._load (node:internal/modules/cjs/loader:938:12)
    at Module.require (node:internal/modules/cjs/loader:1115:19)
    at require (node:internal/modules/helpers:119:18)
    at Object.<anonymous> (/Users/anthonyalbertorio/Desktop/pragmaDAO-website/backend/dist/index.js:21:1)