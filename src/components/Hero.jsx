import React from 'react';
import { motion } from 'framer-motion';
import heroBg from '../assets/hero-bg.png';

const Hero = ({ onExplore }) => {
    return (
        <div className="hero-section" style={{ backgroundImage: `url(${heroBg})` }}>
            <div className="hero-overlay"></div>
            <div className="hero-content centered">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    Discover My Amazing Art Space!
                </motion.h1>

                <div className="hero-subtitle-container">
                    <span className="i-build">I BUILD :</span>
                    <div className="typing-container">
                        <span className="typing-text">Web Application.</span>
                    </div>
                </div>

                <motion.button
                    className="explore-btn centered"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onExplore}
                >
                    EXPLORE NOW
                </motion.button>
            </div>
        </div>
    );
};

export default Hero;
