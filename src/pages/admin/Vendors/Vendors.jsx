import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiSearch, FiCheck, FiXCircle } from 'react-icons/fi';
import { useVendor } from '../../../context/VendorContext';
import './AdminVendors.css';

export default function AdminVendors() {
    const { getAllVendors, updateVendorStatus } = useVendor();
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [refreshKey, setRefreshKey] = useState(0);

    const vendors = getAllVendors();

    const filteredVendors = useMemo(() => {
        let result = [...vendors];

        if (statusFilter) {
            result = result.filter((v) => v.status === statusFilter);
        }

        if (search.trim()) {
            const q = search.toLowerCase();
            result = result.filter(
                (v) =>
                    v.name.toLowerCase().includes(q) ||
                    v.hostel.toLowerCase().includes(q)
            );
        }

        return result;
    }, [vendors, statusFilter, search, refreshKey]);

    const handleStatusChange = (vendorId, status) => {
        updateVendorStatus(vendorId, status);
        setRefreshKey((k) => k + 1);
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'active': return 'badge-success';
            case 'suspended': return 'badge-danger';
            case 'pending': return 'badge-warning';
            default: return 'badge-neutral';
        }
    };

    return (
        <div className="page">
            <div className="container">
                <div className="admin-page-header">
                    <h1>Vendor Management</h1>
                    <div className="admin-nav">
                        <Link to="/admin/vendors" className="admin-nav-link active">Vendors</Link>
                        <Link to="/admin/listings" className="admin-nav-link">Listings</Link>
                        <Link to="/admin/orders" className="admin-nav-link">Orders</Link>
                        <Link to="/admin/riders" className="admin-nav-link">Riders</Link>
                    </div>
                </div>

                <div className="admin-toolbar">
                    <div className="admin-search">
                        <FiSearch className="admin-search-icon" />
                        <input
                            type="text"
                            className="form-input"
                            placeholder="Search vendors..."
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
                        <option value="active">Active</option>
                        <option value="pending">Pending</option>
                        <option value="suspended">Suspended</option>
                    </select>
                </div>

                <p className="results-count">{filteredVendors.length} vendor(s)</p>

                <div className="listings-table-wrap">
                    <table className="listings-table">
                        <thead>
                            <tr>
                                <th>Vendor</th>
                                <th>Hostel</th>
                                <th>Joined</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredVendors.map((vendor) => (
                                <tr key={vendor.id}>
                                    <td>
                                        <div className="table-product">
                                            <img
                                                src={vendor.photo}
                                                alt={vendor.name}
                                                className="table-product-img"
                                                style={{ borderRadius: '50%' }}
                                            />
                                            <div>
                                                <span className="table-product-name">{vendor.name}</span>
                                                <span className="table-sub">{vendor.phone}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{vendor.hostel}</td>
                                    <td>{vendor.joinedDate}</td>
                                    <td>
                                        <span className={`badge ${getStatusBadge(vendor.status)}`}>
                                            {vendor.status}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="table-actions">
                                            {vendor.status !== 'active' && (
                                                <button
                                                    className="btn btn-sm btn-outline"
                                                    onClick={() => handleStatusChange(vendor.id, 'active')}
                                                    title="Approve"
                                                >
                                                    <FiCheck size={14} /> Approve
                                                </button>
                                            )}
                                            {vendor.status !== 'suspended' && (
                                                <button
                                                    className="btn btn-sm btn-ghost"
                                                    onClick={() => handleStatusChange(vendor.id, 'suspended')}
                                                    title="Suspend"
                                                    style={{ color: 'var(--danger)' }}
                                                >
                                                    <FiXCircle size={14} /> Suspend
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
