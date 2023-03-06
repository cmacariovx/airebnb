import React from "react";

import './Profile.css'

import HomeHeader from "../Sub-Components/HomeHeader";
import ProfileBody from "../Sub-Components/ProfileBody";
import HomeFooter from "../Sub-Components/HomeFooter";

function Profile() {
    return (
        <div className="profileContainer">
            <HomeHeader homePage={false} profilePage={true}/>
            <ProfileBody/>
            <HomeFooter homePage={false}/>
        </div>
    )
}

export default Profile
