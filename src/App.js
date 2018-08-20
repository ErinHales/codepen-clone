import React, { Component } from 'react';
import './styles/main.css';
// import CodeEditor from './components/CodeEditor/CodeEditor';
import Pens from './components/Pens/Pens';
import CodeEditor from './components/CodeEditor/CodeEditor';
import SignUp from './components/SignUp/SignUp';
import Login from './components/Login/Login';
import NavBar from './components/NavBar/NavBar'
import Routes from './routes'

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar/>
        <Routes />
          <NavBar/>
       {/* <Pens />  */}
        <Login />
            
        <SignUp />
        {/* <CodeEditor /> */}


      </div>
    );
  }
}

export default App;
