import React, { Suspense } from 'react';
import Navigation from './navigation';
import styles from './Layout.module.css';

const Layout = ({ children }) => {
  const currentYear = new Date().getFullYear();
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <Navigation />
        
      </header>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        <p>&copy; {currentYear} GitHub Repo Explorer. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
