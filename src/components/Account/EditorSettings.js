import React, { Component } from 'react';

export default class EditorSettings extends Component {
    constructor() {
        super()

        this.state = {
            theme: "abcdef"
        }
    }

    updateTheme(val) {
        this.setState({
            theme: val
        })
    }

    render() {
        return (
            <div>
                <div className="themesContainer">
                    <button type="radio" onClick={() => this.updateTheme("abcdef")}>abcdef</button>
                    <button type="radio" onClick={() => this.updateTheme("ambiance")}>ambiance</button>
                    <button type="radio" onClick={() => this.updateTheme("base16-dark")}>base16-dark</button>
                    <button type="radio" onClick={() => this.updateTheme("bespen")}>bespin</button>
                    <button type="radio" onClick={() => this.updateTheme("blackboard")}>blackboard</button>
                    <button type="radio" onClick={() => this.updateTheme("cobalt")}>cobalt</button>
                    <button type="radio" onClick={() => this.updateTheme("colorforth")}>colorforth</button>
                    <button type="radio" onClick={() => this.updateTheme("dracula")}>dracula</button>
                    <button type="radio" onClick={() => this.updateTheme("duotone-dark")}>duotone-dark</button>
                    <button type="radio" onClick={() => this.updateTheme("erlang-dark")}>erlang-dark</button>
                    <button type="radio" onClick={() => this.updateTheme("gruvbox-dark")}>gruvbox-dark</button>
                    <button type="radio" onClick={() => this.updateTheme("hopscotch")}>hopscotch</button>
                    <button type="radio" onClick={() => this.updateTheme("isotope")}>isotope</button>
                    <button type="radio" onClick={() => this.updateTheme("lesser-dark")}>lesser-dark</button>
                    <button type="radio" onClick={() => this.updateTheme("liquibyte")}>liquibyte</button>
                    <button type="radio" onClick={() => this.updateTheme("lucario")}>lucario</button>
                    <button type="radio" onClick={() => this.updateTheme("material")}>material</button>
                    <button type="radio" onClick={() => this.updateTheme("mbo")}>mbo</button>
                    <button type="radio" onClick={() => this.updateTheme("mdn-like")}>mdn-like</button>
                    <button type="radio" onClick={() => this.updateTheme("midnight")}>midnight</button>
                    <button type="radio" onClick={() => this.updateTheme("monokai")}>monokai</button>
                    <button type="radio" onClick={() => this.updateTheme("night")}>night</button>
                    <button type="radio" onClick={() => this.updateTheme("oceanic-next")}>oceanic-next</button>
                    <button type="radio" onClick={() => this.updateTheme("panda-syntax")}>panda-syntax</button>
                    <button type="radio" onClick={() => this.updateTheme("paraiso-dark")}>paraiso-dark</button>
                    <button type="radio" onClick={() => this.updateTheme("pastel-on-dark")}>pastel-on-dark</button>
                    <button type="radio" onClick={() => this.updateTheme("railscasts")}>railscasts</button>
                    <button type="radio" onClick={() => this.updateTheme("rubyblue")}>rubyblue</button>
                    <button type="radio" onClick={() => this.updateTheme("seti")}>seti</button>
                    <button type="radio" onClick={() => this.updateTheme("shadowfox")}>shadowfox</button>
                    <button type="radio" onClick={() => this.updateTheme("the-matrix")}>the-matrix</button>
                    <button type="radio" onClick={() => this.updateTheme("tomorrow-night-bright")}>tomorrow-night-bright</button>
                    <button type="radio" onClick={() => this.updateTheme("tomorrow-night-eighties")}>tomorrow-night-eighties</button>
                    <button type="radio" onClick={() => this.updateTheme("twilight")}>twilight</button>
                    <button type="radio" onClick={() => this.updateTheme("vibrant-ink")}>vibrant-ink</button>
                    <button type="radio" onClick={() => this.updateTheme("xq-dark")}>xq-dark</button>
                    <button type="radio" onClick={() => this.updateTheme("yeti")}>yeti</button>
                    <button type="radio" onClick={() => this.updateTheme("zenburn")}>zenburn</button>
                </div>
            </div>
        )
    }
}