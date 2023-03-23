import { createContext } from "react";

export const AuthContext = createContext({
    isLoggedIn: false,
    token: null,
    userId: null,
    firstName: null,
    lastName: null,
    email: null,
    profilePicture: null,
    login: () => {},
    logout: () => {}
})
