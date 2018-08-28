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
  }

  componentDidMount(){
    axios.get('/api/users').then(res => {
      this.setState({
        user:res.data
      })
    })

    const {id} = this.props.match.params
    axios.get(`/api/penInfo/${id}`).then(response => {
      this.setState({
          pen: response.data,
          penUser: response.data,
      })
  })
  .catch()

  }

  componentChange(){
    if(this.props.match.path !== '/editor'){
      return(
        <Fork/>
      )
    }else if(this.props.match.path === '/editor'){
      return(
        <Save savePen={this.props.savePen}/>
      )
    }
    
  }

  backToPen() {
    this.props.history.push('/pens')
  }
  
  titleChanger(){

    if(this.props.match.path === '/editor'){
    return(
      <div className='titleChng'>
      <input type='text' className='titleInput' placeholder={this.state.input} onChange={(e) => this.props.updateName(e)}/>
      <img src="https://vignette.wikia.nocookie.net/freestyle2/images/7/79/Icon_edit.png/revision/latest?cb=20160907075220" alt="" className='penIcon' onClick={() => this.changeTitle()}/>
      <p className='APenBy'>A PEN BY 
        <Link to='/profile' className='link'><span className='userName'>{this.state.user.name}</span></Link></p>
      </div>
    )}else if(this.props.match.path === '/editor/:id'){
      return(
        <div className='titleChng'>
          <p>{this.props.penName}{console.log(this.props.penName)}</p>
          <p className='APenBy'>A PEN BY 
            <Link to='/profile' className='link'><span className='userName'>{this.props.userName}</span></Link></p>
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