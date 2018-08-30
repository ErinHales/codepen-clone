import React, { Component } from 'react'
import Pen from '../Pen/Pen'
import axios from 'axios'
import { Link } from 'react-router-dom';
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
      search: '',
      displayShowcase: false
    }

  }
  componentDidMount() {
    axios.get(`/api/users?type=user`).then(res => {
      this.setState({
        user: res.data
      })
    })
    axios.get(`/api/pens/user/0/0?type=new`).then(res => {
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
    axios.get('/api/userinfo').then(res => {
      this.setState({
        userInfo: res.data[0]
      })
    })

    axios.get('/api/layout').then(res => {
      this.setState({
        showcase: res.data
      })
    })
  }

  getAllPens = () => {
    axios.get(`/api/pens/user/0/0?type=new`).then(res => {
      if (res.data[0]) {
        this.setState({
          pens: [res.data],
          currentPage: 0,
          search: ''
        })
      } else {
        this.setState({
          pens: false,
          currentPage: 0,
          search: ''
        })
      }
    })
  }

  userAvatar() {
    if (this.state.user.img_url === null) {
      return (
        <img className='avatar' src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/186499/default-avatar.png' alt='' />
      )
    } else {
      return (
        <img className='avatar' src={this.state.user.img_url} alt='' />
      )
    }
  }


  nextPage() {
    let { search, currentPage, pens } = this.state;
    if (search === '') {
      axios.get(`/api/pens/user/0/${currentPage + 1}?type=new`)
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
    } else {
      axios.get(`/api/search/userpens/${currentPage + 1}?search=${search}`)
        .then(res => {
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
  }

  getPrev() {
    this.setState({
      currentPage: this.state.currentPage - 1
    })
  }

  searchUserPens() {
    axios.get(`/api/search/userpens/0?search=${this.state.search}`).then(response => {
      console.log(response.data);
      this.setState({
        pens: [response.data],
        currentPage: 0
      })
    })
  }

  toggleDisplayShowcase = () => {
    this.setState({
      displayShowcase: !this.state.displayShowcase,
      currentPage: 0,
      search: ''
    })
  }

  updateSearch = (e) => {
    this.setState({
      search: e.target.value
    })
  }

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
              : null}
          </div>

          <Link className='link' to="/account">
            <div className='EditP'>
              <h1 onClick={() => this.props.history.push('/account')}>Edit Profile</h1>
            </div>
          </Link>

          <div className='UserInfo'>
            <div>
              <h1 className='UserName'>{user.name}</h1>
              <p id='Name2'>@{user.username}</p>
              <div id='UserPic'>
                {this.userAvatar()}
              </div>
              { userInfo ? <h3>{this.state.userInfo.location}</h3> : null }
              { userInfo ? <h3>{this.state.userInfo.bio}</h3> : null }
            </div>
          </div>

          <div className="profileContainer">

            <div className='Pen-InputWrapper'>
              <div>
                <h2 className={this.state.displayShowcase ? 'Pens2' : ' Pens2 link-active '} onClick={() => {
                  this.state.displayShowcase ? this.toggleDisplayShowcase() : null
                  this.getAllPens()
                }} >All Pens</h2>
                <h2 className={this.state.displayShowcase ? 'Proj2 link-active' : 'Proj2'} onClick={() => !this.state.displayShowcase ? this.toggleDisplayShowcase() : null} >Showcase</h2>
              </div>
              <input className='Inp-box' type="text" placeholder='Search These Pens...' value={this.state.search} onChange={(e) => this.updateSearch(e)} onKeyUp={(e) => e.keyCode === 13 ? this.searchUserPens() : null} />
            </div>

            <div className='ligthgray-line'></div>
            <div className='gray-line'></div>


            {this.state.displayShowcase ? <ShowCaseProfile showcase={this.state.showcase} /> :
              this.state.pens ? (
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
                    <h1>You haven't <br />made any pens yet!</h1>
                    <Link to="/editor"><button>Create Pen</button></Link>
                  </div>
                )
            }


          </div>
        </div>
      </div>
    )
  }
}

export default Profile;