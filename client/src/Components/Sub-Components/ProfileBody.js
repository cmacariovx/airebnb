import React, { useState } from "react";

import './ProfileBody.css'

import personalPic from '../../Images/personalPic.jpg'
import homePic from '../../Images/home1.jpg'
import ProfileListingCard from "./ProfileListingCard";

function ProfileBody() {
    const [activeIndex, setActiveIndex] = useState(0);
    const listings = [<ProfileListingCard />, <ProfileListingCard />, <ProfileListingCard />, <ProfileListingCard />]

    const handlePrevClick = () => {
        setActiveIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : listings.length - 1))
    }

    const handleNextClick = () => {
        setActiveIndex((prevIndex) => (prevIndex < listings.length - 1 ? prevIndex + 1 : 0))
    }

    return (
        <div className="profileBodyContainer">
            <div className="profileBodyLeftContainer">
                <div className="profileBodyLeftUserInfoContainer">
                    <div className="profileBodyLeftUserInfoUpperContainer">
                        <img src={personalPic} className="profileBodyLeftUserInfoUpperPic"/>
                    </div>
                    <div className="profileBodyLeftUserInfoLowerContainer">
                        <i className="fa-regular fa-star profileBodyLeftUserInfoLowerStar"></i>
                        <p className="profileBodyLeftUserInfoLowerReviewText">217 reviews</p>
                    </div>
                </div>
            </div>
            <div className="profileBodyRightContainer">
                <div className="profileBodyRightIntroContainer">
                    <div className="profileBodyRightIntroNameDateContainer">
                        <p className="profileBodyRightIntroNameText">Hi, I'm Carlos</p>
                        <p className="profileBodyRightIntroDateText">Joined in 2023</p>
                    </div>
                    <div className="profileBodyRightIntroAboutContainer">
                        <p className="profileBodyRightIntroAboutText">About</p>
                        <p className="profileBodyRightIntroAboutDesc">Full Stack Software Engineer</p>
                        <div className="profileBodyRightIntroLivesContainer">
                            <i className="fa-solid fa-house profileBodyRightIntroLivesHouse"></i>
                            <p className="profileBodyRightIntroLivesText">Lives in Asheville, NC</p>
                        </div>
                    </div>
                </div>
                <div className="profileBodyListingsContainer">
                    <p className="profileBodyListingsHeaderText">Carlos' Listings</p>
                    <div className="profileBodyListingsBodyContainer">
                        {listings[activeIndex]}
                        {listings[(activeIndex + 1) % listings.length]}
                        <div className="profileBodyListingsBodyOverlayContainer">
                            <div className="profileBodyListingsBodyOverlayArrowContainer" onClick={handlePrevClick}>
                                <i className="fa-solid fa-chevron-left profileBodyListingsBodyOverlayArrow"></i>
                            </div>
                            <div className="profileBodyListingsBodyOverlayArrowContainer" onClick={handleNextClick}>
                                <i className="fa-solid fa-chevron-right profileBodyListingsBodyOverlayArrow"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="profileBodyReviewsContainer">
                    <div className="profileBodyReviewsHeaderContainer">
                        <i className="fa-solid fa-star profileBodyReviewsHeaderStar"></i>
                        <p className="profileBodyReviewsHeaderText">3,825 reviews</p>
                    </div>
                    <div className="profileBodyReviewsBodyContainer">
                        <div className="profileBodyReviewContainer">
                            <div className="profileBodyReviewTitleContainer">
                                <div className="profileBodyReviewTitleContainerLeft">
                                    <p className="profileBodyReviewTitleText">Modern Mansion</p>
                                    <p className="profileBodyReviewDatePostedText">March 2023</p>
                                </div>
                                <div className="profileBodyReviewTitleContainerRight">
                                    <img src={homePic} className="profileBodyReviewTitleContainerRightPic"/>
                                </div>
                            </div>
                            <p className="profileBodyReviewText">Great little get away, quick response from owner on questions, easy to locate, simple instructions!</p>
                            <div className="profileBodyReviewProfileContainer">
                                <div className="profileBodyReviewProfileContainerLeft">
                                    <img src={personalPic} className="profileBodyReviewProfilePic"/>
                                </div>
                                <div className="profileBodyReviewProfileContainerRight">
                                    <p className="profileBodyReviewProfileContainerRightName">Carlos</p>
                                    <p className="profileBodyReviewProfileContainerRightJoinedDate">Joined in 2023</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileBody
