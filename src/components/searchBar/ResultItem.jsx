import style from "./SearchBar.module.css";

function ResultItem({ item, index, copiedItem, onCopy }) {
  return (
    <div className={style.resultCard}>
      <div className={style.itemContent}>
        <div className={style.postalInfo}>
          <div className={style.postalCode}>
            <strong>{item.postal_code}</strong>
            <button
              className={`${style.copyButton} ${
                copiedItem === `code-${index}` ? style.copied : ""
              }`}
              onClick={() => onCopy(item.postal_code, "code", index)}
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
              onClick={() => onCopy(item.post_office, "office", index)}
              aria-label="Copy post office name"
            >
              {copiedItem === `office-${index}` ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultItem;
