import React, {Component} from 'react';
import Codemirror from 'react-codemirror';
import 'codemirror/mode/xml/xml';


export default class HTML extends Component {

    render() {
        var options = {
            lineNumbers: true,
            mode: 'text/html',
            autoCloseTags: true,
            autoCloseBrackets: true,
            theme: 'abcdef'
        };
        return (
            <div>
                <Codemirror ref="editor" value={this.props.html} onChange={this.props.updateHTML} options={options} autoFocus={true} />
            </div>
        )
    }
}