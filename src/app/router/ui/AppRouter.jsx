import { Routes, Route} from "react-router-dom"
import { RouteConfig } from "../config/RouteConfig"
import { IsAdminRoutes } from "./IsAdminRoutes"
import { SuspenseWrapper } from "./SuspenseWapper"


export const AppRoute = () => {
    return (
        <Routes>
            {RouteConfig.map(({ path, element, AdminOnly }) => {
                const content = (
                    <SuspenseWrapper>
                        {element}
                    </SuspenseWrapper>
                );

                return (
                    <Route
                        key={path}
                        path={path}
                        element={
                            AdminOnly ? (
                                <IsAdminRoutes>
                                    {content}
                                </IsAdminRoutes>
                            ) : (
                                content
                            )
                        }
                    />
                );
            })}
        </Routes>
    );
};
