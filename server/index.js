import express from 'express';
import "./Database/connection.js";
import Routes from  "./Routes/Users.js";
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const PORT = 3001;
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req,res)=>{
    res.send("hello from server");
});

app.use("/Users", Routes);

app.listen(PORT, ()=> console.log(`Server initialized at http://localhost:${PORT}`));