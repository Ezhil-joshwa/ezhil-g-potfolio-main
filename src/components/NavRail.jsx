import React from 'react';
import { Menu } from 'lucide-react';

const NavRail = ({ currentLabel, onMenuClick }) => {
    return (
        <div className="right-nav">
            <div className="menu-icon" onClick={onMenuClick}>
                <Menu size={20} />
            </div>

            <div className="nav-label-container">
                <span className="nav-label">{currentLabel}</span>
            </div>

            <div className="nav-icons-container">
                {/* Navigation icons could go here */}
            </div>
        </div>
    );
};

export default NavRail;
