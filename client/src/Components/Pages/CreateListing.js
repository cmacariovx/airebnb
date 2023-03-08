import React from "react";

import './CreateListing.css'

import airbnbMiniLogo from '../../Images/airbnb-512.png'

function CreateListing() {
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

            
        </div>
    )
}

export default CreateListing
