import React, {useEffect, useState} from 'react';

const ExhibitComponent = ({exhibit}) => {


    if (typeof exhibit === "string")
        return;



    const image_url = `${process.env.REACT_APP_API_URL}/${exhibit.photo_path}`;

    return (
        <div>
            <label>Exhibit name - {exhibit.name}</label><br/>
            <img src={image_url} alt="exhibit"/>
        </div>
    );
};

export default ExhibitComponent;