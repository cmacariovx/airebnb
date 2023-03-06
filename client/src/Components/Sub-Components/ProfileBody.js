import React from "react";

import './ProfileBody.css'

import personalPic from '../../Images/personalPic.jpg'

function ProfileBody() {
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
                        <div className="profileBodyRightIntroLivesContainer">
                            <i className="fa-solid fa-house profileBodyRightIntroLivesHouse"></i>
                            <p className="profileBodyRightIntroLivesText">Lives in Asheville, NC</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileBody
