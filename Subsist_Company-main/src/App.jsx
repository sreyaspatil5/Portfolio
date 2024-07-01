import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import HomePage from './Components/Hero/HomePage';
import CompanyTags from './Components/Comapnytags/CompanyTags';
import RegisterForm from './Components/RegisterForm/RegisterForm';
import SignInForm from './Components/SignInForm/SignInForm';

const App = () => {
  const currentTheme = localStorage.getItem('current_theme');
  const [theme, setTheme] = useState(currentTheme ? currentTheme : 'light');

  useEffect(() => {
    localStorage.setItem('current_theme', theme);
  }, [theme]);

  return (
    <Router>
      <div className={`container ${theme}`}>
        <Navbar theme={theme} setTheme={setTheme} />
        <Routes>
          <Route path="/" element={<><HomePage /><CompanyTags /></>} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/signin" element={<SignInForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
