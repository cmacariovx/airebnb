import React from "react";

import './CreateListing.css'

import airbnbMiniLogo from '../../Images/airbnb-512.png'
import airbnbMiniPic1 from '../../Images/airbnbListingPic1.png'
import airbnbMiniPic2 from '../../Images/airbnbListingPic2.png'
import airbnbMiniPic3 from '../../Images/airbnbListingPic3.png'

function CreateListing() {
    const listingBodyId = window.location.pathname.slice(15)
    console.log(listingBodyId)
    return (
        <div className="createListingContainer">
            <div className="createListingHeader">
                <div className="createListingHeaderLeft">
                    <img src={airbnbMiniLogo} className="createListingHeaderLogo"/>
                </div>
                <div className="createListingHeaderRight">
                    <button className="createListingHeaderRightButton">Exit</button>
                </div>
            </div>

            {listingBodyId == 0 && <div className="createListingBody0">
                <div className="createListingSubBody0">
                    <div className="createListingBodyWelcomeContainer">
                        <p className="createListingBodyWelcomeText">Welcome back, Carlos</p>
                    </div>
                    <div className="createListingBodyStartNewContainer">
                        <p className="createListingBodyStartNewTitle">Start a new listing</p>
                        <div className="createListingBodyStartNewOptionContainer">
                            <div className="createListingBodyStartNewOptionLeft">
                                <i className="fa-solid fa-house createListingBodyStartNewOptionLeftIcon"></i>
                                <p className="createListingBodyStartNewOptionMiddleText">Create a new listing</p>
                            </div>
                            <i className="fa-solid fa-chevron-right createListingBodyStartNewOptionRight"></i>
                        </div>
                    </div>
                </div>
            </div>}
            {listingBodyId == 1 && <div className="createListingBody1">
                <div className="createListingSubBody1">
                    <div className="createListingSubBody1Left">
                        <p className="createListingSubBody1LeftText">It's easy to get started on Airebnb</p>
                    </div>
                    <div className="createListingSubBody1Right">
                        <div className="createListingSubBody1RightListContainer">
                            <div className="createListingSubBody1RightListLeft">
                                <p className="createListingSubBody1RightListLeftNum">1</p>
                            </div>
                            <div className="createListingSubBody1RightListMiddle">
                                <p className="createListingSubBody1RightListMiddleUpperHeader">Tell us about your place</p>
                                <p className="createListingSubBody1RightListMiddleLowerText">Share some basic info, like where it is and how many guests can stay.</p>
                            </div>
                            <div className="createListingSubBody1RightListRight">
                                <img src={airbnbMiniPic1} className="createListingSubBody1RightPicture"/>
                            </div>
                        </div>

                        <div className="createListingSubBody1RightListContainer">
                            <div className="createListingSubBody1RightListLeft">
                                <p className="createListingSubBody1RightListLeftNum">2</p>
                            </div>
                            <div className="createListingSubBody1RightListMiddle">
                                <p className="createListingSubBody1RightListMiddleUpperHeader">Make it stand out</p>
                                <p className="createListingSubBody1RightListMiddleLowerText">Add 5 or more photos plus a title and description—we’ll help you out.</p>
                            </div>
                            <div className="createListingSubBody1RightListRight">
                                <img src={airbnbMiniPic2} className="createListingSubBody1RightPicture"/>
                            </div>
                        </div>

                        <div className="createListingSubBody1RightListContainer">
                            <div className="createListingSubBody1RightListLeft">
                                <p className="createListingSubBody1RightListLeftNum">3</p>
                            </div>
                            <div className="createListingSubBody1RightListMiddle">
                                <p className="createListingSubBody1RightListMiddleUpperHeader">Finish up and publish</p>
                                <p className="createListingSubBody1RightListMiddleLowerText">Choose if you'd like to start with an experienced guest, set a starting price, and publish your listing.</p>
                            </div>
                            <div className="createListingSubBody1RightListRight">
                                <img src={airbnbMiniPic3} className="createListingSubBody1RightPicture"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="createListingBody1Footer">
                    <button className="createListingBody1FooterButton">Get started</button>
                </div>
            </div>}
        </div>
    )
}

export default CreateListing
