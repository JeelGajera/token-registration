'use client';

import React, { useLayoutEffect, useState } from "react";
import ProfileCard from "@/components/home/ProfileCard";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import Link from "next/link";

import { auth, db } from "@/config/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, addDoc } from 'firebase/firestore'
import DataField from "@/components/auth/DataField";

function Page() {
  const router = useRouter();
  const [user, _user] = useState(null);
  useLayoutEffect(() => {
    onAuthStateChanged(auth, function (user) {
      if (user) {
        // console.log("user is loggedin: ");
        _user(user);
      } else {
        router.push("/");
        // console.log("user is not logged in")
      }
    })
  }, [])


  const [form, _form] = useState({ name: "", category: "", address: "", description: "" })
  const change = (e) => {
    _form({ ...form, [e.target.name]: e.target.value });
  }
  const submit = async () => {
    const response = await addDoc(collection(db, 'request'), {
      userId: user.uid,
      name: form.name,
      category: form.category,
      address: form.address,
      description: form.description
    });
    if (response)
      window.alert("request sent successfully");
  }


  return (
    <>
      <div>
        <div className="px-1 sm:px-5 flex justify-between items-center w-full h-20 bg-white bg-opacity-10 backdrop-blur-md rounded-lg shadow-2xl">
          <div>
            {user && <Link href="/home"> <Button>Back</Button></Link>}
          </div>
          {user && <ProfileCard
            email={user?.email}
            lastseen={"last checked in: " + user?.metadata.lastSignInTime}
            photo={"/profile.png"}
          />}
          {/* signout button if logged in */}
          {user && <Button onClick={() => auth.signOut()}>Signout</Button>}
          {!user && <Link href="/"><Button>Login</Button></Link>}
        </div>
        <h1 className="text-2xl text-center font-bold text-white">Register Your Department</h1>
        <div className="m-5 flex justify-center items-center">

          <form onSubmit={(e) => e.preventDefault()} className="text-red-400">
            <div className="flex flex-col gap-4">
              <DataField
                name="name"
                type="text"
                label={"Name"}
                onChange={change}
                value={form.name}
              />
              <div className="flex gap-2">
                <label htmlFor="category">Category</label>
                <select name="category" defaultValue="government" onChange={change} value={form.category} className="p-2 rounded-full text-black">
                  <option value="government">Government</option>
                  <option value="bank">Bank</option>
                  <option value="municipality">Municipality</option>
                  <option value="hospital">Hospital</option>
                </select>
              </div>
              <DataField
                name="address"
                type="textarea"
                label={"Address"}
                onChange={change}
                value={form.address}
              />
              <DataField
                name="description"
                type="text"
                label={"Description"}
                onChange={change}
                value={form.description}
              />
              <Button
                className={"w-fit"}
                onClick={submit}
                btype={"submit"}
                type={"blue"}
              > Submit</Button>
            </div>

          </form>
        </div>
      </div>
    </>
  );
}

export default Page;