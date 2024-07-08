//middleware for user authentication >>

const {user} = require("../db/index");

function userMiddleware(req,res,next){
    const username = req.headers.username;
    const password = req.headers.password;

    user.findOne({
        username : username,
        password : password
    })
    .then(function(value){
        if(value){
            next();
        } else {
            res.status(403).json({
                msg:"user dossent exist"
            })
        }
    })
}

module.exports = userMiddleware;
