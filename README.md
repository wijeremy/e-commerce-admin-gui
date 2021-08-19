# e-commerce-admin-gui

## Table of Contents

- [JWT Implementation](#JWT Implementation)
- [License](#license)
- [Contributing](#Contributing)
- [Questions](#questions)

## JWT Implementation

JWT ( JSON WEB TOKEN) is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. This information can be verified and trusted because it is digitally signed. JWTs can be signed using a secret (with the HMAC algorithm) or a public/private key pair using RSA or ECDSA. For more information and documentation for this service, visit (jwt.io)[https://jwt.io/]

The user should be verified when he/she logs in when they want to make changes or updates using different routes.

setup a utility folder in your app server. Create a auth.js file where you will have to get the environment variables passed in to this file by adding the .env file. Also, it is require to bring in the jsonwebtoken and the bcrypt libraries. You should be able to implement it the same way as you would for using Sessions.

The structure for setup is

```
     server.js
     utils
        -- auth.js
     models
        -- user.js
     controller
        index.js
        -- api
          -- userRoutes.js
           -- index.js
```

## License

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

Link to the license: https://opensource.org/licenses/MIT

# Contributing

Javier
Benny
James
Jeremy

# For questions

Please contact any team members and we can help you resolve any issues you might have.

James - jamesj995
Jeremy - wijeremy
Benny - benjaminbtrance
Javier - javivilchis
