import React from "react";

import './HomeHeader.css'

import airbnbLogo from '../../Images/airbnbLogo.png'

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

                </div>
            </div>
            <div className="homeHeader2Container">

            </div>
        </div>
    )
}

export default HomeHeader
