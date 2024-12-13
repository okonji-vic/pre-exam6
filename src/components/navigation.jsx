import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import styles from './Navigation.module.css';

const Navigation = () => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <NavLink to="/" className={styles.navLink} style={({ isActive }) =>
isActive
? {


            backgroundColor: "black",
            border: "0.5px solid white",
            borderRadius: "5px",
            color: "grey",
          }
        : {
            color: "white", 
          }
    }>Home</NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink to="/about" className={styles.navLink} style={({ isActive }) =>
isActive
? {


            backgroundColor: "black",
            border: "0.5px solid white",
            borderRadius: "5px",
            color: "grey",
          }
        : {
            color: "white", 
          }
    }>About</NavLink>
        </li>
        <li className={styles.navItem}>
            <NavLink to="/error" className={styles.navLink} style={({ isActive }) =>
isActive
? {


            backgroundColor: "black",
            border: "0.5px solid white",
            borderRadius: "5px",
            color: "grey",
          }
        : {
            color: "white", 
          }
    }>Error</NavLink>
        </li>
        <li className={styles.navItem}>
            <NavLink to="/custom404" className={styles.navLink} style={({ isActive }) =>
isActive
? {


            backgroundColor: "black",
            border: "0.5px solid white",
            borderRadius: "5px",
            color: "grey",
          }
        : {
            color: "white", 
          }
    }>Custom 404</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
