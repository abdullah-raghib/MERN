import React, { useState, useContext } from 'react'
import loginImg from '../images/login-img.png'
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";

export const Login = () => {
    const { state, dispatch } = useContext(UserContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const loginUser = async (e) => {
        e.preventDefault();

        const res = await fetch('/login', {
            method: "POST",
            headers: {

                "Content-Type": "application/json",
            },

            body: JSON.stringify({
                email,
                password
            })
        })

        const data = res.json();

        if (res.status === 422 || !data) {
            window.alert('invalid credential');
            <div class="alert alert-danger" role="alert">
                This is a danger alert—check it out!
            </div>
            console.log('user failed to Login');
            navigate('/Login');
        } else {
            dispatch({ type: "USER", payload: true });
            window.alert('user Login Successful');
            console.log('user Login successfully');
            navigate('/');
        }
    }



    return (
        <>
            <section className='bg-light py-5 login-sec'>
                <section className='container ct-form-section card ' id='login-form'>
                    <h1>Login</h1>
                    <div className='container ct-form'>

                        <div className='container ct-img' id='login-img'>
                            <img src={loginImg} alt="not found" />
                        </div>

                        <form method='POST'>
                            <div className="mb-3">
                                <label for="exampleInputEmail1" className="form-label">Email address</label>
                                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                                    value={email}
                                    onChange={(e) => setEmail(e.currentTarget.value)}
                                />
                                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                            </div>
                            <div className="mb-3">
                                <label for="exampleInputPassword1" className="form-label">Password</label>
                                <input type="password" className="form-control" id="exampleInputPassword1"
                                    value={password}
                                    onChange={(e) => setPassword(e.currentTarget.value)} />

                            </div>

                            <button type="submit" className="btn btn-primary" onClick={loginUser}>Login</button>
                        </form>


                    </div>
                </section>

            </section>


        </>
    )
}
