import React, { Component } from 'react';
import './styles/main.css';
// import CodeEditor from './components/CodeEditor/CodeEditor';
// import Login from './components/Login/Login';
// import Pens from './components/Pens/Pens';
import CodeEditor from './components/CodeEditor/CodeEditor';
<<<<<<< HEAD
=======
import NavBar from './components/NavBar/NavBar'
>>>>>>> master

class App extends Component {
  render() {
    return (
      <div className="App">
<<<<<<< HEAD
        {/* <Pens /> */}
        <CodeEditor />
        {/* <Login /> */}
        {/* <CodeEditor /> */}
=======
        <NavBar/>
        <CodeEditor />
>>>>>>> master
      </div>
    );
  }
}

export default App;
