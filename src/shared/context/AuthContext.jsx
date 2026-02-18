
import { createContext, useContext, useState } from "react";
import Cookies from 'js-cookie';

const AuthContext = createContext();


export const AuthProvider = ({children}) => {
    const token = Cookies.get('token')
    const [isAuthenticated, setAuthenticated] = useState(!!token);
    const [isLoading, setIsLoading] = useState(false)


    const login = (token) => {
        Cookies.set('token', token, { expires: 7 });
        setAuthenticated(true)
    }

    const logout = () => {
        Cookies.remove('token');
        setAuthenticated(false)
    }
    
    return (
        <AuthContext.Provider value={{isAuthenticated, isLoading, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)