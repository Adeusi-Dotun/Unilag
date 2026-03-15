import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiPackage } from 'react-icons/fi';
import { useOrders } from '../../../context/OrderContext';
import { getVendorById } from '../../../data/mockData';
import '../Vendors/AdminVendors.css';

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

export default function AdminOrders() {
    const { orders } = useOrders();
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    const filteredOrders = useMemo(() => {
        let result = [...orders];

        if (statusFilter) {
            result = result.filter((o) => o.status === statusFilter);
        }

        if (search.trim()) {
            const q = search.toLowerCase();
            result = result.filter(
                (o) =>
                    o.id.toLowerCase().includes(q) ||
                    o.buyerName.toLowerCase().includes(q)
            );
        }

        return result;
    }, [orders, statusFilter, search]);

    const formatPrice = (price) =>
        new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 }).format(price);

    const formatDate = (dateStr) =>
        new Date(dateStr).toLocaleDateString('en-NG', {
            month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
        });

    const totalRevenue = orders
        .filter((o) => o.status === 'confirmed')
        .reduce((sum, o) => sum + o.total, 0);

    const escrowHeld = orders
        .filter((o) => !['confirmed', 'declined', 'disputed'].includes(o.status))
        .reduce((sum, o) => sum + o.total, 0);

    return (
        <div className="page">
            <div className="container">
                <div className="admin-page-header">
                    <h1>Order Monitoring</h1>
                    <div className="admin-nav">
                        <Link to="/admin/vendors" className="admin-nav-link">Vendors</Link>
                        <Link to="/admin/listings" className="admin-nav-link">Listings</Link>
                        <Link to="/admin/orders" className="admin-nav-link active">Orders</Link>
                        <Link to="/admin/riders" className="admin-nav-link">Riders</Link>
                    </div>
                </div>

                {/* Stats */}
                <div className="admin-order-stats">
                    <div className="admin-stat-card">
                        <span className="admin-stat-value">{orders.length}</span>
                        <span className="admin-stat-label">Total Orders</span>
                    </div>
                    <div className="admin-stat-card">
                        <span className="admin-stat-value">{formatPrice(totalRevenue)}</span>
                        <span className="admin-stat-label">Revenue (Released)</span>
                    </div>
                    <div className="admin-stat-card">
                        <span className="admin-stat-value">{formatPrice(escrowHeld)}</span>
                        <span className="admin-stat-label">In Escrow</span>
                    </div>
                </div>

                <div className="admin-toolbar">
                    <div className="admin-search">
                        <FiSearch className="admin-search-icon" />
                        <input
                            type="text"
                            className="form-input"
                            placeholder="Search orders..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            style={{ paddingLeft: 36 }}
                        />
                    </div>
                    <select
                        className="form-select"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        style={{ maxWidth: 180 }}
                    >
                        <option value="">All statuses</option>
                        <option value="pending">Pending</option>
                        <option value="accepted">Accepted</option>
                        <option value="on-the-way">On the Way</option>
                        <option value="delivered">Delivered</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="declined">Declined</option>
                        <option value="disputed">Disputed</option>
                    </select>
                </div>

                <p className="results-count">{filteredOrders.length} order(s)</p>

                <div className="listings-table-wrap">
                    <table className="listings-table">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Buyer</th>
                                <th>Vendor</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th>Payment</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders.map((order) => {
                                const vendor = getVendorById(order.vendorId);
                                return (
                                    <tr key={order.id}>
                                        <td className="table-product-name">
                                            #{order.id.slice(-6)}
                                        </td>
                                        <td>{order.buyerName}</td>
                                        <td>{vendor?.name || '—'}</td>
                                        <td className="table-price">{formatPrice(order.total)}</td>
                                        <td>
                                            <span className={`badge badge-${STATUS_COLORS[order.status] || 'neutral'}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td>
                                            <span className={`badge badge-${order.status === 'confirmed' ? 'success' : 'warning'}`}>
                                                {order.status === 'confirmed' ? 'Released' : order.status === 'declined' ? 'Refunded' : 'Escrow'}
                                            </span>
                                        </td>
                                        <td style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
                                            {formatDate(order.createdAt)}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
