import React, { useEffect, useState } from 'react'

export const Home = () => {

const [userName, setUserName] = useState();
const [Show, setShow] = useState(false);
    const callHomePage = async () => {

        try {
            const res = await fetch('https://mern-authentication-server-beta.vercel.app/getdata', {
                method: "GET",
                headers: {

                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });
            const data = await res.json();
            console.log(data);
            setUserName(data.name);
            setShow(true);

            if (!res.status === 200) {
                throw new Error("res.error")
            }
        } catch (err) {
            console.log("Error in contact :", err);


        }

    }

    useEffect(() => {
        callHomePage();
    }, []);



    return (
        <section className='bg-light' id='home-id'>
            <div className='home-div bg-light '>
                <p>welcome</p>
                <h1>{userName}</h1>
                <h2 className='text-center'>{Show? 'Happy to see you back ': 'You are using a MERN Application made by Abdullah Raghib'}</h2>
            </div>
        </section>
        
    )
}

