import React, { useEffect, useState } from 'react'

export const Contact = () => {

    const [userData, setUserData] = useState({name:"", email:"", phone:"",message:""});


    

    const callContactPage = async () => {

        try {
            const res = await fetch('/getdata', {
                method: "GET",
                headers: {

                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });
            const data = await res.json();
            console.log(data);
            setUserData({...userData, name:data.name , email:data.email, phone:data.phone});

            if (!res.status === 200) {
                throw new Error("res.error")
            }
        } catch (err) {
            console.log("Error in contact :", err);


        }

    }

    useEffect(() => {
        callContactPage();
    }, []);


    const handleInputs = (e)=>{
        const name = e.target.name;
        const value = e.target.value;

        setUserData({...userData, [name]:value})
    }


    const contactData = async (e)=>{
        e.preventDefault();

            const {name, email, phone, message} = userData;

            const res = await fetch('/contact', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name, email, phone, message
                })
            });

            const data = await res.json();

            if (!data) {
                console.log("message not saved");
                
            }else{
                console.log("message saved");

            }

    }


    return (
        <>
            <section className='bg-light ct-cont'>
                <div className="main-container ">
                    <div className="cards-ct">
                        <div className="card-ct card-1 my-auto">
                            <div className="card__icon">
                                <i className="fas fa-mobile-alt"></i>
                            </div>
                            <div className='px-4'>
                                <h2>Phone</h2>
                                <p>7557443209</p>
                            </div>
                        </div>
                    </div>
                    <div className="cards-ct">
                        <div className="card-ct card-4 my-auto">
                            <div className="card__icon">

                                <i className="fas fa-envelope-open-text"></i>
                            </div>
                            <div className='px-4'>
                                <h2>Email</h2>
                                <p>abdullah.sid786@gmail.com</p>
                            </div>
                        </div>
                    </div>
                    <div className="cards-ct">
                        <div className="card-ct card-3 my-auto">
                            <div className="card__icon">
                                <i className="fas fa-map-marked-alt"></i>
                            </div>
                            <div className='px-4'>
                                <h2>Address</h2>
                                <p>Bankatichak, Gorakhpur, UP</p>
                            </div>
                        </div>
                    </div>

                </div>
                <section className="container ct-form-section card " id='ct-sec'>
                    <h1>Get In Touch</h1>

                    <div className='container ct-form'>
                        <form method='POST' className='ct-form-in'>
                            <div className='ct-flex ct-form-upper' >
                                <div className="m-2">

                                    <input type="text" placeholder='Name' className="form-control" id="name" name='name' onChange={handleInputs} value={userData.name} />
                                </div>
                                <div className="m-2">

                                    <input type="email" placeholder='Email' name='email' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={handleInputs} value={userData.email} />
                                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                                </div>
                                <div className="m-2">

                                    <input type="number" placeholder='Mobile No.' name='phone' className="form-control" id="phone" onChange={handleInputs} value={userData.phone} />
                                </div>

                            </div>

                            <div className="m-3">
                                <textarea name="message" className='form-control' onChange={handleInputs} value={userData.message} placeholder='Message' id="" cols="80" rows="8"></textarea>
                            </div>


                            <div className='btn-ct'>

                                <button onClick={contactData} type="submit" className="btn btn-primary ">Send Message</button>
                            </div>

                        </form>

                    </div>

                </section>
            </section>

        </>
    )
}
