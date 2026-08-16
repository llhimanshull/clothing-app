"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function BuySmart() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header
      gsap.from(".buy-smart__label", {
        scrollTrigger: { trigger: ".buy-smart__header", start: "top 80%" },
        y: 20,
        opacity: 0,
        duration: 0.7,
        ease: "expo.out",
      });

      gsap.from(".buy-smart__title", {
        scrollTrigger: { trigger: ".buy-smart__header", start: "top 75%" },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "expo.out",
        delay: 0.1,
      });

      gsap.from(".buy-smart__desc", {
        scrollTrigger: { trigger: ".buy-smart__header", start: "top 70%" },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "expo.out",
        delay: 0.2,
      });

      // Step cards — staggered reveal
      gsap.from(".step-card", {
        scrollTrigger: {
          trigger: ".buy-smart__steps",
          start: "top 80%",
        },
        y: 80,
        opacity: 0,
        duration: 0.9,
        stagger: 0.18,
        ease: "expo.out",
      });

      // Example box
      gsap.from(".buy-smart__example", {
        scrollTrigger: {
          trigger: ".buy-smart__example",
          start: "top 85%",
        },
        y: 40,
        opacity: 0,
        scale: 0.96,
        duration: 1,
        ease: "expo.out",
      });
      // Image container
      gsap.from(".buy-smart__image-container", {
        scrollTrigger: {
          trigger: ".buy-smart__image-container",
          start: "top 85%",
        },
        y: 60,
        opacity: 0,
        scale: 0.96,
        duration: 1,
        ease: "expo.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const steps = [
    {
      number: "01",
      icon: "📸",
      title: "SNAP IT",
      text: "Photograph any clothing item while shopping — in-store or browsing online. Our AI recognizes the piece instantly.",
    },
    {
      number: "02",
      icon: "🔍",
      title: "MATCH IT",
      text: "AI analyzes the item against your entire digital wardrobe, checking style compatibility, color harmony, and versatility.",
    },
    {
      number: "03",
      icon: "✨",
      title: "STYLE IT",
      text: "Get complete outfit pairings from clothes you already own — not just a score, but a fully styled look you can wear.",
    },
  ];

  return (
    <section ref={sectionRef} className="buy-smart" id="buy-smart">
      <div className="container">
        <div className="buy-smart__header">
          <span className="buy-smart__label">Feature One</span>
          <h2 className="buy-smart__title">BUY SMART</h2>
          <p className="buy-smart__desc">
            AI-powered outfit matching — before checkout.
          </p>
        </div>

        <div className="buy-smart__steps">
          {steps.map((step) => (
            <div key={step.number} className="step-card">
              <div className="step-card__number">{step.number}</div>
              <div className="step-card__icon">{step.icon}</div>
              <h3 className="step-card__title">{step.title}</h3>
              <p className="step-card__text">{step.text}</p>
            </div>
          ))}
        </div>

        <div className="buy-smart__example">
          <span className="buy-smart__example-label">Example Suggestion</span>
          <p className="buy-smart__example-text">
            &ldquo;This navy blazer pairs perfectly with your black slim jeans, tan leather boots, and gold hoop earrings — 95% wardrobe match.&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
}
