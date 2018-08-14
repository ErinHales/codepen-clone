import React, { Component } from 'react';
import './styles/main.css';
// import Login from './components/Login/Login';
import CodeEditor from './components/CodeEditor/CodeEditor';

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <Login /> */}
        <CodeEditor />
      </div>
    );
  }
}

export default App;
