import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar'

export default class Challenges extends Component {
    constructor() {
        super();

        this.state = {

        }
        this.subscribeBtn = this.subscribeBtn.bind(this)
    }

    subscribeBtn() {
        return (
            alert("You're subscribed! We'll be emailing you Mondays with that week's challenge, ideas, and resources.")
        )
    }

    render() {
        return (
            <div>
                <NavBar />
                <div className="challenge">
                    <img className='sparkles' src="https://static.codepen.io/assets/marketing/challenges/sparkles-24b6bd07cc18fccac0f58a3919e43c333fc41a94e09a48366424076a25af0425.svg" alt="" />
                    <h1 className='Title2'>CHALLENGES</h1>
                    <p className='text3'>CodePen Challenges are fun opportunities to level up your skills by building things. We prompt you with a theme and our challenge to you is to learn something and build something aligned with the theme.</p>

                    <h6 className='subscribe' onClick={() => this.subscribeBtn()}>Subscribe to Challenges</h6>

                    <div className='challenge1'>
                        <div className='august'>
                            <p>AUGUST 2018-RIGHT NOW</p>
                        </div>
                        <div>
                            <h4 className='teach'>Teaching <img className='teacher' src="http://icons.iconarchive.com/icons/google/noto-emoji-people-profession/1024/10218-man-teacher-icon.png" alt="" /></h4>
                            <p className='text2'>One of the best ways to really understand something is to teach it. Let's do that this month! You don't have to be a teacher by trade to teach someone something, anybody can give it a go, especially when they've just learned that something. Take that moment when began to understand something and share it.</p>
                            <div className='box3'>
                                <div>
                                    <p>BROUGHT TO YOU BY</p>
                                    <img className='Event' src="https://static.codepen.io/assets/marketing/challenges/an-event-apart-logo-460d2a37fb8ee44dd66dc47802be0f185c9997ba2b11bfb6964e7762b2c139d4.svg" alt="" />
                                </div>
                                <p className='text4'>To design a better experience, attend a better-design web conference. An Event Apart is three days of design, code, and content taught by absolute masters-the people who shape our medium.</p>
                            </div>
                        </div>
                    </div>

                    {/* <p>Manage notifications.</p> */}
                </div>
            </div>
        )
    }
}