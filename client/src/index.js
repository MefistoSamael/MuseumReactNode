import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import UserStore from "./store/UserStore";
import ExpositionStore from "./store/ExpositionStore";
import Context from "./Context";

ReactDOM.render(
    <Context.Provider value={{
        user: new UserStore(),
        exposition: new ExpositionStore(),
    }}>
        <App />,
    </Context.Provider>,

    document.getElementById('root')
);
