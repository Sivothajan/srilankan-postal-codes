import { useState } from "react";
import postalData from "../../assets/postal_data.json";
import style from "./SearchBar.module.css";

function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() === "") {
      setResults([]);
      return;
    }

    try {
      const filtered = postalData.filter(
        (item) =>
          item.postal_code?.toString().includes(value) ||
          item.post_office?.toLowerCase().includes(value.toLowerCase())
      );
      setResults(filtered);
    } catch (error) {
      console.error("Error filtering postal data:", error);
      setResults([]);
    }
  };

  return (
    <div className={style.container}>
      <input
        type="text"
        className={style.input}
        placeholder="Search for postal codes or locations..."
        value={query}
        onChange={handleSearch}
        aria-label="Search postal codes or locations"
      />
      {query.trim() !== "" && (
        <div className={style.outputBox}>
          <div className={style.resultsWrapper}>
            {results.length > 0 ? (
              <ul className={style.results}>
                {results.map((item, index) => (
                  <li
                    key={`${item.postal_code}-${index}`}
                    className={style.resultItem}
                  >
                    <strong>{item.postal_code}</strong> - {item.post_office}
                  </li>
                ))}
              </ul>
            ) : (
              <div className={style.noResults}>No results found.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchBar;
