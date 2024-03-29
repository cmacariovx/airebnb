import React, { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router"
import { Ripples } from '@uiball/loaders'

import './ProfileBody.css'

import personalPic from '../../Images/personalPic.jpg'
import homePic from '../../Images/home1.jpg'
import ProfileListingCard from "./ProfileListingCard"
import ErrorModal from "./ErrorModal"
import { AuthContext } from "../../Context/Auth-Context"
import Footer2 from "./Footer2"

function ProfileBody() {
    const [userId, setUserId] = useState(window.location.pathname.slice(9))
    const [user, setUser] = useState(null)
    const [fetchingUser, setFetchingUser] = useState(false)
    const [error, setError] = useState(null)
    const [userListings, setUserListings] = useState(null)
    const [activeIndex, setActiveIndex] = useState(0)
    const [reviewsCount, setReviewsCount] = useState(0)
    const [reviews, setReviews] = useState([])

    const [activeListingCards, setActiveListingCards] = useState(null)

    const navigate = useNavigate()

    const handlePrevClick = () => {
        setActiveIndex((prevIndex) => (prevIndex - 1 + userListings.length) % userListings.length)
    }

    const handleNextClick = () => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % userListings.length)
    }

    const auth = useContext(AuthContext)

    useEffect(() => {
        async function fetchUser() {
            setFetchingUser(true)

            const response = await fetch(process.env.REACT_APP_BACKEND_URL + "listing/fetchUser", {
                method: "POST",
                body: JSON.stringify({
                    userId: userId
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })

            const data = await response.json()

            if (!data.error) {
                setUser(data.user)
                setUserListings(data.user.listings)
            }
            else {
                setError(data.error)
            }

            setFetchingUser(false)
            return data
        }

        if (userId) {
            fetchUser()
        }
    }, [userId])

    const formatDate2 = (timestamp) => {
        if (!timestamp) return "--"
        const date = new Date(timestamp)
        const month = date.toLocaleString("en-US", { month: "long" })
        const year = date.getFullYear()
        return `${month} ${year}`
    }

    function addReviewsCount() {
        let sum = 0
        userListings.forEach((listing) => sum += listing.reviewsData.reviewsCount)
        return sum
    }

    function showAllReviews() {
        let arr = []
        userListings.forEach((listing) => arr.push(...listing.reviewsData.reviews))
        setReviews(arr)
    }

    useEffect(() => {
        if (!fetchingUser && user && userListings.length > 0) setReviewsCount(addReviewsCount())
        if (!fetchingUser && user && userListings.length > 0) showAllReviews()
    }, [user])

    useEffect(() => {
        if ((!fetchingUser && user && userListings) && userListings.length > 0) {
            const cards = (
                <React.Fragment>
                    <ProfileListingCard listing={userListings[activeIndex]} />
                    {userListings.length > 1 && (
                        <ProfileListingCard listing={userListings[(activeIndex + 1) % userListings.length]} />
                    )}
                </React.Fragment>
            );
            setActiveListingCards(cards)
        }
    }, [fetchingUser, user, userListings, activeIndex])

    const [windowWidth, setWindowWidth] = useState(window.innerWidth)

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth)
        }

        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return (
        <div className="profileBodyContainer">
            <Footer2 />
            <div className="profileBodyHeaderContainer">
                <div className="profileBodyHeaderIconContainer" onClick={() => navigate("..")}>
                    <i className="fa-solid fa-chevron-left profileBodyHeaderIcon"></i>
                </div>
            </div>

            <div className="profileBodyLeftContainer">
                <div className="profileBodyLeftUserInfoContainer">
                    <div className="profileBodyLeftUserInfoUpperContainer">
                        <img src={(!fetchingUser && user) ? "https://airebnb.s3.us-east-2.amazonaws.com/" + user.profilePicture : null} className="profileBodyLeftUserInfoUpperPic"/>
                    </div>
                    <div className="profileBodyLeftUserInfoLowerContainer">
                        <i className="fa-regular fa-star profileBodyLeftUserInfoLowerStar"></i>
                        <p className="profileBodyLeftUserInfoLowerReviewText">{(!fetchingUser && user) && (user.reviewsReceived.reviewsReceivedCount + " Reviews")}</p>
                    </div>
                </div>
            </div>
            <div className="profileBodyRightContainer">

                <div className="profileBodyRightIntroContainer">
                    <div className="profileBodyRightIntroNameDateContainer">
                        <p className="profileBodyRightIntroNameText">{(!fetchingUser && user) && ("Hi, I'm " + user.firstName)}</p>
                        <p className="profileBodyRightIntroDateText">{(!fetchingUser && user) && ("Joined in " + formatDate2(user.joinedDate))}</p>
                    </div>
                    <div className="profileBodyRightIntroAboutContainer">
                        <p className="profileBodyRightIntroAboutText">About</p>
                        <p className="profileBodyRightIntroAboutDesc">{(!fetchingUser && user) && (user.aboutDescription)}</p>
                    </div>
                </div>

                <div className="profileBodyRightIntroContainer2">
                    <div className="profileBodyRightIntroNameDateContainer2">
                        <div className="profileBodyRightIntroNameDateContainerLeft">
                            <p className="profileBodyRightIntroNameText">{(!fetchingUser && user) && ("Hi, I'm " + user.firstName)}</p>
                            <p className="profileBodyRightIntroDateText">{(!fetchingUser && user) && ("Joined in " + formatDate2(user.joinedDate))}</p>
                        </div>
                        <div className="profileBodyRightIntroNameDateContainerRight">
                            <img src={(!fetchingUser && user) ? "https://airebnb.s3.us-east-2.amazonaws.com/" + user.profilePicture : null} className="profileBodyRightIntroNameDateContainerRightImage"/>
                        </div>
                    </div>
                    <div className="profileBodyRightIntroAboutContainer">
                        <p className="profileBodyRightIntroAboutText">About</p>
                        <p className="profileBodyRightIntroAboutDesc">{(!fetchingUser && user) && (user.aboutDescription)}</p>
                    </div>
                </div>

                <div className="profileBodyListingsContainer">
                    <p className="profileBodyListingsHeaderText">{(!fetchingUser && user) && user.firstName + "'s listings"}</p>
                    <div className={(windowWidth <= 500 || (!fetchingUser && user) && userListings.length === 1) ? "profileBodyListingsBodyContainer2" : "profileBodyListingsBodyContainer"}>
                        {(!fetchingUser && user) && userListings.length > 0 && (
                            <React.Fragment>
                                <ProfileListingCard key={`listing-${activeIndex}`} listing={userListings[activeIndex]} single={(windowWidth <= 500 || userListings.length === 1) ? true : false}/>
                                {userListings.length > 1 && windowWidth >= 500 && (
                                    <ProfileListingCard key={`listing-${(activeIndex + 1) % userListings.length}`} listing={userListings[(activeIndex + 1) % userListings.length]} />
                                )}
                            </React.Fragment>
                        )}
                        {(!fetchingUser && user && userListings.length === 0) && <p className="noListingsText">No listings to show.</p>}
                        <div className="profileBodyListingsBodyOverlayArrowContainer1" onClick={(e) => {handlePrevClick(); e.stopPropagation()}}>
                            <i className="fa-solid fa-chevron-left profileBodyListingsBodyOverlayArrow"></i>
                        </div>
                        <div className="profileBodyListingsBodyOverlayArrowContainer2" onClick={(e) => {handleNextClick(); e.stopPropagation()}}>
                            <i className="fa-solid fa-chevron-right profileBodyListingsBodyOverlayArrow"></i>
                        </div>
                    </div>
                </div>
                <div className="profileBodyReviewsContainer">
                    <div className="profileBodyReviewsHeaderContainer">
                        <i className="fa-solid fa-star profileBodyReviewsHeaderStar"></i>
                        <p className="profileBodyReviewsHeaderText">{(!fetchingUser && user) && reviewsCount + " Reviews"}</p>
                    </div>
                    <div className="profileBodyReviewsBodyContainer">
                        {(!fetchingUser && user && userListings.length > 0 && reviews.length > 0) &&
                            reviews.map((review, index) => (
                            <div key={index} className="profileBodyReviewContainer">
                                <div className="profileBodyReviewTitleContainer">
                                    <div className="profileBodyReviewTitleContainerLeft">
                                        <p className="profileBodyReviewTitleText">{review.listingId.placeGeneralData.placeTitle}</p>
                                        <p className="profileBodyReviewDatePostedText">{formatDate2(review.postedDate)}</p>
                                    </div>
                                    <div className="profileBodyReviewTitleContainerRight">
                                        <img src={"https://airebnb.s3.us-east-2.amazonaws.com/" + review.listingId.imageIds[0]} className="profileBodyReviewTitleContainerRightPic" />
                                    </div>
                                </div>
                                <p className="profileBodyReviewText">{review.description}</p>
                                <div className="profileBodyReviewProfileContainer">
                                    <div className="profileBodyReviewProfileContainerLeft">
                                        <img src={"https://airebnb.s3.us-east-2.amazonaws.com/" + review.creatorProfilePicture} className="profileBodyReviewProfilePic" />
                                    </div>
                                    <div className="profileBodyReviewProfileContainerRight">
                                        <p className="profileBodyReviewProfileContainerRightName">{review.creatorFirstName}</p>
                                        <p className="profileBodyReviewProfileContainerRightJoinedDate">{formatDate2(review.creatorJoinedDate)}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {(!fetchingUser && user && reviews.length === 0) && "No reviews received."}
                    </div>
                </div>
            </div>
            {error && <ErrorModal errors={[error]} closeModal={() => setError(false)}/>}
        </div>
    )
}

export default ProfileBody
