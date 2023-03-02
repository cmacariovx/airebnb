import React, { useEffect, useState } from "react";

import './Listing.css'

import HomeHeader from "../Sub-Components/HomeHeader";
import ListingBody from "../Sub-Components/ListingBody";
import HomeFooter from "../Sub-Components/HomeFooter";

function Listing() {
    let [floatingHeader, setFloatingHeader] = useState()

    const h = document.documentElement
    const b = document.body
    const st = 'scrollTop'
    const sh = 'scrollHeight';

    useEffect(() => {
        if (document.readyState !== "loading") {
            setFloatingHeader(document.getElementById("floatingListingHeader"))
        }
    }, [])

    document.addEventListener("scroll", (e) => {
        let percent = (h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight) * 100;

        if (floatingHeader && percent <= 22) floatingHeader.style.display = "none"
        if (floatingHeader && percent > 22 && percent < 49) floatingHeader.style.display = "flex"
        if (floatingHeader && percent > 49) floatingHeader.style.display = "none"
    })
    return (
        <div className="listingContainer">
            <HomeHeader homePage={false}/>
            <div className="floatingListingHeader" id="floatingListingHeader"></div>
            <ListingBody/>
            <HomeFooter homepage={false}/>
        </div>
    )
}

export default Listing
