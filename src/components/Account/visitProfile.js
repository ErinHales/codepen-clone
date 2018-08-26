import React, { Component } from 'react'
import Pen from '../Pen/Pen'
import axios from 'axios'
import { Link } from 'react-router-dom'
import NavBar from '../NavBar/NavBar'

class Profile extends Component {
    constructor() {
        super()
        this.state = {
            user: '',
            pens: [],
            currentPage: 0
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
                console.log(res.data);
                if (res.data[0]) {
                    let copy = pens.slice();
                    copy.push(res.data);
                    console.log(copy);
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

    render() {
        let { currentPage, pens, user } = this.state;
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
        console.log(pensList);
        return (
            <div>
                <NavBar />
                <div className='Content'>
                    <div className='grayLine'>
                    </div>

                    <div className='b-line'>
                        <div className='Hire'>Hire Me</div>
                        <div className='followers'>
                            <h1> 0 Followers</h1>
                        </div>
                        <div>
                            <h1 className='followers'> 0 Following</h1>
                        </div>
                    </div>

                    <div className='UserInfo'>
                        <div>
                            <h1 className='UserName'>{user.name}</h1>
                            <p className='Name2'>{user.username}</p>
                            <div className='UserPic'>
                                {this.userAvatar()}
                            </div>
                            {/* <h3 className='Name2'>{this.state.user.name}</h3> */}
                        </div>
                    </div>

                    <div className="profileContainer">

                        <div className='Pen-InputWrapper'>
                            <div>
                                <h2 className='Pens2'>All Pens</h2>
                                <h2 className='Proj2'>Showcase</h2>
                            </div>
                            <input className='Inp-box' type="text" placeholder='Search These Pens...' />
                        </div>

                        <div className='ligthgray-line'></div>
                        <div className='gray-line'></div>

                        {this.state.pens ? (
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