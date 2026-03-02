import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';
import { FiShoppingBag, FiUser, FiLogOut, FiGrid, FiShield,  } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { user, isAuthenticated, isVendor, isAdmin, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        setMenuOpen(false);
        navigate('/');
    };

    const closeMenu = () => setMenuOpen(false);

    return (
        <nav className="navbar">
            <div className="container navbar-inner">
                <Link to="/" className="navbar-brand" onClick={closeMenu}>
                    <span>myShop</span>
                </Link>

                <div className="navbar-links-desktop">
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/category/food" className="nav-link">Food</Link>
                    <Link to="/category/fashion" className="nav-link">Fashion</Link>
                    <Link to="/category/services" className="nav-link">Services</Link>
                </div>

                <div className="navbar-actions-desktop">
                    {isAuthenticated ? (
                        <>
                            {isVendor && (
                                <Link to="/vendor/dashboard" className="nav-link nav-link-accent">
                                    <FiGrid size={16} />
                                    Dashboard
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
                            <Link to='/cart' className='nav-link'>
                                <FiShoppingBag />
                            </Link>
                            
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="btn btn-ghost btn-sm">Log in</Link>
                            <Link to="/register" className="btn btn-primary btn-sm">Sign up</Link>
                        </>
                    )}
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
                    <Link to="/" className="mobile-link" onClick={closeMenu}>Home</Link>
                    <Link to="/category/food" className="mobile-link" onClick={closeMenu}>Food</Link>
                    <Link to="/category/fashion" className="mobile-link" onClick={closeMenu}>Fashion</Link>
                    <Link to="/category/services" className="mobile-link" onClick={closeMenu}>Services</Link>
                    <Link to="/category/electronics" className="mobile-link" onClick={closeMenu}>Electronics</Link>
                    <Link to="/category/beauty" className="mobile-link" onClick={closeMenu}>Beauty</Link>
                    <Link to="/category/books" className="mobile-link" onClick={closeMenu}>Books</Link>

                    <div className="mobile-divider" />

                    {isAuthenticated ? (
                        <>
                            {isVendor && (
                                <Link to="/vendor/dashboard" className="mobile-link" onClick={closeMenu}>
                                    <FiGrid size={16} /> Vendor Dashboard
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
                            <Link to='/cart' className='mobile-link' onClick={closeMenu}>
                                <FiShoppingBag /> My cart
                            </Link>
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

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';
import { FiShoppingBag, FiUser, FiLogOut, FiGrid, FiShield,  } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { user, isAuthenticated, isVendor, isAdmin, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        setMenuOpen(false);
        navigate('/');
    };

    const closeMenu = () => setMenuOpen(false);

    return (
        <nav className="navbar">
            <div className="container navbar-inner">
                <Link to="/" className="navbar-brand" onClick={closeMenu}>
                    <span>myShop</span>
                </Link>

                <div className="navbar-links-desktop">
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/category/food" className="nav-link">Food</Link>
                    <Link to="/category/fashion" className="nav-link">Fashion</Link>
                    <Link to="/category/services" className="nav-link">Services</Link>
                </div>

                <div className="navbar-actions-desktop">
                    {isAuthenticated ? (
                        <>
                            {isVendor && (
                                <Link to="/vendor/dashboard" className="nav-link nav-link-accent">
                                    <FiGrid size={16} />
                                    Dashboard
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
                            <Link to='/cart' className='nav-link'>
                                <FiShoppingBag />
                            </Link>
                            
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="btn btn-ghost btn-sm">Log in</Link>
                            <Link to="/register" className="btn btn-primary btn-sm">Sign up</Link>
                        </>
                    )}
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
                    <Link to="/" className="mobile-link" onClick={closeMenu}>Home</Link>
                    <Link to="/category/food" className="mobile-link" onClick={closeMenu}>Food</Link>
                    <Link to="/category/fashion" className="mobile-link" onClick={closeMenu}>Fashion</Link>
                    <Link to="/category/services" className="mobile-link" onClick={closeMenu}>Services</Link>
                    <Link to="/category/electronics" className="mobile-link" onClick={closeMenu}>Electronics</Link>
                    <Link to="/category/beauty" className="mobile-link" onClick={closeMenu}>Beauty</Link>
                    <Link to="/category/books" className="mobile-link" onClick={closeMenu}>Books</Link>

                    <div className="mobile-divider" />

                    {isAuthenticated ? (
                        <>
                            {isVendor && (
                                <Link to="/vendor/dashboard" className="mobile-link" onClick={closeMenu}>
                                    <FiGrid size={16} /> Vendor Dashboard
                                </Link>
                            )}
                            {isAdmin && (
                                <Link to="/admin/vendors" className="mobile-link" onClick={closeMenu}>
                                    <FiShield size={16} /> Admin Panel
                                </Link>
                            )}
                            <Link to="/profile" className="mobile-link" onClick={closeMenu}>
                                <FiUser size={16} /> Profil
                            </Link>
                            <button className="mobile-link mobile-logout" onClick={handleLogout}>
                                <FiLogOut size={16} /> Log out
                            </button>
                            <Link to='/cart' className='mobile-link' onClick={closeMenu}>
                                <FiShoppingBag /> My Cart
                            </Link>
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
