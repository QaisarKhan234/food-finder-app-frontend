import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <nav className={`navbar navbar-expand-lg ${theme === 'dark' ? 'navbar-dark' : 'navbar-light'}`}>
      <div className="container">
        <Link className="navbar-brand" to="/">Book Finder</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
            {user ? (
              <>
                <li className="nav-item"><Link className="nav-link" to="/favorites">Favorites</Link></li>
                <li className="nav-item"><button className="btn btn-outline-danger" onClick={logout}>Logout</button></li>
              </>
            ) : (
              <>
                <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li>
              </>
            )}
          </ul>
          
        </div>
        <button className="btn btn-secondary ms-2" onClick={toggleTheme}>
            {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
          </button>
      </div>
    </nav>
  );
};

export default Navbar;
