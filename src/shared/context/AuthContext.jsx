
import { createContext, useContext, useEffect, useState } from "react";
import Cookies from 'js-cookie';


const AuthContext = createContext();


export const AuthProvider = ({children}) => {    
    const [isAuthenticated, setAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const token = Cookies.get('token')
        setAuthenticated(!!token);
        setIsLoading(false)
    }, []);


    const login = (token) => {
        Cookies.set('token', token, { 
            expires: 7,
            path: '/',
            secure: true,
            sameSite: 'Lax'
        });
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