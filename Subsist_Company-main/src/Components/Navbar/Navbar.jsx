import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import toggle_light from '../../assets/night.png';
import toggle_dark from '../../assets/day.png';

const Navbar = ({ theme, setTheme }) => {
  const toggle_mode = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
    document.body.classList.toggle('dark-mode', theme === 'light');
    document.querySelector('.navbar').classList.toggle('dark-mode', theme === 'light');
    document.querySelector('.navbar').classList.toggle('light-mode', theme === 'dark');
  };

  return (
    <div className={`navbar ${theme}-mode`}>
      <div className='logo'>
        <h1>Subsist</h1>
      </div>
      <ul>
        <li className="nav-item">
          <Link to="/" className="nav-link">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/signin" className="nav-link">SignIn</Link>
        </li>
      </ul>
      <button className="register-button font-bold">
        <Link to="/register" className="register-link">Register Now</Link>
      </button>
      <img onClick={toggle_mode} src={theme === 'light' ? toggle_light : toggle_dark} alt="toggle" className='toggle' />
    </div>
  );
};

export default Navbar;
