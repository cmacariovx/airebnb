import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router";
import { AuthContext } from "../Context/Auth-Context";

function AppPublicRoutes(props) {
    const auth = useContext(AuthContext)

    // prevents loading of auth token (false null read) from redirecting too early
    if (!props.isLoadingLogin) {
        return (
            !auth.token ? <Outlet /> : <Navigate to="/"/>
            // was rerouting away from profile page on first render before the second one
        )
    }
}

export default AppPublicRoutes
