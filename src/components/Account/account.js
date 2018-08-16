import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Dropzone from 'react-dropzone';
import customizeImg from './img-customize.svg';
import axios from 'axios';
class Account extends Component {
    constructor() {
        super();
        this.state = {
            imgUrl: 'https://i1.wp.com/codepen.io/assets/avatars/user-avatar-512x512-6e240cf350d2f1cc07c2bed234c3a3bb5f1b237023c204c782622e80d6b212ba.png?ssl=1'
        }
    }

    componentDidMount

    onDrop = files => {
        let { REACT_APP_UPLOAD_PRESET, CLOUDINARY_API_KEY, REACT_APP_CLOUD_NAME } = process.env;
        const uploaders = files.map(file => {
            // Information must be in form data, that's the way Cloudinary wants it
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", REACT_APP_UPLOAD_PRESET); // Replace the preset name with your own
            formData.append("api_key", CLOUDINARY_API_KEY); // Replace API key with your own Cloudinary key
            formData.append("timestamp", (Date.now() / 1000) | 0);

            // Make an AJAX upload request using Axios, pass in formData
            return axios.post(`https://api.cloudinary.com/v1_1/${REACT_APP_CLOUD_NAME}/image/upload`, formData, {
                headers: { "X-Requested-With": "XMLHttpRequest" },
            }).then(response => {
                const data = response.data;
                const fileURL = data.secure_url // You should store this URL for future references in your app
                axios.put('/api/user/img', {imgUrl: fileURL})
                .then(this.setState({imgUrl: fileURL}))
                .catch(err => console.log(err) );
            })
        });
    }
    render() {
        return (
            <div className="component-account">
                <div className="account-container">
                    <div className="account-header">
                        <div className="account-save">
                            <button>Save All Settings</button>
                        </div>

                        <div className="account-links">
                            {/* <Link path='/settings/profile'>Profile</Link>
                        <Link path='/settings/Account'>Account</Link> */}
                            <p>Profile</p>
                            <p>Account</p>
                        </div>
                    </div>
                    <div className="account-grid">
                        <div className="account-avatar">
                            <div className="img-placeholder">
                                <img src={this.state.imgUrl} alt="Profile Avatar" />
                            </div>
                            <div className="dropzone">
                                <Dropzone accept="image/jpeg,image/jpg,image/tiff,image/gif" multiple={false} className="dropzone-container" onDrop={this.onDrop}>
                                    <div className="dropzone-content">
                                        <p>
                                            To change your avatar, select a new file
                                            below or drag-and-drop one here. 512X512
                                            is awesome, but we'll resize it.
                                         </p>
                                        <div className="dropzone-input">
                                            <p>Or,</p>
                                            <button>Select File(s)</button>
                                        </div>
                                    </div>
                                </Dropzone>
                            </div>
                        </div>
                        <div className="account-information">
                            <div className="information-box">
                                <div className="box-header">
                                    <h3>Name and Location</h3>
                                </div>
                                <div className="input-container">
                                    <div className="input-group">
                                        <h5>Profile Name</h5>
                                        <input type="text" />
                                    </div>
                                    <div className="input-group">
                                        <h5>Location</h5>
                                        <input type="text" />
                                    </div>
                                </div>
                            </div>
                            <div className="information-box">
                                <div className="box-header">
                                    <h3>Bio</h3>
                                </div>
                                <div className="textarea-group">
                                    <div className="title">
                                        <h5>About You</h5>
                                    </div>
                                    <div className="textarea">
                                        <textarea></textarea>
                                        <p>0/100 <span className="small">characters used.</span></p>
                                    </div>

                                </div>
                            </div>
                            <div className="information-box">
                                <div className="box-header">
                                    <h3>Links</h3>
                                </div>
                                <div className="input-container">
                                    <div className="input-group">
                                        <h5>Profile Link #1</h5>
                                        <input type="text" />
                                    </div>
                                    <div className="input-group">
                                        <h5>Profile Link #2</h5>
                                        <input type="text" />
                                    </div>
                                    <div className="input-group">
                                        <h5>Profile Link #3</h5>
                                        <input type="text" />
                                    </div>
                                </div>
                            </div>
                            <div className="information-box">
                                <div className="box-header">
                                    <h3>Are you for hire?</h3>
                                </div>
                                <div className="slider">

                                </div>
                            </div>
                        </div>
                        <div className="account-customize">
                            <div className="information-box">
                                <div className="box-header">
                                    <h3>Customize</h3>
                                </div>
                                <div className="img-placeholder">
                                    <img src={customizeImg} alt="cusomize img" />
                                </div>
                                <button>Organize!</button>
                                <p>You can choose and arrange the Pens displayed
                                    on your profile.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        )
    }
}

export default Account;