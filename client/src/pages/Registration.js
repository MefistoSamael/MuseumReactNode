import React, { Component } from 'react';
import {registration} from "../http/userAPI";
import Context from "../Context";
import {LOGIN_ROUTE, MUSEUM_ROUTE} from "../utils/consts";
import {Redirect} from "react-router-dom";
import context from "../Context";

class RegistrationForm extends Component{
    constructor(props) {
        super(props);
        let password = props.password;
        let passwordIsValid = this.validatePassword(password);
        let email = props.email;
        let emailIsValid = this.validateEmail(email);

        this.state = {password: password, email: email, passwordValid: passwordIsValid, emailValid: emailIsValid, role: this.props.role};

        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    validateEmail(email){
        return email.includes('@')
    }

    validatePassword(password){
        return password.length>2;
    }

    onEmailChange(e){
        let val = e.target.value;
        let valid = this.validateEmail(val);
        this.setState({email: val, emailValid: valid});
    }

    onPasswordChange(e){
        let val = e.target.value;
        let valid = this.validatePassword(val);
        this.setState({password:val, passwordValid: valid});
    }

    async handleSubmit(e){
        e.preventDefault();
        if(this.state.passwordValid ===true && this.state.emailValid===true){
            try{
                let resp = await registration(this.state.email, this.state.password, this.state.role);
                let {user} = this.context;
                user.setUser(resp);
                user.setIsAuth(true);

                this.props.history.push(MUSEUM_ROUTE); // Change '/' to the route where you want to redirect the user
            }
            catch (e){
                alert("пользователь с таким email существует");
            }


        }
    }

    render() {
        let {user} = this.context;
        return (
            <>
                {user.isAuth ?
                    <Redirect to={MUSEUM_ROUTE}/>
                    :
                    <div className="body-content">
                        <h2>Регистрация</h2>
                        <form onSubmit={this.handleSubmit}>
                            <p>
                                <label>Email:</label><br />
                                <input type="text" value={this.state.name}
                                       onChange={this.onEmailChange} />
                            </p>
                            <p>
                                <label>Password:</label><br />
                                <input type="number" value={this.state.age}
                                       onChange={this.onPasswordChange}  />
                            </p>
                            <input type="submit" value="Отправить" />
                        </form>
                        <br/>
                        <a href={LOGIN_ROUTE}>Логин</a>
                    </div>}
            </>


        );
    }
}

RegistrationForm.contextType = Context;
RegistrationForm.defaultProps = {email: "", password: "", role: "USER"}

export default RegistrationForm