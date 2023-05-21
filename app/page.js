"use client";

import React from "react";
import { useState } from "react"
import Loginpage from "../components/auth/login"
import Signupage from "../components/auth/signup"
import Image from "next/image";

function Page() {
  const [signup, _signup] = useState(false);
  return (
    <>
      <div className="h-screen flex flex-col-reverse sm:flex-row justify-between items-center">
        <div className="w-full sm:w-[40%]">
          <div className="px-5">
            <h1 className="text-4xl font-bold">Welcome to <br /><span className="text-blue-500">T</span>oken <span className="text-blue-500">R</span>egistration <br /> System</h1>
            <p className="text-gray-400 mt-5">
              The login page for our digital token generation system provides a seamless and efficient way for users to access and generate their tokens, enhancing their experience and streamlining the process.
            </p>
          </div>
          <div className="px-5 flex flex-col mt-5 p-2">
            {signup && <Signupage />}
            {!signup && <Loginpage />}
            <br />
            <div className="flex gap-4">
              {
                signup ?
                  <p className="text-gray-400">Already have an account?</p>
                  :
                  <p className="text-gray-400">Don&apos;t have an account?</p>

              }
              <button className="underline" onClick={() => _signup(!signup)}>{signup ? "Login" : "Signup"}</button>
            </div>
          </div>
        </div>
        <div className="w-full sm:w-[60%] h-fit flex justify-center items-center">
          <Image src={"/login_img.svg"} width={1024} height={1024} alt="login_img" className="" />
        </div>
      </div>
    </>
  )
}

export default Page;