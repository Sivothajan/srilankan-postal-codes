import { useState } from "react";
import style from "./SearchBar.module.css";

function SearchResults({ results }) {
  const [copiedItem, setCopiedItem] = useState(null);

  const copyToClipboard = async (text, type, index) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItem(`${type}-${index}`);
      setTimeout(() => setCopiedItem(null), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className={style.outputBox}>
      <div className={style.resultsWrapper}>
        {results.length > 0 ? (
          <ul className={style.results}>
            {results.map((item, index) => (
              <li
                key={`${item.postal_code}-${index}`}
                className={style.resultItem}
              >
                <div className={style.itemContent}>
                  <div className={style.postalInfo}>
                    <div className={style.postalCode}>
                      <strong>{item.postal_code}</strong>
                      <button
                        className={`${style.copyButton} ${
                          copiedItem === `code-${index}` ? style.copied : ""
                        }`}
                        onClick={() =>
                          copyToClipboard(item.postal_code, "code", index)
                        }
                        aria-label="Copy postal code"
                      >
                        {copiedItem === `code-${index}` ? "Copied!" : "Copy"}
                      </button>
                    </div>
                    <div className={style.postOffice}>
                      <span>{item.post_office}</span>
                      <button
                        className={`${style.copyButton} ${
                          copiedItem === `office-${index}` ? style.copied : ""
                        }`}
                        onClick={() =>
                          copyToClipboard(item.post_office, "office", index)
                        }
                        aria-label="Copy post office name"
                      >
                        {copiedItem === `office-${index}` ? "Copied!" : "Copy"}
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className={style.noResults}>No results found</div>
        )}
      </div>
    </div>
  );
}

export default SearchResults;
