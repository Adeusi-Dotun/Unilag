import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
    FiArrowLeft, FiClock, FiCheck, FiTruck, FiPackage,
    FiAlertTriangle, FiShield, FiMapPin, FiUser
} from 'react-icons/fi';
import { useOrders } from '../../context/OrderContext';
import { useAuth } from '../../context/AuthContext';
import { getVendorById, getRiderById } from '../../data/mockData';
import './OrderTracking.css';

const STATUS_STEPS = [
    { key: 'pending', label: 'Order Placed', icon: <FiClock /> },
    { key: 'accepted', label: 'Accepted', icon: <FiCheck /> },
    { key: 'picked-up', label: 'Picked Up', icon: <FiPackage /> },
    { key: 'on-the-way', label: 'On the Way', icon: <FiTruck /> },
    { key: 'delivered', label: 'Delivered', icon: <FiMapPin /> },
    { key: 'confirmed', label: 'Confirmed', icon: <FiShield /> },
];

const getStatusIndex = (status) => {
    if (status === 'declined') return -1;
    if (status === 'disputed') return 5;
    return STATUS_STEPS.findIndex((s) => s.key === status);
};

export default function OrderTracking() {
    const { id } = useParams();
    const { orders, confirmDelivery, reportOrder } = useOrders();
    const { user } = useAuth();
    const [deliveryCode, setDeliveryCode] = useState('');
    const [reportReason, setReportReason] = useState('');
    const [showReport, setShowReport] = useState(false);
    const [codeError, setCodeError] = useState('');
    const [codeSuccess, setCodeSuccess] = useState(false);

    const order = orders.find((o) => o.id === id);

    if (!order) {
        return (
            <div className="page">
                <div className="container">
                    <div className="empty-state">
                        <div className="empty-state-icon">😕</div>
                        <h3>Order not found</h3>
                        <Link to="/orders" className="btn btn-primary" style={{ marginTop: 16 }}>
                            View Orders
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    const vendor = getVendorById(order.vendorId);
    const rider = order.riderId ? getRiderById(order.riderId) : null;
    const currentStep = getStatusIndex(order.status);

    const formatPrice = (price) =>
        new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 }).format(price);

    const formatDate = (dateStr) =>
        new Date(dateStr).toLocaleDateString('en-NG', {
            year: 'numeric', month: 'short', day: 'numeric',
            hour: '2-digit', minute: '2-digit',
        });

    const handleConfirm = () => {
        const result = confirmDelivery(order.id, deliveryCode);
        if (result.success) {
            setCodeSuccess(true);
            setCodeError('');
        } else {
            setCodeError(result.error);
        }
    };

    const handleReport = () => {
        if (reportReason.trim()) {
            reportOrder(order.id, reportReason);
            setShowReport(false);
        }
    };

    return (
        <div className="page">
            <div className="container">
                <Link to="/orders" className="back-link">
                    <FiArrowLeft /> My Orders
                </Link>

                <div className="tracking-header">
                    <div>
                        <h1>Order #{order.id.slice(-6)}</h1>
                        <p className="tracking-date">Placed {formatDate(order.createdAt)}</p>
                    </div>
                    <span className={`badge badge-${order.status === 'confirmed' ? 'success' : order.status === 'declined' || order.status === 'disputed' ? 'danger' : 'warning'}`}>
                        {order.status}
                    </span>
                </div>

                {/* Status Tracker */}
                {order.status !== 'declined' && (
                    <div className="status-tracker">
                        {STATUS_STEPS.map((step, idx) => (
                            <div
                                key={step.key}
                                className={`tracker-step ${idx <= currentStep ? 'completed' : ''} ${idx === currentStep ? 'current' : ''}`}
                            >
                                <div className="tracker-icon">{step.icon}</div>
                                <span className="tracker-label">{step.label}</span>
                                {idx < STATUS_STEPS.length - 1 && <div className="tracker-line" />}
                            </div>
                        ))}
                    </div>
                )}

                {order.status === 'declined' && (
                    <div className="order-declined-notice">
                        <FiAlertTriangle size={20} />
                        <div>
                            <strong>Order Declined</strong>
                            <p>The vendor has declined this order. Your payment has been refunded.</p>
                        </div>
                    </div>
                )}

                {order.status === 'disputed' && (
                    <div className="order-disputed-notice">
                        <FiAlertTriangle size={20} />
                        <div>
                            <strong>Dispute Filed</strong>
                            <p>Reason: {order.disputeReason}</p>
                            <p>Our team is reviewing your dispute. Payment is still held in escrow.</p>
                        </div>
                    </div>
                )}

                <div className="tracking-layout">
                    <div className="tracking-main">
                        {/* Delivery Confirmation */}
                        {order.status === 'delivered' && !codeSuccess && (
                            <div className="delivery-confirm-card">
                                <h3><FiShield size={16} /> Confirm Delivery</h3>
                                <p>Enter the delivery code provided by your rider to confirm receipt.</p>
                                <div className="delivery-code-input">
                                    <input
                                        type="text"
                                        className="form-input"
                                        placeholder="Enter 4-digit code"
                                        value={deliveryCode}
                                        onChange={(e) => { setDeliveryCode(e.target.value); setCodeError(''); }}
                                        maxLength={4}
                                    />
                                    <button className="btn btn-primary" onClick={handleConfirm}>
                                        Confirm
                                    </button>
                                </div>
                                {codeError && <p className="checkout-error">{codeError}</p>}

                                <div className="dispute-window">
                                    <FiClock size={14} />
                                    <span>You have 1 hour to verify your order before payment is automatically released</span>
                                </div>
                            </div>
                        )}

                        {codeSuccess && (
                            <div className="delivery-confirmed-card">
                                <FiCheck size={24} />
                                <h3>Delivery Confirmed!</h3>
                                <p>Payment has been released to the vendor. Thank you for your purchase!</p>
                            </div>
                        )}

                        {/* Report Button */}
                        {(order.status === 'delivered' || order.status === 'confirmed') && order.status !== 'disputed' && (
                            <div className="report-section">
                                {!showReport ? (
                                    <button
                                        className="btn btn-ghost btn-sm"
                                        onClick={() => setShowReport(true)}
                                        style={{ color: 'var(--danger)' }}
                                    >
                                        <FiAlertTriangle size={14} /> Report an Issue
                                    </button>
                                ) : (
                                    <div className="report-form">
                                        <h4>Report Issue</h4>
                                        <textarea
                                            className="form-textarea"
                                            placeholder="Describe the issue (e.g., product is damaged, wrong item received...)"
                                            value={reportReason}
                                            onChange={(e) => setReportReason(e.target.value)}
                                            rows={3}
                                        />
                                        <div className="report-actions">
                                            <button className="btn btn-ghost btn-sm" onClick={() => setShowReport(false)}>Cancel</button>
                                            <button className="btn btn-danger btn-sm" onClick={handleReport}>
                                                Submit Report
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Order Items */}
                        <div className="tracking-section">
                            <h3>Items Ordered</h3>
                            <div className="tracking-items">
                                {order.items.map((item, i) => (
                                    <div key={i} className="tracking-item">
                                        <span className="tracking-item-title">
                                            {item.title} × {item.quantity}
                                        </span>
                                        <span className="tracking-item-price">
                                            {formatPrice(item.price * item.quantity)}
                                        </span>
                                    </div>
                                ))}
                                <div className="tracking-item tracking-item-total">
                                    <span>Total</span>
                                    <span>{formatPrice(order.total)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Info */}
                    <div className="tracking-sidebar">
                        {vendor && (
                            <div className="tracking-info-card">
                                <h4>Vendor</h4>
                                <Link to={`/vendor/${vendor.id}`} className="tracking-person">
                                    <img src={vendor.photo} alt={vendor.name} className="tracking-person-photo" />
                                    <div>
                                        <span className="tracking-person-name">{vendor.name}</span>
                                        <span className="tracking-person-detail"><FiMapPin size={11} /> {vendor.hostel}</span>
                                    </div>
                                </Link>
                            </div>
                        )}

                        {rider && (
                            <div className="tracking-info-card">
                                <h4>Rider</h4>
                                <div className="tracking-person">
                                    <img src={rider.photo} alt={rider.name} className="tracking-person-photo" />
                                    <div>
                                        <span className="tracking-person-name">{rider.name}</span>
                                        <span className="tracking-person-detail">{rider.phone}</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="tracking-info-card">
                            <h4>Delivery Details</h4>
                            <div className="tracking-detail-row">
                                <span className="tracking-detail-label">Pickup</span>
                                <span>{order.pickupLocation || 'TBD'}</span>
                            </div>
                            <div className="tracking-detail-row">
                                <span className="tracking-detail-label">Deliver to</span>
                                <span>{order.buyerLocation || 'TBD'}</span>
                            </div>
                        </div>

                        <div className="tracking-info-card">
                            <h4>Payment</h4>
                            <div className="tracking-detail-row">
                                <span className="tracking-detail-label">Status</span>
                                <span className={`badge badge-${order.status === 'confirmed' ? 'success' : 'warning'}`}>
                                    {order.status === 'confirmed' ? 'Released' : 'In Escrow'}
                                </span>
                            </div>
                            <div className="tracking-detail-row">
                                <span className="tracking-detail-label">Amount</span>
                                <span style={{ fontWeight: 700 }}>{formatPrice(order.total)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
