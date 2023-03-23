import React from "react";
import { useNavigate } from "react-router";

import amexLogo from '../../Images/amexLogo.svg'
import visaLogo from '../../Images/visaLogo.svg'
import mastercardLogo from '../../Images/mastercardLogo.svg'
import discoverLogo from '../../Images/discoverLogo.svg'

import airbnbLogo from '../../Images/airbnbLogo.png'
import aircover from '../../Images/aircover.png'
import home from '../../Images/home1.jpg'

import './Checkout.css'

function Checkout() {
    const navigate = useNavigate()

    function toLinkedInProfile(event) {
        event.preventDefault()
        window.open("https://www.linkedin.com/in/carlos-macariooo/")
    }

    return (
        <div className="checkoutContainer">
            <div className="checkoutHeader">
                <img src={airbnbLogo} className="checkoutHeaderImage" onClick={() => navigate("/")}/>
            </div>

            <div className="checkoutContainerLeft">
                <div className="checkoutTitleContainer">
                    <div className="checkoutTitleIconContainer">
                        <i className="fa-solid fa-chevron-left checkoutTitleIcon"></i>
                    </div>
                    <p className="checkoutTitle">Confirm and pay</p>
                </div>
                <div className="checkoutYourTripContainer">
                    <p className="checkoutYourTripText">Your trip</p>
                    <div className="checkoutYourTripStatContainer">
                        <p className="checkoutYourTripStat1">Dates</p>
                        <p className="checkoutYourTripStat2">Apr 10 - 14</p>
                    </div>
                    <div className="checkoutYourTripStatContainer">
                        <p className="checkoutYourTripStat1">Guests</p>
                        <p className="checkoutYourTripStat2">4 guests, 5 infants, 0 pets</p>
                    </div>
                </div>
                <div className="checkoutChoosePaymentContainer">
                    <p className="checkoutChoosePaymentText">Choose how to pay</p>
                    <div className="checkoutPayInFullConainer">
                        <div className="checkoutPayInFullUpper">
                            <p className="checkoutPayInFullText1">Pay in full</p>
                            <div className="checkoutPayInFullUpperRight">
                                <p className="checkoutPayInFullUpperRightAmount">$1,318.85</p>
                                <div className="leftCircleContainer">
                                    <div className="leftCircleMid">
                                        <div className="leftCircleLast"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className="checkoutPayInFullText2">Pay the total now and you're all set.</p>
                    </div>
                </div>
                <div className="checkoutPaymentInfoContainer">
                    <div className="checkoutPayementInfoHeader">
                        <p className="checkoutPaymentInfoText">Pay with</p>
                        <div className="checkoutPaymentInfoImages">
                            <img className="checkoutPaymentInfoImage" src={visaLogo}></img>
                            <img className="checkoutPaymentInfoImage" src={amexLogo}></img>
                            <img className="checkoutPaymentInfoImage" src={mastercardLogo}></img>
                            <img className="checkoutPaymentInfoImage" src={discoverLogo}></img>
                        </div>
                    </div>
                    <div className="checkoutPaymentContainer1">
                        <i className="fa-regular fa-credit-card"></i>
                        <p className="checkoutPaymentContainerText">Credit or debit card</p>
                    </div>
                    <div className="checkoutPaymentContainer2">
                        <div className="checkoutPaymentContainer2Upper">
                            <p className="checkoutPaymentContainerSubText">Card number</p>
                            <p className="checkoutPaymentContainerText">0000 0000 0000 0000</p>
                        </div>
                        <div className="checkoutPaymentContainer2Lower">
                            <div className="checkoutPaymentContainer2LowerLeft">
                                <p className="checkoutPaymentContainerSubText">Expiration</p>
                                <p className="checkoutPaymentContainerText">00 / 00</p>
                            </div>
                            <div className="checkoutPaymentContainer2LowerRight">
                                <p className="checkoutPaymentContainerSubText">CVV</p>
                                <p className="checkoutPaymentContainerText">000</p>
                            </div>
                        </div>
                    </div>
                    <div className="checkoutPaymentContainer3">
                        <p className="checkoutPaymentContainerSubText">ZIP code</p>
                        <p className="checkoutPaymentContainerText">00000</p>
                    </div>
                    <div className="checkoutPaymentContainer4">
                        <p className="checkoutPaymentContainerSubText">Country/region</p>
                        <p className="checkoutPaymentContainerText">United States</p>
                    </div>
                </div>
                <div className="checkoutCancellationPolicyContainer">
                    <p className="checkoutCancellationPolicyText1">Cancellation Policy</p>
                    <p className="checkoutCancellationPolicyText2">Free cancellation for 48 hours.</p>
                </div>
                <div className="checkoutButtonContainer">
                    <button className="checkoutButton">Confirm and pay</button>
                </div>
            </div>
            <div className="checkoutContainerRight">
                <div className="checkoutContainerRightCard">
                    <div className="checkoutContainerRightCard1">
                        <div className="checkoutContainerRightCard1Left">
                            <img src={home} className="checkoutContainerRightCard1Pic"/>
                        </div>
                        <div className="checkoutContainerRightCard1Right">
                            <p className="checkoutContainerRightCard1RightText1">Entire home</p>
                            <p className="checkoutContainerRightCard1RightText2">Modern Mansion</p>
                            <div className="checkoutContainerRightCard1RightTextContainer">
                                <i className="fa-solid fa-star checkoutContainerRightCard1RightTextContainerIcon"></i>
                                <p className="checkoutContainerRightCard1RightText3">4.96</p>
                                <p className="checkoutContainerRightCard1RightText4">(170 reviews)</p>
                            </div>
                        </div>
                    </div>
                    <div className="checkoutContainerRightCard2">
                        <p className="checkoutContainerRightCard2Text">Your booking is protected by </p>
                        <img src={aircover} className="checkoutContainerRightCard2Pic"/>
                    </div>
                    <div className="checkoutContainerRightCard3">
                        <div className="checkoutContainerRightCard3Title">
                            <p className="checkoutContainerRightCard3TitleText">Price details</p>
                        </div>
                        <div className="checkoutContainerRightCard3Body">
                            <div className="checkoutContainerRightCard3BodyStatContainer">
                                <p className="checkoutContainerRightCard3BodyStatContainerLeftText">$225.00 x 4 nights</p>
                                <p className="checkoutContainerRightCard3BodyStatContainerRightText">$900.00</p>
                            </div>
                            <div className="checkoutContainerRightCard3BodyStatContainer">
                                <p className="checkoutContainerRightCard3BodyStatContainerLeftText">Cleaning fee</p>
                                <p className="checkoutContainerRightCard3BodyStatContainerRightText">$125.00</p>
                            </div>
                            <div className="checkoutContainerRightCard3BodyStatContainer">
                                <p className="checkoutContainerRightCard3BodyStatContainerLeftText">Airbnb service fee</p>
                                <p className="checkoutContainerRightCard3BodyStatContainerRightText">$144.71</p>
                            </div>
                            <div className="checkoutContainerRightCard3BodyStatContainer">
                                <p className="checkoutContainerRightCard3BodyStatContainerLeftText">Taxes</p>
                                <p className="checkoutContainerRightCard3BodyStatContainerRightText">$149.14</p>
                            </div>
                        </div>
                    </div>
                    <div className="checkoutContainerRightCard4">
                        <p className="checkoutContainerRightCard4TotalText">Total (USD)</p>
                        <p className="checkoutContainerRightCard4TotalAmount">$1,318.85</p>
                    </div>
                </div>
            </div>

            <div className="homeFooterContainer bottom">
                <p className="homeFooterText">© 2023 Airebnb, Inc.</p>
                <i className="fa-brands fa-linkedin" onClick={toLinkedInProfile}></i>
            </div>
        </div>
    )
}

export default Checkout
