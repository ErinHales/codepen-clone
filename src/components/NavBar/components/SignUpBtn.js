import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class SignUp extends Component{

  render(){
    return(
      <div className='signBtn'>
       <Link to='/signup'><button 
        className='signUpButton'>
        Sign Up
        </button></Link>
      </div>
    )
  }
}


export default SignUp