import React, { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router";
import { useSearchParams } from 'react-router-dom'
import { Ripples } from '@uiball/loaders'
import ErrorModal from "./ErrorModal";

import './HomeBody.css'

import ListingCard from "./ListingCard";
import { AuthContext } from "../../Context/Auth-Context";
import ListingsContext from "../../Context/ListingsContext";
import Footer2 from "./Footer2";

function HomeBody() {
    const [fetchingListings, setFetchingListings] = useState(false)
    const [page, setPage] = useState(0)
    const [searchPage, setSearchPage] = useState(0)
    const [user, setUser] = useState(null)
    const [showLoadingSpinner, setShowLoadingSpinner] = useState(false)

    const { listings, setListings } = useContext(ListingsContext)
    const { hasMoreListings, setHasMoreListings } = useContext(ListingsContext)
    const { showMediaSearch, setShowMediaSearch } = useContext(ListingsContext)

    const chunkedLists = []

    if (!fetchingListings && listings.length > 0) {
        for (let i = 0; i < listings.length; i += 12) {
            chunkedLists.push(listings.slice(i, i + 12))
        }
    }

    const lastListingRef = useRef(null)

    const observerCallback = (entries) => {
        const [entry] = entries

        if (entry.isIntersecting && hasMoreListings && !fetchingListings) {
            if ((searchParams.get('city') || searchParams.get('state')) &&
            searchParams.get('adults') &&
            searchParams.get('startDate') &&
            searchParams.get('endDate')) {
                searchListings()
            }
            else {
                fetchListings()
            }
        }
    }

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: "0px",
            threshold: 1.0,
        }

        const observer = new IntersectionObserver(observerCallback, observerOptions)
        if (lastListingRef.current) {
            observer.observe(lastListingRef.current)
        }

        return () => {
            if (lastListingRef.current) {
                observer.unobserve(lastListingRef.current)
            }
        }
    }, [lastListingRef, fetchListings])

    const navigate = useNavigate()

    const auth = useContext(AuthContext)

    const [searchParams, setSearchParams] = useSearchParams()

    const [city, setCity] = useState(() => searchParams.get("city") || "")
    const [state, setState] = useState(() => searchParams.get("state") || "")
    const [adults, setAdults] = useState(() => searchParams.get("adults") || "")
    const [children, setChildren] = useState(() => searchParams.get("children") || "")
    const [infants, setInfants] = useState(() => searchParams.get("infants") || "")
    const [pets, setPets] = useState(() => searchParams.get("pets") || "")

    const [selectedStartDate, setSelectedStartDate] = useState(() =>
      searchParams.get("startDate") ? new Date(searchParams.get("startDate")) : null
    )
    const [selectedEndDate, setSelectedEndDate] = useState(() =>
      searchParams.get("endDate") ? new Date(searchParams.get("endDate")) : null
    )

    const [error, setError] = useState(null)

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

    async function fetchListings() {
        setShowLoadingSpinner(true)
        setFetchingListings(true)

        const response = await fetch(process.env.REACT_APP_BACKEND_URL + "listing/fetch", {
            method: "POST",
            body: JSON.stringify({
                page: page
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })

        const data = await response.json()

        if (!data.error) {
            setError(null);
            setListings((prev) => [...prev, ...data.listings])
            if (data.listings.length < 12) {
                setHasMoreListings(false)
            }
        }

        setShowLoadingSpinner(false)
        setFetchingListings(false)
        setPage(prev => prev + 1)
        return data
    }

    async function searchListings() {
        setFetchingListings(true)

        const response = await fetch(process.env.REACT_APP_BACKEND_URL + "listing/searchListings", {
            method: "POST",
            body: JSON.stringify({
                page: searchPage,
                city: searchParams.get("city") ? searchParams.get("city").trim() : null,
                state: searchParams.get("state") ? searchParams.get("state").trim() : null,
                guests: +searchParams.get("adults") + +searchParams.get("children"),
                pets: +searchParams.get("pets"),
                startDate: formatDateToISO(new Date(searchParams.get("startDate"))),
                endDate: formatDateToISO(new Date(searchParams.get("endDate"))),
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })

        const data = await response.json()

        if (!data.error) {
            setError(null)

            if (searchPage === 0) {
                setListings(data.listings)
            }
            else {
                setListings((prev) => [...prev, ...data.listings])
            }

            if (data.listings.length < 12) {
                setHasMoreListings(false)
            }
        }

        if (data.listings.length === 0) {
            setError("No listings matched your criteria. Try another booking date and/or major city such as Waimea, Malibu, etc. as we expand our listings database.")
        }

        setFetchingListings(false)
        setSearchPage((prev) => prev + 1)
        return data
    }

    useEffect(() => {
        if (
            (searchParams.get('city') || searchParams.get('state')) &&
            searchParams.get('adults') &&
            searchParams.get('startDate') &&
            searchParams.get('endDate')
        ) {
            searchListings()
        }
        else {
            fetchListings()
        }
    }, [searchParams])

    async function fetchUser() {
        const response = await fetch(process.env.REACT_APP_BACKEND_URL + "listing/fetchUser", {
            method: "POST",
            body: JSON.stringify({
                userId: auth.userId
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })

        const data = await response.json()

        if (!data.error) {
            setUser(data.user)
        }

        return data
    }

    useEffect(() => {
        if (auth.token && auth.isLoggedIn) fetchUser()
    }, [])

    return (
        <React.Fragment>
          {(listings.length > 0 && (auth.isLoggedIn ? user : true)) && (
            <div className="homeBodyContainer">
              {listings.map((listing, index) => {
                if (listings.length - 1 === index) {
                  return (
                    <ListingCard
                      key={listing._id}
                      ref={lastListingRef}
                      listing={listing}
                      isSaved={
                        auth.isLoggedIn &&
                        user &&
                        user.saved.includes(listing._id.toString())
                      }
                      authCheck={() =>
                        setError("You must be logged in to save listings.")
                      }
                    />
                  );
                } else {
                  return (
                    <ListingCard
                      key={listing._id}
                      listing={listing}
                      isSaved={
                        auth.isLoggedIn &&
                        user &&
                        user.saved.includes(listing._id.toString())
                      }
                      authCheck={() =>
                        setError("You must be logged in to save listings.")
                      }
                    />
                  );
                }
              })}
            </div>
          )}
          {fetchingListings && (
            <div className="homeBodySpinnerContainer">
              <Ripples size={100} color="#c9c9c9" />
            </div>
          )}
          {!showMediaSearch && <Footer2 />}
          {error && <ErrorModal errors={[error]} closeModal={() => setError(null)} />}
        </React.Fragment>
    )
}

export default HomeBody
