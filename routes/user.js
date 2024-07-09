const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { user, course } = require("../db");


//user routes>>
router.post('/signup', function(req,res){
    //user signup logic
    const username  = req.body.username;
    const password  = req.body.password;

    user.create({
        username,
        password
    })
    .then(function(){
        res.json({
            msg:"user created successfully"
        })
    })
    .catch(function(){ //we dont need catch actually in signup we need the logic wher it says user already exists
        res.status(403).json({
            msg:"user dosent exist"
        });
    })
})

router.get('/courses',async function(req,res){ //this doesent need any user middleware here becoz it is present to the world and anyone can see what courses do we have on our website 
    //lisiting all courses the user has logic
    const response = await course.find({})
    res.json({
        courses: response
    });
})

router.post('/courses/:courseId' , userMiddleware ,  async function(req,res){
    //course purchase logic >>
    const courseId = req.params.courseId; // we used params here becoz see in the url there is colon so we are putting courseid through parameters
    const username  = req.headers.username; //taking the username from the user while purchasing as headers
    try {
        await user.updateOne({ //it will update the purchased courses under the hood of the username we are signed into and in the database of users also it will show the purchased courses
            username : username
        }, {
            "$push": {  //pusing the courseid in the purchased courses section of the user
                purchasedCourses : courseId
            }
        });
    } catch(e) { //if any error comes while purchasing it will show the error in the console
        console.log(e);
    }
    res.json({ //it simply responds with a json that purchase is completed
        msg:"purchase completed"
    });
})

router.get('/purchasedCourses' , userMiddleware ,async function(req,res){ //under the user middleware that is under the user it will return the courses the user has purchased
    //purchased courses for the user logic>>
    const leri = await user.findOne({
        username : req.headers.username
    });
    console.log(leri.purchasedCourses); //leri bcoz see above we set leri as the variable to request headers from the username and find if the user exists and under that usrname we will show the purchased courses of the user
    const courses = await course.find({ //find me all the courses 
        _id: { //where the course id is
            "$in": leri.purchasedCourses //in this array-->user.purchasedcourses
        }
    });
    res.json({
        courses:courses
    });
});

module.exports = router;


