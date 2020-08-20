import React, { Component, Box, Button} from 'react';
export default class MeetingTile extends React.Component {
    constructor(props) {
        super(props);
        const pad = 5;
        this.state = { 
            n: 16,
            width: 0, 
            height: 0,
            points: [],
            tileW: 0,
            tileH: 0,
            test: 0,
            segments: [],
            testarr: []
        };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.calculateTileSize = this.calculateTileSize.bind(this);
    }
    componentDidMount() {
        //this.streamCamVideo();
        this.updateWindowDimensions();
        this.calculateTileSize();
        window.addEventListener('resize', this.updateWindowDimensions);
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }
    calculateTileSize(){
        var sx = Math.ceil(Math.sqrt(this.state.n));
        var ro = Math.ceil(this.state.n / sx);
        var co = Math.ceil(this.state.n / ro);
        this.setState({test: ro});

        if(this.state.n == 7){
            this.setState({segments: [4, 3], testarr: [4, 3]});
        }else if(this.state.n == 8){
            this.setState({segments: [4, 4], testarr: [4,4]});
        }else{
            var temp = []
            var n2 = this.state.n;
            while(1){
                n2 = n2 - co;
                if(n2>co)
                temp.push(co);
                else {
                    temp.push(co);
                    temp.push(n2);
                    break;
                }
            }
            this.setState({segments: temp});
        }
    }

    render() {
        return (
            <div style={{flex: 1, alignContent: "center", alignItems: "center"}}>
                {this.state.width}{this.state.height}{"test: "+this.state.test}
                {this.state.segments.map((i)=>
                <p key={i}>row {i} </p>
                )}
                {[...Array(this.state.n)].map(
                    (e, i) => 
                    <video key={i} autoPlay={true} src="videos/sampleVid.mp4" controls={false}></video>
                    )}
            </div>
        )
    }
}
