import React, { Component, Box, Button } from 'react';
export default class MeetingTile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            n: 5,
            //wid: window.innerWidth,
            //hei: window.innerHeight,
            wid: 0,
            hei: 0,
            tileW: 0,
            tileH: 0,
            row: 0,
            col: 0,
            test: 0,
            segments: [],
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
        this.setState({ wid: window.innerWidth, hei: window.innerHeight });
    }
    calculateTileSize() {
        var sx = Math.ceil(Math.sqrt(this.state.n));
        var ro = Math.ceil(this.state.n / sx);
        var co = Math.ceil(this.state.n / ro);
        //this.setState({test: ro});

        if (this.state.n == 7) {
            this.setState({ segments: [4, 3], testarr: [4, 3] });
        } else if (this.state.n == 8) {
            this.setState({ segments: [4, 4], testarr: [4, 4] });
        } else {
            var temp = []
            var n2 = this.state.n;
            while (1) {
                n2 = n2 - co;
                if (n2 > co)
                    temp.push(co);
                else {
                    temp.push(co);
                    temp.push(n2);
                    break;
                }
            }
            var x = Math.ceil(this.state.width / ro);
            //var x = Math.ceil(window.innerWidth / ro);
            var y = Math.ceil(this.state.height / co);
            //var y = Math.ceil(window.innerHeight / co);
            //this.setState({ segments: temp, tileW: y, tileH: x });
            this.setState({segments: temp, row: co, col: ro});
        }

    }
    //<video key={i} autoPlay={true} src="videos/sampleVid.mp4" controls={false}></video>
    render() {
        return (
            <div style={{flex: 1}}>
                {
                    this.state.segments.map((k) =>
                        <div style={{display: "flex", justifyContent:'center', alignItems:'center', flexDirection: "row"}}>
                            {[...Array(k)].map((i) =>
                                <video
                                    key={i}
                                    autoPlay={true}
                                    src="videos/sampleVid.mp4"
                                    controls={false}
                                    style={{ 
                                        width: (window.innerWidth / this.state.row) - 10, 
                                        height: window.innerHeight / this.state.col - 10,
                                        alignSelf: "center"
                                    }}
                                >
                                </video>
                            )}
                        </div>
                    )
                }
            </div>
        )
    }
}
