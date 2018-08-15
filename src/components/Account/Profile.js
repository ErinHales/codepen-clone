import React, { Component } from 'react'
// import NavBar from '../NavBar/NavBar'

class Profile extends Component {

  render() {
    return (
      <div className='Content'>
        <div className='grayLine'>
        </div>

        <div className='b-line'>
          <div className=''>
            <h1>Followers</h1>
          </div>
          <div>
            <h1>Following</h1>
          </div>
            <div>Hire Me</div>
        </div>

        <div className='UserInfo'>
          <div>
            <h1 className='UserName'>UserName</h1>
            <p className='Name2'>@abcd123</p>
            <div className='UserPic'>
              <h2>Image</h2>
            </div>
            <h3>City, State</h3>
          </div>
        </div>

      </div>
    )
  }
}

export default Profile;