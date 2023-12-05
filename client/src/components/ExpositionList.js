import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import Context from "../Context";
import ExpositionItem from "./ExpositionItem";

const ExpositionList = observer (() => {
    const {exposition} = useContext(Context);
    console.log("aboba")
    console.log(exposition)
    return (
        <div>
            {exposition.Expositions.map(exposition =>
                <ExpositionItem key={exposition.Id} exposition={exposition}/>
            )}

        </div>
    );
});

export default ExpositionList;