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

            </div>
        </div>
    )
}

export default ProfileBody
