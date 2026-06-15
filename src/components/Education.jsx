import React from 'react';
import { motion } from 'framer-motion';

import Footer from './Footer';

const EducationCard = ({ title, date, role, description, index }) => (
    <motion.div
        className="education-card"
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.2 }}
    >
        <div className="card-header">
            <div className="header-left">
                <h4>{title}</h4>
                <span className="role">{role}</span>
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

const Education = () => {
    return (
        <div className="education-section">
            <motion.h2
                className="page-title"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                EDUCATION
            </motion.h2>

            <div className="education-container">
                <EducationCard
                    index={0}
                    title="Dr.N.G.P. Arts and Science College"
                    date="Jun 2023 - Apr 2026"
                    role="Student"
                    description="Bachelor's Degree in B.Sc Computer Science, Studied core subjects in computer science, including programming (C, Java, Python), web development (HTML, CSS, JavaScript), and database management. Gained practical experience through projects focused on web and software development."
                />
                <EducationCard
                    index={1}
                    title="Bharathiar University"
                    date="Sep 2023 - Feb 2024"
                    role="Student"
                    description="Diploma in Data Science, Advanced coursework in data science, machine learning, data visualization, and big data technologies. Strengthened practical skills through real-time projects and team-based data science work."
                />
                <EducationCard
                    index={2}
                    title="ATS (Accent Techno Soft)"
                    date="July 2024"
                    role="Student"
                    description="Value Added Course in UI/UX Design,completed a 40-hour Figma training program at Accent Techno Soft, developing skills in UI design, wireframing, and interactive prototyping."
                />

                
            </div>

            <Footer />
        </div>
    );
};

export default Education;
