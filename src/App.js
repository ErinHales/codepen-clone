import React, { Component } from 'react';
import './styles/main.css';
// import CodeEditor from './components/CodeEditor/CodeEditor';
// import Login from './components/Login/Login';
// import Pens from './components/Pens/Pens';
import CodeEditor from './components/CodeEditor/CodeEditor';
import SignUp from './components/SignUp/SignUp';
import Login from './components/Login/Login';
import NavBar from './components/NavBar/NavBar'

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <Login /> */}
        <SignUp />
        {/* <CodeEditor /> */}
        <NavBar/>
        <CodeEditor />
      </div>
    );
  }
}

export default App;
