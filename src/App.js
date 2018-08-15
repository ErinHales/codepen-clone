import React, { Component } from 'react';
import './styles/main.css';
import CodeEditor from './components/CodeEditor/CodeEditor';
import Login from './components/Login/Login';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Login />
        {/* <CodeEditor /> */}
      </div>
    );
  }
}

export default App;
