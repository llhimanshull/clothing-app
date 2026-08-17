"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const fashionImages = [
  { src: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&q=80", alt: "Man in stylish outfit" },
  { src: "https://images.unsplash.com/photo-1507680434567-5739c80be1ac?w=600&q=80", alt: "Man in suit" },
  { src: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=80", alt: "High fashion editorial" },
  { src: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=600&q=80", alt: "Man in streetwear" },
  { src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80", alt: "Fashion model walk" },

  { src: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&q=80", alt: "Woman in flowing dress" },
  { src: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&q=80", alt: "Man in formal wear" },
  { src: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&q=80", alt: "Fashion week street style" },
  { src: "https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?w=600&q=80", alt: "Man in casual fashion" },
];

export default function SolutionIntro() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;

      // Calculate total scroll distance dynamically
      const getScrollAmount = () => track.scrollWidth - window.innerWidth;

      const scrollTween = gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 0.5,
          start: "top top",
          end: () => "+=" + getScrollAmount() * 0.5,
          invalidateOnRefresh: true,
        }
      });

      // Staggered trailing effect on photo items (charm-like delayed response)
      const photos = gsap.utils.toArray(".photo-gallery__item");
      photos.forEach((photo, i) => {
        gsap.from(photo, {
          x: 80 + i * 15,
          opacity: 0,
          scale: 0.85,
          rotation: (i % 2 === 0 ? 1 : -1) * (3 + i * 0.5),
          scrollTrigger: {
            trigger: photo,
            containerAnimation: scrollTween,
            start: "left 95%",
            end: "left 60%",
            scrub: 0.3 + i * 0.08, // Increasing scrub = more trailing delay per item
          },
          ease: "power2.out",
        });
      });

      // Fade-in animations for the first panel
      gsap.from(".solution-intro__label", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        y: 30, opacity: 0, duration: 0.8, ease: "expo.out",
      });

      gsap.from(".solution-intro__title", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 65%" },
        y: 60, opacity: 0, duration: 1.2, ease: "expo.out", delay: 0.15,
      });

      gsap.from(".solution-intro__subtitle", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 60%" },
        y: 40, opacity: 0, duration: 1, ease: "expo.out", delay: 0.3,
      });

      gsap.from(".solution-intro__feature", {
        scrollTrigger: { trigger: ".solution-intro__features", start: "top 85%" },
        y: 30, opacity: 0, duration: 0.8, stagger: 0.12, ease: "expo.out",
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
    <section ref={sectionRef} className="features-scroll" id="solution" style={{ overflow: "hidden", background: "var(--cream)", height: "100vh" }}>
      <div ref={trackRef} className="features-scroll__track" style={{ display: "flex", height: "100%", alignItems: "center" }}>

        {/* Panel 1: Solution Intro */}
        <div className="features-scroll__panel" style={{ width: "100vw", flexShrink: 0, height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "0 24px" }}>
          <div className="solution-intro-content" style={{ textAlign: "center", maxWidth: "800px" }}>
            <span className="solution-intro__label" style={{ display: "block", letterSpacing: "3px", textTransform: "uppercase", color: "var(--coral)", marginBottom: "24px", fontSize: "13px", fontWeight: 600 }}>The Solution</span>
            <h2 className="solution-intro__title" style={{ fontFamily: "var(--font-display)", color: "var(--teal)", letterSpacing: "3px", marginBottom: "32px", fontSize: "clamp(48px, 8vw, 100px)", lineHeight: 1 }}>MEET ATAYR</h2>
            <p className="solution-intro__subtitle" style={{ color: "var(--teal)", opacity: 0.7, margin: "0 auto 60px", fontSize: "clamp(18px, 2.5vw, 24px)", lineHeight: 1.6, maxWidth: "600px" }}>
              Your pre-purchase wardrobe advisor - powered by AI, backed by friends. Two features, one smarter wardrobe.
            </p>
            <div className="solution-intro__features" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "40px" }}>
              <div className="solution-intro__feature" style={{ display: "flex", alignItems: "center", gap: "14px", padding: "16px 32px", border: "2px solid #01555126", borderRadius: "60px", color: "var(--teal)", fontWeight: 500, fontSize: "16px" }}>
                <span className="solution-intro__feature-icon" style={{ fontSize: "24px" }}>🧠</span>
                Buy Smart — AI Outfit Matching
              </div>
              <div className="solution-intro__feature" style={{ display: "flex", alignItems: "center", gap: "14px", padding: "16px 32px", border: "2px solid #01555126", borderRadius: "60px", color: "var(--teal)", fontWeight: 500, fontSize: "16px" }}>
                <span className="solution-intro__feature-icon" style={{ fontSize: "24px" }}>🤝</span>
                Borrow More — Friend Wardrobe Lending
              </div>
            </div>
          </div>
        </div>

        {/* Photo Gallery Strip - scrolls naturally with horizontal scroll */}
        <div className="photo-gallery" style={{ display: "flex", gap: "20px", alignItems: "center", padding: "0 80px", flexShrink: 0 }}>
          {fashionImages.map((img, i) => {
            const isLarge = (i + 1) % 4 === 0; // 4th, 8th... are large
            return (
              <div
                key={i}
                className={`photo-gallery__item ${isLarge ? "photo-gallery__item--large" : ""}`}
              >
                <img src={img.src} alt={img.alt} loading="lazy" />
              </div>
            );
          })}
        </div>

        {/* Panel 2: Buy Smart */}
        <div className="features-scroll__panel buy-smart-panel" style={{ width: "100vw", flexShrink: 0, height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "80px 24px 20px", position: "relative" }}>
          <div className="buy-smart-content" style={{ width: "100%", maxWidth: "1100px", transform: "scale(0.85)", transformOrigin: "center center", position: "relative", zIndex: 10 }}>
            <div className="buy-smart__header" style={{ textAlign: "center", marginBottom: "35px" }}>
              <span className="buy-smart__label" style={{ display: "block", letterSpacing: "3px", textTransform: "uppercase", color: "var(--teal)", marginBottom: "12px", fontSize: "13px", fontWeight: 600 }}>Feature One</span>
              <h2 className="buy-smart__title" style={{ fontFamily: "var(--font-display)", color: "var(--coral)", letterSpacing: "3px", marginBottom: "15px", fontSize: "clamp(36px, 6vw, 76px)", lineHeight: 1 }}>BUY SMART</h2>
              <p className="buy-smart__desc" style={{ color: "var(--teal)", opacity: 0.7, margin: "0 auto", fontSize: "clamp(15px, 2vw, 18px)", maxWidth: "500px" }}>
                AI-powered outfit matching — before checkout.
              </p>
            </div>

            <div className="buy-smart__steps" style={{ marginBottom: "35px" }}>
              {steps.map((step) => (
                <div key={step.number} className="step-card" style={{ background: "var(--white)", border: "1px solid var(--gray-light)", borderRadius: "20px", padding: "24px", position: "relative", overflow: "hidden" }}>
                  <div className="step-card__number" style={{ fontFamily: "var(--font-display)", color: "var(--coral)", opacity: 0.15, letterSpacing: "2px", marginBottom: "12px", fontSize: "32px", lineHeight: 1 }}>{step.number}</div>
                  <div className="step-card__icon" style={{ fontSize: "28px", marginBottom: "16px", lineHeight: 1 }}>{step.icon}</div>
                  <h3 className="step-card__title" style={{ fontFamily: "var(--font-display)", color: "var(--teal)", letterSpacing: "2px", marginBottom: "12px", fontSize: "20px", lineHeight: 1 }}>{step.title}</h3>
                  <p className="step-card__text" style={{ color: "var(--teal)", opacity: 0.7, fontSize: "14px", lineHeight: 1.5, margin: 0 }}>{step.text}</p>
                </div>
              ))}
            </div>

            <div className="buy-smart__example" style={{ background: "var(--white)", border: "1px solid var(--gray-light)", borderRadius: "20px", padding: "20px 24px", textAlign: "center", maxWidth: "800px", margin: "0 auto" }}>
              <span className="buy-smart__example-label" style={{ display: "inline-block", background: "#fe4f2d1a", color: "var(--coral)", padding: "4px 12px", borderRadius: "30px", fontSize: "12px", fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase", marginBottom: "12px" }}>Example Suggestion</span>
              <p className="buy-smart__example-text" style={{ color: "var(--teal)", fontSize: "16px", fontStyle: "italic", lineHeight: 1.5, margin: 0 }}>
                &ldquo;This navy blazer pairs perfectly with your black slim jeans, tan leather boots, and gold hoop earrings — 95% wardrobe match.&rdquo;
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
