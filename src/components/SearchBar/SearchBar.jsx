import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import './SearchBar.css';

export default function SearchBar({ onSearch, placeholder = "Search for Products, Vendors and Categories" }) {
    const [query, setQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSearch) onSearch(query);
    };

    const handleChange = (e) => {
        setQuery(e.target.value);
        if (onSearch) onSearch(e.target.value);
    };

    return (
        <form className="search-bar" onSubmit={handleSubmit}>
            <FiSearch className="search-icon" />
            <input
                type="text"
                className="search-input"
                placeholder={placeholder}
                value={query}
                onChange={handleChange}
            />
        </form>
    );
}
