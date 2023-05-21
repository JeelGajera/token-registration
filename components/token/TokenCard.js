'use client';

import React from 'react'
import { AiFillCloseCircle } from 'react-icons/ai';

const TokenCard = ({ token, key }) => {
    const { name, email, tokenId, type, status, createdDate, createdTime, expiryDate, description, provider, address } = token;

    const Field = ({ name, value }) => {
        return (
            <div className="flex justify-start items-center gap-2">
                <div className="text-sm font-bold text-red-400">{name}</div>
                <div className="text-sm font-bold">{value}</div>
            </div>
        )
    };

    return (
        <>
            <div key={key} className='w-fit relaive bg-white bg-opacity-10 backdrop-blur-sm rounded-lg'>
                <div className='absolute top-5 right-2 '>
                    {/* Cancle Token */}
                    <AiFillCloseCircle className='text-[#f8b34b] cursor-pointer w-18 h-18' />
                </div>

                <div className="flex justify-center items-center">
                    <div className="flex flex-col justify-start p-4 gap-2">
                        <div className="text-2xl font-bold text-blue-500">{name}</div>
                        <div className="text-sm font-bold ">{email}</div>
                        <div className="flex flex-col justify-start gap-2">
                            <Field name="Token ID:" value={tokenId} />
                            <Field name="Type:" value={type} />
                            <Field name="Status:" value={status} />
                            <Field name="Created Date:" value={createdDate} />
                            <Field name="Created Time:" value={createdTime} />
                            <Field name="Expiry Date:" value={expiryDate} />
                            <Field name="Description:" value={description} />
                            <Field name="Provider:" value={provider} />
                            <Field name="Address:" value={address} />

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default TokenCard