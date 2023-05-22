import React, { useState } from "react"
import { auth } from "../../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import DataField from "./DataField";
import Button from "../Button";
import { useRouter } from "next/navigation";


function Page() {
  const router = useRouter();
  //form handelers
  const [data, _data] = useState({ name: "", email: "", password: "" })
  const change = (e) => {
    _data({ ...data, [e.target.name]: e.target.value });
  }


  //sign in
  const signIn = async () => {
    var message;
    const response = await createUserWithEmailAndPassword(auth, data.email, data.password)
      .catch((e) => { message = e.message });
    message = response ?? message;
    window.alert(message)
  }

  //google signup
  const googleSignup = async () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        if(credential){
          router.push("/home")
        }
      }).catch((e) => {
        window.alert(e.message)
      });

  }

  return (
    <>
      {/* Signup with google*/}
      <div className="my-5 cursor-pointer" onClick={googleSignup}>
        <div className="w-fit relative group">
          <div
            className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200">
          </div>
          <div className="relative ring-1 ring-gray-900/5 rounded-lg leading-none flex items-top justify-start">
            <div className="p-2 rounded-lg flex items-center bg-black">
              <img src="/google.svg" alt="Google" className="w-8" />
              <span className="text-lg mx-2 text-gray-400 ">Signup with google</span>
            </div>
          </div>
        </div>
      </div>

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
          <Button
            className={"mt-5"}
            btype={"submit"}
            type={"blue"}
            onClick={signIn}
          >
            Signup
          </Button>
        </div>
      </form>
    </>
  )
}

export default Page;

//write code to print hello world
