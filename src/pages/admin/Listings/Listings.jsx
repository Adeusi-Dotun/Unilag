import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiCheck, FiFlag, FiTrash2 } from 'react-icons/fi';
import { useVendor } from '../../../context/VendorContext';
import { getVendorById, categories } from '../../../data/mockData';
import '../Vendors/AdminVendors.css';

export default function AdminListings() {
    const { allListings, updateListingStatus } = useVendor();
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');

    const filteredListings = useMemo(() => {
        let result = [...allListings];

        if (statusFilter) {
            result = result.filter((l) => l.status === statusFilter);
        }

        if (categoryFilter) {
            result = result.filter((l) => l.category === categoryFilter);
        }

        if (search.trim()) {
            const q = search.toLowerCase();
            result = result.filter(
                (l) =>
                    l.title.toLowerCase().includes(q) ||
                    l.hostel.toLowerCase().includes(q)
            );
        }

        return result;
    }, [allListings, statusFilter, categoryFilter, search]);

    const getStatusBadge = (status) => {
        switch (status) {
            case 'active': return 'badge-success';
            case 'flagged': return 'badge-warning';
            case 'removed': return 'badge-danger';
            default: return 'badge-neutral';
        }
    };

    const formatPrice = (price) => `₦${price.toLocaleString()}`;

    return (
        <div className="page">
            <div className="container">
                <div className="admin-page-header">
                    <h1>Listing Moderation</h1>
                    <div className="admin-nav">
                        <Link to="/admin/vendors" className="admin-nav-link">Vendors</Link>
                        <Link to="/admin/listings" className="admin-nav-link active">Listings</Link>
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
                            placeholder="Search listings..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            style={{ paddingLeft: 36 }}
                        />
                    </div>
                    <select
                        className="form-select"
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        style={{ maxWidth: 160 }}
                    >
                        <option value="">All categories</option>
                        {categories.map((c) => (
                            <option key={c.id} value={c.id}>{c.label}</option>
                        ))}
                    </select>
                    <select
                        className="form-select"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        style={{ maxWidth: 160 }}
                    >
                        <option value="">All statuses</option>
                        <option value="active">Active</option>
                        <option value="flagged">Flagged</option>
                        <option value="removed">Removed</option>
                    </select>
                </div>

                <p className="results-count">{filteredListings.length} listing(s)</p>

                <div className="listings-table-wrap">
                    <table className="listings-table">
                        <thead>
                            <tr>
                                <th>Listing</th>
                                <th>Vendor</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredListings.map((listing) => {
                                const vendor = getVendorById(listing.vendorId);
                                return (
                                    <tr key={listing.id}>
                                        <td>
                                            <div className="table-product">
                                                <img
                                                    src={listing.images?.[0] || 'https://placehold.co/40x40/F2F2F2/737373?text=...'}
                                                    alt={listing.title}
                                                    className="table-product-img"
                                                />
                                                <span className="table-product-name">{listing.title}</span>
                                            </div>
                                        </td>
                                        <td>{vendor?.name || '—'}</td>
                                        <td>
                                            <span className="badge badge-neutral" style={{ textTransform: 'capitalize' }}>
                                                {listing.category}
                                            </span>
                                        </td>
                                        <td className="table-price">{formatPrice(listing.price)}</td>
                                        <td>
                                            <span className={`badge ${getStatusBadge(listing.status)}`}>
                                                {listing.status}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="table-actions">
                                                {listing.status !== 'active' && (
                                                    <button
                                                        className="btn btn-sm btn-outline"
                                                        onClick={() => updateListingStatus(listing.id, 'active')}
                                                    >
                                                        <FiCheck size={14} /> Approve
                                                    </button>
                                                )}
                                                {listing.status !== 'flagged' && (
                                                    <button
                                                        className="btn btn-sm btn-ghost"
                                                        onClick={() => updateListingStatus(listing.id, 'flagged')}
                                                        style={{ color: 'var(--warning)' }}
                                                    >
                                                        <FiFlag size={14} />
                                                    </button>
                                                )}
                                                {listing.status !== 'removed' && (
                                                    <button
                                                        className="btn btn-sm btn-ghost"
                                                        onClick={() => updateListingStatus(listing.id, 'removed')}
                                                        style={{ color: 'var(--danger)' }}
                                                    >
                                                        <FiTrash2 size={14} />
                                                    </button>
                                                )}
                                            </div>
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
