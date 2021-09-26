import React from 'react'
import { useHistory } from 'react-router-dom'
import "./NotFound.css"

function NotFound() {
    const history= useHistory();
    return (
        <div className="container">
            <h2>Oops! Page not found.</h2>
            <h1>404</h1>
            <p>We can't find the page you're looking for.</p>
            <span className="spanBackButton" onClick={()=>{history.push("/")}} >Go back home</span>
        </div>
    )
}

export default NotFound
