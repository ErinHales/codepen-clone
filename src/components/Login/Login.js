import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            login: '',
            password: '',
            showReset: false
        }
    }
    onInputChange = event => this.setState({ [event.target.name]: event.target.value })
    showReset = () => {
        this.setState({ showReset: !this.state.showReset });
    }
    render() {
        return (
            <div className="component-login">
                <div className="login-container">
                    <div className="login-header">
                        <h2>Clonepen</h2>
                        <h1>Log in!</h1>
                    </div>
                    <div className="login-types">
                        <div className="login-inputs">
                            <div className="input-group">
                                <h5>USERNAME OR EMAIL</h5>
                                <input name='login' value={this.state.login} type="text" />
                            </div>
                            <div className="input-group">
                                <h5>PASSWORD</h5>
                                <input name='password' value={this.state.password} type="text" />
                            </div>
                            <div className="login-controls">
                                <button className="btn-green">Log in</button>
                                <p onClick={this.showReset}>Forgot Password?</p>
                            </div>
                            <div className={this.state.showReset ? 'reset' : 'hidden'}>
                                <div className="reset-styles">
                                    <h3>Reset Your Password</h3>
                                    <div className="reset-input-group">
                                        <h6>Username Or Email</h6>
                                        <input required placeholder='your@email.com' type="text" />
                                    </div>
                                    <div className="reset-button">
                                        <button>Send Password Reset Email</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="login-divider">
                            <div className="divider-top">

                            </div>
                            <div className="divider-text-container">
                                <div className="divider-text">
                                    <h4>OR</h4>
                                </div>
                            </div>
                            <div className="divider-bottom">

                            </div>
                        </div>
                        <div className="login-socials">
                            <div className="social">
                                <button className="twitter">
                                    <div className="button-content">
                                        <i className="fa fa-twitter"></i>
                                        <h6> Log In with Twitter</h6>
                                    </div>

                                </button>
                            </div>
                            <div className="social">
                                <button className="github">
                                    <div className="button-content">
                                        <i className='fa fa-github'></i><h6>Log In with GitHub</h6>
                                    </div>
                                </button>
                            </div>
                            <div className="social">
                                <button className="facebook">
                                    <div className="button-content">
                                        <i className="fa fa-facebook-square"></i>
                                        <h6>Log In with Facebook</h6>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="login-signup-container">
                        <p>Need an account?</p>
                        <Link to="/signup" className="link"><p>Sign up now!</p></Link>
                    </div>
                </div>
            </div>
        )
    }


}

export default Login;