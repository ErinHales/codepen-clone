import React, { Component } from 'react';
import './styles/main.css';
import CodeEditor from './components/CodeEditor/CodeEditor';
import SignUp from './components/SignUp/SignUp';
import Login from './components/Login/Login';

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <Login /> */}
        <SignUp />
        {/* <CodeEditor /> */}
      </div>
    );
  }
}

export default App;
