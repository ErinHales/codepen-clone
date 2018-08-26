import React, { Component } from 'react';
import Codemirror from 'react-codemirror';
import 'codemirror/mode/css/css';
import axios from 'axios';


export default class EditorSettings extends Component {
    constructor() {
        super()

        this.state = {
            css: `body {\n\tcolor: rebeccapurple;\n\t/* background-color: black; */\n} \n\nh1:after {\n\tcontent: 'Welcome';\n}\n\n@media (min-width: 500px) {\n\t.container {\n\t\tcolor: white;\n\t}\n}`
        }
    }

    render() {
        var options = {
            lineNumbers: true,
            mode: 'css',
            autoCloseTags: true,
            autoCloseBrackets: true,
            theme: this.props.theme
        };
        return (
            <div>
                <div className="theme-save">
                    <button onClick={() => this.updateTheme()}>Save Theme</button>
                </div>
                <div className="editorSettings">
                    <div className="sampleEditor">
                        <Codemirror ref="editor" value={this.state.css} options={options} autoFocus={false} />
                    </div>
                    <form className="themesContainer">
                        <div>
                            <div className="dark">
                                <h3>DARK</h3>
                                <h4>THEMES</h4>
                            </div>
                            <div className="columns">
                                <div>
                                    <input name="themes" type="radio" value="twilight" id="twilight" onChange={(e) => this.props.updateTheme(e)} defaultChecked></input>
                                    <label for="twilight">Twilight</label><br />
                                    <input name="themes" type="radio" value="abcdef" id="abcdef" onChange={(e) => this.props.updateTheme(e)}></input>
                                    <label for="abcdef">abcdef</label><br />
                                    <input name="themes" type="radio" value="ambiance" id="ambiance" onChange={(e) => this.props.updateTheme(e)}></input>
                                    <label for="ambiance">Ambiance</label><br />
                                    <input name="themes" type="radio" value="base16-dark" id="base16-dark" onChange={(e) => this.props.updateTheme(e)}></input>
                                    <label for="base16-dark">Base16</label><br />
                                    <input name="themes" type="radio" value="bespin" id="bespin" onChange={(e) => this.props.updateTheme(e)}></input>
                                    <label for="baspin">Bespin</label><br />
                                    <input name="themes" type="radio" value="blackboard" id="blackboard" onChange={(e) => this.props.updateTheme(e)}></input>
                                    <label for="blackboard">Blackboard</label><br />
                                    <input name="themes" type="radio" value="cobalt" id="cobalt" onChange={(e) => this.props.updateTheme(e)}></input>
                                    <label for="cobalt">Cobalt</label><br />
                                    <input name="themes" type="radio" value="colorforth" id="colorforth" onChange={(e) => this.props.updateTheme(e)}></input>
                                    <label for="colorfoth">Colorforth</label><br />
                                    <input name="themes" type="radio" value="darcula" id="darcula" onChange={(e) => this.props.updateTheme(e)}></input>
                                    <label for="darcula">Darcula</label><br />
                                    <input name="themes" type="radio" value="dracula" id="dracula" onChange={(e) => this.props.updateTheme(e)}></input>
                                    <label for="dracula">Dracula</label><br />
                                    <input name="themes" type="radio" value="duotone-dark" id="duotone-dark" onChange={(e) => this.props.updateTheme(e)}></input>
                                    <label for="duotone-dark">Duotone</label><br />
                                    <input name="themes" type="radio" value="erlang-dark" id="erlang-dark" onChange={(e) => this.props.updateTheme(e)}></input>
                                    <label for="erlang-dark">Erlang</label><br />
                                </div>
                                <div>
                                    <input name="themes" type="radio" value="gruvbox-dark" id="gruvbox-dark" onChange={(e) => this.props.updateTheme(e)}></input>
                                    <label for="gruvbox">Gruvbox</label><br />
                                    <input name="themes" type="radio" value="hopscotch" id="hopscotch" onChange={(e) => this.props.updateTheme(e)}></input>
                                    <label for="hopscotch">Hopscotch</label><br />
                                    <input name="themes" type="radio" value="isotope" id="isotope" onChange={(e) => this.props.updateTheme(e)}></input>
                                    <label for="isotope">Isotope</label><br />
                                    <input name="themes" type="radio" value="lesser-dark" id="lesser-dark" onChange={(e) => this.props.updateTheme(e)}></input>
                                    <label for="lesser-dark">Lesser</label><br />
                                    <input name="themes" type="radio" value="liquibyte" id="liquibyte" onChange={(e) => this.props.updateTheme(e)}></input>
                                    <label for="liquibyte">Liquibyte</label><br />
                                    <input name="themes" type="radio" value="lucario" id="lucario" onChange={(e) => this.props.updateTheme(e)}></input>
                                    <label for="lucario">Lucario</label><br />
                                    <input name="themes" type="radio" value="material" id="material" onChange={(e) => this.props.updateTheme(e)}></input>
                                    <label for="material">Material</label><br />
                                    <input name="themes" type="radio" value="mbo" id="mbo" onChange={(e) => this.props.updateTheme(e)}></input>
                                    <label for="mbo">MBO</label><br />
                                    <input name="themes" type="radio" value="midnight" id="midnight" onChange={(e) => this.props.updateTheme(e)}></input>
                                    <label for="midnight">Midnight</label><br />
                                    <input name="themes" type="radio" value="monokai" id="monokai" onChange={(e) => this.props.updateTheme(e)}></input>
                                    <label for="monokai">Monokai</label><br />
                                    <input name="themes" type="radio" value="night" id="night" onChange={(e) => this.props.updateTheme(e)}></input>
                                    <label for="night">Night</label><br />
                                    <input name="themes" type="radio" value="paraiso-dark" id="paraiso-dark" onChange={(e) => this.props.updateTheme(e)}></input>
                                    <label for="paraiso-dark">Paraiso</label><br />
                                </div>
                                <div>
                                    <input name="themes" type="radio" value="pastel-on-dark" id="pastel-on-dark" onChange={(e) => this.props.updateTheme(e)}></input>
                                    <label for="pastel-on-dark">Pastel</label><br />
                                    <input name="themes" type="radio" value="railscasts" id="railscasts" onChange={(e) => this.props.updateTheme(e)}></input>
                                    <label for="railscasts">Railscasts</label><br />
                                    <input name="themes" type="radio" value="rubyblue" id="rubyblue" onChange={(e) => this.props.updateTheme(e)}></input>
                                    <label for="rubyblue">Ruby Blue</label><br />
                                    <input name="themes" type="radio" value="seti" id="seti" onChange={(e) => this.props.updateTheme(e)}></input>
                                    <label for="seti">Seti</label><br />
                                    <input name="themes" type="radio" value="shadowfox" id="shadowfox" onChange={(e) => this.props.updateTheme(e)}></input>
                                    <label for="shadowfox">Shadow Fox</label><br />
                                    <input name="themes" type="radio" value="the-matrix" id="the-matrix" onChange={(e) => this.props.updateTheme(e)}></input>
                                    <label for="the-matrix">The Matrix</label><br />
                                    <input name="themes" type="radio" value="tomorrow-night-bright" id="tomorrow-night-bright" onChange={(e) => this.props.updateTheme(e)}></input>
                                    <label for="tomorrow-night-bright">Tomorrow Night</label><br />
                                    <input name="themes" type="radio" value="tomorrow-night-eighties" id="tomorrow-night-eighties" onChange={(e) => this.props.updateTheme(e)}></input>
                                    <label for="tomorrow-night-eighties">Eighties</label><br />
                                    <input name="themes" type="radio" value="vibrant-ink" id="vibrant-ink" onChange={(e) => this.props.updateTheme(e)}></input>
                                    <label for="vibrant-ink">Vibrant</label><br />
                                    <input name="themes" type="radio" value="xq-dark" id="xq-dark" onChange={(e) => this.props.updateTheme(e)}></input>
                                    <label for="xq-dark">XQ</label><br />
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="light">
                                <h3>LIGHT</h3>
                                <h4>THEMES</h4>
                            </div>
                            <div className="columns">
                                <div>
                                    <input name="themes" type="radio" value="base16-light" id="base16-light" onChange={(e) => this.props.updateTheme(e)}></input>
                                    <label for="base16-light">Base 16</label><br />
                                    <input name="themes" type="radio" value="duotone-light" id="duotone-light" onChange={(e) => this.props.updateTheme(e)}></input>
                                    <label for="duotone-light">Duotone</label><br />
                                    <input name="themes" type="radio" value="eclipse" id="eclipse" onChange={(e) => this.props.updateTheme(e)}></input>
                                    <label for="eclipse">Eclipse</label><br />
                                    <input name="themes" type="radio" value="elegant" id="elegant" onChange={(e) => this.props.updateTheme(e)}></input>
                                    <label for="elegant">Elegant</label><br />
                                    <input name="themes" type="radio" value="icecoder" id="icecoder" onChange={(e) => this.props.updateTheme(e)}></input>
                                    <label for="icecoder">Icecoder</label><br />
                                    <input name="themes" type="radio" value="mdn-like" id="mdn-like" onChange={(e) => this.props.updateTheme(e)}></input>
                                    <label for="mdn-like">MDN</label><br />
                                </div>
                                <div>
                                    <input name="themes" type="radio" value="neat" id="neat" onChange={(e) => this.props.updateTheme(e)}></input>
                                    <label for="neat">Neat</label><br />
                                    <input name="themes" type="radio" value="neo" id="neo" onChange={(e) => this.props.updateTheme(e)}></input>
                                    <label for="neo">Neo</label><br />
                                    <input name="themes" type="radio" value="oceanic-next" id="oceanic-next" onChange={(e) => this.props.updateTheme(e)}></input>
                                    <label for="oceanic-next">Oceanic</label><br />

                                    <input name="themes" type="radio" value="panda-syntax" id="panda-syntax" onChange={(e) => this.props.updateTheme(e)}></input>
                                    <label for="panda-syntax">Panda</label><br />
                                    <input name="themes" type="radio" value="paraiso-light" id="paraiso-light" onChange={(e) => this.props.updateTheme(e)}></input>
                                    <label for="paraiso-light">Paraiso</label><br />
                                    <input name="themes" type="radio" value="solarized" id="solarized" onChange={(e) => this.props.updateTheme(e)}></input>
                                    <label for="solarized">Solarized</label><br />
                                </div>
                                <div>
                                    <input name="themes" type="radio" value="ssms" id="ssms" onChange={(e) => this.props.updateTheme(e)}></input>
                                    <label for="ssms">SSMS</label><br />
                                    <input name="themes" type="radio" value="ttcn" id="ttcn" onChange={(e) => this.props.updateTheme(e)}></input>
                                    <label for="ttcn">TTCN</label><br />
                                    <input name="themes" type="radio" value="xq-light" id="xq-light" onChange={(e) => this.props.updateTheme(e)}></input>
                                    <label for="xq-light">XQ</label><br />
                                    <input name="themes" type="radio" value="yeti" id="yeti" onChange={(e) => this.props.updateTheme(e)}></input>
                                    <label for="yeti">Yeti</label><br />
                                    <input name="themes" type="radio" value="zenburn" id="zenburn" onChange={(e) => this.props.updateTheme(e)}></input>
                                    <label for="zenburn">Zenburn</label>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}