import React, { Component } from 'react';
import './styles/main.css';
// import NavBar from './components/NavBar/NavBar';
import Profile from './components/Account/Profile';
import visitProfile from './components/Account/visitProfile'
import CodeEditor from './components/CodeEditor/CodeEditor';
import Pens from './components/Pens/Pens';
import SignUp from './components/SignUp/SignUp';
import Login from './components/Login/Login';
import Comments from './components/Comments/Comments';
import Search from './components/Search/Search';
import Account from './components/Account/account';
import { Switch, Route } from 'react-router-dom';
// import PenSettings from './components/PenSettings/PenSettings';
import Footer from './components/Footer/Footer';
import About from './components/About/About';

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <PenSettings /> */}
        {/* <SearchBar /> */}
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route exact path="/editor/:id" component={CodeEditor} />
          <Route path="/editor" component={CodeEditor} />
          <Route path="/pens" component={Pens} />
          <Route path="/profile/:id" component={visitProfile} />
          <Route path="/profile" component={Profile} />
          <Route path="/comments/:id" component={Comments} />
          <Route path="/account" component={Account} />
          <Route path="/about" component={About}/>
          <Route path="/search" component={Search} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;