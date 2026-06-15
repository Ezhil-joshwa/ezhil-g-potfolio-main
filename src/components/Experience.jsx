import React from 'react';
import { motion } from 'framer-motion';
import Footer from './Footer';

const ExperienceCard = ({ title, company, date, role, description, index }) => (
    <motion.div
        className="education-card" // Reusing education-card styles for consistency
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.2 }}
    >
        <div className="card-header">
            <div className="header-left">
                <h4>{title}</h4>
                <div className="experience-info">
                    <span className="role">{role}</span>
                    <span className="company"> <br/> <span>@</span><strong>{company}</strong></span>
                </div>
            </div>
            <div className="header-right">
                <span className="date-badge">{date}</span>
            </div>
        </div>
        <div className="card-content">
            <p>{description}</p>
        </div>
    </motion.div>
);

const Experience = () => {
    const experiences = [
        {
            title: "Intern",
            company: "Jeevan Tech Digital Innovetions",
            date: "Jan 2026 - Present",
            role: "Web Developer",
            description: "Developed and maintained responsive web applications using HTML, CSS, JavaScript, and React. Assisted in backend development using Node.js and MongoDB (beginner level). Collaborated with team members to improve UI/UX and fix issues."
        },
        {
            title: "Freelancer",
            company: "Self-Employed",
            date: "June 2025 - Present",
            role: "Web Developer - UI/UX Designer",
            description: "Executed various design projects for local clients, specializing in brand identity and landing page optimization. Mastered tools like Adobe XD and Figma to deliver user-centric design solutions."
        }
    ];

    return (
        <div className="experience-section">
            <motion.h2
                className="page-title"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                EXPERIENCE
            </motion.h2>

            <div className="education-container">
                {experiences.map((exp, index) => (
                    <ExperienceCard
                        key={index}
                        index={index}
                        {...exp}
                    />
                ))}
            </div>

            <Footer />
        </div>
    );
};

export default Experience;
