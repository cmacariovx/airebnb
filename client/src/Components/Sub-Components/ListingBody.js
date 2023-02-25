import React from "react";

import './ListingBody.css'

import homePic from '../../Images/home1.jpg'
import personalPic from '../../Images/personalPic.jpg'
import aircoverLogo from '../../Images/aircover.png'

function ListingBody() {
    return (
        <div className="listingBodyContainer">
            <div className="listingBodyIntroContainer">
                <div className="listingBodyTitleContainer">
                    <p className="listingBodyTitleText">Modern Mansion</p>
                </div>
                <div className="listingBodyInfoContainer">
                    <div className="listingBodyInfoContainerLeft">
                        <div className="listingBodyReviewContainer">
                            <i className="fa-solid fa-star listingBodyStar"></i>
                            <p className="listingBodyReviewText">4.93</p>
                        </div>
                        <p className="listingBodyDotText">•</p>
                        <a className="listingBodyReviewCountText">653 reviews</a>
                        <p className="listingBodyDotText">•</p>
                        <a className="listingBodyLocationText">Asheville, North Carolina</a>
                    </div>
                    <div className="listingBodyInfoContainerRight">
                        <div className="listingBodySaveContainer">
                            <i className="fa-regular fa-heart listingBodySaveHeart"></i>
                            <p className="listingBodySaveText">Save</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="listingBodyImagesContainer">
                <div className="listingBodyMainImageContainer">
                    <div className="listingBodyMainImage"/>
                </div>
                <div className="listingBodySubImageContainer" id="listingBodySubImage1">
                    <div className="listingBodySubImage"/>
                </div>
                <div className="listingBodySubImageContainer" id="listingBodySubImage2">
                    <div className="listingBodySubImage"/>
                </div>
                <div className="listingBodySubImageContainer" id="listingBodySubImage3">
                    <div className="listingBodySubImage"/>
                </div>
                <div className="listingBodySubImageContainer" id="listingBodySubImage4">
                    <div className="listingBodySubImage"/>
                </div>
            </div>
            <div className="listingBodyMainContainer">
                <div className="listingBodyMainLeftContainer">
                    <div className="listingBodyMainLeftHostedContainer">
                        <div className="listingBodyMainLeftHostedLeftContainer">
                            <div className="listingBodyMainLeftHostedLeftTitleContainer">
                                <p className="listingBodyMainLeftHostedLeftTitleText">House hosted by Carlos</p>
                            </div>
                            <div className="listingBodyMainLeftHostedLeftInfoContainer">
                                <p className="listingBodyMainLeftHostedLeftInfoText">8 guests</p>
                                <p className="listingBodyMainLeftHostedLeftDotText">•</p>
                                <p className="listingBodyMainLeftHostedLeftInfoText">4 bedrooms</p>
                                <p className="listingBodyMainLeftHostedLeftDotText">•</p>
                                <p className="listingBodyMainLeftHostedLeftInfoText">4 beds</p>
                                <p className="listingBodyMainLeftHostedLeftDotText">•</p>
                                <p className="listingBodyMainLeftHostedLeftInfoText">4 bath</p>
                            </div>
                        </div>
                        <div className="listingBodyMainRightHostedRightContainer">
                            <img src={personalPic} className="listingBodyMainRightHostedRightImage"/>
                        </div>
                    </div>
                    <div className="listingBodyMainLeftCheckContainer">
                        <div className="listingBodyMainLeftCheckSubContainer">
                            <div className="listingBodyMainLeftCheckSubLeftContainer">
                                <i className="fa-solid fa-door-closed listingBodyMainLeftCheckSubLeftDoor"></i>
                            </div>
                            <div className="listingBodyMainLeftCheckSubRightContainer">
                                <p className="listingBodyMainLeftCheckSubRightText">Self check-in</p>
                            </div>
                        </div>
                        <div className="listingBodyMainLeftCheckSubContainer">
                            <div className="listingBodyMainLeftCheckSubLeftContainer">
                                <i className="fa-solid fa-calendar listingBodyMainLeftCheckSubLeftCalendar"></i>
                            </div>
                            <div className="listingBodyMainLeftCheckSubRightContainer">
                                <p className="listingBodyMainLeftCheckSubRightText">Free cancellation before Feb 28</p>
                            </div>
                        </div>
                    </div>
                    <div className="listingBodyMainLeftAircoverContainer">
                        <div className="listingBodyMainLeftAircoverLogoContainer">
                            <img src={aircoverLogo} className="aircoverLogo"/>
                        </div>
                        <div className="listingBodyMainLeftAircoverDescriptionContainer">
                            <p className="listingBodyMainLeftAircoverDescriptionText">Every booking includes free protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in.
                            </p>
                        </div>
                    </div>
                    <div className="listingBodyMainLeftDescriptionContainer">

                    </div>
                    <div className="listingBodyMainLeftAmenitiesContainer">

                    </div>
                    <div className="listingBodyMainLeftCalendarContainer">

                    </div>
                </div>
                <div className="listingBodyMainRightContainer">

                </div>
            </div>
        </div>
    )
}

export default ListingBody
