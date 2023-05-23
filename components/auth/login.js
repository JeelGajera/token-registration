'use client';

import React,{ useState } from "react"
import { auth } from "../../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import DataField from "./DataField";
import Button from "../Button";
import { useRouter } from "next/navigation";


function Page() {
  const router = useRouter();
  //form handelers
  const [data, _data] = useState({ email: "", password: "" })
  const change = (e) => {
    _data({ ...data, [e.target.name]: e.target.value });
    // console.log(data);
  }

  //login
  const logIn = async () => {
    var message;
    const response = await signInWithEmailAndPassword(auth, data.email, data.password)
    .then((result) => { router.push('/home') })
      .catch((e) => { message = e.message });
    message = response ?? message;
    // window.alert(message);
    // console.log(message);
  }

  return (
    <form action="" onSubmit={(e) => e.preventDefault()}>
      <div className="flex flex-col w-60">
        <DataField 
          label={"Email"}
          name={"email"}
          onChange={change}
          placeholder={"Enter Email"}
          type={"email"}
          value={data.email}
        />
        <DataField 
          label={"Password"}
          name={'password'}
          onChange={change}
          placeholder={"Enter Password"}
          type={"password"}
          value={data.password}
        />
        {/* <label htmlFor="email">Email:</label>
        <input type="email" onChange={change} name="email" value={data.email} required />
        <label htmlFor="password">Password:</label>
        <input type="text" onChange={change} name="password" value={data.password} required /> */}
        {/* <button type="submit" onClick={logIn}>Login</button> */}
        <Button
        className={"mt-5"}
          btype={"submit"}
          type={"blue"}
          onClick={logIn}
        >
          Login
        </Button>
      </div>
    </form>
  )
}

export default Page;

//write code to print hello world
