import { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../assets/logo.png'; // Make sure this path is correct

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, error, loading } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await login(email, password);
        if (success) {
            navigate('/dashboard');
        }
    };

    return (
        <div className="auth-wrapper">
            {/* Left Section - Hero/Marketing */}
            <div className="auth-left">
                <div className="auth-left-content">
                    <h1>INDIA'S NO 1<br />P2P LENDING<br />PLATFORM*</h1>
                    <div className="auth-left-stats">
                        <div className="stat-item">
                            <h3>1000Cr+</h3>
                            <p>Amount Lent</p>
                        </div>
                        <div className="stat-item">
                            <h3>10L+</h3>
                            <p>Registered Users</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Section - Login Form */}
            <div className="auth-right">
                <div className="auth-card">
                    <img src={logo} alt="LenDenClub Logo" className="logo-img" />
                    <h2>Login</h2>
                    <p className="subtitle">Enter details to access your secure assignment dashboard</p>
                    {error && <div className="error-message">{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="john@example.com"
                            />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="••••••••"
                            />
                        </div>
                        <button type="submit" disabled={loading} className="btn-primary">
                            {loading ? 'Verifying...' : 'Access Account'}
                        </button>
                    </form>
                    <div className="auth-footer">
                        Don't have an account? <Link to="/register">Create Profile</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
