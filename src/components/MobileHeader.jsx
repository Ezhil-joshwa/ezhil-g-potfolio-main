import { Menu } from 'lucide-react';
import profileImg from '../assets/profile.jpeg';

const MobileHeader = ({ onProfileClick, onMenuClick }) => {
    return (
        <div className="mobile-header">
            <div className="mobile-profile-trigger" onClick={onProfileClick}>
                <div className="trigger-avatar">
                    <img src={profileImg} alt="Ezhil-Gunasekaren" />
                </div>
            </div>

            <div className="mobile-menu-trigger" onClick={onMenuClick}>
                <Menu size={24} />
            </div>
        </div>
    );
};

export default MobileHeader;
