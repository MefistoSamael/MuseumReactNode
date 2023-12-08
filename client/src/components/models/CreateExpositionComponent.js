import React, { Component } from 'react';
import Context from "../../Context";
import {MUSEUM_ROUTE} from "../../utils/consts";
import {$authHost} from "../../http";

class CreateExpositionComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            themeId: 1,
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
                const resp = await $authHost.post(`api/exposition`, {'name': this.state.name, 'themeId': this.state.themeId});
                this.props.history.push(MUSEUM_ROUTE); // Change '/' to the route where you want to redirect the user
                console.log('sended');
            } catch (e){
                alert(`there where exception during creation of exposition: ${e.message}`)
            }
        }
    }

    render() {

        return (
            <div className="body-content">
                <h2>Exposition creation</h2>
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

CreateExpositionComponent.contextType = Context;

export default CreateExpositionComponent;
