import React, { Component } from 'react';
import './styles/main.css';
import CodeEditor from './components/CodeEditor/CodeEditor';
import NavBar from './components/NavBar/NavBar';
import Account from './components/Account/account';

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <NavBar/> */}
        {/* <CodeEditor /> */}
        <Account />
      </div>
    );
  }
}

export default App;
