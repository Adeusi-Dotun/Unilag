import { Link } from 'react-router-dom';
import { FiMapPin } from 'react-icons/fi';
import './VendorCard.css';

export default function VendorCard({ vendor }) {
    return (
        <Link to={`/vendor/${vendor.id}`} className="vendor-card card">
            <div className="vendor-card-inner">
                <img
                    src={vendor.photo}
                    alt={vendor.name}
                    className="vendor-card-photo"
                />
                <div className="vendor-card-info">
                    <h4 className="vendor-card-name">{vendor.name}</h4>
                    <span className="vendor-card-hostel">
                        <FiMapPin size={12} />
                        {vendor.hostel}
                    </span>
                    {vendor.bio && (
                        <p className="vendor-card-bio">{vendor.bio}</p>
                    )}
                </div>
            </div>
        </Link>
    );
}
