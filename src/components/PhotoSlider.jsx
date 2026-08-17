"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const fashionImages = [
  {
    src: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80",
    alt: "Fashion model in elegant outfit",
  },
  {
    src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80",
    alt: "Street style fashion photography",
  },
  {
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80",
    alt: "Stylish woman in modern clothing",
  },
  {
    src: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=80",
    alt: "High fashion editorial look",
  },
  {
    src: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&q=80",
    alt: "Woman in flowing dress",
  },
  {
    src: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&q=80",
    alt: "Fashion week street style",
  },
  {
    src: "https://images.unsplash.com/photo-1581044777550-4cfa60707998?w=600&q=80",
    alt: "Men's fashion editorial",
  },
  {
    src: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80",
    alt: "Luxury fashion accessories",
  },
  {
    src: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=600&q=80",
    alt: "Avant-garde fashion look",
  },
  {
    src: "https://images.unsplash.com/photo-1544957992-20514f595d6f?w=600&q=80",
    alt: "Contemporary streetwear style",
  },
];

export default function PhotoSlider() {
  const sliderRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Get the width of one set of images
    const images = track.querySelectorAll(".photo-slider__item");
    const totalItems = images.length / 2; // We duplicated them
    let setWidth = 0;
    for (let i = 0; i < totalItems; i++) {
      setWidth += images[i].offsetWidth + 20; // 20px gap
    }

    const ctx = gsap.context(() => {
      // Infinite horizontal scroll animation
      gsap.to(track, {
        x: -setWidth,
        duration: 35,
        ease: "none",
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize((x) => {
            return parseFloat(x) % setWidth;
          }),
        },
      });

      // Fade in on scroll
      gsap.from(sliderRef.current, {
        scrollTrigger: {
          trigger: sliderRef.current,
          start: "top 90%",
        },
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "expo.out",
      });
    }, sliderRef);

    return () => ctx.revert();
  }, []);

  // Duplicate images for seamless loop
  const allImages = [...fashionImages, ...fashionImages];

  return (
    <section ref={sliderRef} className="photo-slider" id="photo-slider">
      <div className="photo-slider__track" ref={trackRef}>
        {allImages.map((img, index) => {
          const isOdd = (index % fashionImages.length) % 2 === 0; // 1st, 3rd, 5th... (0-indexed even = odd position)
          return (
            <div
              key={index}
              className={`photo-slider__item ${isOdd ? "photo-slider__item--large" : ""}`}
            >
              <img src={img.src} alt={img.alt} loading="lazy" />
              <div className="photo-slider__overlay" />
            </div>
          );
        })}
      </div>
    </section>
  );
}
