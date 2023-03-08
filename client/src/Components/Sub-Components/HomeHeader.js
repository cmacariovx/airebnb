import React from "react";
import { useNavigate } from "react-router";

import './HomeHeader.css'

import airbnbLogo from '../../Images/airbnbLogo.png'
import personalPic from '../../Images/personalPic.jpg'

function HomeHeader(props) {
    const homePage = props.homePage
    const profilePage = props.profilePage ? props.profilePage : null

    const navigate = useNavigate()

    function toHomeHandler() {
        if (homePage) {
            navigate("/")
            window.location.reload()
        }
        else {
            navigate("/")
        }
    }

    return (
        <div className={homePage ? "homeHeaderContainer" : "homeHeaderContainerListing"}>
            <div className={homePage ? "homeHeader1Container" : "homeHeader1Container2"}>
                <div className="homeHeader1LogoContainer">
                    <img src={airbnbLogo} className="homeHeader1Logo" onClick={toHomeHandler}/>
                </div>
                <div className="homeHeader1SearchContainer">
                    {(homePage && !profilePage) && <div className="homeHeader1Search">
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
                    </div>}
                    {(!homePage && !profilePage) && <div className="homeHeader2Search">
                        <div className="homeHeader1StartSearchContainer">
                            <p className="homeHeader1StartSearchText">Start your search</p>
                        </div>
                        <div className="homeHeader1SearchButtonContainer">
                            <i className="fa-solid fa-magnifying-glass homeHeader1SearchButton"></i>
                        </div>
                    </div>}
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
            {homePage && <div className="homeHeader2Container">
                <div className="homeHeader2CategoriesContainer">
                    <div className="homeHeader2CategoryContainer">
                        <i className="fa-solid fa-umbrella-beach homeHeader2CategoryIcon"></i>
                        <p className="homeHeader2CategoryText">Beachfront</p>
                    </div>
                    <div className="homeHeader2CategoryContainer">
                        <i className="fa-solid fa-mountain homeHeader2CategoryIcon"></i>
                        <p className="homeHeader2CategoryText">Amazing Views</p>
                    </div>
                    <div className="homeHeader2CategoryContainer1">
                        <i className="fa-solid fa-tree homeHeader2CategoryIcon"></i>
                        <p className="homeHeader2CategoryText">Treehouses</p>
                    </div>
                    <div className="homeHeader2CategoryContainer2">
                        <i className="fa-solid fa-fire homeHeader2CategoryIcon"></i>
                        <p className="homeHeader2CategoryText">Trending</p>
                    </div>
                </div>
            </div>}
        </div>
    )
}

export default HomeHeader
