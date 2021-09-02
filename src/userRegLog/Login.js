import axios from 'axios';
import React, {useState} from 'react'

export const Login = () => {

    const [useridLog, SetUserIdLog] = useState("");
    const [userpassLog, SetUserPassLog] = useState("");
    const [loginStatus, SetLoginStatus] = useState(false);
    const userInputData = {
        email:useridLog,
        userpassword:userpassLog
    }

   const userAuthenticated = async()=>{
       const res = await axios.get("http://127.0.0.1:3001/Users/isUserAuth",{
          headers: {
              "x-access-token": localStorage.getItem("token"),
          },
       });
       console.log(res);
   }

    const login = async()=>{
         try{
           const res = await axios.post("http://127.0.0.1:3001/Users/login", userInputData);
        //    console.log(res);
           if(!res.data.auth){
               SetLoginStatus(false);
           }else{
            //    console.log(res.data);
               localStorage.setItem("token", res.data.token);   //storing user jwt token locally
               SetLoginStatus(true);
           }

         }catch(err){
             console.log(`can't login: ${err}`);
         }
    }

    return (
        <div className="login">
            <h1>Login</h1>
            <div className="logForm">
                 <label>Username</label>
                 <input type="text" id="userLogName" placeholder="username.." onChange={(e)=> SetUserIdLog(e.target.value)} /><br/><br/>
                 <label>Password</label>
                 <input type="password" id="userLogPassword" placeholder="password.." onChange={(e)=> SetUserPassLog(e.target.value)} /><br/><br/>
                 <button onClick={()=>login()}>Login</button>
            </div>
            <h1>{loginStatus?<button onClick={()=> userAuthenticated()}>Check user authentication</button>:<></>}</h1>
        </div>
    )
}
