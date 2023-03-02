import React from "react";

import './Listing.css'

import HomeHeader from "../Sub-Components/HomeHeader";
import ListingBody from "../Sub-Components/ListingBody";
import HomeFooter from "../Sub-Components/HomeFooter";

function Listing() {
    return (
        <div className="listingContainer">
            <HomeHeader homePage={false}/>
            <ListingBody/>
            <HomeFooter homepage={false}/>
        </div>
    )
}

export default Listing
