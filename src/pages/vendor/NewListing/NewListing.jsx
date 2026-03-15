import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiUpload } from 'react-icons/fi';
import { categories, hostels } from '../../../data/mockData';
import { useVendor } from '../../../context/VendorContext';
import './NewListing.css';

export default function NewListing() {
    const { addListing, vendorProfile } = useVendor();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        quantity: '',
        category: '',
        pickup: '',
        images: [],
    });
    const [imagePreview, setImagePreview] = useState(null);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImagePreview(reader.result);
                setFormData((prev) => ({
                    ...prev,
                    images: [reader.result],
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!formData.title || !formData.price || !formData.category) {
            setError('Please fill in title, price, and category');
            return;
        }

        const listing = addListing({
            ...formData,
            price: Number(formData.price),
            quantity: Number(formData.quantity) || 1,
            images: formData.images.length
                ? formData.images
                : [`https://placehold.co/600x400/0D7C3E/FFFFFF?text=${encodeURIComponent(formData.title)}`],
        });

        navigate('/vendor/listings');
    };

    return (
        <div className="page">
            <div className="container">
                <div className="vendor-page-header">
                    <Link to="/vendor/listings" className="back-link">
                        <FiArrowLeft /> My Listings
                    </Link>
                    <h1>Add New Listing</h1>
                </div>

                {error && <div className="auth-error" style={{ marginBottom: 20 }}>{error}</div>}

                <form className="new-listing-form" onSubmit={handleSubmit}>
                    <div className="form-grid">
                        <div className="form-main">
                            <div className="form-group">
                                <label className="form-label">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    className="form-input"
                                    placeholder="e.g. Jollof Rice & Chicken"
                                    value={formData.title}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Description</label>
                                <textarea
                                    name="description"
                                    className="form-textarea"
                                    placeholder="Describe your product or service..."
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows={5}
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label">Price (₦)</label>
                                    <input
                                        type="number"
                                        name="price"
                                        className="form-input"
                                        placeholder="1500"
                                        value={formData.price}
                                        onChange={handleChange}
                                        min="0"
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Quantity Available</label>
                                    <input
                                        type="number"
                                        name="quantity"
                                        className="form-input"
                                        placeholder="10"
                                        value={formData.quantity}
                                        onChange={handleChange}
                                        min="1"
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Category</label>
                                <select
                                    name="category"
                                    className="form-select"
                                    value={formData.category}
                                    onChange={handleChange}
                                >
                                    <option value="">Select category</option>
                                    {categories.map((c) => (
                                        <option key={c.id} value={c.id}>
                                            {c.icon} {c.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Pickup Location</label>
                                <input
                                    type="text"
                                    name="pickup"
                                    className="form-input"
                                    placeholder="e.g. Room 204, Moremi Hall"
                                    value={formData.pickup}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="form-sidebar">
                            <div className="form-group">
                                <label className="form-label">Product Image</label>
                                <div className="image-upload">
                                    {imagePreview ? (
                                        <div className="image-preview">
                                            <img src={imagePreview} alt="Preview" />
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-ghost"
                                                onClick={() => {
                                                    setImagePreview(null);
                                                    setFormData((prev) => ({ ...prev, images: [] }));
                                                }}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ) : (
                                        <label className="image-upload-area">
                                            <FiUpload size={24} />
                                            <span>Click to upload</span>
                                            <span className="image-upload-hint">PNG, JPG up to 5MB</span>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                hidden
                                            />
                                        </label>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="form-actions">
                        <Link to="/vendor/listings" className="btn btn-outline">
                            Cancel
                        </Link>
                        <button type="submit" className="btn btn-primary btn-lg">
                            Publish Listing
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
