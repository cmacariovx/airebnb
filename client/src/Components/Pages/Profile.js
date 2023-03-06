import React from "react";

import './Profile.css'

import HomeHeader from "../Sub-Components/HomeHeader";
import ProfileBody from "../Sub-Components/ProfileBody";

function Profile() {
    return (
        <div className="profileContainer">
            <HomeHeader homePage={false} profilePage={true}/>
            <ProfileBody/>
        </div>
    )
}

export default Profile
