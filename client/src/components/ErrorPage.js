import React from 'react'
import { Link } from "react-router-dom";

export const ErrorPage = () => {
    return (
        
             <section className='bg-light' id='home-id'>
            <div className='home-div bg-light '>
                <p className='e404'>404</p>
                <h1>We Are Sorry Page Not Found</h1>
                <Link to="/" class="btn btn-primary btn-lg disabled" tabindex="-1" role="button" aria-disabled="true">Primary link</Link>
            </div>
        </section>
        
    )
}
