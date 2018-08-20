import React, { Component } from 'react';
import './styles/main.css';
import NavBar from './components/NavBar/NavBar';
import Profile from './components/Account/Profile';
import CodeEditor from './components/CodeEditor/CodeEditor';
import Pens from './components/Pens/Pens';
import SignUp from './components/SignUp/SignUp';
import Login from './components/Login/Login';
import Comments from './components/Comments/Comments';
import SearchBar from './components/SearchBar/SearchBar';
import { Switch, Route } from 'react-router-dom'
import PenSettings from './components/PenSettings/PenSettings';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <SearchBar />
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route path="/editor/:id" component={CodeEditor} />
          <Route path="/pens" component={Pens} />
          <Route path="/profile" component={Profile} />
          <Route path="/comments" component={Comments} />
        </Switch>
      </div>
    );
  }
}

export default App;