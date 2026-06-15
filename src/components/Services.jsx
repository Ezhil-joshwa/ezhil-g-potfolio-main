import React from 'react';
import { motion } from 'framer-motion';

const ServiceCard = ({ title, description, index, onOrder }) => (
    <motion.div
        className="service-card"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.15 }}
        whileHover={{ y: -10 }}
    >
        <h4>{title}</h4>
        <p>{description}</p>
        <button
            className="order-link-btn"
            onClick={(e) => {
                e.preventDefault();
                onOrder();
            }}
        >
            ORDER NOW &gt;
        </button>
    </motion.div>
);

const Services = ({ onOrder }) => {
    return (
        <div className="services-section">
            <motion.h3
                className="section-title"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
            >
                My Services :
            </motion.h3>
            <div className="services-grid">
                <ServiceCard
                    index={0}
                    title="Web Development"
                    onOrder={onOrder}
                    description="Skilled in building responsive and user-friendly websites using HTML, CSS, JavaScript, and frameworks like React and Tailwind CSS. Focused on clean code and performance."
                />
                <ServiceCard
                    index={1}
                    title="UI/UX Design"
                    onOrder={onOrder}
                    description="Experienced in designing user interfaces that are both visually appealing and functionally effective. Proficient with Figma, Adobe XD, and user journey mapping."
                />
            </div>
        </div>
    );
};

export default Services;
