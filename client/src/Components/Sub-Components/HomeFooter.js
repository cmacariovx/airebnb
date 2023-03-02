import React from "react";

import './HomeFooter.css'

function HomeFooter() {
    function toLinkedInProfile(event) {
        event.preventDefault()
        window.open("https://www.linkedin.com/in/carlos-macariooo/")
    }

    return (
        <div className="homeFooterContainer">
            <p className="homeFooterText">© 2023 Airebnb, Inc.</p>
            <i className="fa-brands fa-linkedin" onClick={toLinkedInProfile}></i>
        </div>
    )
}

export default HomeFooter
