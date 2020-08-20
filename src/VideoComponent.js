import React, { Component, Box } from 'react';
export default class MyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.streamCamVideo = this.streamCamVideo.bind(this);
    }
    componentDidMount() {
        //this.streamCamVideo();
    }
    /*
    streamCamVideo() {
        var video = document.querySelector(".videoElement");

        if (navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(function (stream) {
                    video.srcObject = stream;
                })
                .catch(function (err0r) {
                    console.log("Something went wrong!");
                });
        }
    }*/
    streamCamVideo() {
        var constraints = { audio: true, video: { width: 60, height: 40 } };
        navigator.mediaDevices
            .getUserMedia(constraints)
            .then(function (mediaStream) {
                var video = document.querySelector('video');

                video.srcObject = mediaStream;
                video.onloadedmetadata = function (e) {
                    video.play();
                };
            })
            .catch(function (err) {
                console.log(err.name + ": " + err.message);
            });
    }
    /*
    <div id="container2">
                <video autoplay="true" className="videoElement">

                </video>
            </div>
    */
    render() {
        return (
            <div>
                <video autoPlay={true} className={this.props.name}></video>
            </div>
        )
    }
}
