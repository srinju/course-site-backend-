const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const {admin , course} = require("../db/index");
const router = Router();

//admin routes>>
router.post('/signup', function(req,res){
    //implement admin signup logic
    //take the username and password as input and check whether this user already exists or not if yes then user exisits or else user created
    const username = req.body.username;
    const password = req.body.password;

    admin.create({ //creating new admin signup , take the username and password as input and create the user catch is user is not created and msg is shown that user already exists 
        username : username,
        password : password
    })
    .then(function(){
        res.json({
            msg : "user created successfully!!"
        })
    })
    .catch(function(){  //if user already exists then the command will reach here
        res.status(403).json({
            msg:"user already exists"
        })
    })

});

router.post('/courses',adminMiddleware ,async function(req,res){
    //implement course creation logic
    const title = req.body.title;
    const description = req.body.description;
    const imageLink = req.body.imageLink;
    const price = req.body.price;

    const newCourse  = await course.create({
        title : title,
        description : description,
        imageLink : imageLink,
        price : price
    })
    res.json({
        msg : "course created succesfully!" , courseId : newCourse._id //this creates a new id to the course id of the new course only if the course is created that is when admin middleware checks this is a admin and the admin inputs all the course description then the course is created and the control reaches to the res.json line and it shows a message called course created successfully and alos give a id to the new course 
    })

    

});

router.get('/courses', adminMiddleware ,  async function(req,res){ //this returns the users all of their courses they have in our site 
    //implement fetching all courses logic
    const response = await course.find({}); //gets all the courses awaits it when it gets all the courses the command goes to the next line and shows the response that is list of al the courses
    res.json({
        courses : response
    });
});

//there can be more routes like we can delete one course and buy another one so on and so forth

module.exports = router;