import React, { useState, useEffect, useCallback } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'

import './App.css'

import { AuthContext } from './Context/Auth-Context'

import Home from './Components/Pages/Home'
import Listing from './Components/Pages/Listing'
import Profile from './Components/Pages/Profile'
import CreateListing from './Components/Pages/CreateListing'
import HostingDashboard from './Components/Pages/HostingDashboard'
import Checkout from './Components/Pages/Checkout'
import Saved from './Components/Pages/Saved'

import AppPrivateRoutes from './AppRoutes/AppPrivateRoutes'
import AppPublicRoutes from'./AppRoutes/AppPublicRoutes'

function App() {
  const [userId, setUserId] = useState(null)
  const [firstNameAuth, setFirstNameAuth] = useState(null)
  const [lastNameAuth, setLastNameAuth] = useState(null)
  const [token, setToken] = useState(null)
  const [profilePicture, setProfilePicture] = useState(null)
  const [email, setEmail] = useState(null)
  const [joinedDate, setJoinedDate] = useState(null)
  const [loadingLogin, setLoadingLogin] = useState(true)

  const login = useCallback((uid, token, firstName, lastName, profilePicture, email, joinedDate) => {
    setUserId(uid)
    setFirstNameAuth(firstName)
    setLastNameAuth(lastName)
    setToken(token)
    setProfilePicture(profilePicture)
    setEmail(email)
    setJoinedDate(joinedDate)

    localStorage.setItem(
      "userDataAirebnb",
      JSON.stringify({
        userId: uid,
        token: token,
        firstName: firstName,
        lastName: lastName,
        profilePicture: profilePicture,
        email: email,
        joinedDate: joinedDate,
      })
    )
  }, [])

  const logout = useCallback(() => {
    setUserId(null)
    setFirstNameAuth(null)
    setLastNameAuth(null)
    setToken(null)
    setProfilePicture(null)
    setEmail(null)
    setJoinedDate(null)
    localStorage.removeItem("userDataAirebnb")
  }, [])

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userDataAirebnb'))
    if (storedData && storedData.token) {
      login(
        storedData.userId,
        storedData.token,
        storedData.firstName,
        storedData.lastName,
        storedData.profilePicture,
        storedData.email,
        storedData.joinedDate
      )
    }
    setLoadingLogin(false)
  }, [login])

  return (
    <div className='app'>
      <AuthContext.Provider
        value={{
          isLoggedIn: !!token,
          userId: userId,
          firstName: firstNameAuth,
          lastName: lastNameAuth,
          token: token,
          profilePicture: profilePicture,
          email: email,
          joinedDate: joinedDate,
          login: login,
          logout: logout
        }}
      >
        <Routes>
          {!token && <Route element={<AppPublicRoutes isLoadingLogin={loadingLogin}/>}>
            <Route path='/' exact element={<Home />} />
            <Route path='/listing/:listingId' element={<Listing />} />
            <Route path='/profile/:userId' element={<Profile />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>}

          {token && <Route element={<AppPrivateRoutes isLoadingLogin={loadingLogin}/>}>
            <Route path='/' exact element={<Home/>} />
            <Route path='/listing/:listingId' element={<Listing />} />
            <Route path='/profile/:userId' element={<Profile />} />
            <Route path='/createListing/:createListingBodyId' element={<CreateListing />} />
            <Route path='/checkout' element={<Checkout />}/>
            <Route path='/hostingDashboard' exact element={<HostingDashboard />}/>
            <Route path='/saved' exact element={<Saved />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>}
        </Routes>
      </AuthContext.Provider>
    </div>
  )
}

export default App
