import { MessageCircle, Instagram, Linkedin, Github, Twitter } from 'lucide-react';
import profileImg from '../assets/profile.jpeg';

const SkillCircle = ({ percent, label }) => {
    const radius = 30; // Reduced radius
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percent / 100) * circumference;

    return (
        <div className="skill-circle-container">
            <div className="progress-circle">
                <svg width="70" height="70"> {/* Reduced SVG size */}
                    <circle
                        className="progress-bg"
                        cx="35" cy="35" r={radius}
                        fill="none" strokeWidth="4"
                    />
                    <circle
                        className="progress-bar"
                        cx="35" cy="35" r={radius}
                        fill="none" strokeWidth="4"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        strokeLinecap="round"
                    />
                </svg>
                <div className="percent">{percent}%</div>
            </div>
            <div className="label">{label}</div>
        </div>
    );
};

const SkillBar = ({ label, percent }) => (
    <div className="skill-bar-container">
        <div className="skill-bar-header">
            <span>{label}</span>
            <span>{percent}%</span>
        </div>
        <div className="skill-bar-bg">
            <div className="skill-bar-fill" style={{ width: `${percent}%` }}></div>
        </div>
    </div>
);

const LeftSidebar = () => {
    return (
        <div className="left-sidebar">
            <div className="profile-section">
                <div className="profile-img-bg">
                    <div className="profile-img-container">
                        <img src={profileImg} alt="Ezhil-Gunasekaren" />
                        <div className="status-dot"></div>
                    </div>
                </div>
                <h3>Ezhil Gunasekaren</h3>
                <p className="title">FULL-STACK DEVELOPER</p>
            </div>

            <div className="info-section">
                <div className="info-row">
                    <span>State:</span>
                    <span>Tamil Nadu</span>
                </div>
                <div className="info-row">
                    <span>City:</span>
                    <span>Coimbatore</span>
                </div>
                <div className="info-row">
                    <span>Age:</span>
                    <span>20</span>
                </div>
            </div>

            <div className="divider"></div>

            <div className="languages-section">
                <SkillCircle percent={100} label="Tamil" />
                <SkillCircle percent={85} label="English" />
            </div>

            <div className="divider"></div>

            <div className="skills-section">
                <h4>Technical Skills</h4>
                <SkillBar label="HTML" percent={90} />
                <SkillBar label="CSS" percent={95} />
                <SkillBar label="JS" percent={80} />
                <SkillBar label="React" percent={80} />
                <SkillBar label="Node JS" percent={70} />
                <SkillBar label="Express" percent={70} />
                <SkillBar label="Sql" percent={90} />
                <SkillBar label="Git & Github" percent={80} />
                <SkillBar label="Figma" percent={80} />
            </div>

            <div className="divider"></div>

            <div className="social-links">
                <a href="https://wa.me/916379199043" target="_blank" rel="noopener noreferrer"><MessageCircle size={18} /></a>
                <a href="https://www.instagram.com/__josh._._7" target="_blank" rel="noopener noreferrer"><Instagram size={18} /></a>
                <a href="https://www.linkedin.com/in/ezhil-gunasekaran" target="_blank" rel="noopener noreferrer"><Linkedin size={18} /></a>
                <a href="https://github.com/Ezhil-joshwa" target="_blank" rel="noopener noreferrer"><Github size={18} /></a>
            </div>
        </div>
    );
};

export default LeftSidebar;
