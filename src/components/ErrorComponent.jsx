import React from "react";
import { Link } from "react-router-dom";
import styles from "./ErrorComponent.module.css";

const ErrorComponent = ({ message = "An error occurred" }) => {
  return (
    <div className={styles.errorContainer}>
      <h1 className={styles.errorTitle}>Oops! Something went wrong</h1>
      <p className={styles.errorMessage}>{message}</p>
      <Link to="/" className={styles.homeLink}>
        Go back to home
      </Link>
    </div>
  );
};

export default ErrorComponent;
