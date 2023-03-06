import React from "react";

import './ProfileListingCard.css'
import homePic from '../../Images/home1.jpg'

function ProfileListingCard() {
    return (
        <div className="profileListingCardContainer">
            <img src={homePic} className="profileListingCardPic"/>
            <div className="profileListingInfoContainer">
                <div className="profileListingReviewsContainer">
                    <i className="fa-solid fa-star profileListingReviewsStar"></i>
                    <p className="profileListingReviewsText">4.93</p>
                    <p className="profileListingReviewsNumText">(46)</p>
                </div>
                <p className="profileListingTitle">Entire home/apt | Modern Mansion by Carlos Macario</p>
            </div>
        </div>
    )
}

export default ProfileListingCard
