var jwt = require('jsonwebtoken');
module.exports = {
    auth(req,res,next){
        jwt.verify(req.headers.authorization, 'shhhhh', function(err, decoded) {
            if(err)
            return res.status(400).json({
                "status":false,
                "message":"Incorrect token"
            });
            next();
        });
    }
};