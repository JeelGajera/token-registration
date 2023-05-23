'use client';

import React from "react";
import Tokens from "@/data/token.json";
import TokenCard from "@/components/token/TokenCard";
import ProfileCard from "@/components/home/ProfileCard";
import { auth } from "@/config/firebase";

function page() {
    return (
        <>
            <div className="px-1 sm:px-5 flex justify-between items-center w-full h-20 bg-white bg-opacity-10 backdrop-blur-md rounded-lg shadow-2xl">
                <div>
                    <h1 className="text-2xl font-bold text-white">Token Details</h1>
                </div>
                <ProfileCard
                    name="John Doe"
                    email="john.doe@gmail.com"
                    photo={"/profile.png"}
                />
            </div>
            <div className="flex justify-center items-center">
                <div className="m-4 grid grid-col-1">
                    {Tokens.map((token, index) => (
                        <TokenCard
                            key={index}
                            token={token}
                            user = {auth?.currentUser?.email}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}

export default page;