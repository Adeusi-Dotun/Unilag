import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import SearchBar from '../../components/SearchBar/SearchBar';
import CategoryChips from '../../components/CategoryChips/CategoryChips';
import ListingCard from '../../components/ListingCard/ListingCard';
import VendorCard from '../../components/VendorCard/VendorCard';
import { categories, vendors, listings } from '../../data/mockData';
import { useVendor } from '../../context/VendorContext';
import './Home.css';

export default function Home() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState(null);
    const { allListings } = useVendor();
    const navigate = useNavigate();

    const activeVendors = vendors.filter((v) => v.status === 'active');

    const filteredListings = useMemo(() => {
        let result = allListings.filter((l) => l.status === 'active');

        if (activeCategory) {
            result = result.filter((l) => l.category === activeCategory);
        }

        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            result = result.filter(
                (l) =>
                    l.title.toLowerCase().includes(q) ||
                    l.description.toLowerCase().includes(q) ||
                    l.hostel.toLowerCase().includes(q)
            );
        }

        return result;
    }, [allListings, activeCategory, searchQuery]);

    const handleCategorySelect = (catId) => {
        if (catId) {
            navigate(`/category/${catId}`);
        } else {
            setActiveCategory(null);
        }
    };

    return (
        <div className="page">
            <div className="container">
                {/* Hero */}
                <section className="hero">
                    <div className="hero-content">
                        <h1 className="hero-title">
                            Discover campus vendors<br />
                            <span className="hero-accent">&amp; shop UNILAG</span>
                        </h1>
                        <p className="hero-subtitle">
                            Find food, fashion, services, and more from student vendors — all in one place.
                        </p>
                        <div className="hero-search">
                            <SearchBar onSearch={setSearchQuery} />
                        </div>
                    </div>
                </section>

                {/* Categories */}
                <section className="section">
                    <CategoryChips
                        categories={categories}
                        activeCategory={activeCategory}
                        onSelect={handleCategorySelect}
                    />
                </section>

                {/* Featured Vendors */}
                <section className="section">
                    <div className="section-header">
                        <h2 className="section-title">Featured Vendors</h2>
                        <Link to="/category/food" className="section-link">
                            View all <FiArrowRight />
                        </Link>
                    </div>
                    <div className="vendors-scroll">
                        {activeVendors.slice(0, 5).map((vendor) => (
                            <div key={vendor.id} className="vendor-scroll-item">
                                <VendorCard vendor={vendor} />
                            </div>
                        ))}
                    </div>
                </section>

                {/* Latest Listings */}
                <section className="section">
                    <div className="section-header">
                        <h2 className="section-title">
                            {searchQuery ? 'Search Results' : 'Latest Listings'}
                        </h2>
                        {!searchQuery && (
                            <Link to="/category/food" className="section-link">
                                View all <FiArrowRight />
                            </Link>
                        )}
                    </div>

                    {filteredListings.length > 0 ? (
                        <div className="grid-4">
                            {filteredListings.map((listing) => (
                                <ListingCard key={listing.id} listing={listing} />
                            ))}
                        </div>
                    ) : (
                        <div className="empty-state">
                            <div className="empty-state-icon">🔍</div>
                            <h3>No listings found</h3>
                            <p>Try searching for something else</p>
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}
