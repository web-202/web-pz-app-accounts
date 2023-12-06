
import React from 'react';
import { Link } from 'react-router-dom';

const Navigation: React.FC = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/" className="nav-link">Home</Link></li>
                <li><Link to="/profile" className="nav-link">Profile</Link></li>

            </ul>
        </nav>
    );
};

export default Navigation;