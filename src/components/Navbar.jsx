"use client";

import { useEffect, useRef, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav ref={navRef} className={`nav ${scrolled ? "nav-scrolled" : ""}`} id="main-nav">
      <div className="nav__left">
        <svg width="24" height="12" viewBox="0 0 24 12" fill="none" stroke="currentColor" strokeWidth="1.5">
          <line x1="0" y1="1" x2="24" y2="1" />
          <line x1="0" y1="11" x2="24" y2="11" />
        </svg>
      </div>
      <a href="#hero" className="nav__logo">
        <span className="nav__logo-text">ATAYR</span>
      </a>
      <div className="nav__right">
        <a href="#waitlist" className="nav__cta">
          Download
        </a>
      </div>
    </nav>
  );
}
