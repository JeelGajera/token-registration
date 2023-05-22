'use client';

import React from 'react';
import Image from 'next/legacy/image';
import Link from 'next/link';

function ProjectDomainCard({ link, title, thumbnail, key }) {

    return (
        <Link passHref href={link} key={key}>
            <div className="shadow-2xl group relative rounded-lg overflow-hidden cursor-pointer bg-white bg-opacity-10 backdrop-blur-md">
                <div className="p-1 flex justify-center items-center">
                    <Image
                        className="transform transition-all group-hover:scale-105"
                        alt="project_thumbnail"
                        layout='intrinsic'
                        src={thumbnail}
                        width={350}
                        height={250}
                    />
                </div>
                <div>
                    <h2 className="pl-4 font-bold text-2xl text-red-400 mb-4 capitalize decoration-blue-500 group-hover:underline underline-offset-8">
                        {title}
                    </h2>
                </div>
            </div>
        </Link>
    );
};

export default ProjectDomainCard;