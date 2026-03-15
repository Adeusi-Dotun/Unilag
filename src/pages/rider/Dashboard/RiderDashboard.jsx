import { Link } from 'react-router-dom';
import { FiTruck, FiMapPin, FiPhone, FiArrowRight } from 'react-icons/fi';
import { useOrders } from '../../../context/OrderContext';
import { useAuth } from '../../../context/AuthContext';
import { getVendorById } from '../../../data/mockData';
import './RiderDashboard.css';

const STATUS_LABELS = {
    accepted: 'Pick Up',
    'picked-up': 'On the Way',
    'on-the-way': 'Deliver',
};

const NEXT_STATUS = {
    accepted: 'picked-up',
    'picked-up': 'on-the-way',
    'on-the-way': 'delivered',
};

export default function RiderDashboard() {
    const { user } = useAuth();
    const { getOrdersByRider, updateOrderStatus } = useOrders();
    const orders = user?.riderId ? getOrdersByRider(user.riderId) : [];

    const activeOrders = orders.filter((o) =>
        ['accepted', 'picked-up', 'on-the-way'].includes(o.status)
    );
    const completedOrders = orders.filter((o) =>
        ['delivered', 'confirmed'].includes(o.status)
    );

    const formatPrice = (price) =>
        new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 }).format(price);

    const handleStatusUpdate = (orderId, nextStatus) => {
        updateOrderStatus(orderId, nextStatus);
    };

    return (
        <div className="page">
            <div className="container">
                <h1 style={{ marginBottom: 'var(--space-2)' }}>Rider Dashboard</h1>
                <p style={{ color: 'var(--text-muted)', marginBottom: 'var(--space-8)' }}>
                    Welcome, {user?.name}! You have {activeOrders.length} active delivery{activeOrders.length !== 1 ? 'ies' : 'y'}.
                </p>

                {/* Active Deliveries */}
                <section className="section">
                    <h2 className="section-title">🚀 Active Deliveries</h2>

                    {activeOrders.length > 0 ? (
                        <div className="rider-deliveries">
                            {activeOrders.map((order) => {
                                const vendor = getVendorById(order.vendorId);
                                const nextStatus = NEXT_STATUS[order.status];
                                const buttonLabel = STATUS_LABELS[order.status];

                                return (
                                    <div key={order.id} className="rider-delivery-card">
                                        <div className="rider-delivery-header">
                                            <span className="rider-delivery-id">#{order.id.slice(-6)}</span>
                                            <span className={`badge badge-warning`}>{order.status}</span>
                                        </div>

                                        <div className="rider-delivery-route">
                                            <div className="rider-route-point">
                                                <div className="rider-route-dot pickup" />
                                                <div className="rider-route-info">
                                                    <span className="rider-route-label">Pickup</span>
                                                    <span className="rider-route-location">
                                                        <FiMapPin size={12} />
                                                        {order.pickupLocation || vendor?.hostel || 'TBD'}
                                                    </span>
                                                    {vendor && (
                                                        <span className="rider-route-person">{vendor.name}</span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="rider-route-line" />
                                            <div className="rider-route-point">
                                                <div className="rider-route-dot delivery" />
                                                <div className="rider-route-info">
                                                    <span className="rider-route-label">Deliver to</span>
                                                    <span className="rider-route-location">
                                                        <FiMapPin size={12} />
                                                        {order.buyerLocation || 'TBD'}
                                                    </span>
                                                    <span className="rider-route-person">{order.buyerName}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="rider-delivery-items">
                                            {order.items.map((item, i) => (
                                                <span key={i}>{item.title} × {item.quantity}</span>
                                            ))}
                                        </div>

                                        <div className="rider-delivery-footer">
                                            <span className="rider-delivery-total">{formatPrice(order.total)}</span>
                                            {nextStatus && (
                                                <button
                                                    className="btn btn-primary"
                                                    onClick={() => handleStatusUpdate(order.id, nextStatus)}
                                                >
                                                    <FiTruck size={16} />
                                                    Mark as {buttonLabel === 'Pick Up' ? 'Picked Up' : buttonLabel === 'On the Way' ? 'On the Way' : 'Delivered'}
                                                </button>
                                            )}
                                        </div>

                                        {order.status === 'on-the-way' && (
                                            <div className="rider-delivery-code">
                                                <strong>Delivery Code:</strong> {order.deliveryCode}
                                                <span className="rider-code-note">Share with buyer upon delivery</span>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="empty-state">
                            <div className="empty-state-icon">🛵</div>
                            <h3>No active deliveries</h3>
                            <p>New deliveries will appear here when assigned</p>
                        </div>
                    )}
                </section>

                {/* Completed Deliveries */}
                <section className="section">
                    <div className="section-header">
                        <h2 className="section-title">Completed ({completedOrders.length})</h2>
                    </div>

                    {completedOrders.length > 0 ? (
                        <div className="rider-completed-list">
                            {completedOrders.slice(0, 10).map((order) => {
                                const vendor = getVendorById(order.vendorId);
                                return (
                                    <div key={order.id} className="rider-completed-item">
                                        <div className="rider-completed-info">
                                            <span className="rider-completed-id">#{order.id.slice(-6)}</span>
                                            <span className="rider-completed-route">
                                                {vendor?.name} → {order.buyerName}
                                            </span>
                                        </div>
                                        <div className="rider-completed-right">
                                            <span>{formatPrice(order.total)}</span>
                                            <span className={`badge badge-${order.status === 'confirmed' ? 'success' : 'warning'}`}>
                                                {order.status}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)' }}>
                            No completed deliveries yet
                        </p>
                    )}
                </section>
            </div>
        </div>
    );
}
