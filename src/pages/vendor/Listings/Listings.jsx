import { Link } from 'react-router-dom';
import { FiPlus, FiEdit, FiTrash2, FiArrowLeft } from 'react-icons/fi';
import { useVendor } from '../../../context/VendorContext';
import './Listings.css';

export default function Listings() {
    const { myListings, deleteListing } = useVendor();

    const handleDelete = (id, title) => {
        if (window.confirm(`Delete "${title}"? This cannot be undone.`)) {
            deleteListing(id);
        }
    };

    const formatPrice = (price) => `₦${price.toLocaleString()}`;

    return (
        <div className="page">
            <div className="container">
                <div className="vendor-page-header">
                    <Link to="/vendor/dashboard" className="back-link">
                        <FiArrowLeft /> Dashboard
                    </Link>
                    <div className="vendor-page-title-row">
                        <h1>My Listings</h1>
                        <Link to="/vendor/new-listing" className="btn btn-primary">
                            <FiPlus size={18} />
                            New Listing
                        </Link>
                    </div>
                </div>

                {myListings.length > 0 ? (
                    <div className="listings-table-wrap">
                        <table className="listings-table">
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Category</th>
                                    <th>Price</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {myListings.map((listing) => (
                                    <tr key={listing.id}>
                                        <td>
                                            <div className="table-product">
                                                <img
                                                    src={listing.images?.[0] || 'https://placehold.co/40x40/F2F2F2/737373?text=...'}
                                                    alt={listing.title}
                                                    className="table-product-img"
                                                />
                                                <span className="table-product-name">{listing.title}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="badge badge-neutral" style={{ textTransform: 'capitalize' }}>
                                                {listing.category}
                                            </span>
                                        </td>
                                        <td className="table-price">{formatPrice(listing.price)}</td>
                                        <td>
                                            <span className={`badge badge-${listing.status === 'active' ? 'success' : 'warning'}`}>
                                                {listing.status}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="table-actions">
                                                <button className="btn btn-ghost btn-sm" title="Edit">
                                                    <FiEdit size={14} />
                                                </button>
                                                <button
                                                    className="btn btn-ghost btn-sm"
                                                    title="Delete"
                                                    onClick={() => handleDelete(listing.id, listing.title)}
                                                    style={{ color: 'var(--danger)' }}
                                                >
                                                    <FiTrash2 size={14} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="empty-state">
                        <div className="empty-state-icon">📦</div>
                        <h3>No listings yet</h3>
                        <p>Add your first product or service to start selling!</p>
                        <Link to="/vendor/new-listing" className="btn btn-primary" style={{ marginTop: 16 }}>
                            <FiPlus /> Add Listing
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
