'use client'
import React, { useEffect, useLayoutEffect, useState } from "react";
import ProfileCard from "@/components/home/ProfileCard";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "@/config/firebase";
import { collection, query, where, getDocs } from 'firebase/firestore';
import Button from "@/components/Button";
import Link from "next/link";




function Page(context) {
    const [user, _user] = useState(null);
    const [department, _department] = useState(context.params.slug);
    const [list, _list] = useState([]);

    useLayoutEffect(() => {
        onAuthStateChanged(auth, function (user) {
            if (user) {
                console.log("user is loggedin: ");
                _user(user);
            } else {
                // router.push("/");
                console.log("user is not logged in")
            }
        })
    }, [])


    const getData = async (category) => {
        const q = query(collection(db, 'department'), where('category', '==', category));
        const querySnapshot = await getDocs(q);

        const documents = [];
        querySnapshot.forEach((doc) => {
            documents.push({ id: doc.id, ...doc.data() });
        });
        _list(documents)
    }



    useEffect(() => {
        getData(department);
    }, [])



    return (
        <div>
            <div className="px-1 sm:px-5 flex justify-between items-center w-full h-20 bg-white bg-opacity-10 backdrop-blur-md rounded-lg shadow-2xl">
                <div>
                    {user && <Link href="/home"><Button>Back</Button></Link>}
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
            <h1 className="text-2xl text-center font-bold text-white">{department}</h1>
            <div className="m-5 flex justify-center items-center">
                <div className="mt-4 grid grid-cols-1 ">

                    <div className="relative overflow-x-auto">
                        <table className="w-full text-sm text-left text-stone-400">
                            <thead className="text-xs uppercase bg-white bg-opacity-10 text-stone-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Address
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        description
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Generate
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {list.map((item, index) => (
                                    <tr className="bg-white bg-opacity-10 border-stone-700" key={index}>
                                        <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-white">
                                            {item.name}
                                        </th>
                                        <td className="px-6 py-4">
                                            {item.address}
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.description}
                                        </td>
                                        <td className="px-6 py-4">
                                            <Button>Get Token</Button>
                                        </td>
                                    </tr>
                                )
                                )}

                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Page;