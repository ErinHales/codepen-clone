import React, { Component } from 'react'

class Fork extends Component {

  render() {
    return (
      <div className='HFBox'>
        <div className='heart'>
          <img className='heartIcon' src="https://www.skylantern-original.co.uk/themes/skylantern/images/heart_icon_white.png" alt="" />
        </div>

        <div className='forkBox'>
          <img className='forkIcon' src="https://cdn.iconscout.com/public/images/icon/free/png-256/git-branch-323baee0622aaddd-256x256.png" alt="" />
          <p className='fork'>Fork</p>
        </div>
      </div>
    )
  }
}

export default Fork