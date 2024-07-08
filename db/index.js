//database schemas>>

const mongoose = require("mongoose");


//connect to db>
mongoose.connect("mongodb+srv://admin:Srinjoy%40123@cluster0.orud7zo.mongodb.net/course_selling_app");

//defining schemas>>
const adminSchema = new mongoose.Schema({
    //schema defination
    username: String,
    password: String
});

const userSchema = new mongoose.Schema({
    username : String,
    password: String,
    purchasedCourses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'course'
    }]
});

const courseSchema = new mongoose.Schema({
    title: String,
    description : String,
    imageLink : String,
    price : Number
});

const admin = mongoose.model('admin',adminSchema);
const user = mongoose.model('user',userSchema);
const course = mongoose.model('course',courseSchema);

module.exports = {
    admin,
    user,
    course
}