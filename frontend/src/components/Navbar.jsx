import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <NavLink to="/" className={styles.brand}>
          Lost & Found
        </NavLink>
        <div className={styles.navLinks}>
          <NavLink to="/listings" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>
            Public Listings
          </NavLink>
          <NavLink to="/moderator" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>
            Moderator
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;