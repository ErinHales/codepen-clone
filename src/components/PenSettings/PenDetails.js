import React, {Component} from 'react';

export default class PenDetails extends Component {

    render() {
        return (
            <div className="penDetails">
                <h2>Pen Title</h2>
                <input type="text" value={this.props.name} onChange={(e) => this.props.updateName(e)} />
                <h2>Pen Description</h2>
                <textarea 
                    type="text" 
                    value={this.props.description} 
                    onChange={(e) => this.props.updateDescription(e)} 
                    placeholder="Explain what's going on in your pen here.  This text is searchable, so it can also help others find your work.  Remember to credit others where credit is due." />
            </div>
        )
    }
}