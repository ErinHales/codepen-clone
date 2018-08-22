import React, {Component} from 'react';

export default class Challenges extends Component {
    constructor() {
        super();

        this.state = {

        }
    }

    render() {
        return (
            <div className="challenges">
                <img src="https://static.codepen.io/assets/marketing/challenges/sparkles-24b6bd07cc18fccac0f58a3919e43c333fc41a94e09a48366424076a25af0425.svg" alt=""/>
                <h1>CHALLENGES</h1>
                <p>CodePen Challenges are fun opportunities to level up your skills by building things. We prompt you with a theme and our challenge to you is to learn something and build something aligned with the theme.</p>
                <p>You're subscribed! We'll be emailing you Mondays with that week's challenge, ideas, and resources. </p>
                <p>Manage notifications.</p>
            </div>
        )
    }
}