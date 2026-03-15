import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiTrash2, FiUser } from 'react-icons/fi';
import { riders } from '../../../data/mockData';
import '../Vendors/AdminVendors.css';
import './AdminRiders.css';

export default function AdminRiders() {
    const [riderList, setRiderList] = useState(riders);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newRider, setNewRider] = useState({ name: '', phone: '', email: '' });

    const handleAddRider = (e) => {
        e.preventDefault();
        if (!newRider.name || !newRider.phone) return;

        const rider = {
            id: `r${Date.now()}`,
            name: newRider.name,
            phone: newRider.phone,
            email: newRider.email,
            photo: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(newRider.name)}&backgroundColor=3B82F6`,
            status: 'active',
            joinedDate: new Date().toISOString().split('T')[0],
            totalDeliveries: 0,
        };

        setRiderList((prev) => [...prev, rider]);
        riders.push(rider);
        setNewRider({ name: '', phone: '', email: '' });
        setShowAddForm(false);
    };

    const toggleStatus = (riderId) => {
        setRiderList((prev) =>
            prev.map((r) =>
                r.id === riderId
                    ? { ...r, status: r.status === 'active' ? 'suspended' : 'active' }
                    : r
            )
        );
    };

    return (
        <div className="page">
            <div className="container">
                <div className="admin-page-header">
                    <h1>Rider Management</h1>
                    <div className="admin-nav">
                        <Link to="/admin/vendors" className="admin-nav-link">Vendors</Link>
                        <Link to="/admin/listings" className="admin-nav-link">Listings</Link>
                        <Link to="/admin/orders" className="admin-nav-link">Orders</Link>
                        <Link to="/admin/riders" className="admin-nav-link active">Riders</Link>
                    </div>
                </div>

                <div className="admin-toolbar">
                    <p className="results-count">{riderList.length} rider(s)</p>
                    <button
                        className="btn btn-primary"
                        onClick={() => setShowAddForm(!showAddForm)}
                    >
                        <FiPlus size={16} /> Add Rider
                    </button>
                </div>

                {showAddForm && (
                    <form className="add-rider-form" onSubmit={handleAddRider}>
                        <h3>Add New Rider</h3>
                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">Name</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    placeholder="Rider name"
                                    value={newRider.name}
                                    onChange={(e) => setNewRider({ ...newRider, name: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Phone</label>
                                <input
                                    type="tel"
                                    className="form-input"
                                    placeholder="08012345678"
                                    value={newRider.phone}
                                    onChange={(e) => setNewRider({ ...newRider, phone: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-input"
                                    placeholder="rider@unilag.edu.ng"
                                    value={newRider.email}
                                    onChange={(e) => setNewRider({ ...newRider, email: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="form-actions">
                            <button type="button" className="btn btn-ghost" onClick={() => setShowAddForm(false)}>Cancel</button>
                            <button type="submit" className="btn btn-primary">Add Rider</button>
                        </div>
                    </form>
                )}

                <div className="listings-table-wrap">
                    <table className="listings-table">
                        <thead>
                            <tr>
                                <th>Rider</th>
                                <th>Phone</th>
                                <th>Deliveries</th>
                                <th>Joined</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {riderList.map((rider) => (
                                <tr key={rider.id}>
                                    <td>
                                        <div className="table-product">
                                            <img
                                                src={rider.photo}
                                                alt={rider.name}
                                                className="table-product-img"
                                                style={{ borderRadius: '50%' }}
                                            />
                                            <div>
                                                <span className="table-product-name">{rider.name}</span>
                                                <span className="table-sub">{rider.email}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{rider.phone}</td>
                                    <td>{rider.totalDeliveries}</td>
                                    <td>{rider.joinedDate}</td>
                                    <td>
                                        <span className={`badge badge-${rider.status === 'active' ? 'success' : 'danger'}`}>
                                            {rider.status}
                                        </span>
                                    </td>
                                    <td>
                                        <button
                                            className={`btn btn-sm ${rider.status === 'active' ? 'btn-ghost' : 'btn-outline'}`}
                                            onClick={() => toggleStatus(rider.id)}
                                            style={rider.status === 'active' ? { color: 'var(--danger)' } : {}}
                                        >
                                            {rider.status === 'active' ? 'Suspend' : 'Activate'}
                                        </button>
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
