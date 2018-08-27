import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Dropzone from 'react-dropzone';
import customizeImg from './img-customize.svg';
import EditorSettings from './EditorSettings';
import axios from 'axios';
import NavBar from '../NavBar/NavBar'

class Account extends Component {
    constructor() {
        super();
        this.state = {
            imgUrl: '',
            page: "profile",
            name: '',
            location: '',
            bio: '',
            link1: '',
            link2: '',
            link3: '',
            forHire: false,
            userInfoExists: false,
            theme: 'twilight'
        }
    }

    componentDidMount() {
        axios.get('/api/users')
            .then(res => this.setState({
                imgUrl: res.data.img_url,
                name: res.data.name
            }))
            .catch(err => console.log(err));
        axios.get('/api/userinfo').then(res => {
            console.log(res.data)
            if (res.data[0]) {
            this.setState({
                location: res.data[0].location,
                bio: res.data[0].bio,
                link1: res.data[0].link1,
                link2: res.data[0].link2,
                link3: res.data[0].link3,
                forHire: res.data[0].for_hire,
                userInfoExists: true
            })
            }
        })
    }
    

    onDrop = files => {
        let { REACT_APP_UPLOAD_PRESET, CLOUDINARY_API_KEY, REACT_APP_CLOUD_NAME } = process.env;
        const uploaders = files.map(file => {
            // Information must be in form data, that's the way Cloudinary wants it
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", REACT_APP_UPLOAD_PRESET); // Replace the preset name with your own
            formData.append("api_key", CLOUDINARY_API_KEY); // Replace API key with your own Cloudinary key
            formData.append("timestamp", (Date.now() / 1000) | 0);

            this.setState({ imgUrl: files[0].preview })

            // Make an AJAX upload request using Axios, pass in formData
            return axios.post(`https://api.cloudinary.com/v1_1/${REACT_APP_CLOUD_NAME}/image/upload`, formData, {
                headers: { "X-Requested-With": "XMLHttpRequest" },
            }).then(response => {
                const data = response.data;
                const fileURL = data.secure_url // You should store this URL for future references in your app
                axios.put('/api/user/pic', { imgUrl: fileURL })
                    .catch(err => console.log(err));
            })
        });
    }

    updatePage(val) {
        this.setState({
            page: val
        })
    }

    handleUpdate(e, prop) {
        this.setState({
            [prop]: e.target.value
        })
    }

    saveInfo() {
        let { location, bio, link1, link2, link3, forHire } = this.state;
        if (this.state.userInfoExists) {
            axios.put('/api/update/userinfo', {location, bio, link1, link2, link3, forHire}).then(console.log("User information successfully updated"))
        } else {
            axios.post('/api/setuserinfo', { location, bio, link1, link2, link3, forHire }).then(console.log("User information successfully added"));
        }
        axios.put('/api/update/name', {name: this.state.name}).then(console.log("User name successfully updated"));
        window.location.hash = "#/profile";
    }

    updateTheme = (e) => {
        this.setState({
            theme: e.target.value
        })
    }

    saveTheme() {
        axios.put('/api/user/theme', {theme: this.state.theme}).then(console.log("User's theme successfully updated!"));
        window.location.hash = "#/profile";
    }

    render() {
        console.log(this.state.theme);
        return (
            <div>
                <NavBar />
                <div className="component-account">
                    <div className="account-container">
                        <div className="account-header">
                            <div className="account-save">
        {this.state.page === "profile" ? <button onClick={() => this.saveInfo()}>Save All Settings</button> : <button onClick={() => this.saveTheme()}>Save Theme</button> }
                            </div>
                            <div className="account-links">
                                {/* <Link path='/settings/profile'>Profile</Link>
                        <Link path='/settings/Account'>Account</Link> */}
                                <p onClick={() => this.updatePage("profile")}>Profile</p>
                                <p onClick={() => this.updatePage("editor")}>Editor</p>
                            </div>
                        </div>
                        {this.state.page === "editor" ? <EditorSettings theme={this.state.theme} updateTheme={this.updateTheme} /> : null}
                        {this.state.page === "profile" ? (
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
                                                <input type="text" value={this.state.name} onChange={(e) => this.handleUpdate(e, "name")} />
                                            </div>
                                            <div className="input-group">
                                                <h5>Location</h5>
                                                <input type="text" onChange={(e) => this.handleUpdate(e, "location")} value={this.state.location} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="information-box bio">
                                        <div className="box-header">
                                            <h3>Bio</h3>
                                        </div>
                                        <div className="textarea-group">
                                            <div className="title">
                                                <h5>About You</h5>
                                            </div>
                                            <div className="textarea">
                                                <textarea onChange={(e) => this.handleUpdate(e, "bio")} value={this.state.bio}></textarea>
                                                <p>{this.state.bio ? this.state.bio.length : 0}/100 <span className="small">characters used.</span></p>
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
                                                <input type="text" onChange={(e) => this.handleUpdate(e, "link1")} value={this.state.link1} />
                                            </div>
                                            <div className="input-group">
                                                <h5>Profile Link #2</h5>
                                                <input type="text" onChange={(e) => this.handleUpdate(e, "link2")} value={this.state.link2} />
                                            </div>
                                            <div className="input-group">
                                                <h5>Profile Link #3</h5>
                                                <input type="text" onChange={(e) => this.handleUpdate(e, "link3")} value={this.state.link3} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="information-box">
                                        <div className="box-header">
                                            <h3>Are you for hire?</h3>
                                        </div>
                                        <div className="slider-container">
                                            <p>Yes</p>
                                            <label className="switch">
                                                <input type="checkbox" />
                                                Yes  <span className="slider round"></span> No
                                    </label>
                                            <p>No</p>
                                        </div>
                                        <div className="hire-text">
                                            <p>You aren't for hire right now. See more about <span className="link-text">marking yourself as hireable</span></p>
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
                                        <Link to="/showcase"><button>Organize!</button></Link>
                                        <p>You can choose and arrange the Pens displayed
                                            on your profile.
                                </p>
                                    </div>
                                </div>
                            </div>

                        ) : null}
                    </div>
                </div>
            </div>
        )
    }
}

export default Account;