import React, {Component} from 'react';
import Codemirror from 'react-codemirror';
import 'codemirror/mode/xml/xml';


export default class HTML extends Component {
    constructor(props) {
        super(props)
        this.codeMirror = React.createRef()
    }
    render() {
        console.log(this.props)
        var options = {
            lineNumbers: true,
            mode: 'text/html',
            autoCloseTags: true,
            autoCloseBrackets: true,
            theme: 'abcdef'
        };
        return (
            <div>
                <Codemirror ref={this.codeMirror} value={this.props.html} onChange={this.props.updateHTML} options={options} autoFocus={true} />
            </div>
        )
    }
}