import React, {useEffect, useState} from 'react';

const ExhibitComponent = ({exhibit}) => {


    if (typeof exhibit === "string")
        return;



    const image_url = `${process.env.REACT_APP_API_URL}/${exhibit.photo_path}`;

    let cd = new Date(exhibit.createdAt);
    let ud = new Date(exhibit.updatedAt);

    let UrCD = cd.toLocaleString('en-US', {timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone});
    let UrUD = ud.toLocaleString('en-US', {timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone});

    let UtCD = cd.toLocaleString('en-US', {timeZone: 'UTC'});
    let UtUD = ud.toLocaleString('en-US', {timeZone: 'UTC'});

    return (
        <div key={exhibit.id}>
            <label>Exhibit name - {exhibit.name}</label><br/>
            <img src={image_url} alt="exhibit"/><br/>
            <label> USER - Creation date {UrCD}</label><br/>
            <label> USER - Updation date {UrUD}</label><br/>

            <label> UTC - Creation date {UtCD}</label><br/>
            <label> UTC - Updation date {UtUD}</label><br/>
        </div>
    );
};

export default ExhibitComponent;