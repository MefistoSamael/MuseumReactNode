import React, {useEffect, useState} from 'react';
import {v4} from "uuid";
function APIComponent () {
    const [image_url, setImageUrl] = useState('');
    const [setup, setSetup] = useState('');
    const [punchline, setPunchline] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://dog.ceo/api/breeds/image/random');
                const secondResponse = await fetch('https://official-joke-api.appspot.com/random_joke')
                if (response.ok && secondResponse.ok) {
                    const data = await response.json();
                    setImageUrl(data['message']);

                    const secondData = await secondResponse.json();
                    setSetup(secondData['setup']);
                    setPunchline(secondData['punchline']);
                } else {
                    throw new Error('API request failed');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();


    }, []); // Empty dependency array means this effect runs once when the component mounts


    return (
        <>
            <img src={image_url} alt="dog image" />

            <br/>
            <br/>

            Joke:
            <br/>
            {setup}
            {punchline}
        </>
    );
};

export default APIComponent;