const jwt = require('jsonwebtoken');
const config = require('config');


module.exports = function(req, res, next){
    //get token from header 
    const token = req.header('x-auth-token');
    if(!token){
        return res.status(401).json({msg: 'No token'});

        try{
            const decode = jwt.verify(token, config.get('jwtScret'));
            req.user = decoded.user;
            next();
        }catch(err){
            res.staus(401).json({msg: 'token is not found'});
        }
    }
}