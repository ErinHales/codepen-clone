import React, { Component } from 'react'
import templateIcon from './tempsnip.jpg'
import { Link } from 'react-router-dom'
import SearchBar from '../SearchBar/SearchBar';
import axios from 'axios'


class NavBar extends Component {
  constructor() {
    super()
    this.state = {
      togglePenWindow: false,
      id: '',
      user: '',
      search: false
    }

    this.logout = this.logout.bind(this);
  }
  toggleNav() {
    this.setState({
      showNav: !this.state.showNav
    })
  }

  toggleUserNav() {
    this.setState({
      userWindow: !this.state.userWindow
    })
  }

  postPen() {
    window.location.hash = "#/editor";
  }

  logout() {
    axios.post('/api/auth/logout').then(() => {
      this.setState({ user: null });
    })
  }

  componentDidMount() {
    axios.get('/api/users').then(res => {
      this.setState({
        user: res.data
      })
    })
  }

  userAvatar() {
    if (this.state.user.img_url === null || '') {
      return (
        <img className='nav-avatar' src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/186499/default-avatar.png' alt='' />
      )
    } else {
      return (
        <img className='nav-avatar' src={this.state.user.img_url} alt='' />
      )
    }
  }

  toggleSearch = () => {
    if(this.state.search === false) {
      this.setState({
        search: true
      })
    } else {
      this.setState({
        search: false
      })
    }
  }


  render() {
    return (
      <div className='Nav'>
        <nav className='nav1'>

          <div className='Name'>
            <h1>C L <img className='icon' src='http://blog.codepen.io/wp-content/uploads/2012/06/Button-White-Large.png' alt='' /> N E P E N</h1>
          </div>

          <Link to="/profile" className="link">
            <div className='divProf'>
              <p className='Your'>YOUR</p>
              <h1 className='Prof'>Profile</h1>
              <div className='h-line'></div>
            </div>
          </Link>

          <Link to="/pens" className="link">
            <div className='divExp'>
              <h1 className='Exp'>EXPLORE</h1>
              <h1 className='Prof'>Pens</h1>
              <div className='p-line'></div>
            </div>
          </Link>

          <div className='divProj'>
            <h1 className='Proj'>Challenges</h1>
            <div className='prj-line'></div>
          </div>

          <Link to='/About' className='link'>
            <div className='divColl'>
              <h1 className='Coll'>About</h1>
              <div className='coll-line'></div>
            </div>
          </Link>



          <div className='nav2'>
            <div className='create' onClick={() => this.toggleNav()}>
              <h1>Create</h1>
              <img className='arrow' src="https://static.wixstatic.com/media/0a9ac5_ada821b214df43feabfc80e16eebcbdb~mv2.gif" alt="arrow" />
            </div>


            <button className='divMag' onClick={() => this.toggleSearch()}>
              <img className='mag' src="https://www.shareicon.net/download/2015/09/25/107005_find_512x512.png" alt="magnifier" />
            </button>

            <div>
              <img className='bell' src="https://www.applozic.com/assets/resources/lib/images/icon-bell.png" alt="Bell" />
            </div>

            <div className='userIcon' onClick={() => this.toggleUserNav()}>
              {this.userAvatar()}
            </div>
          </div>


          <div className={this.state.showNav ? 'show-nav createWin' : 'show-nav'} onClick={() => this.toggleNav()}>
            <div className='createWindow'>
              <h2 className='newPen' onClick={() => this.postPen()}> <img className='icon1' src={templateIcon} alt="" /> New Pen</h2>
            </div>
          </div>

          <div className={this.state.userWindow ? 'show-nav userWin' : 'show-nav'} onClick={() => this.toggleUserNav()}>
            <div>
              <p className='goTo'> Go to...</p>
              <Link className="goToLink" to='/Profile'> <h1 className='Profile'> Your Profile</h1> </Link>
              <div className='sttngbox'>
                <Link to="/account" className="goToLink">
                  <div className='setbox'>
                    <h1><img className='gearIcon' src='https://cdn2.iconfinder.com/data/icons/web/512/Cog-512.png' alt='gear' />
                      Settings</h1>
                  </div>
                </Link>
                <div className='setbox' onClick={() => this.logout()}>
                  <h1><img className='logoutIcon' src="https://cdn4.iconfinder.com/data/icons/dashboard-icons/43/icon-logout-512.png" alt="logout" />
                    Log Out</h1>
                </div>
              </div>
            </div>
          </div>

        </nav>
        {this.state.search ? <SearchBar /> : null}
      </div>
    )
  }
}

export default NavBar