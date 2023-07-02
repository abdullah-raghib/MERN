import React, { useState } from 'react'
import logo1 from '../images/signupImg.jpg'
import { Link, useNavigate } from "react-router-dom";


export const Signup = () => {
    const navigate = useNavigate();
    const [user, setuser] = useState({
        name: "", email: "", phone: "", work: "", password: "", cpassword: ""
    });

    const handleInputs = (e) => {
        console.log(e);

        let name = e.target.name;
        let value = e.target.value

        setuser({ ...user, [name]: value })
    }

    const postData = async (e) => {
        e.preventDefault();

        const { name, email, phone, work, password, cpassword } = user;

        const res = await fetch("https://mern-authentication-server-beta.vercel.app/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, phone, work, password, cpassword
            })

        });

        const data = await res.json();

        if (data.status === 422 || !data) {
            alert("Registeration Failed")
            console.log("Failed to register");

        } else {
            alert("Registeration successful")
            console.log("Successfully  registered");
            navigate("../Login")
        }
    }

    return (

        <>
            <section className='bg-light py-5 px-3'>
                <section className="container ct-form-section card ">
                    <h1>Sign Up</h1>

                    <div className='container ct-form'>
                        <form method='POST'>
                            <div className="mb-2">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input type="text" className="form-control" id="name"
                                    name='name'
                                    value={user.name}
                                    onChange={handleInputs}
                                />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                                    name='email'
                                    value={user.email}
                                    onChange={handleInputs}
                                />
                                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                            </div>
                            <div className="mb-2">
                                <label htmlFor="phone" className="form-label">Phone No.</label>
                                <input type="number" className="form-control" id="phone"
                                    name='phone'
                                    value={user.phone}
                                    onChange={handleInputs}
                                />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="work" className="form-label">Work</label>
                                <input type="text" className="form-control" id="work"
                                    name='work'
                                    value={user.work}
                                    onChange={handleInputs}
                                />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                <input type="password" className="form-control" id="exampleInputPassword1"
                                    name='password'
                                    value={user.password}
                                    onChange={handleInputs}
                                />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="exampleInputCPassword1" className="form-label">Confirm Password</label>
                                <input type="password" className="form-control" id="exampleInputCPassword1"
                                    name='cpassword'
                                    value={user.cpassword}
                                    onChange={handleInputs}
                                />
                            </div>



                            <button type="submit" className="btn btn-primary" onClick={postData}>Register</button>
                        </form>
                        <div className='container ct-img' id='signup-img-div'>
                            <img src={logo1} alt="not found" />
                            <Link id="signup-link" className="nav-link form-label"  to="/Login">Email already registered</Link>
                        </div>
                    </div>

                </section>

            </section>

        </>
    )
}
