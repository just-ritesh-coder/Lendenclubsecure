import { useEffect, useContext, useState } from 'react';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

const Dashboard = () => {
    const { user, fetchProfile, logout, loading } = useContext(AuthContext);
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('overview');

    useEffect(() => {
        fetchProfile();
        // eslint-disable-next-line
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (loading) return <div className="loading-screen">Loading Profile...</div>;
    if (!user) return <div className="loading-screen">Redirecting...</div>;

    // Dummy Stats for the "Real Project" feel
    const stats = [
        { label: 'Current Invested Value', value: '₹ 12,45,600', trend: '+12.5% vs last month', up: true },
        { label: 'Net Annualized Returns (XIRR)', value: '11.45%', trend: 'Steady Growth', up: true },
        { label: 'Total Interest Earned', value: '₹ 1,28,450', trend: '+3k this week', up: true },
    ];

    return (
        <div className="dashboard-container">
            {/* Sidebar Navigation */}
            <aside className="dashboard-sidebar">
                <img src={logo} alt="LenDenClub" className="sidebar-logo" />

                <nav className="nav-links">
                    <div
                        className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
                        onClick={() => setActiveTab('overview')}
                    >
                        <span>📊</span> Overview
                    </div>
                    <div className="nav-item">
                        <span>💼</span> Portfolio
                    </div>
                    <div className="nav-item">
                        <span>💰</span> Invest
                    </div>
                    <div
                        className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
                        onClick={() => setActiveTab('profile')}
                    >
                        <span>👤</span> My Profile
                    </div>
                </nav>

                <div className="logout-container">
                    <button onClick={handleLogout} className="logout-btn">
                        <span>🚪</span> Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="dashboard-main">
                <header className="header-section">
                    <h1>
                        {activeTab === 'overview' ? 'Dashboard Overview' : 'My Profile Details'}
                    </h1>
                    <div className="user-snippet">
                        <span>Welcome, {user.name.split(' ')[0]}</span>
                        <div className="user-avatar-small">{user.name.charAt(0)}</div>
                    </div>
                </header>

                {activeTab === 'overview' ? (
                    <>
                        {/* Stats Row */}
                        <div className="stats-grid">
                            {stats.map((stat, index) => (
                                <div className="stat-card" key={index}>
                                    <div className="stat-label">{stat.label}</div>
                                    <div className="stat-value">{stat.value}</div>
                                    <span className={`stat-trend ${stat.up ? 'trend-up' : 'trend-neutral'}`}>
                                        {stat.trend}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Profile/KYC Section embedded in Dashboard */}
                        <h2 className="profile-section-title">KYC & Identity Verification</h2>
                        <div className="profile-detail-card">
                            <div className="kyc-badge">
                                <span>✓</span> KYC Verified
                            </div>

                            <div className="field-group">
                                <div className="field-label">Full Legal Name</div>
                                <div className="field-value">{user.name}</div>
                            </div>
                            <div className="field-group">
                                <div className="field-label">Registered Email</div>
                                <div className="field-value">{user.email}</div>
                            </div>
                            <div className="field-group">
                                <div className="field-label">Aadhaar / National ID (Decrypted)</div>
                                <div className="field-value highlight">{user.aadhaar}</div>
                            </div>

                            <div className="security-footer">
                                <span>🔒</span> This data is strictly confidential and encrypted at rest with AES-256.
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="profile-detail-card">
                        <h2>User Profile Settings</h2>
                        <p>This is a placeholder for full profile settings.</p>
                        <button className="btn-secondary" onClick={() => setActiveTab('overview')}>Back to Dashboard</button>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Dashboard;
