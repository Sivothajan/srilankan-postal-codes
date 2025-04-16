import PropTypes from "prop-types";
import style from "./Error.module.css";

function Error({ heading, description }) {
  return (
    <div className={style.container}>
      <h1 className={style.heading}>{heading}</h1>
      <p className={style.description}>{description}</p>
    </div>
  );
}

Error.propTypes = {
  heading: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default Error;
