import {
    ADMIN_ROUTE,
    CREATE_ROUTE,
    EXPOSITION_ROUTE,
    LOGIN_ROUTE,
    MUSEUM_ROUTE,
    REGISTRATION_ROUTE, UPDATE_ROUTE
} from "./utils/consts";
import Admin from "./pages/Admin";
import CreateExpositionComponent from "./components/models/CreateExpositionComponent"
import UpdateExpositionComponent from "./components/models/UpdateExpositionComponent"
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import ExpositionPage from "./pages/ExpositionPage";
import Museum from "./pages/Museum";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: CREATE_ROUTE,
        Component: CreateExpositionComponent
    },
    {
        path: UPDATE_ROUTE,
        Component: UpdateExpositionComponent
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