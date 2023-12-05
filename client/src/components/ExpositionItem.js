import React, {useEffect, useState} from 'react';
import {$authHost} from "../http";
import ExhibitComponent from "./ExhibitComponent";
import {observer} from "mobx-react-lite";

const ExpositionItem =observer (({exposition}) => {

    const [theme, setTheme] = useState('');
    const [exhibits, setExhibits] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const themeResponse = await $authHost.get(`api/theme/${exposition.themeId}`);
                const exhibitsResponse = await $authHost.get(`api/exhibit?expositionId=${exposition.id}`)

                setTheme(themeResponse.data);
                setExhibits(exhibitsResponse.data);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();


    }, []); // Empty dependency array means this effect runs once when the component mounts


    if (!(exhibits instanceof Array))
        return;

    return (
        <div>
            <label> Name - {exposition.name}</label> <br/>
            <label> Exposition theme - {theme.name}</label><br/>
            <label> Exhibits: </label>
            <ol>
                {exhibits.map(item =>
                    <ExhibitComponent key={item.Id} exhibit={item}/>)
                }
            </ol>
        </div>
    );
});

export default ExpositionItem;