import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiShoppingBag } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import './Login.css';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        const result = login(email, password);
        if (result.success) {
            navigate('/');
        } else {
            setError(result.error);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <div className="auth-header">
                    <div className="auth-logo">
                        <FiShoppingBag />
                    </div>
                    <h1>Welcome back</h1>
                    <p>Sign in to your CampusMarket account</p>
                </div>

                {error && <div className="auth-error">{error}</div>}

                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Email</label>
                        <div className="input-with-icon">
                            <FiMail className="input-icon" />
                            <input
                                type="email"
                                className="form-input form-input-icon"
                                placeholder="you@unilag.edu.ng"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <div className="input-with-icon">
                            <FiLock className="input-icon" />
                            <input
                                type="password"
                                className="form-input form-input-icon"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary btn-block btn-lg">
                        Sign in
                    </button>
                </form>

                <p className="auth-footer">
                    Don't have an account? <Link to="/register">Sign up</Link>
                </p>

                <div className="auth-demo-creds">
                    <p className="demo-title">Demo Accounts:</p>
                    <div className="demo-item">
                        <span>Buyer:</span> john@unilag.edu.ng / buyer123
                    </div>
                    <div className="demo-item">
                        <span>Vendor:</span> adeola@unilag.edu.ng / vendor123
                    </div>
                    <div className="demo-item">
                        <span>Admin:</span> admin@campusmarket.ng / admin123
                    </div>
                </div>
            </div>
        </div>
    );
}
