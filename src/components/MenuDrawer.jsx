import React from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MenuDrawer = ({ isOpen, onClose, onNavigate, isEmbedded = false }) => {
    const menuItems = [
        { label: 'HOME', value: 'home' },
        { label: 'EDUCATION', value: 'education' },
        { label: 'DESIGNS', value: 'designs' },
        { label: 'EXPERIENCE', value: 'experience' },
        { label: 'CONTACT', value: 'contact' },
    ];

    const Content = (
        <div className={isEmbedded ? "menu-content-only" : "menu-drawer"}>
            {!isEmbedded && (
                <div className="menu-header">
                    <button className="close-btn" onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>
            )}

            <nav className="menu-nav">
                <ul>
                    {menuItems.map((item) => (
                        <motion.li
                            key={item.value}
                            whileHover={{ x: 10, color: '#ffc107' }}
                            onClick={() => {
                                onNavigate(item.value);
                                if (onClose) onClose();
                            }}
                        >
                            {item.label}
                        </motion.li>
                    ))}
                </ul>
            </nav>

            <div className="menu-footer">
                <span className="footer-copyright">© 2026 SHAJAN</span>
            </div>
        </div>
    );

    if (isEmbedded) return Content;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        className="menu-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />
                    <motion.div
                        className="menu-drawer"
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    >
                        {Content}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default MenuDrawer;
