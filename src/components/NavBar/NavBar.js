import React, { Component } from 'react'
import templateIcon from './tempsnip.jpg'
import { Link } from 'react-router-dom'
import axios from 'axios'

class NavBar extends Component {
  constructor() {
    super()
    this.state = {
      togglePenWindow: false,
      id: null
    }
  }

  toggleNav() {
    this.setState({
      showNav: !this.state.showNav
    })
  }

  postPen = () => {
    // const { user_id, name, forked, html, css, js, scripts } = req.body
    // add user_id in the backend once we set up sessions
    let html = '<h1>CLONEPEN</h1>';
    let css = 'body {\n\tbackground-color: black;\n\tcolor: white\n}\n\nh1 {\n\ttext-align: center;\n}';
    let js = 'var clonePen;'
    let scripts = {
      html: {
        html_tag_class: "test\n\t testttttsss",
        head_tag: "test\n\t testttttsss"
      },
      css: ["asdfasdf"],
      js: ["asdfasdf", "adqwerpsadf"]
    }
    let bodyObj = { user_id: 3, name: 'new pen', forked: false, html: '', css: '', js: '', scripts };
    axios.post('/api/pen/', bodyObj).then(response => {
      this.setState({
        id: response.data.pen_id
      })
    }).catch(console.error());
  }

  handleClick = () => {
    this.postPen();
    this.toggleNav();
  }

  render() {

    return (
      <div className='Nav'>
        <nav className='nav1'>

          <div className='Name'>
            <h1>C L <img className='icon' src='http://blog.codepen.io/wp-content/uploads/2012/06/Button-White-Large.png' alt='' /> N E P E N</h1>
          </div>

          <Link to="/profile" className="link">
            <div className='divProf'>
              <p className='Your'>YOUR</p>
              <h1 className='Prof'>Profile</h1>
              <div className='h-line'></div>
            </div>
          </Link>

          <Link to="/pens" className="link">
            <div className='divExp'>
              <h1 className='Exp'>EXPLORE</h1>
              <h1 className='Prof'>Pens</h1>
              <div className='p-line'></div>
            </div>
          </Link>

          <div className='divProj'>
            <h1 className='Proj'>Challenges</h1>
            <div className='prj-line'></div>
          </div>

          <div className='divColl'>
            <h1 className='Coll'>About</h1>
            <div className='coll-line'></div>
          </div>



          <div className='nav2'>
            <div className='create' onClick={() => this.toggleNav()}>
              <h1>Create</h1>
              <img className='arrow' src="https://static.wixstatic.com/media/0a9ac5_ada821b214df43feabfc80e16eebcbdb~mv2.gif" alt="arrow" />
            </div>

            <div>
              {this.state.penWin}
            </div>

            <div className='divMag'>
              <img className='mag' src="https://www.shareicon.net/download/2015/09/25/107005_find_512x512.png" alt="magnifier" />
            </div>

            <div>
              <img className='bell' src="https://www.applozic.com/assets/resources/lib/images/icon-bell.png" alt="Bell" />
            </div>

            <div className='userIcon'>
              <Link to='/Profile'> <p>user<br />Pic</p> </Link>
            </div>
          </div>


          <div className={this.state.showNav ? 'show-nav createWin' : 'show-nav'}>
            <div className='createWindow' onClick={() => this.handleClick()}>
              <h2 className='newPen'> <img className='icon1' src={templateIcon} alt="" /> New Pen</h2>
            </div>
          </div>

        </nav>
      </div>
    )
  }
}

export default NavBar