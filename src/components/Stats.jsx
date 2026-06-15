import React from 'react';
import { motion } from 'framer-motion';

const StatItem = ({ number, label, index }) => (
    <motion.div
        className="stat-item"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
    >
        <div className="stat-number">{number}</div>
        <div className="stat-label">{label}</div>
    </motion.div>
);

const Stats = () => {
    const statsData = [
        { number: "0", label: "Fresher" },
        { number: "5+", label: "Projects Completed" },
        { number: "0", label: "Customer Experience" },
        { number: "0", label: "Honors and Awards" }
    ];

    return (
        <div className="stats-container">
            {statsData.map((stat, index) => (
                <StatItem key={index} index={index} {...stat} />
            ))}
        </div>
    );
};

export default Stats;
