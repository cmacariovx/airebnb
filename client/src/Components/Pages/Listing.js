import React, { useEffect, useState } from "react";

import './Listing.css'

import HomeHeader from "../Sub-Components/HomeHeader";
import ListingBody from "../Sub-Components/ListingBody";
import HomeFooter from "../Sub-Components/HomeFooter";

function Listing() {
    let [floatingHeader, setFloatingHeader] = useState()
    let [floatingHeaderRight, setFloatingHeaderRight] = useState()

    console.log(444444444444444)

    const h = document.documentElement
    const b = document.body
    const st = 'scrollTop'
    const sh = 'scrollHeight';

    useEffect(() => {
        if (document.readyState !== "loading") {
            setFloatingHeader(document.getElementById("floatingListingHeader"))
            setFloatingHeaderRight(document.getElementById("floatingListingHeaderRight"))
        }
    }, [])

    document.addEventListener("scroll", (e) => {
        let percent = (h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight) * 100;

        if (floatingHeader && percent <= 22) floatingHeader.style.display = "none"
        if (floatingHeader && percent > 22 && percent < 49) floatingHeader.style.display = "flex"

        if (floatingHeaderRight && percent < 60) floatingHeaderRight.style.display = "none"
        if (floatingHeaderRight && percent > 60) floatingHeaderRight.style.display = "flex"
    })
    return (
        <div className="listingContainer">
            <HomeHeader homePage={false}/>
            <div className="floatingListingHeader" id="floatingListingHeader">
                <div className="floatingListingHeaderLeft">
                    <div className="floatingListingNavContainer">
                        <a className="floatingListingNavText">Photos</a>
                    </div>
                    <div className="floatingListingNavContainer">
                        <a className="floatingListingNavText">Amenities</a>
                    </div>
                    <div className="floatingListingNavContainer">
                        <a className="floatingListingNavText">Reviews</a>
                    </div>
                    <div className="floatingListingNavContainer">
                        <a className="floatingListingNavText">Location</a>
                    </div>
                </div>
                <div className="floatingListingHeaderRight" id="floatingListingHeaderRight">
                    <div className="floatingListingHeaderRightLeft">
                        <div className="floatingListingHeaderRightLeftUpper">
                            <p className="floatingListingHeaderRightLeftUpperPriceText">$175</p>
                            <p className="floatingListingHeaderRightLeftUpperNightText">night</p>
                        </div>
                        <div className="floatingListingHeaderRightLeftLower">
                            <div className="floatingListReviewContainer">
                                <i className="fa-solid fa-star floatingListingStar"></i>
                                <p className="floatingListingReviewText">4.93</p>
                            </div>
                            <p className="floatingListingDotText">•</p>
                            <a className="floatingListingReviewCountText">653 reviews</a>
                        </div>
                    </div>
                    <div className="floatingListingHeaderRightRight">
                        <button className="floatingListingReserveButton">Reserve</button>
                    </div>
                </div>
            </div>
            <ListingBody/>
            <HomeFooter homepage={false}/>
        </div>
    )
}

export default Listing
