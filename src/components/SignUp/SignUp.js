import React, { Component } from 'react';
import axios from 'axios';
import NavBar from '../NavBar/NavBar'

export default class SignUp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showEmailForm: false,
            name: '',
            username: '',
            email: '',
            password: ''
        }
        this.showEmailFormHandler = this.showEmailFormHandler.bind(this);
        this.inputEventHandler = this.inputEventHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }
    showEmailFormHandler() {
        this.setState({showEmailForm:!this.state.showEmailForm})
    }

    inputEventHandler(value, name) {
        this.setState({
            [name]: value
        })
    }
    submitHandler() {
        let {name, username, email, password} = this.state;
        if(name && username && email && password) {
            axios.post('/api/auth/register', {name, username, email, password})
            .then(res =>{
                console.log(res);
                // If the response is ok then direct them to the home page
                if(res.data === 'OK'){
                    this.props.history.push('/pens') 
                    if(this.props.closePopUp) {
                        this.props.closePopUp(true)
                    }
                }
                // There is something wrong with the signup do something
                else{
                    alert('Something wrong with user');
                }
            })
        }
        else {
            alert('All forms required');
        }
    } 

    render() {
        let signUpField = (
            <div>
                <div className="signup-input-group" >
                    <h5>YOUR NAME</h5>
                    <input required onChange={ event => this.inputEventHandler(event.target.value, "name")} value={this.state.name} className="signup-input" type="text"/>
                </div>
                <div className="signup-input-group" >
                    <h5>CHOOSE A USERNAME</h5>
                    <input  onChange={ event => this.inputEventHandler(event.target.value, "username")}  value={this.state.username} className="signup-input" type="text"/>
                </div>
                <div className="signup-input-group" >
                    <h5>EMAIL</h5>
                    <input onChange={ event => this.inputEventHandler(event.target.value, "email")}  value={this.state.email} className="signup-input" type="text"/>
                </div>
                <div className="signup-input-group" >
                    <h5>CHOOSE PASSWORD</h5>
                    <input required onChange={ event => this.inputEventHandler(event.target.value, "password")}  value={this.state.password} className="signup-input" type="password"/>
                </div>
                <button onClick={this.submitHandler} className="signup-form-submit-button">Submit</button>
            </div>
        )
        return (
            <div>
                { this.props.closePopUp ? (
                    null
                ) : (
                    <NavBar/>
                )}
                <div className="signup-container">
                    <div className="signup-form-container">
                        <div className="signup-form-highlights">
                            <div className="signup-form-highlights-green"></div>
                            <div className="signup-form-highlights-yellow"></div>
                            <div className="signup-form-highlights-purple"></div>
                            <div className="signup-form-highlights-blue"></div>
                        </div>
                        <div className="signup-form-header" ><h1>Welcome to ClonePen.</h1></div>
                        <div className="signup-form" >
                            <div className="signup-form-userinput">
                                <div className="signup-form-social" >
                                    <div className="signup-form-twitter" ><i className="fa fa-twitter"/> Sign Up with Twitter</div>
                                    <div className="signup-form-github" ><i className="fa fa-github" /> Sign Up with GitHub</div>
                                    <div className="signup-form-facebook" ><i className="fa fa-facebook" /> Sign Up with Facebook</div>
                                </div>
                                <div className="signup-form-or">Or,</div>
                                <div onClick={this.showEmailFormHandler} className="signup-form-email" >Sign Up with Email</div>
                                {/* This form is rendered when sing up with email is clicked */}
                                { this.state.showEmailForm ? signUpField : null}
                            </div>
                            <div className="signup-form-info">
                                <div className="signup-form-divider" ></div>
                            </div>
                        </div>
                    </div>
                    <div className="signup-footer">
                        <div className="signup-footer-element" >Terms of Service</div>
                        •
                        <div className="signup-footer-element" >Privacy Policy</div>
                        •
                        <div className="signup-footer-element" >Code of Conduct</div>
                    </div>
                </div>
            </div>
        )
    }
}