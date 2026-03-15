import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
    return (
        <footer className="site-footer">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-brand">
                        <Link to="/" className="footer-logo">
                            🛒 CampusMarket
                        </Link>
                        <p className="footer-tagline">
                            Your campus marketplace. Buy, sell, and deliver across campus with ease.
                        </p>
                    </div>

                    <div className="footer-links-group">
                        <h4>Marketplace</h4>
                        <Link to="/category/food-drinks">Food & Drinks</Link>
                        <Link to="/category/beauty">Beauty Products</Link>
                        <Link to="/category/fashion">Fashion</Link>
                        <Link to="/category/academics">Academics</Link>
                    </div>

                    <div className="footer-links-group">
                        <h4>Account</h4>
                        <Link to="/login">Sign In</Link>
                        <Link to="/register">Register</Link>
                        <Link to="/orders">My Orders</Link>
                        <Link to="/profile">Profile</Link>
                    </div>

                    <div className="footer-links-group">
                        <h4>Vendors</h4>
                        <Link to="/register">Start Selling</Link>
                        <Link to="/vendor/dashboard">Vendor Dashboard</Link>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} CampusMarket. Built for university students.</p>
                </div>
            </div>
        </footer>
    );
}
