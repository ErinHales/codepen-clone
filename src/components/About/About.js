import React, { Component } from 'react'
import Footer from '../Footer/Footer'
import Alan from './Alan.png'
import Erin from './Erin.PNG'
import Michael from './Michael.PNG'
import Anthony from './Anthony.jpg'


class About extends Component {

  render() {
    return (
      <div>
        <div className='Backgrnd'>
          <div className='contact'>
            <h1 className='About'>About <br /> ClonePen</h1>
            <p className='email'>Email us anytime at support@clonepen.io. You can find us at DevMountain room PFEIFFERHORN.</p>
            <p className='address'>ClonePen 123 WN Right There st. UT, 84000, United States</p>
          </div>

          <div className='description'>
            <h3><p className='clonePen'> <img className='wave' src='https://emojipedia-us.s3.amazonaws.com/thumbs/160/facebook/65/waving-hand-sign_1f44b.png' alt='' />ClonePen is a social development environment.</p> A useful and liberating tool for developers of any skill, and particularly empowering for people learning to code. We focus primarily on front-end languages like HTML, CSS, JavaScript, and preprocessing syntaxes that turn into those things.</h3>
          </div>

          <div className='Devs'>

            <div className='divisions'>
              <img className='Pic' src={Erin} alt=""/>
              <h1 className='devName'>Erin Hales</h1>
              <h3 className='coDev'>Co-Developer</h3>
              <p className='descrptn'>Highly motivated and intelligent young web developer focusing on React. With a passion for problem solving and design, web development has proved to be the perfect fit.</p>
            </div>

            <div className='divisions'>
              <img className='Pic' src={Alan} alt=""/>
              <h1 className='devName'>Alan Ibarra</h1>
              <h3 className='coDev'>Co-Developer</h3>
              <p className='descrptn'>Full stack web developer experienced in React, Node, SQL, and JavasScript. I am a recent graduate from DevMountain where I learned a variety of web development skills in a fast paced practical manner.</p>
            </div>

            <div className='divisions'>
              <img className='Pic' src={Michael} alt=""/>
              <h1 className='devName'>Michael Fearn</h1>
              <h3 className='coDev'>Co-Developer</h3>
              <p className='descrptn'>Enjoy solving hard problems. Thinking through a challenge and carrying out the plan to shape data into what I need is deeply satisfying. Working with the full-stack brings me numerous opportunities to work on crunchy problems.</p>
            </div>

            <div className='divisions'>
              <img className='Pic' src={Anthony} alt=""/>
              <h1 className='devName'>Ruben Ortiz</h1>
              <h3 className='coDev'>Co-Developer</h3>
              <p className='descrptn'>Full Stack Web Developer always looking for opportunities were where to practice and further develop greater knowledge on this amazing career. Always seeking to learn new technologies and techniques to be a better developer.</p>
            </div>

            <div className='divisions1'>
              <h3>We say social, because CodePen is a community. Most creations on ClonePen are public and open source. They are living things that other people and the community can interact with, from a simple hearting, to leaving a comment, to forking and changing for their own needs.</h3>
            </div>
            <div className='divisions1'>
              <h3>We're trying to make ClonePen a happy and healthy place for front-end designers and developers and the people looking for them, while also being a damn fine place to code.</h3>
            </div>

          </div>

        </div>
        {/* <Footer /> */}
      </div>
    )
  }
}

export default About 