import React, { Component } from 'react';

export default class SignUp extends Component {
    constructor(props) {
        super(props)


    }


    render() {
        let signUpField = (
            <div>
                <div className="signup-input-group" >
                    <h5>YOUR NAME</h5>
                    <input className="signup-input" type="text"/>
                </div>
                <div className="signup-input-group" >
                    <h5>CHOOSE A USERNAME</h5>
                    <input className="signup-input" type="text"/>
                </div>
                <div className="signup-input-group" >
                    <h5>EMAIL</h5>
                    <input className="signup-input" type="text"/>
                </div>
                <div className="signup-input-group" >
                    <h5>CHOOSE PASSWORD</h5>
                    <input className="signup-input" type="text"/>
                </div>
            </div>
        )
        return (
            <div>
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
                            <div className="signup-form-social" >
                                <div className="signup-form-twitter" ><i className="fa fa-twitter"/> Sign Up with Twitter</div>
                                <div className="signup-form-github" ><i className="fa fa-github" /> Sign Up with GitHub</div>
                                <div className="signup-form-facebook" ><i className="fa fa-facebook" /> Sign Up with Facebook</div>
                            </div>
                            <div className="signup-form-or">Or,</div>
                            <div className="signup-form-email" >Sign Up with Email</div>
                            {/* This form is rendered when sing up with email is clicked */}
                            {signUpField}
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