import React, { Component } from 'react';
import Profile from './components/Account/Profile'
import CodeEditor from './components/CodeEditor/CodeEditor'
import {Switch, Route } from 'react-router-dom'

class routes extends Component{

  render(){
    return(   
        <Switch> 
          <Route exact path='/' component={CodeEditor}/>
          <Route path='/Profile' component={Profile}/>
        </Switch>
    )
  }

}

export default routes;