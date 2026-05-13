import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { student, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="brand-icon">🎯</span>
        <span className="brand-name">PrepTrack</span>
      </div>

      <div className="navbar-links">
        <Link
          to="/dashboard"
          className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}>
          Dashboard
        </Link>
        <Link
          to="/dsa"
          className={`nav-link ${isActive('/dsa') ? 'active' : ''}`}>
          DSA
        </Link>
        <Link
          to="/aptitude"
          className={`nav-link ${isActive('/aptitude') ? 'active' : ''}`}>
          Aptitude
        </Link>
        <Link
          to="/core"
          className={`nav-link ${isActive('/core') ? 'active' : ''}`}>
          Core Subjects
        </Link>
        <Link
          to="/profile"
          className={`nav-link ${isActive('/profile') ? 'active' : ''}`}>
          Profile
        </Link>
      </div>

      <div className="navbar-right">
        {student ? (
          <span className="student-name">👋 {student.name}</span>
        ) : null}
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;