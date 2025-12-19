import { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthContext from './context/AuthContext';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './pages/Dashboard';
import './App.css';

const PrivateRoute = ({ children }) => {
  const { token } = useContext(AuthContext);
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <div className="app-background">
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
