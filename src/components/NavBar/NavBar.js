import React, { Component } from 'react'
import templateIcon from './tempsnip.jpg'
import { Link } from 'react-router-dom'
import UserPic from './components/UserPic'
import SignUpBtn from './components/SignUpBtn'
import { withRouter } from 'react-router-dom'


class NavBar extends Component {
  constructor() {
    super()
    this.state = {
      togglePenWindow: false,
    }

  }
  toggleNav() {
    this.setState({
      showNav: !this.state.showNav
    })
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

  
  render() {
    console.log(this.props.match)
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


            <div className='divMag'>
              <img className='mag' src="https://www.shareicon.net/download/2015/09/25/107005_find_512x512.png" alt="magnifier" />
            </div>

            <div>
              {this.componentChange()}
            </div>
            
          </div>


          <div className={this.state.showNav ? 'show-nav createWin' : 'show-nav'}>
            <div className='createWindow'>
              <h2 className='newPen' onClick={() => this.postPen()}> <img className='icon1' src={templateIcon} alt="" /> New Pen</h2>
            </div>
          </div>


        </nav>
      </div>
    )
  }
}

export default withRouter(NavBar)