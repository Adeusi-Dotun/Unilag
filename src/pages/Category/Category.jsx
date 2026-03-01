import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiFilter, FiArrowLeft } from 'react-icons/fi';
import ListingCard from '../../components/ListingCard/ListingCard';
import { categories, hostels } from '../../data/mockData';
import { useVendor } from '../../context/VendorContext';
import './Category.css';

export default function Category() {
    const { categoryId } = useParams();
    const [hostelFilter, setHostelFilter] = useState('');
    const [sortBy, setSortBy] = useState('latest');
    const [showFilters, setShowFilters] = useState(false);
    const { allListings } = useVendor();

    const category = categories.find((c) => c.id === categoryId);

    const filteredListings = useMemo(() => {
        let result = allListings.filter(
            (l) => l.category === categoryId && l.status === 'active'
        );

        if (hostelFilter) {
            result = result.filter((l) => l.hostel === hostelFilter);
        }

        if (sortBy === 'latest') {
            result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        } else if (sortBy === 'price-low') {
            result.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'price-high') {
            result.sort((a, b) => b.price - a.price);
        }

        return result;
    }, [allListings, categoryId, hostelFilter, sortBy]);

    return (
        <div className="page">
            <div className="container">
                <div className="category-header">
                    <Link to="/" className="back-link">
                        <FiArrowLeft /> Home
                    </Link>
                    <div className="category-title-row">
                        <h1>
                            {category?.icon} {category?.label || 'All'} Listings
                        </h1>
                        <button
                            className="btn btn-outline btn-sm filter-toggle"
                            onClick={() => setShowFilters(!showFilters)}
                        >
                            <FiFilter /> Filters
                        </button>
                    </div>
                </div>

                {showFilters && (
                    <div className="category-filters">
                        <div className="filter-group">
                            <label className="form-label">Hostel</label>
                            <select
                                className="form-select"
                                value={hostelFilter}
                                onChange={(e) => setHostelFilter(e.target.value)}
                            >
                                <option value="">All Hostels</option>
                                {hostels.map((h) => (
                                    <option key={h} value={h}>{h}</option>
                                ))}
                            </select>
                        </div>
                        <div className="filter-group">
                            <label className="form-label">Sort by</label>
                            <select
                                className="form-select"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                            >
                                <option value="latest">Latest first</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                            </select>
                        </div>
                        {hostelFilter && (
                            <button
                                className="btn btn-ghost btn-sm"
                                onClick={() => setHostelFilter('')}
                            >
                                Clear filters
                            </button>
                        )}
                    </div>
                )}

                <p className="results-count">
                    {filteredListings.length} listing{filteredListings.length !== 1 ? 's' : ''} found
                </p>

                {filteredListings.length > 0 ? (
                    <div className="grid-4">
                        {filteredListings.map((listing) => (
                            <ListingCard key={listing.id} listing={listing} />
                        ))}
                    </div>
                ) : (
                    <div className="empty-state">
                        <div className="empty-state-icon">{category?.icon || '📦'}</div>
                        <h3>No listings yet</h3>
                        <p>No {category?.label?.toLowerCase()} listings available right now</p>
                    </div>
                )}
            </div>
        </div>
    );
}
