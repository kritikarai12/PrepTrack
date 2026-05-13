import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [student, setStudent] = useState(() => {
    try {
      const saved = localStorage.getItem('preptrack-student');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem('preptrack-token') || null;
  });

  const login = (studentData, jwtToken) => {
    setStudent(studentData);
    setToken(jwtToken);
    localStorage.setItem('preptrack-student', JSON.stringify(studentData));
    localStorage.setItem('preptrack-token', jwtToken);
  };

  const logout = () => {
    setStudent(null);
    setToken(null);
    localStorage.removeItem('preptrack-student');
    localStorage.removeItem('preptrack-token');
    localStorage.removeItem('preptrack-dsa-done');
    localStorage.removeItem('preptrack-aptitude-done');
    localStorage.removeItem('preptrack-core-done');
  };

  return (
    <AuthContext.Provider value={{ student, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}