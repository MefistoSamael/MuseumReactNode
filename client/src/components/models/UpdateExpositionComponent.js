import React, { Component } from 'react';
import Context from "../../Context";
import {MUSEUM_ROUTE} from "../../utils/consts";
import {$authHost} from "../../http";

class UpdateExpositionComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            themeId: 1,
            nameValid: true,
            themeIdValid: true
        };

        this.onThemeIdChange = this.onThemeIdChange.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    validateName(name) {
        return name.length > 2;
    }

    validateThemeId(themeId) {
        return themeId.length >= 1;
    }

    onNameChange(e) {
        const val = e.target.value;
        const valid = this.validateName(val);
        this.setState({ name: val, nameValid: valid });
        console.log(`name ${val} ${valid}`)
    }

    onThemeIdChange(e) {
        const val = e.target.value;
        const valid = this.validateThemeId(val);
        this.setState({ themeId: val, themeIdValid: valid });
        console.log(`theme ${val} ${valid}`)
    }

    async handleSubmit(e) {
        e.preventDefault();
        if (this.state.themeIdValid && this.state.nameValid) {
            try{
                const resp = await $authHost.put(`api/exposition/${window.location.href.split('/')[4]}`, {'name': this.state.name, 'themeId': this.state.themeId});
                this.props.history.push(MUSEUM_ROUTE); // Change '/' to the route where you want to redirect the user
                console.log('sended');
            } catch (e){
                alert(`there where exception during creation of exposition: ${e.message}`)
            }
        }
    }

    componentDidMount() {

        const fetchData = async () => {
            try {
                const id = window.location.href.split('/')[4];
                const expositionResponse = await $authHost.get(`api/exposition/${id}`);

                this.setState({
                    name: expositionResponse.data.name,
                    themeId: expositionResponse.data.themeId
                })


            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Call fetchData when the component mounts to retrieve data based on the route parameter
        fetchData();
    }

    render() {

        return (
            <div className="body-content">
                <h2>Exposition updation</h2>
                <form onSubmit={this.handleSubmit}>
                    <p>
                        <label>Name:</label><br />
                        <input type="text" value={this.state.name} onChange={this.onNameChange} />
                    </p>
                    <p>
                        <label>ThemeId:</label><br />
                        <input type="number" min="1" value={this.state.themeId} onChange={this.onThemeIdChange} />
                    </p>
                    <input type="submit" value="Отправить" />
                </form>
                <br />
            </div>
        );
    }
}

UpdateExpositionComponent.contextType = Context;

export default UpdateExpositionComponent;