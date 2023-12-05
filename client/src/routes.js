import {ADMIN_ROUTE, EXPOSITION_ROUTE, LOGIN_ROUTE, MUSEUM_ROUTE, REGISTRATION_ROUTE} from "./utils/consts";
import Admin from "./pages/Admin";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import ExpositionPage from "./pages/ExpositionPage";
import Museum from "./pages/Museum";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
]

export const publicRoutes = [
    {
        path: REGISTRATION_ROUTE,
        Component: Registration
    },
    {
        path: LOGIN_ROUTE,
        Component: Login
    },
    {
        path: EXPOSITION_ROUTE + '/:id',
        Component: ExpositionPage
    },
    {
        path: MUSEUM_ROUTE,
        Component: Museum
    },
]