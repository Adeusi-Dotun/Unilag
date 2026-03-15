import { Link } from 'react-router-dom';
import { FiArrowLeft, FiChevronRight, FiPackage } from 'react-icons/fi';
import { useOrders } from '../../context/OrderContext';
import { useAuth } from '../../context/AuthContext';
import { getVendorById } from '../../data/mockData';
import './Orders.css';

const STATUS_COLORS = {
    pending: 'warning',
    accepted: 'warning',
    'picked-up': 'warning',
    'on-the-way': 'warning',
    delivered: 'success',
    confirmed: 'success',
    declined: 'danger',
    disputed: 'danger',
};

export default function Orders() {
    const { user } = useAuth();
    const { getOrdersByUser } = useOrders();

    const orders = user ? getOrdersByUser(user.id) : [];

    const formatPrice = (price) =>
        new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 }).format(price);

    const formatDate = (dateStr) =>
        new Date(dateStr).toLocaleDateString('en-NG', {
            year: 'numeric', month: 'short', day: 'numeric',
        });

    return (
        <div className="page">
            <div className="container">
                <Link to="/" className="back-link">
                    <FiArrowLeft /> Home
                </Link>

                <h1 style={{ marginBottom: 'var(--space-6)' }}>My Orders</h1>

                {orders.length > 0 ? (
                    <div className="orders-list">
                        {orders.map((order) => {
                            const vendor = getVendorById(order.vendorId);
                            return (
                                <Link
                                    key={order.id}
                                    to={`/orders/${order.id}`}
                                    className="order-card"
                                >
                                    <div className="order-card-left">
                                        <div className="order-card-icon">
                                            <FiPackage />
                                        </div>
                                        <div className="order-card-info">
                                            <div className="order-card-top">
                                                <span className="order-card-id">
                                                    #{order.id.slice(-6)}
                                                </span>
                                                <span className={`badge badge-${STATUS_COLORS[order.status] || 'neutral'}`}>
                                                    {order.status}
                                                </span>
                                            </div>
                                            <p className="order-card-vendor">
                                                {vendor?.name || 'Unknown Vendor'}
                                            </p>
                                            <p className="order-card-items">
                                                {order.items.map((i) => i.title).join(', ')}
                                            </p>
                                            <div className="order-card-bottom">
                                                <span className="order-card-total">
                                                    {formatPrice(order.total)}
                                                </span>
                                                <span className="order-card-date">
                                                    {formatDate(order.createdAt)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <FiChevronRight className="order-card-arrow" />
                                </Link>
                            );
                        })}
                    </div>
                ) : (
                    <div className="empty-state">
                        <div className="empty-state-icon">📦</div>
                        <h3>No orders yet</h3>
                        <p>Your order history will appear here</p>
                        <Link to="/" className="btn btn-primary" style={{ marginTop: 16 }}>
                            Start Shopping
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
