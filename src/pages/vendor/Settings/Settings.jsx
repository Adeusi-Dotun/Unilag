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
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setSaved(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateVendorProfile({
            ...formData,
            whatsapp: formData.phone ? `234${formData.phone.slice(1)}` : '',
        });
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
                            <label className="form-label">Phone / WhatsApp</label>
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
