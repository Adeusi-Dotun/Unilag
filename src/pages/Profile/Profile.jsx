import { Link } from 'react-router-dom';
import { FiUser, FiHeart, FiLogOut, FiEdit } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { getVendorById, getListingById } from '../../data/mockData';
import VendorCard from '../../components/VendorCard/VendorCard';
import ListingCard from '../../components/ListingCard/ListingCard';
import { useVendor } from '../../context/VendorContext';
import './Profile.css';

export default function Profile() {
    const { user, logout } = useAuth();
    const { allListings } = useVendor();

    const savedVendors = (user?.savedVendors || [])
        .map(getVendorById)
        .filter(Boolean);

    const savedListings = (user?.savedListings || [])
        .map((id) => allListings.find((l) => l.id === id))
        .filter(Boolean);

    return (
        <div className="page">
            <div className="container">
                <div className="profile-header">
                    <div className="profile-avatar">
                        <FiUser size={32} />
                    </div>
                    <div className="profile-info">
                        <h1>{user?.name}</h1>
                        <p className="profile-email">{user?.email}</p>
                        <span className="badge badge-neutral" style={{ textTransform: 'capitalize' }}>
                            {user?.role}
                        </span>
                    </div>
                </div>

                {/* Saved Vendors */}
                <section className="section">
                    <div className="section-header">
                        <h2 className="section-title">
                            <FiHeart size={18} /> Saved Vendors
                        </h2>
                    </div>
                    {savedVendors.length > 0 ? (
                        <div className="grid-3">
                            {savedVendors.map((vendor) => (
                                <VendorCard key={vendor.id} vendor={vendor} />
                            ))}
                        </div>
                    ) : (
                        <div className="empty-state">
                            <div className="empty-state-icon">💚</div>
                            <h3>No saved vendors</h3>
                            <p>Browse the marketplace and save your favorite vendors</p>
                        </div>
                    )}
                </section>

                {/* Saved Listings */}
                <section className="section">
                    <div className="section-header">
                        <h2 className="section-title">
                            <FiHeart size={18} /> Saved Listings
                        </h2>
                    </div>
                    {savedListings.length > 0 ? (
                        <div className="grid-4">
                            {savedListings.map((listing) => (
                                <ListingCard key={listing.id} listing={listing} />
                            ))}
                        </div>
                    ) : (
                        <div className="empty-state">
                            <div className="empty-state-icon">📌</div>
                            <h3>No saved listings</h3>
                            <p>Tap the heart on any listing to save it here</p>
                        </div>
                    )}
                </section>

                <div className="profile-actions">
                    <button className="btn btn-outline btn-danger" onClick={logout}>
                        <FiLogOut size={16} /> Log out
                    </button>
                </div>
            </div>
        </div>
    );
}
