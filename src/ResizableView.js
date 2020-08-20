import React, { Component, Box } from 'react';
import { ResizableStyle } from './styles';
import './resizable.css';
import MyComponent from './VideoComponent';
export default class ResizableView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            videoSrc: ""
          }
        //this.streamCamVideo = this.streamCamVideo.bind(this);
        this.makeResizableDiv = this.makeResizableDiv.bind(this);
    }
    componentDidMount() {
        //this.streamCamVideo();
        this.makeResizableDiv('.resizable');
    }
    makeResizableDiv(div) {
        const element = document.querySelector(div);
        const resizers = document.querySelectorAll(div + ' .resizer')
        const minimum_size = 20;
        let original_width = 0;
        let original_height = 0;
        let original_x = 0;
        let original_y = 0;
        let original_mouse_x = 0;
        let original_mouse_y = 0;
        for (let i = 0; i < resizers.length; i++) {
            const currentResizer = resizers[i];
            currentResizer.addEventListener('mousedown', function (e) {
                e.preventDefault()
                original_width = parseFloat(getComputedStyle(element, null).getPropertyValue('width').replace('px', ''));
                original_height = parseFloat(getComputedStyle(element, null).getPropertyValue('height').replace('px', ''));
                original_x = element.getBoundingClientRect().left;
                original_y = element.getBoundingClientRect().top;
                original_mouse_x = e.pageX;
                original_mouse_y = e.pageY;
                window.addEventListener('mousemove', resize)
                window.addEventListener('mouseup', stopResize)
            })

            function resize(e) {
                if (currentResizer.classList.contains('bottom-right')) {
                    const width = original_width + (e.pageX - original_mouse_x);
                    const height = original_height + (e.pageY - original_mouse_y)
                    if (width > minimum_size) {
                        element.style.width = width + 'px'
                    }
                    if (height > minimum_size) {
                        element.style.height = height + 'px'
                    }
                }
                else if (currentResizer.classList.contains('bottom-left')) {
                    const height = original_height + (e.pageY - original_mouse_y)
                    const width = original_width - (e.pageX - original_mouse_x)
                    if (height > minimum_size) {
                        element.style.height = height + 'px'
                    }
                    if (width > minimum_size) {
                        element.style.width = width + 'px'
                        element.style.left = original_x + (e.pageX - original_mouse_x) + 'px'
                    }
                }
                else if (currentResizer.classList.contains('top-right')) {
                    const width = original_width + (e.pageX - original_mouse_x)
                    const height = original_height - (e.pageY - original_mouse_y)
                    if (width > minimum_size) {
                        element.style.width = width + 'px'
                    }
                    if (height > minimum_size) {
                        element.style.height = height + 'px'
                        element.style.top = original_y + (e.pageY - original_mouse_y) + 'px'
                    }
                }
                else {
                    const width = original_width - (e.pageX - original_mouse_x)
                    const height = original_height - (e.pageY - original_mouse_y)
                    if (width > minimum_size) {
                        element.style.width = width + 'px'
                        element.style.left = original_x + (e.pageX - original_mouse_x) + 'px'
                    }
                    if (height > minimum_size) {
                        element.style.height = height + 'px'
                        element.style.top = original_y + (e.pageY - original_mouse_y) + 'px'
                    }
                }
            }

            function stopResize() {
                window.removeEventListener('mousemove', resize)
            }
        }
    }
    //makeResizableDiv('.resizable')
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
        var constraints = { audio: true, video: { width: 128, height: 72 } };
        navigator.mediaDevices
            .getUserMedia(constraints)
            .then(function (mediaStream) {
                //var videos = document.querySelector(".videoElement");
                var videos = document.getElementsByClassName("videoElement");
                videos.forEach(element => {
                    element.srcObject = mediaStream;
                    console.log("hello");
                    element.onloadedmetadata = function(e){
                        element.play();
                    }
                });
                //video.srcObject = mediaStream;
                //video.onloadedmetadata = function (e) {
                  //  video.play();
                //};
            })
            .catch(function (err) {
                console.log(err.name + ": " + err.message);
            });
    }
    render() {
        return (
            <div class="wrap">
                <div class="resize horizontal">Resize me!</div>
                <div class="resize vertical">Resize me!</div>
                <div class="resize both">Resize me!</div>
                <hr />
                <div class='resizable'>
                    <div class='resizers'>
                        <div class='resizer top-left'></div>
                        <div class='resizer top-right'></div>
                        <div class='resizer bottom-left'></div>
                        <div class='resizer bottom-right'></div>
                    </div>
                    <MyComponent name="cam1"/>
                    <MyComponent name="cam2"/>
                </div>
            </div>
        )
    }
}
