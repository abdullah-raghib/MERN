import React, { useEffect,useContext } from 'react'
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
export const Logout = () => {
    const {state,dispatch} = useContext(UserContext);
    const navigate = useNavigate();
    useEffect(() => {

    
    fetch('mern-authentication-server-beta.vercel.app/logout', {
        method: "GET",
        headers: {
            
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        credentials: 'same-origin'
    }).then((res)=>{
        dispatch({type:"USER", payload:false});
        navigate("../Login", { replace: true });

        if (!res.status === 200) {
            throw new Error("res.error in logout");
            
        }
        
        
    }).catch((err)=>{
        console.log(err);
    })
    
})
    return (
        <div>
            <h1>Log out page</h1>
        </div>
    )
}
