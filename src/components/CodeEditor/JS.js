import React, {Component} from 'react';
import Codemirror from 'react-codemirror';
import 'codemirror/mode/javascript/javascript';


export default class JavaScript extends Component {

    render() {
        var options = {
            lineNumbers: true,
            mode: 'javascript',
            autoCloseTags: true,
            autoCloseBrackets: true,
            theme: this.props.theme
        };
        return (
            <div>
                <Codemirror ref="editor" value={this.props.js} onChange={this.props.updateJS} options={options} autoFocus={false} />
            </div>
        )
    }
}