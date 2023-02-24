import React, { useState, useEffect, useCallback } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'

import './App.css'

import { AuthContext } from './Context/Auth-Context'

import Home from './Components/Pages/Home'
import AppPrivateRoutes from './AppRoutes/AppPrivateRoutes'
import AppPublicRoutes from'./AppRoutes/AppPublicRoutes'

function App() {
  const [userId, setUserId] = useState(null)
  const [usernameAuth, setUsernameAuth] = useState(null)
  const [token, setToken] = useState(null)
  const [profilePicture, setProfilePicture] = useState(null)
  const [loadingLogin, setLoadingLogin] = useState(true)

  const login = useCallback((uid, token, username, profilePicture) => {
    setUserId(uid)
    setUsernameAuth(username)
    setToken(token)
    setProfilePicture(profilePicture)

    localStorage.setItem('userDataAirebnb', JSON.stringify({userId: uid, username: username, token: token, profilePicture: profilePicture}))
  }, [])

  const logout = useCallback(() => {
    setUserId(null)
    setUsernameAuth(null)
    setToken(null)
    setProfilePicture(null)
    localStorage.removeItem('userDataAirebnb')
  }, [])

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userDataAirebnb'))
    if (storedData && storedData.token) {
      login(storedData.userId, storedData.username, storedData.token, storedData.profilePicture)
    }
    setLoadingLogin(false)
  }, [login])

  return (
    <div className='app'>
      <AuthContext.Provider
        value={{
          isLoggedIn: !!token,
          userId: userId,
          username: usernameAuth,
          token: token,
          profilePicture: profilePicture,
          login: login,
          logout: logout
        }}
      >
        <Routes>
          <Route element={<AppPublicRoutes isLoadingLogin={loadingLogin}/>}>
            <Route path='/' exact element={<Home/>} />
          </Route>

          <Route element={<AppPrivateRoutes isLoadingLogin={loadingLogin}/>}>
            <Route path='/' exact element={<Home/>} />
          </Route>
        </Routes>
      </AuthContext.Provider>

    </div>
  )
}

export default App
