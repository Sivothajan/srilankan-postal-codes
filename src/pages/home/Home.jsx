import SearchBar from "../../components/searchBar/SearchBar";
import style from "./Home.module.css";

function Home() {
  return (
    <div className={style.container}>
      <div className={style.header}>
        <h1 className={style.heading}>
          Sri Lankan Postal Code & Postal Office Details
        </h1>
        <p className={style.description}>
          A project by:{" "}
          <a
            className={style.link}
            href="https://senkanthal.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Senkanthal.org
          </a>
        </p>
      </div>
      <div className={style.content}>
        <SearchBar />
      </div>
    </div>
  );
}

export default Home;
