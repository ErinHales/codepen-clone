import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import UserPic from './components/UserPic'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import Fork from './components/Fork';
import Save from './components/Save'

class NavBar2 extends Component {
  constructor(props){
    super(props)
    this.state={
      user: '',
      penUser: '',
      pen:'',
      input: 'Untitled Pen'
    }
    this.backToPen = this.backToPen.bind(this)
    this.getUser = this.getUser.bind(this)
  }

  getUser() {
    axios.get('/api/users').then(res => {
      console.log(res.data)
      this.setState({
        user:res.data
      })
    })
    .catch()

  }
  componentDidUpdate() {
    if(!this.state.user) {
      this.getUser()
    }
  }
  componentDidMount(){
    this.getUser()
  }

  componentChange(){
    if(!this.props.isUser){
      if(this.props.match.path === '/editor') {
        return(
          <Save savePen={this.props.savePen}/>
        )
      }
      else {
        return(
          <Fork fork={this.props.fork}/>
        )
      }
    }else{
      return(
        <Save savePen={this.props.savePen}/>
      )
    }
    
  }

  backToPen() {
    this.props.history.push('/pens')
  }
  
  titleChanger(){
    console.log(this.state.user.name)
    if(this.props.isUser || this.props.match.path === '/editor'){
    return(
      <div className='titleChng'>
      <div>
        <input style={{width: (this.props.penName.length * 13) - ( ((this.props.penName.length * 13) / 4.3))}} type='text' className='titleInput' value={this.props.penName} onKeyDown={(e) => e.keyCode === 13 ? this.props.savePen() : null } onChange={(e) => this.props.updateName(e)}/>
        <img src="https://vignette.wikia.nocookie.net/freestyle2/images/7/79/Icon_edit.png/revision/latest?cb=20160907075220" alt="" className='penIcon' onClick={this.props.savePen}/>
      </div>
      <p className='APenBy'>A PEN BY
        {this.state.user.name ? (
          <Link to='/profile' className='link'><span className='userName'>{this.state.user.name}</span></Link>
        ) : (
          <span className='userName'>Anonymous</span>
        )}</p>
      </div>
    )}else {
      return(
        <div className='titleChng'>
          <p style={{width: (this.props.penName.length * 13) - ( ((this.props.penName.length * 13) / 4.3))}}>{this.props.penName}</p>
          <p className='APenBy'>A PEN BY 
            <Link to={`/profile/${this.props.penUserId}`} className='link'><span className='userName'>{this.props.userName}</span></Link></p>
      </div>
      )
    }
  }

  changeTitle(){
    this.setState({
      input:''
    })
  }
  
  
  render() {
    return (
      <div>
        <div className='Nav'>
          <nav className='nav1'>

            <div className='Name2'>
              <img className='icon2' onClick={this.backToPen} src='http://blog.codepen.io/wp-content/uploads/2012/06/Button-White-Large.png' alt='' />
              <div className='title'>
                {this.titleChanger()}
                {/* <p className='APenBy'>A PEN BY 
                  <Link to='/profile' className='link'><span className='userName'>{this.props.userName}</span></Link></p> */}
              </div>

            </div>



            <div className='nav2'>

              {this.componentChange()}

              <div onClick={() => this.props.settingsPopUpHandler(!this.props.showSettings)} className='SettingsBox'>
                <img className='settGear' src="https://cdn2.iconfinder.com/data/icons/web/512/Cog-512.png" alt=""/>
                <p>Settings</p>

              </div>
              
              <div>
                <UserPic/>
              </div>



            </div>




          </nav>
        </div>
      </div>
    )
  }
}

export default withRouter(NavBar2)