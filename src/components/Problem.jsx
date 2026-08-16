"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Problem() {
  const sectionRef = useRef(null);
  const countersRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.from(".problem__label", {
        scrollTrigger: {
          trigger: ".problem__header",
          start: "top 80%",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "expo.out",
      });

      gsap.from(".problem__title", {
        scrollTrigger: {
          trigger: ".problem__header",
          start: "top 75%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "expo.out",
        delay: 0.2,
      });

      // Stat cards stagger
      gsap.from(".stat-card", {
        scrollTrigger: {
          trigger: ".problem__stats",
          start: "top 80%",
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "expo.out",
      });

      // Counter animations
      const counterData = [
        { target: ".counter-1", end: 40, suffix: "%" },
        { target: ".counter-2", end: 80, suffix: "%" },
        { target: ".counter-3", end: 460, prefix: "$", suffix: "B" },
      ];

      counterData.forEach(({ target, end, prefix = "", suffix = "" }) => {
        const el = document.querySelector(target);
        if (!el) return;

        const obj = { val: 0 };
        gsap.to(obj, {
          val: end,
          duration: 2.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".problem__stats",
            start: "top 75%",
          },
          onUpdate: () => {
            el.textContent = `${prefix}${Math.round(obj.val)}${suffix}`;
          },
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="problem" id="problem">
      <div className="container">
        <div className="problem__layout">
          <div className="problem__left">
            <div className="problem__header">
              <span className="problem__label">The Problem</span>
              <h2 className="problem__title" style={{ margin: 0 }}>
                Fashion told us to keep <em>buying</em>.
              </h2>
            </div>

            <div className="problem__stats problem__stats-vertical">
              <div className="stat-card">
                <div className="stat-card__number counter-1">0%</div>
                <div className="stat-card__label">
                  Online clothing return rate — mostly from size & style uncertainty
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-card__number counter-2">0%</div>
                <div className="stat-card__label">
                  Of your wardrobe goes unworn every year
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-card__number counter-3">$0B</div>
                <div className="stat-card__label">
                  Worth of clothes discarded globally each year
                </div>
              </div>
            </div>
          </div>
          <div className="problem__right">
            <div id="problem-phone-dest" style={{ width: "280px", height: "600px" }}></div>
          </div>
        </div>
      </div>
    </section>
  );
}
