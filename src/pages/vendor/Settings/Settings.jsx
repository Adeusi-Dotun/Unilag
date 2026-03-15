import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiSave } from 'react-icons/fi';
import { useAuth } from '../../../context/AuthContext';
import { useVendor } from '../../../context/VendorContext';
import { hostels } from '../../../data/mockData';
import './Settings.css';

export default function Settings() {
    const { user } = useAuth();
    const { vendorProfile, updateVendorProfile } = useVendor();
    const [saved, setSaved] = useState(false);

    const [formData, setFormData] = useState({
        name: vendorProfile?.name || '',
        bio: vendorProfile?.bio || '',
        hostel: vendorProfile?.hostel || '',
        phone: vendorProfile?.phone || '',
        hours: vendorProfile?.hours || '',
        bankName: vendorProfile?.bankName || '',
        accountNumber: vendorProfile?.accountNumber || '',
        accountName: vendorProfile?.accountName || '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setSaved(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateVendorProfile(formData);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    return (
        <div className="page">
            <div className="container">
                <div className="vendor-page-header">
                    <Link to="/vendor/dashboard" className="back-link">
                        <FiArrowLeft /> Dashboard
                    </Link>
                    <h1>Profile Settings</h1>
                </div>

                <form className="settings-form" onSubmit={handleSubmit}>
                    <div className="settings-section">
                        <h3 className="settings-section-title">Business Information</h3>
                        <div className="form-group">
                            <label className="form-label">Business Name</label>
                            <input
                                type="text"
                                name="name"
                                className="form-input"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Bio / Description</label>
                            <textarea
                                name="bio"
                                className="form-textarea"
                                placeholder="Tell buyers about your business..."
                                value={formData.bio}
                                onChange={handleChange}
                                rows={4}
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">Hostel / Location</label>
                                <select
                                    name="hostel"
                                    className="form-select"
                                    value={formData.hostel}
                                    onChange={handleChange}
                                >
                                    <option value="">Select hostel</option>
                                    {hostels.map((h) => (
                                        <option key={h} value={h}>{h}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Phone</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    className="form-input"
                                    placeholder="08012345678"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Available Hours</label>
                            <input
                                type="text"
                                name="hours"
                                className="form-input"
                                placeholder="e.g. Mon-Sat, 9am - 7pm"
                                value={formData.hours}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="settings-section">
                        <h3 className="settings-section-title">Bank Information</h3>
                        <p className="settings-section-desc">For receiving payments from confirmed orders</p>

                        <div className="form-group">
                            <label className="form-label">Bank Name</label>
                            <input
                                type="text"
                                name="bankName"
                                className="form-input"
                                placeholder="e.g. GTBank"
                                value={formData.bankName}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">Account Number</label>
                                <input
                                    type="text"
                                    name="accountNumber"
                                    className="form-input"
                                    placeholder="0123456789"
                                    value={formData.accountNumber}
                                    onChange={handleChange}
                                    maxLength={10}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Account Name</label>
                                <input
                                    type="text"
                                    name="accountName"
                                    className="form-input"
                                    placeholder="Account holder name"
                                    value={formData.accountName}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="form-actions">
                        {saved && <span className="save-success">✓ Settings saved</span>}
                        <button type="submit" className="btn btn-primary btn-lg">
                            <FiSave size={16} />
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
