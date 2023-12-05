import React, {useEffect, useState} from 'react';
import APIComponent from "../components/APIComponent";
import ExpositionList from "../components/ExpositionList";

const Museum = () => {


    return (
        <div className="body-content">
            <ExpositionList/>
            <APIComponent/>
        </div>

    );
};

export default Museum;