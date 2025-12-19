import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Function to check if user is logged in based on token
    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            // Optional: Validate token or fetch user here if needed, 
            // but for now we rely on the protected routes to fail if token is invalid
        } else {
            delete axios.defaults.headers.common['Authorization'];
        }
    }, [token]);

    const register = async (userData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post('http://localhost:5000/api/auth/register', userData);
            // On successful register, we can automatically login or ask to login.
            // Requirement says "Return JWT token on success" for login, let's see for register.
            // Backend sends { token, ... } on register.
            const { token: newToken, ...userInfo } = response.data;

            localStorage.setItem('token', newToken);
            setToken(newToken);
            setUser(userInfo);
            setLoading(false);
            return true;
        } catch (err) {
            setLoading(false);
            setError(err.response?.data?.message || 'Registration failed');
            return false;
        }
    };

    const login = async (email, password) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            const { token: newToken, ...userInfo } = response.data;

            localStorage.setItem('token', newToken);
            setToken(newToken);
            setUser(userInfo);
            setLoading(false);
            return true;
        } catch (err) {
            setLoading(false);
            setError(err.response?.data?.message || 'Login failed');
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
    };

    const fetchProfile = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:5000/api/auth/profile');
            setUser(response.data);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            setError(err.response?.data?.message || 'Failed to fetch profile');
            // If 401, logout
            if (err.response?.status === 401) {
                logout();
            }
        }
    };

    return (
        <AuthContext.Provider value={{ user, token, loading, error, register, login, logout, fetchProfile }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
