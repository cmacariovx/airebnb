import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useSearchParams } from 'react-router-dom'
import { Ripples } from '@uiball/loaders'

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

    const navigate = useNavigate()

    const [searchParams, setSearchParams] = useSearchParams()

    const [city, setCity] = useState(searchParams.get("city") || "")
    const [state, setState] = useState(searchParams.get("state") || "")
    const [adults, setAdults] = useState(searchParams.get("adults") || "")
    const [children, setChildren] = useState(searchParams.get("children") || "")
    const [infants, setInfants] = useState(searchParams.get("infants") || "")
    const [pets, setPets] = useState(searchParams.get("pets") || "")
    const [selectedStartDate, setSelectedStartDate] = useState(searchParams.get("startDate") ? new Date(searchParams.get("startDate")) : null)
    const [selectedEndDate, setSelectedEndDate] = useState(searchParams.get("endDate") ? new Date(searchParams.get("endDate")) : null)

    const formatDateToISO = (date) => {
        if (!date) return null
        const year = date.getFullYear()
        const month = monthNameToNumber(date.toLocaleString("en-US", { month: "short" })).toString().padStart(2, "0")
        const day = date.getDate().toString().padStart(2, "0")
        return `${year}-${month}-${day}`
    }

    const monthNameToNumber = (monthName) => {
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        return monthNames.indexOf(monthName) + 1
    }

    useEffect(() => {
        setCity(searchParams.get("city") || "")
        setState(searchParams.get("state") || "")
        setAdults(searchParams.get("adults") || "")
        setChildren(searchParams.get("children") || "")
        setInfants(searchParams.get("infants") || "")
        setPets(searchParams.get("pets") || "")
        setSelectedStartDate(searchParams.get("startDate") ? new Date(searchParams.get("startDate")) : null)
        setSelectedEndDate(searchParams.get("endDate") ? new Date(searchParams.get("endDate")) : null)
    }, [searchParams])

    useEffect(() => {
        async function searchListings() {
            setFetchingListings(true)

            const response = await fetch("http://localhost:5000/" + "listing/searchListings", {
                method: "POST",
                body: JSON.stringify({
                    city: searchParams.get("city").trim(),
                    guests: +searchParams.get("adults") + +searchParams.get("children"),
                    pets: +searchParams.get("pets"),
                    startDate: formatDateToISO(searchParams.get("startDate")),
                    endDate: formatDateToISO(searchParams.get("startDate"))
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })

            const data = await response.json()
            console.log(data)

            if (!data.error) {
                setListings(data.listings)
            }

            setFetchingListings(false)
            return data
        }

        if (searchParams.get("city"), searchParams.get("adults"), searchParams.get("startDate"), searchParams.get("endDate")) {
            // searchListings()
        }
    }, [searchParams])

    return (
        <React.Fragment>
            {chunkedLists.map((listGroup, index) => (
                <div key={index} className="homeBodyContainer">
                    {listGroup.map((listing) => (
                        <ListingCard key={listing._id} listing={listing} />
                    ))}
                </div>
            ))}
            {chunkedLists.length === 0 && <div className="homeBodySpinnerContainer">
                <Ripples size={100} color="#c9c9c9" />
            </div>}
        </React.Fragment>
    )
}

export default HomeBody
