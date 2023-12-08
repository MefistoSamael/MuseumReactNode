import React, { useContext, useEffect, useState } from 'react';
import { observer } from "mobx-react-lite";
import Context from "../Context";
import ExpositionItem from "./ExpositionItem";
import { v4 } from "uuid";
import { $host } from "../http";

const ExpositionList = observer(() => {
    const [expositions, setExpositions] = useState([]);
    const [themeId, setThemeId] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const expositionsResponse = await $host.get(`api/exposition`);
                setExpositions(expositionsResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

    }, []); // Empty dependency array means this effect runs once when the component mounts

    const handleFindClick = async () => {
        const expositionsResponse = await $host.get(`api/exposition`);

        if (themeId) {
            // Filter expositions based on the entered themeId
            const filteredExpositions = expositionsResponse.data.filter(exposition => exposition.themeId === Number(themeId));
            setExpositions(filteredExpositions);
            setThemeId(''); // Reset the themeId state after filtering
        } else {
            setExpositions(expositionsResponse.data);
        }
    };

    const handleSortByNameClick = () => {
        // Sort expositions by their names
        const sortedExpositions = [...expositions].sort((a, b) => a.name.localeCompare(b.name));
        setExpositions(sortedExpositions);
    };

    return (
        <div key={v4()}>
            <label>Enter theme id</label><br />
            <input
                type='number'
                value={themeId}
                onChange={(e) => setThemeId(e.target.value)}
            />
            <button onClick={handleFindClick}>Find</button>
            <button onClick={handleSortByNameClick}>Sort by Name</button>
            {expositions.length > 0 ? (
                expositions.map(exposition => (
                    <ExpositionItem key={exposition.id} exposition={exposition} />
                ))
            ) : (
                <p>No expositions presented</p>
            )}
        </div>
    );
});

export default ExpositionList;
