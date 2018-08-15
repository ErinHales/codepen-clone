import React, { Component } from 'react';

export default class SignUp extends Component {
    constructor(props) {
        super(props)


    }


    render() {
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
                                <div className="signup-form-github" ><i className="fa fa-github" /> Sign Up with Twitter</div>
                                <div className="signup-form-facebook" ><i className="fa fa-facebook" /> Sign Up with Twitter</div>
                            </div>
                            <div>Or,</div>
                            <div className="signup-form-email" >Sign Up with Email</div>
                            {/* This form is rendered when sing up with email is clicked */}
                            <div></div>
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