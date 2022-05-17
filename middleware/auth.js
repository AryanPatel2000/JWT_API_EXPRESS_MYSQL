const jwt = require('jsonwebtoken');
const env = require('../config/env.js')
const config = require('../config/auth.config')
const db = require('../config/db.config.js');

verifyToken = (req, res, next) => {
    let token = req.headers['x-access-token'];
 
    if(!token)
    {
        return res.status(403).send({ message: "No token provided"});
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if(err)
        {
            console.log(err);
            return res.status(401).send({message: "Invalid Token!" });
        }
        
            req.userId = decoded.id;
            next();
            //res.status(200).send({ message: "successs" });
        
    })
}

module.exports = verifyToken;