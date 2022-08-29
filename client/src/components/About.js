import React, { useEffect, useState } from 'react'
import profileImg from '../images/profile.jpg'
import { useNavigate } from "react-router-dom";



export const About = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({});

    const callAboutPage = async () => {

        try {
            const res = await fetch('/abouts', {
                method: "GET",
                headers: {

                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });
            const data = await res.json();
            console.log(data);
            setUserData(data);

            if (!res.status === 200) {
                throw new Error("res.error")
            }
        } catch (err) {
            console.log("Error in about :", err);
            navigate("../Login")

        }

    }

    useEffect(() => {
        callAboutPage();
    }, []);





    return (
        <>

            <section className='bg-light py-5 px-3 login-sec'>
                <form method='GET'>
                    <div className='container card ct-about-main' id='about-card'>

                        <div className="ct-side ct-left">
                            <div className="profile-photo ">
                                <img src={profileImg} class="rounded-3" alt="" />
                            </div>
                            <div className="profile-links mt-3 ">
                                <h6 className='text-muted'>{setUserData.work}</h6>
                                <a href="https://www.meetneat.ml" target="_blank">Website</a>
                                <a href="https://www.meetneat.ml" target="_blank">Facebook</a>
                                <a href="https://www.meetneat.ml" target="_blank">Instagram</a>
                                <a href="https://www.meetneat.ml" target="_blank">Twitter</a>
                                <a href="https://www.meetneat.ml" target="_blank">Linkdin</a>
                                <a href="https://www.meetneat.ml" target="_blank">Snapchat</a>

                            </div>
                        </div>
                        <div className="ct-side ct-right">
                            <div className="ct-upper d-flex">
                                <div className="pf-name">
                                    <h4>{userData.name}</h4>
                                    <h5 className='text-primary'>{userData.work}</h5>
                                    <p className='text-muted'>Ranking : 1/10</p>
                                </div>
                                <div className="pf-edit">
                                    <button className='btn btn-outline-dark text-muted'>Edit Profile</button>
                                </div>
                            </div>
                            <div className="ct-lower">
                                <div className="ct-tabs mt-4">

                                    <ul className="nav nav-tabs" role="tablist">
                                        <li className="nav-item">
                                            <a className="nav-link active" id='home-tab' data-bs-toggle="tab" href="#home" aria-controls='home' role="tab">About</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" id='profile-tab' data-bs-toggle="tab" href="#profile" aria-controls='profile' role="tab">Timeline</a>
                                        </li>


                                    </ul>
                                </div>
                                <div className="ct-profile-form pt-4 tab-content">
                                    <div className="tab-pane fade show active" id='home' role='tabpanel' aria-labelledby='home-tab'>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label htmlFor="">user ID</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>4555425566225</p>
                                            </div>
                                        </div>
                                        <div className="row ">
                                            <div className="col-md-6">
                                                <label htmlFor="">Name</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{userData.name}</p>
                                            </div>
                                        </div>
                                        <div className="row ">
                                            <div className="col-md-6">
                                                <label htmlFor="">Email</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{userData.email}</p>
                                            </div>
                                        </div>
                                        <div className="row ">
                                            <div className="col-md-6">
                                                <label htmlFor="">Phone</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{userData.phone}</p>
                                            </div>
                                        </div>
                                        <div className="row ">
                                            <div className="col-md-6">
                                                <label htmlFor="">Profession</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{userData.work}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id='profile' role='tabpanel' aria-labelledby='profile-tab'>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label htmlFor="">Experiance</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>2 years</p>
                                            </div>
                                        </div>
                                        <div className="row ">
                                            <div className="col-md-6">
                                                <label htmlFor="">Hourly Rate</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>1000 per hour </p>
                                            </div>
                                        </div>
                                        <div className="row ">
                                            <div className="col-md-6">
                                                <label htmlFor="">Total Projects</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>20 </p>
                                            </div>
                                        </div>
                                        <div className="row ">
                                            <div className="col-md-6">
                                                <label htmlFor="">English Level</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>Excellent </p>
                                            </div>
                                        </div>
                                        <div className="row ">
                                            <div className="col-md-6">
                                                <label htmlFor="">Availablity</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>6 months</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </form>

            </section>
        </>
    )
}
