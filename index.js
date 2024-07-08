const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");

app.use(bodyParser.json());
app.use(express.json());

app.use("/admin",adminRouter) //all the admin requests will take the command to the admin route 
app.use("/user",userRouter) // all the user requests will take the command to the user route

const PORT = 3000;

app.listen(PORT , function(){
    console.log(`server is running on port ${PORT}`);
});
