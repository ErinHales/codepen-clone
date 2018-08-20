import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            credentials: '',
            password: '',
            showReset: false
        }
    }
    onInputChange = event => this.setState({ [event.target.name]: event.target.value });

    showReset = () => { this.setState({ showReset: !this.state.showReset }); }

    login = () => {
        let { credentials, password } = this.state;
        axios.post('/api/auth/login', { credentials, password })
            .then(res =>{
                // if user exist then direct them the home page
                if(res.data === 'OK'){
                    // this.props.history.push('/home');
                    alert('Log In successful')
                }
                // The user got their username/email or password wrong
                else{
                    alert(res.data)
                }
               
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <div className="component-login">
                <div className="login-container">
                    <div className="login-header">
                    <h2 className="logo">C L <img className='icon' src='http://blog.codepen.io/wp-content/uploads/2012/06/Button-White-Large.png' alt='' /> N E P E N</h2>
                        <h1>Log in!</h1>
                    </div>
                    <div className="login-types">
                        <div className="login-inputs">
                            <div className="input-group">
                                <h5>USERNAME OR EMAIL</h5>
                                <input onChange={this.onInputChange} name='credentials' value={this.state.login} type="text" />
                            </div>
                            <div className="input-group">
                                <h5>PASSWORD</h5>
                                <input onChange={this.onInputChange}  name='password' value={this.state.password} type="password" />
                            </div>
                            <div className="login-controls">
                                <button onClick={this.login} className="btn-green">Log in</button>
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
                        <p>Sign up now!</p>
                    </div>
                </div>
            </div>
        )
    }


}

export default Login;