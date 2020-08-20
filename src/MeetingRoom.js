import React from 'react';
import './draggableStyles.css';
import DraggableView from './DraggableView';
import ResizableView from './ResizableView';

export default class MeetingRoom extends React.Component {
    constructor(props) {
        super(props);
        
    }
    componentDidMount() {
        
    }
    render() {
        return (
            <div>
                {/*<DraggableView name="cam1"/>
                <DraggableView name="cam2"/>*/}
                <ResizableView/>
            </div>
        );
    }
}