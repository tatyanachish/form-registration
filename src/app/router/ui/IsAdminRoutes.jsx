import { Navigate, useLocation  } from "react-router-dom";
import { useAuth } from "../../../shared/context/AuthContext"
import { getRouteLoginAdmin } from "../config/router";

export const IsAdminRoutes = ({children}) => {
    const { isAuthenticated, isLoading } = useAuth();
    const location = useLocation();

    if(isLoading) {
        return <p>Loading...</p>
    }

    if(!isAuthenticated) {
        return( <Navigate to= {getRouteLoginAdmin()}  state={{ from: location.pathname }} replace/>)
    }
    return children;

}