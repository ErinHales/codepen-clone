import React, { Component } from 'react';
import './styles/main.css';
import CodeEditor from './components/CodeEditor/CodeEditor';

class App extends Component {
  render() {
    return (
      <div className="App">
        <CodeEditor />
      </div>
    );
  }
}

export default App;
