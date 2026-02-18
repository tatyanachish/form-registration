import { Navigate } from "react-router-dom";
import { useAuth } from "../../../shared/context/AuthContext"
import { getRouteLoginAdmin } from "../config/router";

export const IsAdminRoutes = ({children}) => {
    const [isAuthenticated] = useAuth();

    if(!isAuthenticated) {
        return( <Navigate to= {getRouteLoginAdmin}  state={{ from: location }} replace/>)
    }
    return children;

}