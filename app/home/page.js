'use client';

import React from "react";
import ProfileCard from "@/components/home/ProfileCard";
import Domains from "@/data/domain.json";
import ProjectDomainCard from "@/components/home/DomainCard";

function page() {
    return (
        <>
            <div>
                <div className="px-1 sm:px-5 flex justify-between items-center w-full h-20 bg-white bg-opacity-10 backdrop-blur-md rounded-lg shadow-2xl">
                    <div>
                        <h1 className="text-2xl font-bold text-white">Welcome</h1>
                    </div>
                    <ProfileCard
                        name="John Doe"
                        email="john.doe@gmail.com"
                        photo={"/profile.png"}
                    />
                </div>
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

export default page;