import React from 'react';
import { motion } from 'framer-motion';

import Footer from './Footer';
import projectImage from '../assets/d1.png';

const ProjectRow = ({ title, description, url, imageUrl, reversed }) => (
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
            <h3 className="project-title">{title}</h3>
            <p className="project-description">{description}</p>
            {url && (
                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                >
                    View Project ↗
                </a>
            )}
        </div>
    </motion.div>
);

const Projects = () => {
    const projects = [
        {
            title: "Mentor Connect – Student Mentorship Management System",
            description: "Developed a full-stack mentorship platform with role-based access for Admins, Mentors, and Students. Implemented mentor allocation, attendance tracking, assignment management, performance analytics, and secure JWT authentication.",
            url: "#"
        },
        {
            title: "Jeevan Realty Website",
            description: "Built and maintained a responsive real estate website using React TypeScript. Developed reusable components, property listing pages, and lead inquiry features while optimizing performance and user experience.",
            url: "#"
        },
        {
            title: "Vivekanand Medical College – Appointment Booking System",
            description: "Developed frontend components for an online doctor appointment booking platform. Created responsive interfaces and integrated booking workflows for seamless patient scheduling.",
            url: "#"
        },
        {
            title: "Restaurant Management System (Lovely Bites)",
            description: "Designed and developed a restaurant management website using HTML, CSS, and JavaScript. Implemented menu display, reservation management, and responsive user interfaces.",
            url: "#"
        },
        {
            title: "Techverse India Website",
            description: "Customized and maintained a corporate WordPress website using Elementor and custom CSS. Managed content updates, responsive layouts, and performance improvements.",
            url: "https://techverseindia.com/"
        },
        {
            title: "Portfolio Website",
            description: "Created a personal portfolio using React TypeScript to showcase projects, technical skills, and professional experience with a modern responsive design.",
            url: "#"
        },
    ].map((project, index) => ({
        ...project,
        imageUrl: projectImage,
        reversed: index % 2 !== 0
    }));

    return (
        <div className="Projects-section">
            <motion.h2
                className="page-title"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                PROJECTS
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


export default Projects;
