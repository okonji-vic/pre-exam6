import React from "react";
import { Link } from "react-router-dom";
import styles from "./Contact.module.css";

const Contact = () => {
    return (
        <div className={styles.contact}>
        <h1>Contact</h1>
        <p>
            If you have any questions or need help, please feel free to contact me
            at{" "}
                <a href="mailto:neo88great@gmail.com" className={styles.email}>
                    this email address.
                </a>
            </p>
            <p>
                You can also visit my{" "}
                <a
                    href="https://my-portfolio0012.netlify.app/"
                    className={styles.portfolio}
                >
                    portfolio
                </a>{" "}
                to learn more about me.
            </p>
        </div>
    );
}

export default Contact;
