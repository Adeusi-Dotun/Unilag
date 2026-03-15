import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiMapPin, FiClock, FiPhone } from 'react-icons/fi';
import { getVendorById } from '../../data/mockData';
import ListingCard from '../../components/ListingCard/ListingCard';
import { useVendor } from '../../context/VendorContext';
import './VendorProfile.css';

export default function VendorProfile() {
    const { id } = useParams();
    const { allListings } = useVendor();
    const vendor = getVendorById(id);

    if (!vendor) {
        return (
            <div className="page">
                <div className="container">
                    <div className="empty-state">
                        <div className="empty-state-icon">😕</div>
                        <h3>Vendor not found</h3>
                        <Link to="/" className="btn btn-primary" style={{ marginTop: 16 }}>
                            Back to marketplace
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    const vendorListings = allListings.filter(
        (l) => l.vendorId === id && l.status === 'active'
    );

    return (
        <div className="page">
            <div className="container">
                <Link to="/" className="back-link">
                    <FiArrowLeft /> Back
                </Link>

                <div className="vendor-profile-header">
                    <img src={vendor.photo} alt={vendor.name} className="vendor-profile-photo" />
                    <div className="vendor-profile-info">
                        <h1>{vendor.name}</h1>
                        {vendor.bio && <p className="vendor-profile-bio">{vendor.bio}</p>}

                        <div className="vendor-profile-meta">
                            <span className="vendor-meta-item">
                                <FiMapPin size={14} />
                                {vendor.hostel}
                            </span>
                            {vendor.hours && (
                                <span className="vendor-meta-item">
                                    <FiClock size={14} />
                                    {vendor.hours}
                                </span>
                            )}
                            {vendor.phone && (
                                <span className="vendor-meta-item">
                                    <FiPhone size={14} />
                                    {vendor.phone}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Vendor Listings */}
                <section className="section">
                    <div className="section-header">
                        <h2 className="section-title">
                            Products & Services ({vendorListings.length})
                        </h2>
                    </div>

                    {vendorListings.length > 0 ? (
                        <div className="grid-4">
                            {vendorListings.map((listing) => (
                                <ListingCard key={listing.id} listing={listing} />
                            ))}
                        </div>
                    ) : (
                        <div className="empty-state">
                            <div className="empty-state-icon">📦</div>
                            <h3>No listings yet</h3>
                            <p>This vendor hasn't added any listings yet</p>
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}
