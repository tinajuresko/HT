// MuteButton.js
import React, { useEffect, useRef } from 'react';
import { TimelineMax, TweenMax, Power3, Elastic } from 'gsap';
import '../css/mutebutton.css'; 

const MuteButton = ({ videoRef }) => {
    const svgRefs = useRef([]);
    const volumeRef = useRef(null);
    const getPoint = (point, i, a, smoothing) => {
        let cp = (current, previous, next, reverse) => {
            let p = previous || current,
                n = next || current,
                o = {
                    length: Math.sqrt(Math.pow(n[0] - p[0], 2) + Math.pow(n[1] - p[1], 2)),
                    angle: Math.atan2(n[1] - p[1], n[0] - p[0])
                },
                angle = o.angle + (reverse ? Math.PI : 0),
                length = o.length * smoothing;
            return [current[0] + Math.cos(angle) * length, current[1] + Math.sin(angle) * length];
        },
        cps = cp(a[i - 1], a[i - 2], point, false),
        cpe = cp(point, a[i - 1], a[i + 1], true);
        return `C ${cps[0]},${cps[1]} ${cpe[0]},${cpe[1]} ${point[0]},${point[1]}`;
    };

    const getPath = (update, height) => {
        let smoothing = .2,
            points = [
                [10, 4],
                [update, height / 2],
                [10, height - 4]
            ],
            d = points.reduce((acc, point, i, a) => i === 0 ? `M ${point[0]},${point[1]}` : `${acc} ${getPoint(point, i, a, smoothing)}`, '');
        return `<path d="${d}" />`;
    };

    useEffect(() => {
        const volume = volumeRef.current;
        const svgElements = svgRefs.current;
        let proxies = [];
        if (videoRef.current) {
            videoRef.current.muted = true;
            volume.classList.add('muted');
        }

        svgElements.forEach((svg, i) => {
            proxies[i] = new Proxy({ x: null }, {
                set(target, key, value) {
                    target[key] = value;
                    if (target.x !== null) {
                        svg.innerHTML = getPath(target.x, svg.clientHeight);
                    }
                    return true;
                },
                get(target, key) {
                    return target[key];
                }
            });
            proxies[i].x = 10;
        });

        proxies[1].x = 12;
        proxies[2].x = 15;

        let timeline = new TimelineMax({ paused: false })
            .to(svgElements[1], 0.4, { x: 8 })
            .to(svgElements[1], 0.3, { x: -22, scaleY: 1, ease: Power3.easeOut })
            .to(svgElements[1], 0.3, { x: 20 })
            .to(svgElements[1], 0.8, { rotation: 135, ease: Elastic.easeOut.config(1, 0.4) }, 0.9)
            .to(proxies[1], 0.2, { x: 6 }, 0.5)
            .to(proxies[1], 0.2, { x: 10 }, 0.7)
            .to(proxies[2], 0.2, { x: 6 }, 0.5)
            .to(proxies[2], 0.2, { x: 10 }, 0.7)
            .to(svgElements[2], 0.4, { x: 8 }, 0)
            .to(svgElements[2], 0.3, { x: -32, scaleY: 1, ease: Power3.easeOut }, 0.4)
            .to(svgElements[2], 0.3, { x: 0 }, 0.7)
            .to(svgElements[2], 0.8, { rotation: 225, ease: Elastic.easeOut.config(1, 0.4) }, 0.9);

        const handleVolumeClick = () => {
            TweenMax.to(proxies[0], volume.classList.contains('muted') ? 0.12 : 0.2, {
                x: 4,
                repeat: 1,
                yoyo: true
            }).delay(volume.classList.contains('muted') ? 0.95 : 0.5);
            volume.classList.contains('muted') ? timeline.reverse() : timeline.play();
            volume.classList.toggle('muted');

            // Mute or unmute the video
            if (videoRef.current) {
                videoRef.current.muted = !videoRef.current.muted;
            }
        };

        volume.addEventListener('click', handleVolumeClick);
        volume.addEventListener('touch', handleVolumeClick);

         // Mute the video initially
        
        return () => {
            volume.removeEventListener('click', handleVolumeClick);
            volume.removeEventListener('touch', handleVolumeClick);
        };
    }, [videoRef]);

    return (
        <div className="volume" ref={volumeRef}>
            <svg className="shape" viewBox="0 0 64 88">
                <polyline points="60 4 36 24 4 24 4 64 36 64 60 84"></polyline>
            </svg>
            <svg className="first" viewBox="0 0 20 88" ref={el => svgRefs.current[0] = el}></svg>
            <svg className="second" viewBox="0 0 20 60" ref={el => svgRefs.current[1] = el}></svg>
            <svg className="third" viewBox="0 0 20 60" ref={el => svgRefs.current[2] = el}></svg>
        </div>
    );
};

export default MuteButton;
