import { createContext } from "react";

export const AuthContext = createContext({
    isLoggedIn: false,
    userId: null,
    firstName: null,
    lastName: null,
    token: null,
    profilePicture: null,
    email: null,

    login: () => {},
    logout: () => {}
})
