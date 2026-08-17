"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Differentiator() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".differentiator__line", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
        },
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: "expo.out",
      });

      gsap.from(".differentiator__line-sub", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 50%",
        },
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "expo.out",
        delay: 0.5,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="differentiator" id="different">
      <div className="container">
        <p className="differentiator__line">
          OTHERS HELP YOU STYLE WHAT YOU OWN.
        </p>
        <p className="differentiator__line differentiator__line-highlight">
          WE HELP YOU DECIDE WHAT TO BUY.
        </p>
        <p className="differentiator__line">
          AND IF YOU DON&apos;T NEED TO BUY -
        </p>
        <p className="differentiator__line differentiator__line-highlight">
          JUST BORROW IT.
        </p>
        <p className="differentiator__line-sub">
          Atayr is the only app combining pre-purchase AI outfit matching with peer-to-peer wardrobe lending - attacking both impulse buying and one-time-wear clothing waste.
        </p>
      </div>
    </section>
  );
}
