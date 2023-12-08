import React, {useContext} from 'react';
import {CREATE_ROUTE, UPDATE_ROUTE} from "../utils/consts";
import Context from "../Context";

const Admin = () => {

    return (
        <div className="body-content">
           <a href={CREATE_ROUTE}>Добавить экспозицию</a> <br/>
        </div>
    );
};

export default Admin;