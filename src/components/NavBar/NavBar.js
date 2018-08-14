import React, { Component } from 'react'

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

        </nav>
      </div>
    )
  }
}

export default NavBar;