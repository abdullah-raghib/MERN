import React, { createContext, useReducer } from 'react'

import './App.css';
import './extraCSS/Contact.css';
import './extraCSS/Login.css';
import './extraCSS/Signup.css';
import './extraCSS/About.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { Home } from "./components/Home";
import { Navbar } from './components/Navbar';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { ErrorPage } from './components/ErrorPage';
import { Logout } from './components/Logout';
import { reducer, initialState } from './Reducer/UseReducer';

// 1. Use Context API 
export const UserContext = createContext();

function App() {

  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <>
      <Router>
        <UserContext.Provider value={{ state, dispatch }}>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/About" element={<About />} />
            <Route exact path="/Contact" element={<Contact />} />
            <Route exact path="/Login" element={<Login />} />
            <Route exact path="/Signup" element={<Signup />} />
            <Route exact path="/" element={<ErrorPage />} />
            <Route exact path="/Logout" element={<Logout />} />
          </Routes>

        </UserContext.Provider>
      </Router>
    </>
  );
}

export default App;
