import { useState } from "react"
import {auth} from "../../config/firebase";
import { createUserWithEmailAndPassword,signInWithPopup,GoogleAuthProvider } from "firebase/auth";

function page() {
    //form handelers
    const [data,_data] = useState({name:"",email:"",password:""})
    const change =(e)=>{
        _data({...data,[e.target.name]:e.target.value});
    }


    //sign in
    const signIn = async ()=>{
        var message;
        const response = await createUserWithEmailAndPassword(auth,data.email,data.password)
        .catch((e)=>{message=e.message});
        message = response ?? message;
        window.alert(message)
    }

    //google signup
    const googleSignup = async ()=>{
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth,provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const user = result.user;
      }).catch((e) => {
        window.alert(e.message)
      });
    
    }
  
  return (
    // just for testing ui 
    <form action=""  onSubmit={(e)=>e.preventDefault()}>
        <span>Signup page</span><br/>
        email:
        <input type="email" onChange={change} name="email" value={data.email} required/>
        password:
        <input type="text" onChange={change} name="password" value={data.password} required/>
        <button type="submit" onClick={signIn}>signup</button>
        <button onClick={googleSignup}>Signup with google</button>
    </form>
  )
}

export default page

//write code to print hello world
