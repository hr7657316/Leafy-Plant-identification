import React from 'react';
import logo from '../Images/logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css';
import { useTheme } from '../context/ThemeContext';

function Header() {
    const { theme, toggleTheme } = useTheme();

    return (
        <nav className="navbar navbar-expand-lg navbar-light fixed-top custom-header">
            <div className="container">
                <a className="navbar-brand" href="#">
                    <img src={logo} alt="Logo" className="header-logo" />
                    <span className="header-title">Leafy</span>
                </a>
                <button 
                    className="theme-toggle-btn"
                    onClick={toggleTheme}
                    title="Toggle theme"
                >
                    {theme === 'light' ? '🌙 Dark' : '☀️ Light'} Theme
                </button>
            </div>
        </nav>
    );
}

export default Header;


