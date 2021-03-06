import React, {Component} from 'react';
import Codemirror from 'react-codemirror';
import 'codemirror/mode/css/css';


export default class CSS extends Component {
    
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
                <Codemirror ref="editor" value={this.props.css} onChange={this.props.updateCSS} options={options} autoFocus={false} />
            </div>
        )
    }
}