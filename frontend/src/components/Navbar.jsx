import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';

function Navbar() {
  const [sliderStyle, setSliderStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const navLinksRef = useRef(null);
  const location = useLocation(); // Hook to detect route changes

  useEffect(() => {
    // Function to update the slider position based on the active link
    const updateSliderPosition = () => {
      if (!navLinksRef.current) return;

      // Find the currently active NavLink within our container
      // We look for the class explicitly added by React Router's NavLink
      const activeLink = navLinksRef.current.querySelector(`.${styles.active}`);

      if (activeLink) {
        // Calculate position and width relative to the container
        const { offsetLeft, offsetWidth } = activeLink;
        setSliderStyle({
          left: offsetLeft,
          width: offsetWidth,
          opacity: 1, // Make visible
        });
      } else {
        // If no link is active (e.g., on login page), hide the slider
        setSliderStyle((prev) => ({ ...prev, opacity: 0 }));
      }
    };

    // Run update immediately and whenever the location changes
    updateSliderPosition();

    // Optional: Add resize listener to adjust if window size changes
    window.addEventListener('resize', updateSliderPosition);
    return () => window.removeEventListener('resize', updateSliderPosition);

  }, [location.pathname]); // Re-run when path changes

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <NavLink to="/" className={styles.brand}>
          Lost & Found
        </NavLink>
        
        {/* We need a ref on this container to measure relative positions */}
        <div className={styles.navLinks} ref={navLinksRef}>
          
          {/* The magical sliding indicator */}
          <div className={styles.slider} style={sliderStyle} />

          <NavLink to="/" end className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>
            Submit Report
          </NavLink>
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