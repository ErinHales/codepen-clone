import React, { Component } from 'react'
import axios from 'axios'

class Profile extends Component {

  componentDidMount(){
    // axios.post('/api/auth/login', {credentials:'test@gmail.com', password: '123'}).then(res => {
    //   this.props(res.data)
    // })
  }

  render() {
    let {user} = this.props;
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
          <h1 onClick={() => this.props.history.push('/account')}>Edit Profile</h1>
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

        <div className='Pen-InputWrapper'>
          <h2 className='Pens2'>Pens</h2>
          <h2 className='Proj2'>Projects</h2>
          <h2 className='Coll2'>Collections</h2>
        </div>
          <input className='Inp-box' type="text" placeholder='Search These Pens...'/>

        <div className='ligthgray-line'></div>
        <div className='gray-line'></div>

        <div className='Pen-window'>
          <h1>DISPLAY USER PEN HERE</h1>
            
        </div>

        <div className='footer'>
          <div className='nameHolder'>
          <h1 className='Name-footer'>C L <img className='icon-footer' src='http://blog.codepen.io/wp-content/uploads/2012/06/Button-White-Large.png' alt='' /> N E P E N</h1>
          <p className='Clonpen'>2018 ClonePen</p>
          <p className='demo'>Demo or it didn't happen</p>
          </div>
        </div>

      </div>
    )
  }
}

export default Profile;