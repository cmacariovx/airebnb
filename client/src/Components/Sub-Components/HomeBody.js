import React, { useState, useEffect } from "react";

import './HomeBody.css'

import ListingCard from "./ListingCard";

function HomeBody() {
    const [listings, setListings] = useState([])
    const [fetchingListings, setFetchingListings] = useState(false)
    const [page, setPage] = useState(0)

    async function fetchListings() {
        setFetchingListings(true)

        const response = await fetch("http://localhost:5000/" + "listing/fetch", {
            method: "POST",
            body: JSON.stringify({
                page: page
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })

        const data = await response.json()

        if (!data.error) setListings(prev => [...prev, ...data.listings])
        setFetchingListings(false)
        setPage(prev => prev + 1)
        return data
    }

    useEffect(() => {
        fetchListings()
    }, [])

    const chunkedLists = []

    for (let i = 0; i < listings.length; i += 20) {
        chunkedLists.push(listings.slice(i, i + 20))
    }

    return (
        <React.Fragment>
            {chunkedLists.map((listGroup, index) => (
                <div key={index} className="homeBodyContainer">
                    {listGroup.map((listing) => (
                        <ListingCard key={listing._id} listing={listing} />
                    ))}
                </div>
            ))}
        </React.Fragment>
    )
}

export default HomeBody
