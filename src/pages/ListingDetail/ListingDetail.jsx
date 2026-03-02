import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiMapPin, FiClock, FiMessageCircle } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { getVendorById } from '../../data/mockData';
import { useVendor } from '../../context/VendorContext';
import './ListingDetail.css';

export default function ListingDetail() {
    const { id } = useParams();
    const { allListings } = useVendor();
    const listing = allListings.find((l) => l.id === id);

    if (!listing) {
        return (
            <div className="page">
                <div className="container">
                    <div className="empty-state">
                        <div className="empty-state-icon">😕</div>
                        <h3>Listing not found</h3>
                        <Link to="/" className="btn btn-primary" style={{ marginTop: 16 }}>
                            Back to marketplace
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    const vendor = getVendorById(listing.vendorId);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN',
            minimumFractionDigits: 0,
        }).format(price);
    };

    const whatsappLink = vendor?.whatsapp
        ? `https://wa.me/${vendor.whatsapp}?text=${encodeURIComponent(`Hi! I'm interested in "${listing.title}" on CampusMarket.`)}`
        : null;

    return (
        <div className="page">
            <div className="container">
                <Link to="/" className="back-link">
                    <FiArrowLeft /> Back
                </Link>

                <div className="listing-detail">
                    <div className="listing-detail-images">
                        <img
                            src={listing.images?.[0] || 'https://placehold.co/600x400/F2F2F2/737373?text=No+Image'}
                            alt={listing.title}
                            className="listing-detail-main-image"
                        />
                    </div>

                    <div className="listing-detail-info">
                        <h1 className="listing-detail-title">{listing.title}</h1>
                        <p className="listing-detail-price">{formatPrice(listing.price)}</p>

                        <div className="listing-detail-meta">
                            <span className="detail-meta-item">
                                <FiMapPin size={14} />
                                {listing.hostel}
                            </span>
                            {listing.pickup && (
                                <span className="detail-meta-item">
                                    <FiClock size={14} />
                                    Pickup: {listing.pickup}
                                </span>
                            )}
                        </div>

                        <div className="listing-detail-description">
                            <h3>Description</h3>
                            <p>{listing.description}</p>
                        </div>

                        {/* Vendor Card */}
                        {vendor && (
                            <div className="listing-vendor-card">
                                <Link to={`/vendor/${vendor.id}`} className="listing-vendor-info">
                                    <img src={vendor.photo} alt={vendor.name} className="listing-vendor-photo" />
                                    <div>
                                        <h4>{vendor.name}</h4>
                                        <span className="listing-vendor-hostel">
                                            <FiMapPin size={12} /> {vendor.hostel}
                                        </span>
                                    </div>
                                </Link>
                                <div className="listing-vendor-actions">
                                    {whatsappLink && (
                                        <a
                                            href={whatsappLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn btn-primary"
                                        >
                                            <FaWhatsapp size={18} />
                                            Contact Vendor
                                        </a>
                                    )}
                                    <Link to={`/vendor/${vendor.id}`} className="btn btn-outline">
                                        View Profile
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
