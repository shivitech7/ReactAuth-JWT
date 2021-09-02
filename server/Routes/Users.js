//Users API routes
import express from 'express';
import usersModel from "../models/schema.js";
import jwt from 'jsonwebtoken';


const router = express.Router();

//To get all users in database
router.get("/", async (req, res) => {
    try {
        const users = await usersModel.find({});
        res.status(200).send(users);
        console.log("Successfully fetched data from database!");
    } catch (err) {
        res.status(400).send(`Can't get the data from database: ${err}`);
    }
});

//To post/register a user details
router.post("/", async (req, res) => {
    try {
        const user = new usersModel(req.body);
        //    console.log(user);
        const saveUser = await user.save();
        res.status(201).send(saveUser);
    } catch (err) {
        res.status(400).send(`Can't post data to database: ${err}`);
    }
});

//verifying JWT token
const verifyJWT = (req,res, next)=>{
   const token = req.headers["x-access-token"];

   if(!token){
       res.send("need a token for authentication");
   }else{
       jwt.verify(token, "jwtSecret", (err, decoded)=>{
           if(err){
               res.json({auth:false, message: "U failed to login"});
           }else{
               req.userId = decoded.id;
               next();
           }
       })
    }
}

//user authentication
router.get("/isUserAuth", verifyJWT , (req,res)=>{
    res.send("user is authenticated!");
})

//To login a user
router.post("/login", async (req, res) => {
    try {
        // let emptyarray = [];
        const userinput = req.body;
        // console.log(userinput);
        const getUser = await usersModel.find({ email: userinput.email });
        //    console.log(getUser);
        //    if(getUser.length === 0){
        //        console.log("user not found");
        //    }else{
        //     console.log("user valid");
        //    }
        // console.log(getUser[0].email, getUser[0].userpassword);



        //login validations, if user exist or not
        if (getUser.length > 0) {
            if (userinput.email == getUser[0].email && userinput.userpassword == getUser[0].userpassword) {

                const id = getUser[0]._id;
                //Using jsonwebtoken to create a token
                const token = jwt.sign({ id }, "jwtSecret", {
                    expiresIn: 300,      //300 mean for 5min.s
                })
                console.log("user logged in successfully!");
                res.json({ auth: true, token: token, result: getUser });
            } else {
                // console.log("userid/password is incorrect");
                res.json({auth:false, message:"userid/password is incorrect"});

            }
        } else {
            // console.log("user does not exist");
            res.json({auth:false, message:"user does not exist"});
        }

    } catch (err) {
        res.status(400).send(`failed login: ${err}`);
    }
})


export default router;