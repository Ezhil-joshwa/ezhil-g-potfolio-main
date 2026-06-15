import React from 'react';
import { Mail } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="designs-footer">
            <div className="footer-content">
                <span className="copyright">© {currentYear} All Rights Reserved</span>
                <span className="footer-email-container">
                    <Mail size={16} className="email-icon" />
                    <span className="email-label">Email: </span>
                    <a href="mailto:ezhilgunasekaren05@gmail.com" className="footer-email">
                        ezhilgunasekaren05@gmail.com
                    </a>
                </span>
            </div>
        </footer>
    );
};

export default Footer;

