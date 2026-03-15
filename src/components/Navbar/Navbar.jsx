import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';
import { FiShoppingBag, FiUser, FiLogOut, FiGrid, FiShield, FiSearch, FiPackage, FiTruck } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import './Navbar.css';

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const { user, isAuthenticated, isVendor, isAdmin, isRider, logout } = useAuth();
    const { cartCount } = useCart();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        setMenuOpen(false);
        navigate('/');
    };

    const closeMenu = () => setMenuOpen(false);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/?q=${encodeURIComponent(searchQuery.trim())}`);
            closeMenu();
        }
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <nav className="navbar">
            <div className="container navbar-inner">
                <Link to="/" className="navbar-brand" onClick={closeMenu}>
                    <span>myShop</span>
                </Link>

                {/* Desktop Search Bar */}
                <form className="navbar-search" onSubmit={handleSearchSubmit}>
                    <FiSearch className="navbar-search-icon" />
                    <input
                        type="text"
                        className="navbar-search-input"
                        placeholder="Search products, vendors..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </form>

                <div className="navbar-actions-desktop">
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/category/food-drinks" className="nav-link">Food</Link>
                    <Link to="/category/fashion" className="nav-link">Fashion</Link>
                    {isAuthenticated ? (
                        <>
                            {!isVendor && !isAdmin && !isRider && (
                                <Link to="/orders" className="nav-link">
                                    <FiPackage size={16} />
                                    Orders
                                </Link>
                            )}
                            {isVendor && (
                                <Link to="/vendor/dashboard" className="nav-link nav-link-accent">
                                    <FiGrid size={16} />
                                    Dashboard
                                </Link>
                            )}
                            {isRider && (
                                <Link to="/rider/dashboard" className="nav-link nav-link-accent">
                                    <FiTruck size={16} />
                                    Deliveries
                                </Link>
                            )}
                            {isAdmin && (
                                <Link to="/admin/vendors" className="nav-link nav-link-accent">
                                    <FiShield size={16} />
                                    Admin
                                </Link>
                            )}
                            <Link to="/profile" className="nav-link">
                                <FiUser size={16} />
                                {user.name.split(' ')[0]}
                            </Link>
                            <button className="btn btn-ghost btn-sm" onClick={handleLogout}>
                                <FiLogOut size={16} />
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="btn btn-ghost btn-sm">Log in</Link>
                            <Link to="/register" className="btn btn-primary btn-sm">Sign up</Link>
                        </>
                    )}
                    <Link to="/cart" className="nav-link cart-link">
                        <FiShoppingBag size={18} />
                        {cartCount > 0 && (
                            <span className="cart-badge">{cartCount}</span>
                        )}
                    </Link>
                </div>

                <button
                    className="navbar-hamburger"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    {menuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
                </button>
            </div>

            {menuOpen && (
                <div className="navbar-mobile-menu">
                    {/* Mobile Search Bar */}
                    <form className="navbar-search navbar-search-mobile" onSubmit={handleSearchSubmit}>
                        <FiSearch className="navbar-search-icon" />
                        <input
                            type="text"
                            className="navbar-search-input"
                            placeholder="Search products, vendors..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                    </form>

                    <div className="mobile-divider" />

                    <Link to="/" className="mobile-link" onClick={closeMenu}>Home</Link>
                    <Link to="/category/food-drinks" className="mobile-link" onClick={closeMenu}>Food & Drinks</Link>
                    <Link to="/category/fashion" className="mobile-link" onClick={closeMenu}>Fashion</Link>
                    <Link to="/category/beauty" className="mobile-link" onClick={closeMenu}>Beauty</Link>
                    <Link to="/category/academics" className="mobile-link" onClick={closeMenu}>Academics</Link>

                    <div className="mobile-divider" />

                    <Link to="/cart" className="mobile-link" onClick={closeMenu}>
                        <FiShoppingBag size={16} />
                        My Cart {cartCount > 0 && `(${cartCount})`}
                    </Link>

                    {isAuthenticated ? (
                        <>
                            {!isVendor && !isAdmin && !isRider && (
                                <Link to="/orders" className="mobile-link" onClick={closeMenu}>
                                    <FiPackage size={16} /> My Orders
                                </Link>
                            )}
                            {isVendor && (
                                <Link to="/vendor/dashboard" className="mobile-link" onClick={closeMenu}>
                                    <FiGrid size={16} /> Vendor Dashboard
                                </Link>
                            )}
                            {isRider && (
                                <Link to="/rider/dashboard" className="mobile-link" onClick={closeMenu}>
                                    <FiTruck size={16} /> My Deliveries
                                </Link>
                            )}
                            {isAdmin && (
                                <Link to="/admin/vendors" className="mobile-link" onClick={closeMenu}>
                                    <FiShield size={16} /> Admin Panel
                                </Link>
                            )}
                            <Link to="/profile" className="mobile-link" onClick={closeMenu}>
                                <FiUser size={16} /> Profile
                            </Link>
                            <button className="mobile-link mobile-logout" onClick={handleLogout}>
                                <FiLogOut size={16} /> Log out
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="mobile-link" onClick={closeMenu}>Log in</Link>
                            <Link to="/register" className="mobile-link mobile-link-primary" onClick={closeMenu}>Sign up</Link>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
}