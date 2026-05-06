import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import BottomNav from './components/BottomNav';
import CarePage from './pages/CarePage';
import Dashboard from './pages/Dashboard';
import LogPage from './pages/LogPage';
import LoginPage from './pages/LoginPage';
import StatsPage from './pages/StatsPage';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('bloomly_user');
    if (!storedUser) return;

    try {
      setUser(JSON.parse(storedUser));
    } catch (error) {
      localStorage.removeItem('bloomly_user');
    }
  }, []);

  const handleLogin = (nextUser) => {
    localStorage.setItem('bloomly_user', JSON.stringify(nextUser));
    setUser(nextUser);
  };

  const handleLogout = () => {
    localStorage.removeItem('bloomly_user');
    setUser(null);
  };

  const guard = (element) => (user ? element : <Navigate to="/login" replace />);

  return (
    <ThemeProvider>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <div className="min-h-screen bg-[#FDFCFM]">
          <Routes>
            <Route path="/" element={guard(<Dashboard user={user} onLogout={handleLogout} />)} />
            <Route path="/log" element={guard(<LogPage />)} />
            <Route path="/care" element={guard(<CarePage user={user} onLogout={handleLogout} />)} />
            <Route path="/stats" element={guard(<StatsPage user={user} onLogout={handleLogout} />)} />
            <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
            <Route path="*" element={<Navigate to={user ? "/" : "/login"} replace />} />
          </Routes>

          {user && <BottomNav />}
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
