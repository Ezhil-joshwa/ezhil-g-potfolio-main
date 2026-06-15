import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { motion } from 'framer-motion';

const Breadcrumbs = ({ currentView, onNavigate }) => {
    if (currentView === 'home') return null;

    const getLabel = (view) => {
        switch (view) {
            case 'education': return 'Education';
            case 'designs': return 'Designs';
            case 'experience': return 'Experience';
            case 'contact': return 'Contact';
            default: return view.toUpperCase();
        }
    };

    return (
        <motion.nav
            className="breadcrumbs"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="breadcrumb-item" onClick={() => onNavigate('home')}>
                <Home size={14} />
                <span>Home</span>
            </div>
            <ChevronRight size={14} className="breadcrumb-separator" />
            <div className="breadcrumb-item active">
                <span>{getLabel(currentView)}</span>
            </div>
        </motion.nav>
    );
};

export default Breadcrumbs;
