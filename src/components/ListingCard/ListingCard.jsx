import { Link } from 'react-router-dom';
import { FiMapPin, FiHeart, FiShoppingCart } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { getVendorById } from '../../data/mockData';
import './ListingCard.css';

export default function ListingCard({ listing }) {
    const { user, toggleSaveListing } = useAuth();
    const { addToCart, isInCart } = useCart();
    const vendor = getVendorById(listing.vendorId);
    const isSaved = user?.savedListings?.includes(listing.id);
    const inCart = isInCart(listing.id);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN',
            minimumFractionDigits: 0,
        }).format(price);
    };

    return (
        <div className="listing-card card">
            <Link to={`/listing/${listing.id}`} className="listing-card-image-wrap">
                <img
                    src={listing.images?.[0] || 'https://placehold.co/400x300/F2F2F2/737373?text=No+Image'}
                    alt={listing.title}
                    className="listing-card-image"
                />
                {user && (
                    <button
                        className={`listing-save-btn ${isSaved ? 'saved' : ''}`}
                        onClick={(e) => {
                            e.preventDefault();
                            toggleSaveListing(listing.id);
                        }}
                        aria-label={isSaved ? 'Unsave listing' : 'Save listing'}
                    >
                        <FiHeart />
                    </button>
                )}
            </Link>
            <div className="card-body">
                <Link to={`/listing/${listing.id}`} className="listing-card-title">
                    {listing.title}
                </Link>
                <p className="listing-card-price">{formatPrice(listing.price)}</p>
                <div className="listing-card-meta">
                    {vendor && (
                        <Link to={`/vendor/${vendor.id}`} className="listing-card-vendor">
                            {vendor.name}
                        </Link>
                    )}
                    <span className="listing-card-hostel">
                        <FiMapPin size={12} />
                        {listing.hostel}
                    </span>
                </div>
                <button
                    className={`listing-card-cart-btn ${inCart ? 'in-cart' : ''}`}
                    onClick={() => addToCart(listing)}
                >
                    <FiShoppingCart size={14} />
                    {inCart ? 'Added' : 'Add to Cart'}
                </button>
            </div>
        </div>
    );
}
