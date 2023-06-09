'use client';

import React from 'react'
import moment from 'moment/moment';

function ProfileCard({ lastseen, email, photo }) {
    return (
        <>
            <div className="flex flex-row items-center justify-center " >
                <div className="mr-2 bg-transparent">
                    <img
                        src={photo}
                        alt="profile"
                        className="w-12 h-12 rounded-full"
                    />
                </div>
                <div className="flex-1 flex-col items-center bg-transparent">
                    <div className="text-sm font-bold bg-transparent">{email}</div>
                    <div className="text-[10px]  bg-transparent">{moment(lastseen).calendar()}</div>
                </div>
            </div>
        </>
    )
}

export default ProfileCard