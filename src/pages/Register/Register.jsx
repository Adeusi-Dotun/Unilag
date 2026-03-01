import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiLock, FiPhone, FiShoppingBag } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { hostels } from '../../data/mockData';
import '../Login/Login.css';

export default function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'buyer',
        vendorName: '',
        hostel: '',
        phone: '',
    });
    const [error, setError] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRoleSelect = (role) => {
        setFormData({ ...formData, role });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!formData.name || !formData.email || !formData.password) {
            setError('Please fill in all required fields');
            return;
        }

        if (formData.role === 'vendor' && !formData.hostel) {
            setError('Please select your hostel');
            return;
        }

        const result = register(formData);
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
                    <h1>Create account</h1>
                    <p>Join the UNILAG campus marketplace</p>
                </div>

                {error && <div className="auth-error">{error}</div>}

                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">I want to</label>
                        <div className="role-toggle">
                            <button
                                type="button"
                                className={`role-toggle-btn ${formData.role === 'buyer' ? 'active' : ''}`}
                                onClick={() => handleRoleSelect('buyer')}
                            >
                                Buy stuff
                            </button>
                            <button
                                type="button"
                                className={`role-toggle-btn ${formData.role === 'vendor' ? 'active' : ''}`}
                                onClick={() => handleRoleSelect('vendor')}
                            >
                                Sell stuff
                            </button>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Full Name</label>
                        <div className="input-with-icon">
                            <FiUser className="input-icon" />
                            <input
                                type="text"
                                name="name"
                                className="form-input form-input-icon"
                                placeholder="Your full name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Email</label>
                        <div className="input-with-icon">
                            <FiMail className="input-icon" />
                            <input
                                type="email"
                                name="email"
                                className="form-input form-input-icon"
                                placeholder="you@unilag.edu.ng"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <div className="input-with-icon">
                            <FiLock className="input-icon" />
                            <input
                                type="password"
                                name="password"
                                className="form-input form-input-icon"
                                placeholder="Create a password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {formData.role === 'vendor' && (
                        <div className="vendor-fields">
                            <div className="form-group">
                                <label className="form-label">Business Name</label>
                                <input
                                    type="text"
                                    name="vendorName"
                                    className="form-input"
                                    placeholder="Your business name"
                                    value={formData.vendorName}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Hostel / Location</label>
                                <select
                                    name="hostel"
                                    className="form-select"
                                    value={formData.hostel}
                                    onChange={handleChange}
                                >
                                    <option value="">Select your hostel</option>
                                    {hostels.map((h) => (
                                        <option key={h} value={h}>{h}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Phone / WhatsApp</label>
                                <div className="input-with-icon">
                                    <FiPhone className="input-icon" />
                                    <input
                                        type="tel"
                                        name="phone"
                                        className="form-input form-input-icon"
                                        placeholder="08012345678"
                                        value={formData.phone}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    <button type="submit" className="btn btn-primary btn-block btn-lg">
                        Create account
                    </button>
                </form>

                <p className="auth-footer">
                    Already have an account? <Link to="/login">Sign in</Link>
                </p>
            </div>
        </div>
    );
}
