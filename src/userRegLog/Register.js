import React, { useState } from 'react'
import axios from 'axios';

export const Register = () => {

    const [useridReg, SetUseridReg] = useState("");
    const [userpassReg, SetUserpassReg] = useState("");

    const regDetails = {
        email: useridReg,
         userpassword: userpassReg
    }

    // const config = {
    //     "Content-Type": "application/json",
    //     'Access-Control-Allow-Origin': '*',
    // }

    const register = async () => {
        try {
            await axios.post("http://127.0.0.1:3001/Users", regDetails);
            window.location.reload();
        } catch (err) {
            console.log(`Can not post data to database: ${err}`);
        }
    }

    return (
        <div className="register">
            <h1>registration Form</h1>
            <div className="regForm">
                <label>Username</label>
                <input type="text" id="userName" onChange={(e) => {
                    SetUseridReg(e.target.value);
                }} /><br /><br />
                <label>Password</label>
                <input type="password" id="userPassword" onChange={(e) => SetUserpassReg(e.target.value)} /><br /><br />
                <button onClick={register}>Register</button>
            </div>
        </div>
    )
}
