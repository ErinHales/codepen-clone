import React, { Component } from 'react'
import templateIcon from './tempsnip.jpg'

class NavBar extends Component {

  render() {
    return (
      <div>
        <nav class='nav1'>
          <div class='Name'>
            <h1>C L <img class='icon' src='http://blog.codepen.io/wp-content/uploads/2012/06/Button-White-Large.png' alt='' /> N E P E N</h1>
          </div>

          <div class='divProf'>
            <p class='Your'>YOUR</p>
            <h1 class='Prof'>Profile</h1>
            <div class='h-line'></div>
          </div>

          <div class='divExp'>
            <h1 class='Exp'>EXPLORE</h1>
            <h1 class='Prof'>Pens</h1>
            <div class='p-line'></div>
          </div>

          <div class='divProj'>
            <h1 class='Proj'>Projects</h1>
            <div class='prj-line'></div>
          </div>

          <div class='divColl'>
            <h1 class='Coll'>Collections</h1>
            <div class='coll-line'></div>
          </div>

          <div class='nav2'>
            <div class='create'>
              <h1>Create</h1>
              <img class='arrow' src="https://static.wixstatic.com/media/0a9ac5_ada821b214df43feabfc80e16eebcbdb~mv2.gif" alt="arrow" />
            </div>

            <div class='divMag'>
              <img class='mag' src="https://www.shareicon.net/download/2015/09/25/107005_find_512x512.png" alt="magnifier" />
            </div>

            <div>
              <img class='bell' src="https://www.applozic.com/assets/resources/lib/images/icon-bell.png" alt="Bell" />
            </div>

            <div class='userIcon'>
              <p>user<br/>Pic</p>
            </div>
          </div>
          
        </nav>
      </div>
    )
  }
}

export default NavBar
