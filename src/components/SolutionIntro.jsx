"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SolutionIntro() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".solution-intro__label", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "expo.out",
      });

      gsap.from(".solution-intro__title", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
        },
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: "expo.out",
        delay: 0.15,
      });

      gsap.from(".solution-intro__subtitle", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        },
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "expo.out",
        delay: 0.3,
      });

      gsap.from(".solution-intro__feature", {
        scrollTrigger: {
          trigger: ".solution-intro__features",
          start: "top 85%",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "expo.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="solution-intro" id="solution">
      <span className="solution-intro__label">The Solution</span>
      <h2 className="solution-intro__title">MEET ATAYR</h2>
      <p className="solution-intro__subtitle">
        Your pre-purchase wardrobe advisor - powered by AI, backed by friends. Two features, one smarter wardrobe.
      </p>
      <div className="solution-intro__features">
        <div className="solution-intro__feature">
          <span className="solution-intro__feature-icon">🧠</span>
          Buy Smart — AI Outfit Matching
        </div>
        <div className="solution-intro__feature">
          <span className="solution-intro__feature-icon">🤝</span>
          Borrow More — Friend Wardrobe Lending
        </div>
      </div>
    </section>
  );
}
