import React, { Component } from 'react'
import templateIcon from './tempsnip.jpg'
import { Link } from 'react-router-dom'
import UserPic from './components/UserPic'
import SignUpBtn from './components/SignUpBtn'
import { withRouter } from 'react-router-dom'
// import SearchBar from '../SearchBar/SearchBar';
import axios from 'axios'


class NavBar extends Component {
  constructor() {
    super()
    this.state = {
      togglePenWindow: false,
      showYourProfile: false,
      id: '',
      user: '',
      search: false
    }

  }
  toggleNav() {
    this.setState({
      showNav: !this.state.showNav
    })
  }

  componentWillMount() {
    axios.get('/api/users')
      .then( res => {
        if(res.data.userid) {
          this.setState({showYourProfile: true})
        }
      })
      .catch(console.error)
  }

  postPen() {
    window.location.hash = "#/editor"
    this.toggleNav()
  }

  componentChange(){
    if(this.props.match.path !== '/'){
      return(
        <UserPic/>
      )
    }else if(this.props.match.path === '/'){
      return(
        <SignUpBtn/>
      )
    }
    
  }

  // toggleSearch = () => {
  //   if(this.state.search === false) {
  //     this.setState({
  //       search: true
  //     })
  //   } else {
  //     this.setState({
  //       search: false
  //     })
  //   }
  // }


  render() {
    return (
      <div className='Nav'>
        <nav className='nav1'>

          <div className='Name'>
            <Link to='/' className='link'><h1 className='clonepen'>C L <img className='icon' src='http://blog.codepen.io/wp-content/uploads/2012/06/Button-White-Large.png' alt='' /> N E P E N</h1></Link>
          </div>
          {this.state.showYourProfile ? (
            <Link to="/profile" className="link">
              <div className='divProf'>
                <p className='Your'>YOUR</p>
                <h1 className='Prof'>Profile</h1>
                <div className='h-line'></div>
              </div>
            </Link>
          ) : (
            null
          )}

          <Link to="/pens" className="link">
            <div className='divExp'>
              <h1 className='Exp'>EXPLORE</h1>
              <h1 className='Prof'>Pens</h1>
              <div className='p-line'></div>
            </div>
          </Link>

          <div className='divProj'>
            <Link className='link' to='/challenges'><h1 className='Proj'>Challenges</h1></Link>
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


            <Link to="/search">
              <button className='divMag'>
                <img className='mag' src="https://www.shareicon.net/download/2015/09/25/107005_find_512x512.png" alt="magnifier" />
              </button>
            </Link>

            <div>
              {this.componentChange()}
            </div>
            
          </div>


          <div className={this.state.showNav ? 'show-nav createWin' : 'show-nav'} onClick={() => this.toggleNav()}>
            <div className='createWindow'>
              <h2 className='newPen' onClick={() => this.postPen()}> <img className='icon1' src={templateIcon} alt="" /> New Pen</h2>
            </div>
          </div>


        </nav>
        {/* {this.state.search ? <SearchBar /> : null} */}
      </div>
    )
  }
}

export default withRouter(NavBar)