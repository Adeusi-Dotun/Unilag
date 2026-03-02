import { Link } from 'react-router-dom';
import { FiPackage, FiEye, FiMessageCircle, FiPlus, FiList } from 'react-icons/fi';
import { useVendor } from '../../../context/VendorContext';
import './Dashboard.css';

export default function Dashboard() {
    const { vendorProfile, myListings } = useVendor();
    const activeListings = myListings.filter((l) => l.status === 'active');

    const stats = [
        {
            label: 'Total Listings',
            value: myListings.length,
            icon: <FiPackage />,
            color: 'var(--accent)',
        },
        {
            label: 'Active Listings',
            value: activeListings.length,
            icon: <FiList />,
            color: 'var(--accent-blue)',
        },
        {
            label: 'Profile Views',
            value: Math.floor(Math.random() * 100) + 20,
            icon: <FiEye />,
            color: '#7C3AED',
        },
        {
            label: 'Messages',
            value: Math.floor(Math.random() * 15) + 3,
            icon: <FiMessageCircle />,
            color: '#F59E0B',
        },
    ];

    return (
        <div className="page">
            <div className="container">
                <div className="dashboard-header">
                    <div>
                        <h1>Dashboard</h1>
                        <p>Welcome back, {vendorProfile?.name || 'Vendor'}!</p>
                    </div>
                    <Link to="/vendor/new-listing" className="btn btn-primary">
                        <FiPlus size={18} />
                        Add Listing
                    </Link>
                </div>

                {/* Stats */}
                <div className="dashboard-stats">
                    {stats.map((stat, i) => (
                        <div className="stat-card" key={i}>
                            <div className="stat-icon" style={{ color: stat.color, background: `${stat.color}14` }}>
                                {stat.icon}
                            </div>
                            <div className="stat-info">
                                <span className="stat-value">{stat.value}</span>
                                <span className="stat-label">{stat.label}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Quick Actions */}
                <section className="section">
                    <h2 className="section-title">Quick Actions</h2>
                    <div className="quick-actions">
                        <Link to="/vendor/new-listing" className="quick-action-card">
                            <FiPlus size={24} />
                            <span>Add New Listing</span>
                        </Link>
                        <Link to="/vendor/listings" className="quick-action-card">
                            <FiList size={24} />
                            <span>Manage Listings</span>
                        </Link>
                        <Link to="/vendor/settings" className="quick-action-card">
                            <FiEye size={24} />
                            <span>Edit Profile</span>
                        </Link>
                    </div>
                </section>

                {/* Recent Listings */}
                <section className="section">
                    <div className="section-header">
                        <h2 className="section-title">Recent Listings</h2>
                        <Link to="/vendor/listings" className="section-link">View all</Link>
                    </div>

                    {myListings.length > 0 ? (
                        <div className="recent-listings">
                            {myListings.slice(0, 5).map((listing) => (
                                <div key={listing.id} className="recent-listing-item">
                                    <img
                                        src={listing.images?.[0] || 'https://placehold.co/80x80/F2F2F2/737373?text=...'}
                                        alt={listing.title}
                                        className="recent-listing-img"
                                    />
                                    <div className="recent-listing-info">
                                        <h4>{listing.title}</h4>
                                        <p>₦{listing.price.toLocaleString()}</p>
                                    </div>
                                    <span className={`badge badge-${listing.status === 'active' ? 'success' : 'warning'}`}>
                                        {listing.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="empty-state">
                            <div className="empty-state-icon">📦</div>
                            <h3>No listings yet</h3>
                            <p>Create your first listing to start selling!</p>
                            <Link to="/vendor/new-listing" className="btn btn-primary" style={{ marginTop: 16 }}>
                                <FiPlus /> Add Listing
                            </Link>
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}
