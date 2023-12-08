import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";

import {useContext, useEffect, useState} from "react";
import Context from "./Context";
import {observer} from "mobx-react-lite";
import {check} from "./http/userAPI";

const App = observer (() => {

    const {user} = useContext(Context);

    if (localStorage.getItem('token') !== null)
    {
        useEffect(() => {
            check().then(data => {
                user.setUser(true)
                user.setIsAuth(true)
            })
        }, [])
    }


    return (
    <BrowserRouter>
        <NavBar/>
        <AppRouter/>
    </BrowserRouter>
  );
});

export default App;
