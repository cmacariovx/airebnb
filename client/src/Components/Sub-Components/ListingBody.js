import React from "react";

import './ListingBody.css'

function ListingBody() {
    return (
        <div className="listingBodyContainer">
            <div className="listingBodyIntroContainer">
                <div className="listingBodyTitleContainer">
                    <p className="listingBodyTitleText">Modern Mansion</p>
                </div>
                <div className="listingBodyInfoContainer">
                    <div className="listingBodyReviewContainer">
                        <i className="fa-solid fa-star listingBodyStar"></i>
                        <p className="listingBodyReviewText">4.93</p>
                    </div>
                    <p className="listingBodyDotText">•</p>
                    <a className="listingBodyReviewCountText">653 reviews</a>
                    <p className="listingBodyDotText">•</p>
                    <a className="listingBodyLocationText">Asheville, North Carolina</a>
                </div>
            </div>
        </div>
    )
}

export default ListingBody
