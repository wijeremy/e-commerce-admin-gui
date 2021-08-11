require("dotenv").config();
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
     const authHeader = req.headers['authorization'];
     const token = authHeader;
    
     if(token == null) return res.sendStatus(401);
     
     jwt.verify(token, process.env.TOKEN_KEY, (err, user) => {
          
          if(err) return res.sendStatus(403);
          
          req.user = user;
          return next();
     })

};

module.exports = verifyToken;