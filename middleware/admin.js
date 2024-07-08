
const {admin} = require("../db/index"); //inputting the admin to check that the username and password is there on the admin database or not

//middleware for handling authentication >> auth usually not work like this in the real world it works as jwt as we learned before and we did the same shit using jwt authentication on the next project

function adminMiddleware(req,res,next){
    //admin authentication logic
    //check the headers and validate the admin from the admin database
    const username = req.headers.username;
    const password = req.headers.password;
    admin.findOne({  //checking that the username and password is present in the admin database or not
        username : username,
        password : password
    })
    .then(function(value){ //if value does exist we can call next() that means the user does exit in the admin database
        if(value){
            next();
        } else {
            res.status(403).json({  //if the user dosent exist then return it with a json text that the user dosent exist in the admin database 
                msg: "admin dosent exist"
            })
        }
    })

}

module.exports = adminMiddleware;