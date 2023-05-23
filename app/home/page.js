'use client';

import React, { useEffect, useLayoutEffect, useState } from "react";
import ProfileCard from "@/components/home/ProfileCard";
import Domains from "@/data/domain.json";
import ProjectDomainCard from "@/components/home/DomainCard";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/config/firebase";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import Link from "next/link";




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
                // console.log("user is not logged in");
            }
        })
    }, [])

 

    return (
        <>
            <div>
                <div className="px-1 sm:px-5 flex justify-between items-center w-full h-20 bg-white bg-opacity-10 backdrop-blur-md rounded-lg shadow-2xl">
                    <div>
                        {user?.uid==="GAu2DFvgP8fG06xuD4ZWV2Huwcw1" && <Link href="/register"> <Button>Apply for Department</Button></Link>}
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
                <h1 className="text-2xl text-center font-bold text-white">Welcome</h1>
                <div className="m-5 flex justify-center items-center">
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {Domains.map((item, index) => (
                            <ProjectDomainCard
                                key={index}
                                link={item.link}
                                title={item.title}
                                thumbnail={item.thumbnail}
                            />
                        )
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Page;