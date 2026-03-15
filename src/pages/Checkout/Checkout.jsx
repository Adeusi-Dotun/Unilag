import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiLock, FiShield, FiMapPin } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useOrders } from '../../context/OrderContext';
import './Checkout.css';

export default function Checkout() {
    const { cartItems, cartTotal, clearCart } = useCart();
    const { user, isAuthenticated } = useAuth();
    const { placeOrder } = useOrders();
    const navigate = useNavigate();
    const [buyerLocation, setBuyerLocation] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState('');

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN',
            minimumFractionDigits: 0,
        }).format(price);
    };

    const handlePlaceOrder = () => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }
        if (!buyerLocation.trim()) {
            setError('Please enter your delivery location');
            return;
        }

        setIsProcessing(true);
        setError('');

        // Simulate payment processing
        setTimeout(() => {
            const newOrders = placeOrder(cartItems, cartTotal, user.id, user.name, buyerLocation);
            clearCart();
            setIsProcessing(false);
            navigate('/orders');
        }, 1500);
    };

    if (cartItems.length === 0) {
        return (
            <div className="page">
                <div className="container">
                    <div className="empty-state">
                        <div className="empty-state-icon">🛒</div>
                        <h3>Nothing to checkout</h3>
                        <p>Your cart is empty</p>
                        <Link to="/" className="btn btn-primary" style={{ marginTop: 16 }}>
                            Browse Marketplace
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="page">
            <div className="container">
                <Link to="/cart" className="back-link">
                    <FiArrowLeft /> Back to Cart
                </Link>

                <h1 style={{ marginBottom: 'var(--space-6)' }}>Checkout</h1>

                <div className="checkout-layout">
                    <div className="checkout-main">
                        {/* Escrow Notice */}
                        <div className="escrow-notice">
                            <FiShield size={20} />
                            <div>
                                <strong>Secure Escrow Payment</strong>
                                <p>Your payment is held securely until you confirm delivery. You have a 1-hour window to verify your order.</p>
                            </div>
                        </div>

                        {/* Delivery Location */}
                        <div className="checkout-section">
                            <h3><FiMapPin size={16} /> Delivery Location</h3>
                            <input
                                type="text"
                                className="form-input"
                                placeholder="e.g. Jaja Hall, Room 315"
                                value={buyerLocation}
                                onChange={(e) => { setBuyerLocation(e.target.value); setError(''); }}
                            />
                            {error && <p className="checkout-error">{error}</p>}
                        </div>

                        {/* Order Items */}
                        <div className="checkout-section">
                            <h3>Order Items</h3>
                            <div className="checkout-items">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="checkout-item">
                                        <img
                                            src={item.images?.[0] || 'https://placehold.co/80x80/F2F2F2/737373?text=...'}
                                            alt={item.title}
                                            className="checkout-item-img"
                                        />
                                        <div className="checkout-item-info">
                                            <span className="checkout-item-title">{item.title}</span>
                                            <span className="checkout-item-qty">Qty: {item.quantity}</span>
                                        </div>
                                        <span className="checkout-item-price">
                                            {formatPrice(item.price * item.quantity)}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Payment Summary */}
                    <div className="checkout-summary">
                        <h3>Payment Summary</h3>
                        <div className="checkout-summary-row">
                            <span>Subtotal ({cartItems.reduce((s, i) => s + i.quantity, 0)} items)</span>
                            <span>{formatPrice(cartTotal)}</span>
                        </div>
                        <div className="checkout-summary-row">
                            <span>Delivery Fee</span>
                            <span className="checkout-free">FREE</span>
                        </div>
                        <div className="checkout-summary-row checkout-summary-total">
                            <span>Total</span>
                            <span>{formatPrice(cartTotal)}</span>
                        </div>

                        <button
                            className={`btn btn-primary btn-lg btn-block checkout-pay-btn ${isProcessing ? 'processing' : ''}`}
                            onClick={handlePlaceOrder}
                            disabled={isProcessing}
                        >
                            <FiLock size={16} />
                            {isProcessing ? 'Processing...' : `Pay ${formatPrice(cartTotal)}`}
                        </button>

                        <p className="checkout-secure-text">
                            <FiLock size={12} /> Payment held in escrow until delivery is confirmed
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
