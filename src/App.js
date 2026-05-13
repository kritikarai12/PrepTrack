import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import DSA from './pages/DSA';
import Aptitude from './pages/Aptitude';
import CoreSubjects from './pages/CoreSubjects';
import Profile from './pages/Profile';

function ProtectedRoute({ children }) {
  const { token } = useAuth();
  if (!token) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <Navbar />
      <div className="main-content">
        {children}
      </div>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dsa"
            element={
              <ProtectedRoute>
                <DSA />
              </ProtectedRoute>
            }
          />
          <Route
            path="/aptitude"
            element={
              <ProtectedRoute>
                <Aptitude />
              </ProtectedRoute>
            }
          />
          <Route
            path="/core"
            element={
              <ProtectedRoute>
                <CoreSubjects />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;