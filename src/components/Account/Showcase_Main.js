import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        hovered: monitor.isOver(),
        item: monitor.getItem()
    }
}
const dropSource = {
    drop(props, monitor, component) {
        console.log(component);
        console.log(monitor.getItem());
        let currentPenId = props.penId
        let receivingPenId = monitor.getItem().pen.id;
        if (currentPenId === '') {
            props.addShowcaseMain(monitor.getItem().pen.imgUrl, monitor.getItem().pen.id);
        }
        else if (currentPenId !== receivingPenId) {
            
            // let incomingPenId = monitor.getItem().penId;
            // let showcasePenId = component.props.penId;
            // IF the showcase pen and the incoming pen have different id's then we can switch them
            // let { gridItem, imgUrl } = monitor.getItem();
            // let showcaseImg = component.props.img;
            // props.switchShowcase(gridItem, imgUrl, showcaseImg, showcasePenId, incomingPenId);
        }
    }
}
class Showcase_Main extends Component {
    constructor() {
        super();
        this.state = {
            imgUrl: ''
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.img !== prevProps.img) {
            this.setState({ imgUrl: this.props.img })
        }
    }
    render() {
        const { connectDropTarget, hovered, item } = this.props;
        return connectDropTarget(
            <div className="showcase-main">
                <img src={this.state.imgUrl ? this.state.imgUrl : ''} alt="" />
            </div>
        )
    }
}
export default DropTarget('item', dropSource, collect)(Showcase_Main);