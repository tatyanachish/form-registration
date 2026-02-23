import { Login } from "../../../features/auth/ui/login/Login";
import { MainPages } from "../../../pages/MainPages/MainPages";
import { AdminSchedule } from "../../../widjets/AdminSchedule/AdminSchedule";
import { getRouteAdmin, getRouteLoginAdmin, getRouteSchedule } from "./router";

export const RouteConfig = [

    {
        path: getRouteSchedule(),
        element: <MainPages/>,
        name: 'Home',
        AdminOnly: false
    },
    {
        path: getRouteAdmin(),
        element: <AdminSchedule/>,
        name: 'Applications',
        AdminOnly: true 
        
    },
    {
        path: getRouteLoginAdmin(),
        element: <Login/>,
        name: 'Login',
        AdminOnly:false
    }

]