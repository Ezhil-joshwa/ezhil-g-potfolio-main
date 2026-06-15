import React from 'react';
import { motion } from 'framer-motion';

import Footer from './Footer';
import d1 from '../assets/d1.png';
import d2 from '../assets/d2.png';
import d3 from '../assets/d3.png';

const ProjectRow = ({ title, description, imageUrl, reversed }) => (
    <motion.div
        className={`project-row ${reversed ? 'reversed' : ''}`}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
    >
        <div className="project-image-container">
            <div className="project-image-frame">
                <img src={imageUrl} alt={title} />
            </div>
        </div>
        <div className="project-details">
            <p className="project-description">{description}</p>
        </div>
    </motion.div>
);

const Designs = () => {
    const projects = [
        {
            title: "The Botanical Garden",
            description: "Developed responsive and interactive web interfaces using modern front-end technologies, focusing on seamless animations, transitions, and micro-interactions to enhance user experience. Utilized CSS animations, JavaScript, and animation libraries to build dynamic and user-friendly web applications.",
            imageUrl: d1,
            reversed: false
        },
        {
            title: "3D WALL",
            description: "Built an interactive 3D wall interface using HTML, CSS, JavaScript, and Three.js, featuring responsive design, smooth animations, and interactive elements. Enhanced visual engagement by creating an immersive UI suitable for digital galleries, portfolios, and product display applications.",
            imageUrl: d2,
            reversed: true
        },
        {
            title: "Visually Immersive Website",
            description: "Built an interactive single-page web application using HTML, CSS, JavaScript, and Three.js, featuring scroll-based animations and immersive 3D visuals. Enhanced user engagement by delivering a dynamic and visually compelling web experience.",
            imageUrl: d3,
            reversed: false
        }
    ];

    return (
        <div className="designs-section">
            <motion.h2
                className="page-title"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                DESIGNS
            </motion.h2>

            <div className="projects-container">
                {projects.map((project, index) => (
                    <React.Fragment key={index}>
                        <ProjectRow {...project} />
                        {index < projects.length - 1 && <div className="project-divider"></div>}
                    </React.Fragment>
                ))}
            </div>

            <Footer />
        </div>
    );
};


export default Designs;
