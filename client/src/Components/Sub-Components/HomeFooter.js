import React from "react";

import './HomeFooter.css'

function HomeFooter(props) {
    const homePage = props.homePage

    function toLinkedInProfile(event) {
        event.preventDefault()
        window.open("https://www.linkedin.com/in/carlos-macariooo/")
    }

    return (
        <div className={homePage ? "homeFooterContainer" : "homeFooterContainer2"}>
            <p className="homeFooterText">© 2023 Airebnb, Inc.</p>
            <i className="fa-brands fa-linkedin" onClick={toLinkedInProfile}></i>
        </div>
    )
}

export default HomeFooter
