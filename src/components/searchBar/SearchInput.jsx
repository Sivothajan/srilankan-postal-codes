import style from "./SearchBar.module.css";

function SearchInput({ query, onChange }) {
  return (
    <input
      type="text"
      className={style.input}
      placeholder="Search for postal codes or locations..."
      value={query}
      onChange={onChange}
      aria-label="Search postal codes or locations"
    />
  );
}

export default SearchInput;
