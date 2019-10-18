const jwt = require("jsonwebtoken");
const User = require("../user/modle/user");

function verifyAndGetData(req , res , next){
    let auth = req.headers['authorization'];
    if(auth){
        auth = auth.split(" ");
        if(auth[0] ==='Bearer' && auth[1]){
            jwt.verify(auth[1] , process.env.SECURTY_KEY , (err , data) => {
                if(err) res.json({status : "auth error" , error : "token expired"});
                else{
                    User.findOne({ _id : data._id } , (err , data) => {
                        if(err || !data) {
                            res.json({status : "auth error" , error : "User not exist"});
                        }
                        req.auth = data;
                        next();
                    });
                } 
            });
        }
    } else {
        res.json({status : "auth error" , error : 'token not found'});
    }
}
function verify(req , res , next){
    let auth = req.headers['authorization'];
    if(auth){
        auth = auth.split(" ");
        if(auth[0] ==='Bearer' && auth[1]){
            jwt.verify(auth[1] , process.env.SECURTY_KEY , (err , data) => {
                if(err) res.json({status : "auth error" , error : "token expired"});
                else{
                    req.auth = data._id;
                    next();
                }
            });
        }
    } else {
        res.json({status : "auth error" , error : 'token not found'});
    }
}

module.exports = {
    verifyAndGetData ,
    verify
};