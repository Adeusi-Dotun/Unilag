import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiCheck, FiX, FiPackage, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { useOrders } from '../../../context/OrderContext';
import { useVendor } from '../../../context/VendorContext';
import './VendorOrders.css';

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

export default function VendorOrders() {
    const { vendorProfile } = useVendor();
    const { getOrdersByVendor, acceptOrder, declineOrder } = useOrders();
    const [statusFilter, setStatusFilter] = useState('');
    const [expandedOrder, setExpandedOrder] = useState(null);

    const orders = vendorProfile ? getOrdersByVendor(vendorProfile.id) : [];
    const filteredOrders = statusFilter
        ? orders.filter((o) => o.status === statusFilter)
        : orders;

    const formatPrice = (price) =>
        new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 }).format(price);

    const formatDate = (dateStr) =>
        new Date(dateStr).toLocaleDateString('en-NG', {
            year: 'numeric', month: 'short', day: 'numeric',
            hour: '2-digit', minute: '2-digit',
        });

    const pendingCount = orders.filter((o) => o.status === 'pending').length;

    return (
        <div className="page">
            <div className="container">
                <div className="vendor-page-header">
                    <Link to="/vendor/dashboard" className="back-link">
                        <FiArrowLeft /> Dashboard
                    </Link>
                    <div className="vendor-page-title-row">
                        <h1>
                            Orders
                            {pendingCount > 0 && (
                                <span className="pending-count">{pendingCount} pending</span>
                            )}
                        </h1>
                    </div>
                </div>

                {/* Filters */}
                <div className="vendor-orders-filters">
                    {['', 'pending', 'accepted', 'on-the-way', 'delivered', 'confirmed', 'declined'].map((status) => (
                        <button
                            key={status}
                            className={`chip ${statusFilter === status ? 'chip-active' : ''}`}
                            onClick={() => setStatusFilter(status)}
                        >
                            {status || 'All'}
                        </button>
                    ))}
                </div>

                {filteredOrders.length > 0 ? (
                    <div className="vendor-orders-list">
                        {filteredOrders.map((order) => (
                            <div
                                key={order.id}
                                className={`vendor-order-card ${order.status === 'pending' ? 'vendor-order-pending' : ''}`}
                            >
                                <div
                                    className="vendor-order-header"
                                    onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                                >
                                    <div className="vendor-order-info">
                                        <div className="vendor-order-top">
                                            <span className="vendor-order-id">#{order.id.slice(-6)}</span>
                                            <span className={`badge badge-${STATUS_COLORS[order.status] || 'neutral'}`}>
                                                {order.status}
                                            </span>
                                        </div>
                                        <p className="vendor-order-buyer">{order.buyerName}</p>
                                        <div className="vendor-order-bottom">
                                            <span className="vendor-order-total">{formatPrice(order.total)}</span>
                                            <span className="vendor-order-date">{formatDate(order.createdAt)}</span>
                                        </div>
                                    </div>
                                    {expandedOrder === order.id ? <FiChevronUp /> : <FiChevronDown />}
                                </div>

                                {expandedOrder === order.id && (
                                    <div className="vendor-order-details">
                                        <div className="vendor-order-items">
                                            {order.items.map((item, i) => (
                                                <div key={i} className="vendor-order-item">
                                                    <span>{item.title} × {item.quantity}</span>
                                                    <span>{formatPrice(item.price * item.quantity)}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="vendor-order-meta">
                                            <p><strong>Deliver to:</strong> {order.buyerLocation || 'Not specified'}</p>
                                            <p><strong>Pickup:</strong> {order.pickupLocation || 'Your location'}</p>
                                        </div>

                                        {order.status === 'pending' && (
                                            <div className="vendor-order-actions">
                                                <button
                                                    className="btn btn-primary"
                                                    onClick={() => acceptOrder(order.id)}
                                                >
                                                    <FiCheck size={16} /> Accept Order
                                                </button>
                                                <button
                                                    className="btn btn-outline"
                                                    onClick={() => declineOrder(order.id)}
                                                    style={{ color: 'var(--danger)', borderColor: 'var(--danger)' }}
                                                >
                                                    <FiX size={16} /> Decline
                                                </button>
                                            </div>
                                        )}

                                        {order.status === 'confirmed' && (
                                            <div className="vendor-order-payment-status">
                                                <FiCheck size={14} />
                                                Payment released to your account
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="empty-state">
                        <div className="empty-state-icon">📦</div>
                        <h3>No orders found</h3>
                        <p>{statusFilter ? `No ${statusFilter} orders` : 'Orders will appear here when buyers purchase your products'}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
