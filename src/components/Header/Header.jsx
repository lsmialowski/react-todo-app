import React from 'react';
import './Header.css';

const Header = () => (
    <header>
        <div className="photo-wrapper">
            <picture><img src={require('./PGSLogo.jpeg')}/></picture>
        </div>
        <div className="search-panel">
            <div className="application-name">PGS TODO Application</div>
        </div>
    </header>
);

export default Header;