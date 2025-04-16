import style from "./Error.module.css";

function Error404() {
  return (
    <div className={style.container}>
      <h1 className={style.heading}>404</h1>
      <p className={style.description}>Page not found</p>
      {/*<img className={style.image} src="/images/404.webp" alt="404 Error" />*/}
    </div>
  );
}

export default Error404;
