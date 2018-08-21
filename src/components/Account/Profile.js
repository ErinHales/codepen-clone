import React, { Component } from 'react'
import Pen from '../Pen/Pen'
import axios from 'axios'
import Footer from '../Footer/Footer'
import {Link} from 'react-router-dom';

class Profile extends Component {
  constructor() {
    super()
    this.state = {
      user: '',
      pens: '',
      currentPage: 0
    }

  }

  componentDidMount() {
    axios.get('/api/users').then(res => {
      this.setState({
        user: res.data
      })
    })

    axios.get(`/api/pens/user/3/0?type=new`).then(res => {
      this.setState({
        pens: [res.data],
        currentPage: 0
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
    axios.get(`/api/pens/user/3/${currentPage + 1}?type=new`)
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
    let { currentPage, pens } = this.state;
    if (pens[currentPage]) {
      var pensList = pens[currentPage].map(pen => {
        let { pen_id, name, username, img_url, views, comments, likes, scripts, html, css, js } = pen;
        return (
          <Pen
            key={pen_id}
            id={pen_id}
            profilePicture={img_url}
            scripts={scripts}
            html={html}
            css={css}
            js={js}
            username={username}
            penName={name}
            views={views}
            commentsNum={comments}
            loves={likes} />
        );
      })
    }

    return (
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

        <div className='EditP'>
          <Link to="/account"><h1 onClick={() => this.props.history.push('/account')}>Edit Profile</h1></Link>
        </div>

        <div className='UserInfo'>
          <div>
            <h1 className='UserName'>{this.state.user.username}</h1>
            <p className='Name2'>{this.state.user.email}</p>
            <div className='UserPic'>
              {this.userAvatar()}
            </div>
            <h3 className='Name2'>{this.state.user.name}</h3>
          </div>
        </div>

        <div className='Pen-InputWrapper'>
          <h2 className='Pens2'>All Pens</h2>
          <h2 className='Proj2'>Showcase</h2>

        </div>
        <input className='Inp-box' type="text" placeholder='Search These Pens...' />

        <div className='ligthgray-line'></div>
        <div className='gray-line'></div>

        <div className='Pen-window'>
          {pensList}

          <button className="nextButton" style={{ display: this.state.currentPage === 0 ? "none" : "block" }} onClick={() => this.getPrev()}><i className="fa fa-angle-left"></i>Prev</button>
          <button className='pagination' onClick={() => this.nextPage()}>Next <i className="fa fa-angle-right"></i></button>

        </div>
        <Footer />

      </div>
    )
  }
}

export default Profile;