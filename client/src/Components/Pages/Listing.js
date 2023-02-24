import React from "react";

import './Listing.css'

import HomeHeader from "../Sub-Components/HomeHeader";

function Listing() {
    return (
        <div className="listingContainer">
            <HomeHeader homePage={false}/>
        </div>
    )
}

export default Listing
