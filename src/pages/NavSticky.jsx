import React, { useState, useEffect } from 'react';

export default function NavSticky() {
  const [stickyClass, setStickyClass] = useState('');

  useEffect(() => {
    window.addEventListener('scroll', stickNavbar);
    return () => window.removeEventListener('scroll', stickNavbar);
  }, []);

  const stickNavbar = () => {
    if (window !== undefined) {
      let windowHeight = window.scrollY;
      windowHeight > 200 ? setStickyClass('sticky-nav') : setStickyClass('');
    }
  };

  return <div className={`navbar ${stickyClass}`}>Navbar</div>;
}


