import React from "react";

import './Listing.css'

import HomeHeader from "../Sub-Components/HomeHeader";
import ListingBody from "../Sub-Components/ListingBody";

function Listing() {
    return (
        <div className="listingContainer">
            <HomeHeader homePage={false}/>
            <ListingBody/>
        </div>
    )
}

export default Listing
