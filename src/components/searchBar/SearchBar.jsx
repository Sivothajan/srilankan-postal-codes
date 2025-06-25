import { useState, useRef, useCallback, useEffect } from "react";
import style from "./SearchBar.module.css";
import SearchResults from "./SearchResults";
import SearchInput from "./SearchInput";

function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [postalData, setPostalData] = useState([]);
  const searchTimeoutRef = useRef(null);

  // 🧠 Fetch JSON on first render
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/assets/postal_data.json");
        const data = await res.json();
        setPostalData(data);
      } catch (err) {
        console.error("Failed to load postal data:", err);
      }
    };

    fetchData();
  }, []);

  // 🔍 Debounced search
  const handleSearch = useCallback(
    (e) => {
      const value = e.target.value;
      setQuery(value);

      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }

      if (value.trim() === "") {
        setResults([]);
        return;
      }

      searchTimeoutRef.current = setTimeout(() => {
        try {
          const filtered = postalData.filter(
            (item) =>
              item.postal_code?.toString().includes(value) ||
              item.post_office?.toLowerCase().includes(value.toLowerCase()),
          );
          setResults(filtered);
        } catch (error) {
          console.error("Error filtering postal data:", error);
          setResults([]);
        }
      }, 150);
    },
    [postalData],
  );

  return (
    <div className={style.container}>
      <SearchInput query={query} onChange={handleSearch} />
      {query.trim() !== "" && <SearchResults results={results} />}
    </div>
  );
}

export default SearchBar;
