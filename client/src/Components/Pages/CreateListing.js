import React from "react";

import './CreateListing.css'

import airbnbMiniLogo from '../../Images/airbnb-512.png'
import airbnbMiniPic1 from '../../Images/airbnbListingPic1.png'
import airbnbMiniPic2 from '../../Images/airbnbListingPic2.png'
import airbnbMiniPic3 from '../../Images/airbnbListingPic3.png'
import airbnbListing2Pic from '../../Images/airbnbListing2.png'

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
            {listingBodyId == 2 && <div className="createListingBody2">
                <div className="createListingSubBody2">
                    <div className="createListingSubBody2Left">
                        <p className="createListingSubBody2LeftStepText">Step 1</p>
                        <p className="createListingSubBody2LeftTellUsText">Tell us about your place</p>
                        <p className="createListingSubBody2LeftDescText">In this step, we'll ask you which type of property you have and if guests will book the entire place or just a room. Then let us know the location and how many guests can stay.</p>
                    </div>
                    <div className="createListingSubBody2Right">
                        <img src={airbnbListing2Pic} className="createListingSubBody2RightImg"/>
                    </div>
                </div>
            </div>}
            {listingBodyId == 3 && <div className="createListingBody3">
                <div className="createListingSubBody3">
                    <p className="createListingSubBody3Title">Which of these best describes your place?</p>
                    <div className="createListingSubBody3List">
                        <div className="createListingSubBody3ListOption">
                            <i className="fa-solid fa-house createListingSubBody3ListOptionIcon"></i>
                            <p className="createListingSubBody3ListOptionText">House</p>
                        </div>
                        <div className="createListingSubBody3ListOption">
                            <i className="fa-solid fa-building createListingSubBody3ListOptionIcon"></i>
                            <p className="createListingSubBody3ListOptionText">Apartment</p>
                        </div>
                        <div className="createListingSubBody3ListOption">
                            <i class="fa-solid fa-hotel createListingSubBody3ListOptionIcon"></i>
                            <p className="createListingSubBody3ListOptionText">Hotel</p>
                        </div>
                    </div>
                </div>
            </div>}
            {listingBodyId == 4 && <div className="createListingBody4">
                <div className="createListingSubBody4">
                    <p className="createListingSubBody4Title">What type of place will guests have?</p>
                    <div className="createListingSubBody4List">
                        <div className="createListingSubBody4ListOption">
                            <div className="createListingSubBody4ListOptionLeft">
                                <p className="createListingSubBody4ListOptionLeftTitle">An entire place</p>
                                <p className="createListingSubBody4ListOptionLeftDesc">Guests have the whole place to themselves.</p>
                            </div>
                            <div className="createListingSubBody4ListOptionRight">
                                <i className="fa-solid fa-house createListingSubBody4ListOptionRightIcon"></i>
                            </div>
                        </div>
                        <div className="createListingSubBody4ListOption">
                            <div className="createListingSubBody4ListOptionLeft">
                                <p className="createListingSubBody4ListOptionLeftTitle">A private room</p>
                                <p className="createListingSubBody4ListOptionLeftDesc">Guests sleep in a private room but some areas may be shared with you or others.</p>
                            </div>
                            <div className="createListingSubBody4ListOptionRight">
                                <i className="fa-solid fa-door-closed createListingSubBody4ListOptionRightIcon"></i>
                            </div>
                        </div>
                        <div className="createListingSubBody4ListOption">
                            <div className="createListingSubBody4ListOptionLeft">
                                <p className="createListingSubBody4ListOptionLeftTitle">A shared room</p>
                                <p className="createListingSubBody4ListOptionLeftDesc">Guests sleep in a room or common area that may be shared with you or others.</p>
                            </div>
                            <div className="createListingSubBody4ListOptionRight">
                                <i className="fa-solid fa-people-arrows createListingSubBody4ListOptionRightIcon"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
            <div className="createListingBody5">
                <div className="createListingSubBody5">

                </div>
            </div>
            {listingBodyId >= 2 && <div className="createListingBody2Footer">
                    <div className="createListingBody2FooterUpper">
                        <div className="createListingBody2FooterUpperLine">
                            <div className="createListingBody2FooterUpperOverlay1" style={{transform: "translateX(20%)"}}/>
                        </div>
                        <div className="createListingBody2FooterUpperLine">
                            <div className="createListingBody2FooterUpperOverlay2"/>
                        </div>
                        <div className="createListingBody2FooterUpperLine">
                            <div className="createListingBody2FooterUpperOverlay3"/>
                        </div>
                    </div>
                    <div className="createListingBody2FooterLower">
                        <p className="createListingBody2FooterBackText">Back</p>
                        <button className="createListingBody2FooterButton">Next</button>
                    </div>
            </div>}
        </div>
    )
}

export default CreateListing
