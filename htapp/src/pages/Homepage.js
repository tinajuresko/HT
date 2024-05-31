import React, { useState, useRef, useEffect } from 'react';
import videoFile from '../video/homepage.mp4'; 

import Navbar from '../components/navbar';
import MuteButton from '../components/MuteButton';

import '../css/homepage.css';

const Homepage = () => {
    const videoRef = useRef(null);
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);

    useEffect(() => {
        const handleKeyPress = (event) => {
            if (videoRef.current) {
                switch (event.code) {
                    case 'Space': // Play/Pause on Spacebar press
                        event.preventDefault(); // Prevent default scroll behavior
                        if (videoRef.current.paused) {
                            videoRef.current.play();
                        } else {
                            videoRef.current.pause();
                        }
                        break;
                    case 'KeyM': // Mute/Unmute on 'M' key press
                        videoRef.current.muted = !videoRef.current.muted;
                        break;
                    default:
                        break;
                }
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, []);

    const handleVideoError = (e) => {
        console.error('Video Error:', e);
    };

    const handleVideoPlay = () => {
        if (videoRef.current) {
            videoRef.current.play();
            console.log('Video is playing');
        }
    };

    return (
        <>
            <Navbar />
            <video 
                ref={videoRef}
                className="fullscreen-video" 
                autoPlay 
                loop
                muted
                playsInline
                onCanPlayThrough={() => setIsVideoLoaded(true)}
                onError={handleVideoError}
            >
                <source src={videoFile} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <MuteButton videoRef={videoRef} />
        </>
    );
};

export default Homepage;
