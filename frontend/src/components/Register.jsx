import { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        aadhaar: ''
    });
    const { register, error, loading } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await register(formData);
        if (success) {
            navigate('/dashboard');
        }
    };

    return (
        <div className="auth-wrapper">
            {/* Left Section - Same as Login for consistency */}
            <div className="auth-left">
                <div className="auth-left-content">
                    <h1>JOIN INDIA'S<br />FASTEST GROWING<br />FINTECH</h1>
                    <div className="auth-left-stats">
                        <div className="stat-item">
                            <h3>Secure</h3>
                            <p>AES-256 Encrypted</p>
                        </div>
                        <div className="stat-item">
                            <h3>Verified</h3>
                            <p>Identity Management</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Section - Form */}
            <div className="auth-right">
                <div className="auth-card">
                    <img src={logo} alt="LenDenClub Logo" className="logo-img" />
                    <h2>Create Profile</h2>
                    <p className="subtitle">Secure Employee & Assignment Portal</p>
                    {error && <div className="error-message">{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder="John Doe"
                            />
                        </div>
                        <div className="form-group">
                            <label>Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="john@example.com"
                            />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                placeholder="••••••••"
                            />
                        </div>
                        <div className="form-group">
                            <label>Aadhaar / ID Number (Encrypted)</label>
                            <input
                                type="text"
                                name="aadhaar"
                                value={formData.aadhaar}
                                onChange={handleChange}
                                required
                                placeholder="1234-5678-9012"
                            />
                        </div>
                        <button type="submit" disabled={loading} className="btn-primary">
                            {loading ? 'Creating Profile...' : 'Sign Up'}
                        </button>
                    </form>
                    <div className="auth-footer">
                        Already have an account? <Link to="/login">Login</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
