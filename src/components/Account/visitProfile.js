import React, { Component } from 'react'
import Pen from '../Pen/Pen'
import axios from 'axios'
import { Link } from 'react-router-dom'
import NavBar from '../NavBar/NavBar'
import ShowCaseProfile from './ShowCaseProfile';
class Profile extends Component {
    constructor() {
        super()
        this.state = {
            user: '',
            pens: [],
            currentPage: 0,
            userInfo: {},
            showcase: [],
            displayShow: false,
            userInfo: {}
        }

    }

    componentDidMount() {
        let { id } = this.props.match.params;
        axios.get(`/api/users?id=${id}`).then(res => {
            this.setState({
                user: res.data[0]
            })
        })
        axios.get(`/api/pens/user/${id}/0?type=new`).then(res => {
            if (res.data[0]) {
                this.setState({
                    pens: [res.data],
                    currentPage: 0
                })
            } else {
                this.setState({
                    pens: false,
                    currentPage: 0
                })
            }
        })
        axios.get(`/api/userinfo?userid=${id}`).then(res => {
            this.setState({
                userInfo: res.data[0]
            })
        })
        axios.get(`/api/layout?userid=${id}`).then(res => {
            console.log(res.data)
            this.setState({
                showcase: res.data
            })
        })
    }

    userAvatar() {
        if (this.state.user.img_url === null) {
            return (
                <img className='avatar' src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/186499/default-avatar.png' alt='avatar' />
            )
        } else {
            return (
                <img className='avatar' src={this.state.user.img_url} alt='avatar' />
            )
        }
    }


    nextPage() {
        let { currentPage, pens } = this.state;
        let { id } = this.props.match.params;
        axios.get(`/api/pens/user/${id}/${currentPage + 1}?type=new`)
            .then(res => {
                if (res.data[0]) {
                    let copy = pens.slice();
                    copy.push(res.data);
                    this.setState({
                        pens: copy,
                        currentPage: currentPage + 1
                    })
                }
            })
    }

    getPrev() {
        this.setState({
            currentPage: this.state.currentPage - 1
        })
    }

    toggleDisplayShowcase = () => {
        this.setState({
            displayShowcase: !this.state.displayShowcase,
            currentPage: 0
        })
    }

    // searchUserPens() {
    //     axios.get(`/api/search/userpens/0?search=${this.state.search}`).then(response => {
    //         this.setState({
    //             pens: [response.data],
    //             currentPage: 0,
    //             displayShowcase: false
    //         })
    //     })
    // }

    render() {
        let { currentPage, pens, user, userInfo } = this.state;
        if (pens[currentPage]) {
            var pensList = pens[currentPage].map(pen => {
                let { pen_id, name, username, img_url, description, views, comments, loves, scripts, html, css, js } = pen;
                return (
                    <Pen
                        key={pen_id}
                        id={pen_id}
                        profilePicture={img_url}
                        scripts={scripts}
                        html={html}
                        css={css}
                        js={js}
                        description={description}
                        username={username}
                        penName={name}
                        views={views}
                        commentsNum={comments}
                        loves={loves} />
                );
            })
        }
        return (
            <div>
                <NavBar />
                <div className='Content'>
                    <div className='grayLine'>
                    </div>

                    <div className='b-line'>
                        <div className='followers'>
                            <h1> 0 Followers</h1>
                            <h1 className='followers'> 0 Following</h1>
                        </div>
                        {userInfo ?
                            <div className="links">
                                {userInfo.link1 ? <a href={userInfo.link1} target="_blank">Profile Link {userInfo.link2 ? 1 : ""}</a> : null}
                                {userInfo.link2 ? <a href={userInfo.link2} target="_blank">Profile Link 2</a> : null}
                                {userInfo.link3 ? <a href={userInfo.link3} target="_blank">Profile Link 3</a> : null}
                                <div className='Hire'>Hire Me</div>
                            </div>
                            :
                            <div>
                                <div className='Hire'>Hire Me</div>
                            </div>
                        }
                    </div>

                    <div className='UserInfo'>
                        <div>
                            <h1 className='UserName'>{user.name}</h1>
                            <p id='Name2'>@{user.username}</p>
                            <div id='UserPic'>
                                {this.userAvatar()}
                            </div>
                            {userInfo ? <h3>{this.state.userInfo.location}</h3> : null}
                            {userInfo ? <h3>{this.state.userInfo.bio}</h3> : null}
                        </div>
                    </div>

                    <div className="profileContainer">

                        <div className='Pen-InputWrapper'>
                            <div>
                                <h2 className={this.state.displayShowcase ? 'Pens2' : ' Pens2 link-active '} onClick={() => this.state.displayShowcase ? this.toggleDisplayShowcase() : null} >All Pens</h2>
                                <h2 className={this.state.displayShowcase ? 'Proj2 link-active' : 'Proj2'} onClick={() => !this.state.displayShowcase ? this.toggleDisplayShowcase() : null} >Showcase</h2>
                            </div>
                            {/* <input className='Inp-box' type="text" placeholder='Search These Pens...' /> */}
                        </div>

                        <div className='ligthgray-line'></div>
                        <div className='gray-line'></div>

                        {this.state.displayShowcase ? <ShowCaseProfile toggleDisplayShowcase={this.toggleDisplayShowcase} visiting={true} userid={this.props.match.params.id} showcase={this.state.showcase} /> : this.state.pens ? (
                            <div className="pen-window">
                                <div>
                                    {pensList}
                                </div>
                                <div className="nextButtonContainer">
                                    <button className="nextButton" style={{ display: this.state.currentPage === 0 ? "none" : "block" }} onClick={() => this.getPrev()}><i className="fa fa-angle-left"></i>Prev</button>
                                    <button className='pagination' onClick={() => this.nextPage()}>Next <i className="fa fa-angle-right"></i></button>
                                </div>
                            </div>
                        ) : (
                                <div className="goMakePens">
                                    <h1>Sorry, this person <br />doesn't have any pens.</h1>
                                    <Link to="/search"><button>Back to Search</button></Link>
                                </div>
                            )}
                    </div>
                </div>
            </div>
        )
    }
}

export default Profile;