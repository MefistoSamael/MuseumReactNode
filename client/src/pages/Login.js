import React, { Component } from 'react';
import { login } from "../http/userAPI";
import Context from "../Context";
import {MUSEUM_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";
import {Redirect, Route, useHistory, withRouter} from "react-router-dom";

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: props.password,
            email: props.email,
            passwordValid: this.validatePassword(props.password),
            emailValid: this.validateEmail(props.email),
        };

        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    validateEmail(email) {
        return email.includes('@');
    }

    validatePassword(password) {
        return password.length > 2;
    }

    onEmailChange(e) {
        const val = e.target.value;
        const valid = this.validateEmail(val);
        this.setState({ email: val, emailValid: valid });
    }

    onPasswordChange(e) {
        const val = e.target.value;
        const valid = this.validatePassword(val);
        this.setState({ password: val, passwordValid: valid });
    }

    async handleSubmit(e) {
        e.preventDefault();
        if (this.state.passwordValid && this.state.emailValid) {
            const resp = await login(this.state.email, this.state.password, this.state.role);
            const { user, } = this.context;
            user.setUser(resp);
            user.setIsAuth(true);

            // Use history object from props to navigate
            this.props.history.push(MUSEUM_ROUTE); // Change '/' to the route where you want to redirect the user
        }
    }

    render() {

        return (
            <div className="body-content">
                <h2>Вход</h2>
                <form onSubmit={this.handleSubmit}>
                    <p>
                        <label>Email:</label><br />
                        <input type="text" value={this.state.email} onChange={this.onEmailChange} />
                    </p>
                    <p>
                        <label>Password:</label><br />
                        <input type="password" value={this.state.password} onChange={this.onPasswordChange} />
                    </p>
                    <input type="submit" value="Отправить" />
                </form>
                <br />
                <a href={REGISTRATION_ROUTE}>Регистрация</a>
            </div>
        );
    }
}

LoginForm.contextType = Context;
LoginForm.defaultProps = { email: "", password: "", role: "USER" };

export default LoginForm;
