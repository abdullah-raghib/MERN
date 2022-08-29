import React, { useContext } from 'react'
import { Link } from "react-router-dom";
import { UserContext } from "../App";


export const Navbar = () => {
  const { state, dispatch } = useContext(UserContext);


  const RenderNav = () => {
    if (state) {
      return (


        <>
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/About">About</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/Contact">Contact</Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/Logout">Logout</Link>
          </li>
        </>
      )

    } else {
      return (
        <>
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/About">About</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/Contact">Contact</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/Login">Login</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/Signup">Sign Up</Link>
          </li>

        </>
      )
    }
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="">Profiler</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto ml-auto mb-2 mb-lg-0">
              <RenderNav />
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}
