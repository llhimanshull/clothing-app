"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Loader({ onComplete }) {
  const loaderRef = useRef(null);

  const onCompleteRef = useRef(onComplete);
  
  // Update ref if onComplete changes, without triggering useEffect
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          if (onCompleteRef.current) onCompleteRef.current();
        },
      });

      // Character by character stagger
      tl.fromTo(".loader-char", {
        autoAlpha: 0,
        y: 30,
        scale: 0.9,
      }, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.2,
        ease: "power3.out",
      })
      // Small pause
      .to({}, { duration: 0.2 })
      // Loader background slides up to reveal site
      .to(loaderRef.current, {
        yPercent: -100,
        duration: 0.8,
        ease: "expo.inOut",
      });
    }, loaderRef);

    return () => ctx.revert();
  }, []);

  const word = "ATAYR".split("");

  return (
    <div
      ref={loaderRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        backgroundColor: "#FFFFFF",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "8px",
          fontFamily: "'Megha', var(--font-display), sans-serif",
          fontSize: "12vw",
          lineHeight: 1,
          color: "#39FF14",
          letterSpacing: "0.1em",
        }}
      >
        {word.map((char, i) => (
          <span key={i} className="loader-char" style={{ visibility: "hidden" }}>
            {char}
          </span>
        ))}
      </div>
    </div>
  );
}
