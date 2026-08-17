"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function BorrowMore() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content side
      gsap.from(".borrow-more__label", {
        scrollTrigger: { trigger: ".borrow-more__content", start: "top 80%" },
        y: 20,
        opacity: 0,
        duration: 0.7,
        ease: "expo.out",
      });

      gsap.from(".borrow-more__title", {
        scrollTrigger: { trigger: ".borrow-more__content", start: "top 75%" },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "expo.out",
        delay: 0.1,
      });

      gsap.from(".borrow-more__desc", {
        scrollTrigger: { trigger: ".borrow-more__content", start: "top 70%" },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "expo.out",
        delay: 0.2,
      });

      gsap.from(".borrow-feature", {
        scrollTrigger: {
          trigger: ".borrow-more__features",
          start: "top 85%",
        },
        x: -40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "expo.out",
      });

      // Visual side image
      gsap.from(".borrow-more__image-container", {
        scrollTrigger: {
          trigger: ".borrow-more__visual",
          start: "top 80%",
        },
        y: 40,
        opacity: 0,
        scale: 0.95,
        duration: 1,
        ease: "expo.out",
      });

      // Visual side scenario card
      gsap.from(".scenario-card", {
        scrollTrigger: {
          trigger: ".borrow-more__visual",
          start: "top 80%",
        },
        x: 60,
        opacity: 0,
        duration: 1,
        ease: "expo.out",
        delay: 0.2,
      });

      gsap.from(".friend-circle", {
        scrollTrigger: {
          trigger: ".friend-circles",
          start: "top 90%",
        },
        scale: 0,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="borrow-more" id="borrow-more" style={{ position: "relative" }}>
      
      <div className="borrow-more__shape" />

      <div className="borrow-more__grid container">
        <div className="borrow-more__content">
          <span className="borrow-more__label">Feature Two</span>
          <h2 className="borrow-more__title">BORROW MORE</h2>
          <p className="borrow-more__desc">
            Your friends&apos; closets, just one tap away. Turn underused wardrobe items into a shared circular-lending network among people you trust.
          </p>

          <div className="borrow-more__features">
            <div className="borrow-feature">
              <div className="borrow-feature__icon">🔗</div>
              <div className="borrow-feature__text">
                <h4>Trusted Circle</h4>
                <p>Grant specific friends access to browse your digital wardrobe - you control who sees what.</p>
              </div>
            </div>
            <div className="borrow-feature">
              <div className="borrow-feature__icon">👗</div>
              <div className="borrow-feature__text">
                <h4>One-Tap Borrow Request</h4>
                <p>See something you love? Request to borrow it for a specific occasion with one tap.</p>
              </div>
            </div>
            <div className="borrow-feature">
              <div className="borrow-feature__icon">♻️</div>
              <div className="borrow-feature__text">
                <h4>Reduce One-Time Wear</h4>
                <p>Weddings, interviews, parties - borrow instead of buying clothes you&apos;ll only wear once.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="borrow-more__visual">

          <div className="scenario-card">
            <div className="scenario-card__emoji">💃</div>
            <h3 className="scenario-card__title">Wedding this Saturday?</h3>
            <p className="scenario-card__text">
              Borrow Sarah&apos;s emerald cocktail dress instead of buying one you&apos;ll wear once and forget. She&apos;s not using it anyway - and you both win.
            </p>
            <span className="scenario-card__action">
              Request to Borrow →
            </span>
          </div>

          <div className="friend-circles">
            <div className="friend-circle">
              👩
              <span className="friend-circle__badge">12</span>
            </div>
            <div className="friend-circle">
              👨
              <span className="friend-circle__badge">8</span>
            </div>
            <div className="friend-circle">
              👩‍🦰
              <span className="friend-circle__badge">15</span>
            </div>
            <div className="friend-circle">
              🧑
              <span className="friend-circle__badge">6</span>
            </div>
            <div className="friend-circle">
              👩‍🦱
              <span className="friend-circle__badge">10</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
