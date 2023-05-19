"use client";

import { useState } from "react"
import Loginpage from "../../components/auth/login"
import Signupage from "../../components/auth/signup"

function page() {
    const [signup,_signup] = useState(false);
  return (
    <>     
        {signup && <Signupage/>}
        {!signup && <Loginpage/>}
        <br/>
        <button onClick={()=>_signup(!signup)}>{signup ? "Login" : "Signup"}</button>
    </>
  )
}

export default page