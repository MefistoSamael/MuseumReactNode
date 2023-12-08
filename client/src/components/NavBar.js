import React, {useContext} from 'react';
import Context from "../Context";
import {NavLink} from "react-router-dom";
import {ADMIN_ROUTE, EXPOSITION_ROUTE, LOGIN_ROUTE, MUSEUM_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";
import {v4} from "uuid";




const NavBar = observer(() => {
    const {user} = useContext(Context);
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    let currentdate = new Date();
    let datetime = "Last Sync: " + currentdate.getDate() + "/"
        + (currentdate.getMonth()+1)  + "/"
        + currentdate.getFullYear()

    return (
        <nav>
            <div className="navbar">
                <NavLink to={MUSEUM_ROUTE} className="navbar-brand">
                    MUSEUM
                </NavLink>
                <span>  Time zone = {timeZone} </span>
                <span> Date - {datetime}</span>
                {user.isAuth ?
                    <div>
                        <NavLink key={v4()} to={ADMIN_ROUTE} className="navbar-item">
                            Admin panellllllllll
                        </NavLink>
                        <NavLink to={MUSEUM_ROUTE} className="navbar-item" onClick={() =>
                        {
                            user.setIsAuth(false);
                            localStorage.removeItem('token');
                        }}>
                            Exit
                        </NavLink>
                    </div>
                    :
                    <div >
                        <NavLink to={LOGIN_ROUTE} className="navbar-item">Authorize</NavLink>
                    </div>
                }
            </div>
        </nav>
    );
})  ;

export default NavBar;