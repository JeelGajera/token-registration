'use client';

import React, { useEffect, useState } from 'react'
import { FcShare } from 'react-icons/fc';
import { useSearchParams } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { QRCodeSVG } from 'qrcode.react';
import Button from '../Button';

const TokenCard = ({ token, key }) => {
    // const { name, email, tokenId, type, status, createdDate, createdTime, expiryDate, description, provider, address } = token;
    const path = useSearchParams();
    const [tokenDetails, setTokenDetails] = useState({});
    const [timer, setTimer] = useState({ h: 0, m: 0, s: 0 })

    // console.log(path.get('id'));

    useEffect(() => {
        async function getTokenDetails() {
            try {
                const result = await getDoc(doc(db, 'tokens', path.get('id')));
                setTokenDetails(result.data());
                //   console.log(result.data());
            } catch (error) {
                console.log(error);
            }
        }
        getTokenDetails();
    }, [])

    const Field = ({ name, value }) => {
        return (
            <div className="flex justify-start items-center gap-2">
                <div className="text-sm font-bold text-red-400">{name}</div>
                <div className="text-sm font-bold">{value}</div>
            </div>
        )
    };

    const getExpiryTime = (createdAt) => {
        if (createdAt) {
            let createdTime = new Date(createdAt)?.getTime();
            let expiryTime = new Date(createdTime + 3 * 60 * 60 * 1000);
            // console.log(createdTime);
            return expiryTime.toISOString()?.split('T')[1]?.split('.')[0];
        }
    }

    const getStatus = () => {
        if (tokenDetails.createdAt) {
            const curr = new Date().getTime();
            const expTime = new Date(tokenDetails.createdAt).getTime() + (3 * 60 * 60 * 1000);
            // console.log(curr, expTime);
            if (curr > expTime) return 'Expired'
        }
        return 'active'
    }

    var countDownDate = new Date(tokenDetails?.createdAt).getTime() + (3 * 60 * 60 * 1000);
    var x = setInterval(function () {
        var now = new Date().getTime();
        var distance = countDownDate - now;
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setTimer({ h: hours, m: minutes, s: seconds })
        if (distance < 0) {
            clearInterval(x);
            document.getElementById("demo").innerHTML = "EXPIRED";
        }
    }, 1000);
    return (
        <>
            <div key={key} className='p-4 relaive bg-white bg-opacity-10 backdrop-blur-sm rounded-lg'>
                <div className="flex justify-center items-center">
                    <div className="flex flex-col justify-start p-4 gap-2 mt-4">
                        <div className="text-2xl font-bold text-blue-500">{tokenDetails?.email}</div>
                        {/* <div className="text-sm font-bold ">name</div> */}
                        <div className="flex flex-col justify-start gap-2">
                            <Field name="Token ID:" value={path.get('id')} />
                            <Field name="Type:" value={tokenDetails?.type} />
                            <Field name="Status:" value={getStatus()} />
                            <Field name="Created Date:" value={`${tokenDetails.createdAt?.split('T')[0]}`} />
                            <Field name="Created Time:" value={`${tokenDetails.createdAt?.split('T')[1].split('.')[0]}`} />
                            <Field name="Expiry Time:" value={getExpiryTime(tokenDetails.createdAt)} />
                            <Field name="Description:" value={tokenDetails.description} />
                            <Field name="Provider:" value={tokenDetails.provider} />
                            <Field name="Address:" value={tokenDetails.address} />
                            <div className="flex flex-col justify-center items-center gap-2">
                                <div className="border-2 border-blue-500">
                                    <QRCodeSVG
                                        value={window.location.href}
                                        size={128}
                                        bgColor={"#ffffff"}
                                        fgColor={"#000000"}
                                        level={"L"}
                                        includeMargin={false}
                                        imageSettings={{
                                            src: "https://img.icons8.com/color/48/signing-a-document.png",
                                            x: undefined,
                                            y: undefined,
                                            height: 24,
                                            width: 24,
                                            excavate: true,
                                        }}
                                    />
                                </div>
                                <p id="demo">{`Expires in ${timer.h} : ${timer.m} : ${timer.s}`}</p>
                            </div>
                            <div className='absolute top-2 right-2'>
                                {/* Cancle Token */}
                                <Button
                                    onClick={() => {
                                        // copy url to clipboard
                                        navigator.clipboard.writeText(window.location.href);
                                        alert('Token link copied to clipboard :)');
                                    }}
                                >
                                    <FcShare
                                        className='cursor-pointer w-22 h-22'
                                    />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default TokenCard