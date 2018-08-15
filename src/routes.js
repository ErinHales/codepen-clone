import React, { Component } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom'

class routes extends Component{

  render(){
    return(
      <HashRouter>  
        <Switch> 
          <Route exact patch='/' component={Home}/> 
        </Switch>
      </HashRouter>
    )
  }

}

export default routes;