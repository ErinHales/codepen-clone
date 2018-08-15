import React, { Component } from 'react'
<<<<<<< HEAD
import templateIcon from './tempsnip.jpg'

class NavBar extends Component {
  constructor() {
    super()
    this.state = {
      togglePenWindow: false
    }
  }

  toggleNav() {
    this.setState({
      showNav: !this.state.showNav
    })
  }

  render() {

    return (
      <div>
        <nav className='nav1'>
          <div className='Name'>
            <h1>C L <img className='icon' src='http://blog.codepen.io/wp-content/uploads/2012/06/Button-White-Large.png' alt='' /> N E P E N</h1>
          </div>

          <div className='divProf'>
            <p className='Your'>YOUR</p>
            <h1 className='Prof'>Profile</h1>
            <div className='h-line'></div>
          </div>

          <div className='divExp'>
            <h1 className='Exp'>EXPLORE</h1>
            <h1 className='Prof'>Pens</h1>
            <div className='p-line'></div>
          </div>

          <div className='divProj'>
            <h1 className='Proj'>Projects</h1>
            <div className='prj-line'></div>
          </div>

          <div className='divColl'>
            <h1 className='Coll'>Collections</h1>
            <div className='coll-line'></div>
          </div>

          <div className='nav2'>
            <div className='create' onClick={() => this.toggleNav()}>
              <h1>Create</h1>
              <img className='arrow' src="https://static.wixstatic.com/media/0a9ac5_ada821b214df43feabfc80e16eebcbdb~mv2.gif" alt="arrow" />
            </div>

            <div>
              {this.state.penWin}
            </div>

            <div className='divMag'>
              <img className='mag' src="https://www.shareicon.net/download/2015/09/25/107005_find_512x512.png" alt="magnifier" />
            </div>

            <div>
              <img className='bell' src="https://www.applozic.com/assets/resources/lib/images/icon-bell.png" alt="Bell" />
            </div>

            <div className='userIcon'>
              <p>user<br />Pic</p>
            </div>
          </div>


          <div className={this.state.showNav ? 'show-nav createWin' : 'show-nav'}>
            <div className='createWindow'>
              <h2 className='newPen'> <img className='icon1' src={templateIcon} alt="" /> New Pen</h2>
            </div>
          </div>
          
=======

class NavBar extends Component {

  render() {
    return (
      <div>
        <nav class='navbar'>

          <div>
            <h1 class='Name' >C L <img class='icon' src='http://blog.codepen.io/wp-content/uploads/2012/06/Button-White-Large.png' alt='' />N E P E N</h1>
          </div>


          <div class='Prof-holder'>
            <div class='Your'>Your</div>
            <div class='Prof-pens'>Profile</div>
            <div class='h-line'></div>
          </div>


          <div class='Prof-holder'>
            <div class='Expl'>Explore</div>
            <div class='Prof-pens'>Pens</div>
            <div class='Ex-line'></div>
          </div>


          <div class='Prof-holder'>
            <h1 class='Proj'>
              Projects
            </h1>
            <div class='Pj-line'></div>
          </div>


          <div class='Prof-holder'>
            <h1 class='Coll'>
              Collections
            </h1>
            <div class='Coll-line'></div>
          </div>


          <div class='CreateBtn'>
            <h2 class='Create'>Create</h2>
            <img class='greenArrow' src="https://lh3.googleusercontent.com/mZ2zxLif1Q8FbUXCyUdiz_m7-QWb338r-sEIxsRrAWwQ1P_DTj0r3KsqHHSWq2SN67cRKeQAzLDs5K94Kag" alt="" />
          </div>


          <div>
            <img class='mag' src="https://vignette.wikia.nocookie.net/deusex/images/9/9b/Magnifying_glass_icon.png/revision/latest?cb=20141205155051&path-prefix=en" alt="" />
          </div>


          <div>
            <img class='Bell'
              src="https://www.applozic.com/assets/resources/lib/images/icon-bell.png" alt="" />
          </div>


          <div class='userPic'>
            <p>user pic</p>
          </div>

>>>>>>> master
        </nav>
      </div>
    )
  }
}

<<<<<<< HEAD
export default NavBar
=======
export default NavBar;
>>>>>>> master
