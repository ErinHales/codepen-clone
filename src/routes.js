import React, { Component } from 'react';
import Profile from './components/Account/Profile';
import CodeEditor from './components/CodeEditor/CodeEditor';
import Login from './components/Login/Login';
import Pens from './components/Pens/Pens';
import Account from './components/Account/account';
import {Switch, Route } from 'react-router-dom'

class routes extends Component{

  render(){
    return(   
        <Switch>
          <Route exact path='/' component={Login} /> 
          <Route exact path='/home' component={Pens} /> 
          {/* <Route  path='/' component={CodeEditor}/> */}
          <Route path='/profile' component={Profile}/>
          <Route path='/account' component={Account}/>
        </Switch>
    )
  }

}

export default routes;