import React, {useContext, useEffect, useState} from 'react';
import {$authHost} from "../http";
import ExhibitComponent from "../components/ExhibitComponent";
import {observer} from "mobx-react-lite";
import {EXPOSITION_ROUTE, MUSEUM_ROUTE, UPDATE_ROUTE} from "../utils/consts";
import {useHistory, useParams} from "react-router-dom";
import Context from "../Context";

async function DeleteExposition (id){
    try{
        let history = useHistory();
        id = 4;

        await $authHost.delete(`api/exposition/${id}`);
        history.push(MUSEUM_ROUTE); // Change '/' to the route where you want to redirect the user
    }
    catch (e){
        alert(`There was error during deletion of exposition: ${e.message}`)
    }


}


const ExpositionPage =observer (() => {
    const {user} = useContext(Context);
    const routeParams = useParams();
    const [exposition, setExposition] = useState('');
    const [theme, setTheme] = useState('');
    const [exhibits, setExhibits] = useState('');
    const history = useHistory();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const id = routeParams["id"];
                const expositionResponse = await $authHost.get(`api/exposition/${id}`);

                setExposition(expositionResponse.data);

                const themeResponse = await $authHost.get(`api/theme/${expositionResponse.data.themeId}`);
                const exhibitsResponse = await $authHost.get(`api/exhibit?expositionId=${expositionResponse.data.id}`)

                setTheme(themeResponse.data);
                setExhibits(exhibitsResponse.data);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();


    }, []); // Empty dependency array means this effect runs once when the component mounts

    const DeleteExposition = async () => {
        try{
            let id = exposition.id;

            await $authHost.delete(`api/exposition/${id}`);
            history.push(MUSEUM_ROUTE); // Change '/' to the route where you want to redirect the user
        }
        catch (e){
            alert(`There was error during deletion of exposition: ${e.message}`)
        }


    }
    if (!(exhibits instanceof Array))
        return;

    // получить время -> перевести в локальное время пользователя -> перевести в utc

    let cd = new Date(exposition.createdAt);
    let ud = new Date(exposition.updatedAt);

    let UrCD = cd.toLocaleString('en-US', {timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone});
    let UrUD = ud.toLocaleString('en-US', {timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone});

    let UtCD = cd.toLocaleString('en-US', {timeZone: 'UTC'});
    let UtUD = ud.toLocaleString('en-US', {timeZone: 'UTC'});

    let rootToUpdate = `${UPDATE_ROUTE}/${exposition.id}`



    return (
        <div className="body-content">
            <label> Name - {exposition.name}</label> <br/>
            <label> Exposition theme - {theme.name}</label><br/>

            <label> USER - Creation date {UrCD}</label><br/>
            <label> USER - Updation date {UrUD}</label><br/>

            <label> UTC - Creation date {UtCD}</label><br/>
            <label> UTC - Updation date {UtUD}</label><br/>
            <label> Exhibits: </label>
            <ol>
                {exhibits.map(item =>
                    <ExhibitComponent key={item.Id} exhibit={item}/>)
                }
            </ol>
            {user.isAuth ?
                <>
                    <button onClick={DeleteExposition}>Delete exposition</button>
                    <button> <a href={rootToUpdate}> Update exposition</a></button>
                </>
                :
                <lable>here are no delete button</lable>
            }
        </div>
    );
});

export default ExpositionPage;
