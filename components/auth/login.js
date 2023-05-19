'use client';

import { useState } from "react"
import {auth} from "../../config/firebase";
import { signInWithEmailAndPassword} from "firebase/auth";


function page() {
    //form handelers
    const [data,_data] = useState({email:"",password:""})
    const change =(e)=>{
        _data({...data,[e.target.name]:e.target.value});
        console.log(data);
    }

    //login
    const logIn = async ()=>{
      var message;
      const response = await signInWithEmailAndPassword(auth,data.email,data.password)
      .catch((e)=>{message=e.message});
        message = response ?? message;
        window.alert(message)
    }

  return (
    <form action=""  onSubmit={(e)=>e.preventDefault()}>
      <span>Login page</span><br/>
        email:
        <input type="email" onChange={change} name="email" value={data.email} required/>
        password:
        <input type="text" onChange={change} name="password" value={data.password} required/>
        <button type="submit" onClick={logIn}>Login</button>
    </form>
  )
}

export default page

//write code to print hello world
