"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function WaitlistCTA() {
  const sectionRef = useRef(null);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cta-section__title", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
        y: 60,
        opacity: 0,
        scale: 0.92,
        duration: 1.2,
        ease: "expo.out",
      });

      gsap.from(".cta-section__subtitle", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
        },
        y: 30,
        opacity: 0,
        duration: 0.9,
        ease: "expo.out",
        delay: 0.2,
      });

      gsap.from(".cta-form", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        },
        y: 30,
        opacity: 0,
        duration: 0.9,
        ease: "expo.out",
        delay: 0.35,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || status === "submitting") return;

    setStatus("submitting");
    try {
      const res = await fetch("https://formspree.io/f/xoeanvrg", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section ref={sectionRef} className="cta-section" id="waitlist">
      <div className="cta-section__shape cta-section__shape-1" />
      <div className="cta-section__shape cta-section__shape-2" />

      <h2 className="cta-section__title">COMING SOON</h2>
      <p className="cta-section__subtitle">
        Be among the first to try Atayr. Join our founding members waitlist and help shape the future of your wardrobe.
      </p>

      {status === "success" ? (
        <div className="cta-form__success">
          ✓ Welcome aboard! You&apos;re officially a founding member.
        </div>
      ) : (
        <form className="cta-form" onSubmit={handleSubmit}>
          <input
            className="cta-form__input"
            type="email"
            name="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-label="Email address for waitlist"
          />
          <button
            className="cta-form__btn"
            type="submit"
            disabled={status === "submitting"}
          >
            {status === "submitting" ? "Joining..." : "Join Waitlist"}
          </button>
        </form>
      )}
      {status === "error" && (
        <p style={{ color: "var(--white)", marginTop: 16, fontSize: 14, opacity: 0.8 }}>
          Something went wrong. Please try again.
        </p>
      )}
    </section>
  );
}
