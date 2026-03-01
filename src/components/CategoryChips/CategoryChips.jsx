import './CategoryChips.css';

export default function CategoryChips({ categories, activeCategory, onSelect }) {
    return (
        <div className="category-chips">
            <button
                className={`chip ${!activeCategory ? 'chip-active' : ''}`}
                onClick={() => onSelect(null)}
            >
                All
            </button>
            {categories.map((cat) => (
                <button
                    key={cat.id}
                    className={`chip ${activeCategory === cat.id ? 'chip-active' : ''}`}
                    onClick={() => onSelect(cat.id)}
                >
                    <span className="chip-icon">{cat.icon}</span>
                    {cat.label}
                </button>
            ))}
        </div>
    );
}
