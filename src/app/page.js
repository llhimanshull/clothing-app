"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Problem from "@/components/Problem";

import SolutionIntro from "@/components/SolutionIntro";
import BorrowMore from "@/components/BorrowMore";
import Differentiator from "@/components/Differentiator";
import WaitlistCTA from "@/components/WaitlistCTA";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Force scroll to top on reload
    window.scrollTo(0, 0);

    // Some browsers have history restoration, this ensures it stays at top
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    // Disable scroll while loader is active
    if (!isLoaded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoaded]);

  return (
    <>
      {!isLoaded && <Loader onComplete={() => setIsLoaded(true)} />}
      <Navbar />
      <main>
        <Hero isLoaded={isLoaded} />
        <Marquee />
        <Problem />

        <SolutionIntro />
        <BorrowMore />
        <Differentiator />
        <WaitlistCTA />
      </main>
      <Footer />
    </>
  );
}
