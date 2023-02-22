import React from "react";

import './HomeHeader.css'

import airbnbLogo from '../../Images/airbnbLogo.png'
import personalPic from '../../Images/personalPic.jpg'

function HomeHeader() {
    return (
        <div className="homeHeaderContainer">
            <div className="homeHeader1Container">
                <div className="homeHeader1LogoContainer">
                    <img src={airbnbLogo} className="homeHeader1Logo"/>
                </div>
                <div className="homeHeader1SearchContainer">
                    <div className="homeHeader1Search">
                        <div className="homeHeader1AnywhereContainer">
                            <p className="homeHeader1SearchText1">Anywhere</p>
                        </div>
                        <div className="homeHeader1AnyWeekContainer">
                            <p className="homeHeader1SearchText1">Any week</p>
                        </div>
                        <div className="homeHeader1AddGuestsContainer">
                            <p className="homeHeader1SearchText2">Add guests</p>
                        </div>
                        <div className="homeHeader1SearchButtonContainer">
                            <i className="fa-solid fa-magnifying-glass homeHeader1SearchButton"></i>
                        </div>
                    </div>
                </div>
                <div className="homeHeader1RightContainer">
                    <div className="homeHeader1AddHomeContainer">
                        <p className="homeHeader1AddHomeText">Airbnb your home</p>
                    </div>
                    <div className="homeHeader1UserContainer">
                        <i className="fa-solid fa-bars homeHeader1UserMenuBars"></i>
                        <img src={personalPic} className="homeHeader1UserPicture"></img>
                    </div>
                </div>
            </div>
            <div className="homeHeader2Container">

            </div>
            {/* if logged in, display this div with the real price switch */}
            <div className="homeHeader3Container">

            </div>
        </div>
    )
}

export default HomeHeader
