import mongoose from "mongoose";

mongoose.connect(
    "mongodb://localhost:27017/usersData", {
        useCreateIndex:true,
        useNewUrlParser:true,
        useUnifiedTopology:true,
    }).then(()=>{
        console.log("Connected to database.");
    }).catch(()=>{
        console.log("Database connection failed");
    });