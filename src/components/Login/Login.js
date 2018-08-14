import React, { Component } from 'react';
import codepenLogo from './codepen_logo.svg';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            login: '',
            password: ''
        }
    }

    onInputChange = event => this.setState({[event.target.name]: event.target.value})

    render() {
        return (
            <div className="component-login">
                <div className="login-inputs">
                    <img src={codepenLogo} alt=""/>
                    <h1>Log in!</h1>
                    <div className="input-group">
                        <h5>USERNAME OR EMAIL</h5>
                        <input name='login' value={this.state.login} type="text"/>
                    </div>
                    <div className="input-group">
                        <h5>Password</h5>
                        <input name='password' value={this.state.password} type="text"/>
                    </div>
                </div>
                <div className="login-divider">
                    <div className="divider">
                        <div className="divider-box">
                            OR
                        </div>
                    </div>
                </div>
                <div className="login-socials">
                    <div className="social">
                        <button>Log In with Twitter</button>
                    </div>
                    <div className="social">
                        <button>Log In with GitHub</button>
                    </div>
                    <div className="social">
                        Log In with Facebook
                    </div>
                </div>
            </div>
        )
    }


}

export default Login;