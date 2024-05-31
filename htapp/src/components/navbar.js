import React, { useEffect } from 'react';
import Snap from 'snapsvg-cjs';

import '../css/navbar.css';

const Navbar = () => {

    useEffect(() => {
        function configToggleAnimation() {
            const toggle = document.querySelector('.nav-toggle');
            const nav = document.querySelector('.nav');
            const snap = Snap(document.querySelector('.nav-morph svg'));
            const nav_morph = document.querySelector('.nav-morph');
            const path = snap.select('path');
            const reset = path.attr('d');
            const open = nav_morph.getAttribute('data-open');
            const close = nav_morph.getAttribute('data-close');
            const speed = 250;
            const speed_back = 800;
            
            const easing = function(pos) { return -Math.cos(pos * Math.PI) / 2 + 0.5; };
            const easing_back = function(pos) { return pos < 0.5 ? 2 * pos * pos : -1 + (4 - 2 * pos) * pos; };
            let isOpen = false;

            toggle.addEventListener('click', () => {
                if (isOpen) {
                    path.stop().animate({ 'path': close }, speed, easing, () => {
                        path.animate({ 'path': reset }, speed_back, easing_back);
                        isOpen = false;
                    });
                    nav.classList.remove('nav--open');
                } else {
                    path.stop().animate({ 'path': open }, speed, easing, () => {
                        path.animate({ 'path': reset }, speed_back, easing_back);
                        isOpen = true;
                    });
                    nav.classList.add('nav--open');
                }
            });
        }

        configToggleAnimation();
    }, []);
    return(
        <nav class="nav">

        <button class="nav-toggle"><span>Menu</span></button>

        <ul class="nav-menu">
            <li><a href='/'>Home</a></li>
            <li><a href='/deliveries' >Show deliveries</a></li>
            <li><a href='/add'>Create a delivery</a></li>
        </ul>

        <div class="nav-morph" 
            data-open="M 300,-1.9235101 C 947.48798,352.73374 368.08761,564.6745 301.42857,1052.3622" 
            data-close="M 300,-1.9235101 C -43.940589,374.16231 223.80189,644.6745 301.42857,1052.3622">
            <svg width="100%" height="100%" viewBox="0 0 600 800" preserveAspectRatio="none">
                <path fill="none" d="M 300,-1.9235101 C 304.63084,565.59088 299.51618,538.96021 301.42857,1052.3622"/>
            </svg>
        </div>

        </nav>
    )
};

export default Navbar;