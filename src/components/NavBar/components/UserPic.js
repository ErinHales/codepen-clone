import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

class UserPic extends Component {
  constructor() {
    super()
    this.state = {
      togglePenWindow: false,
      id: '',
      user: ''
    }

    this.logout = this.logout.bind(this);
  }
  getDerivedStateFromProps(nextProps) {
    console.log('1fired')
    if(nextProps.isLoggedIn === true) {
      console.log('2fired')
      this.forceUpdate()
    }
  }

  componentDidMount() {
    axios.get('/api/users').then(res => {
      this.setState({
        user: res.data
      })
    })
  }

  toggleUserNav() {
    this.setState({
      userWindow: !this.state.userWindow
    })
  }

  logout() {
    axios.get('/api/logout').then(() => {
      this.setState({ user: '' });
      this.toggleUserNav()
      this.userAvatar()
    })
    window.location.hash = "#/";
  }

  userAvatar(){
    if(this.state.user.userid) {
      console.log('fired')
        if(this.state.user.img_url === null){
          return(
            <img className='nav-avatar' src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/186499/default-avatar.png' alt=''/>
          )
        }else if(this.state.user === ''){
          return(
            <img className='nav-avatar' src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/186499/default-avatar.png' alt=''/>
          )
        }else{
          return(
            <img className='nav-avatar' src={this.state.user.img_url} alt=''/>
          )
        }
    }
  }

  render() {
    console.log(this.state.user.userid)
    return (
      <div className='container'>
        <div>
          <img className='bell' src="https://www.applozic.com/assets/resources/lib/images/icon-bell.png" alt="Bell" />
        </div>
        {this.state.user.userid ? (        
            <div className='userIcon' onClick={() => this.toggleUserNav()}>
              {this.userAvatar()}
            </div>
          ) : ( 
            null
          )
        }


        <div className={this.state.userWindow ? 'show-nav userWin' : 'show-nav'}>
          <div>
            <p className='goTo'> Go to...</p>
            <Link className='link' to='/Profile' onClick={() => this.toggleUserNav()}> <h1 className='Profile'> Your Profile</h1> </Link>

            <div className='settingsCtn'>
              <Link to="/account" className="accountLink">
                <div>
                  <h1><img className='icon' src='https://cdn2.iconfinder.com/data/icons/web/512/Cog-512.png' alt='gear' />
                    Settings</h1>
                </div>
              </Link>
              <div onClick={() => this.logout()}>
                <h1><img className='icon' src="https://cdn4.iconfinder.com/data/icons/dashboard-icons/43/icon-logout-512.png" alt="logout" />
                  Log Out</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default UserPic;