import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class LoginBtn extends Component{

    render(){
        return(
            <div className='signBtn'>
            <Link to='/'><button 
            className='signUpButton'>
            Login
            </button></Link>
            </div>
        )
    }
}


export default LoginBtn