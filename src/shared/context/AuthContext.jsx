
import { createContext, useContext, useEffect, useState } from "react";
import Cookies from 'js-cookie';

const AuthContext = createContext();


export const AuthProvider = ({children}) => {
    const [isAuthenticated, setAuthenticated] = useState(false)

    useEffect(()=> {
        const token = Cookies.get('token');
        setAuthenticated(!!token)
    }, [])

    const login = (token) => {
        Cookies.set('token', token, { expires: 7 });
        setAuthenticated(true)
    }

    const logout = (token) => {
        Cookies.remove('token');
        setAuthenticated(false)
    }
    
    return (
        <AuthContext.Provider value={{isAuthenticated, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)