import { useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

const Dashboard = () => {
    const { user, fetchProfile, logout, loading, error } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProfile();
        // eslint-disable-next-line
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (loading) return <div className="loading-screen">Loading Profile...</div>;

    // If no user, fetchProfile might just fail or be in progress. AuthContext handles redirects if 401? 
    // Actually we should protect the route in App.js or check here.
    if (!user) return <div className="loading-screen">Redirecting...</div>;

    return (
        <div className="dashboard-container">
            <nav className="dashboard-nav">
                <img src={logo} alt="LenDenClub" className="logo-img" style={{ height: '32px', marginBottom: 0 }} />
                <button onClick={handleLogout} className="btn-secondary">Logout</button>
            </nav>

            <div className="dashboard-content">
                <div className="profile-card">
                    <div className="profile-header">
                        <div className="avatar">{user.name.charAt(0)}</div>
                        <h1>{user.name}</h1>
                        <p className="email">{user.email}</p>
                    </div>

                    <div className="secure-data-section">
                        <h3>Secure Information</h3>
                        <div className="data-item">
                            <span className="label">Aadhaar / ID Number (Decrypted):</span>
                            <span className="value sensitive">{user.aadhaar}</span>
                        </div>
                        <div className="security-notice">
                            <span className="icon">🔒</span>
                            This data is decrypted on-the-fly and only visible to you.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
