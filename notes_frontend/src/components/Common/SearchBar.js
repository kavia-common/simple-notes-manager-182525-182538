/* eslint-disable react/prop-types */
// PUBLIC_INTERFACE
export default function SearchBar({ value, onChange, placeholder = 'Search notes...', ariaLabel = 'Search notes' }) {
  return (
    <div className="search-wrap">
      <span className="search-icon" aria-hidden>🔎</span>
      <input
        type="search"
        className="input search-input"
        value={value}
        placeholder={placeholder}
        aria-label={ariaLabel}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
