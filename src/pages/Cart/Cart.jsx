import { Link } from 'react-router-dom';
import { IoCartOutline } from 'react-icons/io5';
import { FiTrash2, FiPlus, FiMinus, FiArrowLeft } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import './Cart.css';

export default function Cart() {
    const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN',
            minimumFractionDigits: 0,
        }).format(price);
    };

    if (cartItems.length === 0) {
        return (
            <div className="Cart container">
                <div className="cart-box">
                    <IoCartOutline size={70} />
                    <h2>Your cart is empty</h2>
                    <p>You have not added any item to your cart</p>
                </div>
                <Link to="/" className="shopping">SHOP NOW</Link>
            </div>
        );
    }

    return (
        <div className="page">
            <div className="container">
                <Link to="/" className="back-link">
                    <FiArrowLeft /> Continue Shopping
                </Link>

                <h1 style={{ marginBottom: 'var(--space-6)' }}>Your Cart</h1>

                <div className="cart-layout">
                    <div className="cart-items">
                        {cartItems.map((item) => (
                            <div key={item.id} className="cart-item">
                                <Link to={`/listing/${item.id}`} className="cart-item-image-wrap">
                                    <img
                                        src={item.images?.[0] || 'https://placehold.co/120x120/F2F2F2/737373?text=No+Image'}
                                        alt={item.title}
                                        className="cart-item-image"
                                    />
                                </Link>
                                <div className="cart-item-details">
                                    <Link to={`/listing/${item.id}`} className="cart-item-title">
                                        {item.title}
                                    </Link>
                                    <p className="cart-item-price">{formatPrice(item.price)}</p>
                                    <div className="cart-item-controls">
                                        <div className="quantity-control">
                                            <button
                                                className="qty-btn"
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            >
                                                <FiMinus size={14} />
                                            </button>
                                            <span className="qty-value">{item.quantity}</span>
                                            <button
                                                className="qty-btn"
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            >
                                                <FiPlus size={14} />
                                            </button>
                                        </div>
                                        <button
                                            className="cart-item-remove"
                                            onClick={() => removeFromCart(item.id)}
                                        >
                                            <FiTrash2 size={14} /> Remove
                                        </button>
                                    </div>
                                </div>
                                <div className="cart-item-subtotal">
                                    {formatPrice(item.price * item.quantity)}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="cart-summary">
                        <h3>Order Summary</h3>
                        <div className="cart-summary-row">
                            <span>Subtotal ({cartItems.reduce((s, i) => s + i.quantity, 0)} items)</span>
                            <span>{formatPrice(cartTotal)}</span>
                        </div>
                        <div className="cart-summary-row cart-summary-total">
                            <span>Total</span>
                            <span>{formatPrice(cartTotal)}</span>
                        </div>
                        <Link to="/checkout" className="btn btn-primary btn-lg btn-block">
                            Checkout
                        </Link>
                        <button className="btn btn-ghost btn-block" onClick={clearCart}>
                            Clear Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
