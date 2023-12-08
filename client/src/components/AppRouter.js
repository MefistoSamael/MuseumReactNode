import React, {useContext} from 'react';
import {Switch, Route, Redirect} from "react-router-dom";
import {authRoutes, publicRoutes} from "../routes";
import {MUSEUM_ROUTE} from "../utils/consts";
import Context from "../Context";

const AppRouter = () => {
    const {user} = useContext(Context);

    return (
        <Switch>
            { authRoutes.map(({path, Component}) =>
                <Route key={path} path={path} component={Component} />
            )}

            { publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} component={Component} exact/>
            )}

            <Redirect to={MUSEUM_ROUTE}/>
        </Switch>
    );
};

export default AppRouter;