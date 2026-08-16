"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero({ isLoaded }) {
  const sectionRef = useRef(null);
  const phoneAnimRef = useRef(null);
  const phoneRef = useRef(null);
  const iconsRef = useRef([]);
  const inertiaRefs = useRef([]);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    if (!isLoaded) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl.from(".hero__badge", { y: 30, opacity: 0, duration: 0.8 }, 0.2)
        .from(".hero__title", { y: 80, opacity: 0, duration: 1.2 }, 0.4)
        .from(".hero__tagline", { y: 50, opacity: 0, duration: 1 }, 0.7)
        .from(".hero__subtitle", { y: 30, opacity: 0, duration: 0.9 }, 0.9)
        .from(".hero__form-wrapper", { y: 30, opacity: 0, duration: 0.9 }, 1.1)
        .from(".hero__phone-wrapper", { y: 100, opacity: 0, duration: 1.2, rotation: 10 }, 0.6)
        .from(".hero__scroll", { opacity: 0, duration: 0.8 }, 1.3)
        .from(
          ".hero__shape",
          { scale: 0, opacity: 0, duration: 1.5, stagger: 0.2 },
          0.3
        )
        .from(
          ".hero__floating-icon",
          { scale: 0, opacity: 0, duration: 0.8, stagger: 0.1 },
          1.0
        );

      // Smartphone trajectory (moving to Problem section)
      gsap.to(phoneAnimRef.current, {
        x: 0,
        y: () => {
          const dest = document.getElementById("problem-phone-dest");
          if (!dest) return 800;
          const getOffsetTop = (el) => el.getBoundingClientRect().top + window.scrollY;
          return getOffsetTop(dest) - getOffsetTop(phoneAnimRef.current) + 20; // stop a bit further down
        },
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => {
            const dest = document.getElementById("problem-phone-dest");
            if (!dest) return "+=800";
            const getOffsetTop = (el) => el.getBoundingClientRect().top + window.scrollY;
            const dist = getOffsetTop(dest) - getOffsetTop(phoneAnimRef.current) + 20;
            return `+=${dist}`;
          },
          scrub: 1.5,
          invalidateOnRefresh: true,
        }
      });

      // Smartphone 360 rotation
      gsap.to(phoneRef.current, {
        rotation: 375, // Starts at 15deg, rotates 360deg
        transformOrigin: "50% 50%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => {
            const dest = document.getElementById("problem-phone-dest");
            if (!dest) return "+=800";
            const getOffsetTop = (el) => el.getBoundingClientRect().top + window.scrollY;
            const dist = getOffsetTop(dest) - getOffsetTop(phoneAnimRef.current) + 60;
            return `+=${dist}`;
          },
          scrub: 1.5,
          invalidateOnRefresh: true,
        }
      });
    }, sectionRef);

    // Setup GSAP trailing animations
    const xTos = iconsRef.current.map((el, i) => gsap.quickTo(el, "x", { duration: 0.2 + (i * 0.35), ease: "power2.out" }));
    const yTos = iconsRef.current.map((el, i) => gsap.quickTo(el, "y", { duration: 0.2 + (i * 0.35), ease: "power2.out" }));

    // Define clustered resting position (3 icons arching UP, 2 tucked below them, tightly packed)
    const cluster = [
      { dx: -25, dy: 25, rot: -15 }, // Top left
      { dx: 0, dy: 15, rot: 0 },     // Top center (arched UP)
      { dx: 25, dy: 25, rot: 15 },   // Top right
      { dx: -12, dy: 40, rot: -8 },  // Bottom left
      { dx: 12, dy: 40, rot: 8 },    // Bottom right
    ];

    // Apply static base rotations to inertia wrappers to establish the resting cluster look
    inertiaRefs.current.forEach((el, i) => {
      gsap.set(el, { rotation: cluster[i].rot, transformOrigin: "top center" });
    });

    // Add continuous smooth jiggle effect to the inner images so they feel alive
    const imgs = iconsRef.current.map(el => el.querySelector('img'));
    gsap.to(imgs, {
      y: 6,
      rotation: 4,
      duration: 2.2,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
      stagger: {
        each: 0.3,
        from: "random"
      }
    });

    // Mouse tracking state for ticker
    let targetX = 0;

    // Dynamic gradient and trailing icons mouse tracking
    const handleMouseMove = (e) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const pxX = e.clientX - rect.left;
        const pxY = e.clientY - rect.top;
        // Background gradient logic (instant reaction)
        const percentX = (pxX / rect.width) * 100;
        const percentY = (pxY / rect.height) * 100;
        sectionRef.current.style.setProperty('--mouse-x', `${percentX}%`);
        sectionRef.current.style.setProperty('--mouse-y', `${percentY}%`);

        // Add a slight reaction delay before the charms start following (slack in the tether)
        setTimeout(() => {
          targetX = pxX; // Store for inertia ticker exactly when they start moving
          
          // Update trailing icons (fanning out into the cluster)
          xTos.forEach((fn, i) => fn(pxX + cluster[i].dx));
          yTos.forEach((fn, i) => fn(pxY + cluster[i].dy));
        }, 150); // 150ms delay
      }
    };
    
    // Ticker to calculate pendulum inertia
    const ticker = () => {
      iconsRef.current.forEach((el, i) => {
        if (!el || !inertiaRefs.current[i]) return;
        
        const currentX = gsap.getProperty(el, "x");
        const destX = targetX + cluster[i].dx;
        const deltaX = destX - currentX;
        
        const inertiaRotation = deltaX * -0.08; 
        
        gsap.set(inertiaRefs.current[i], {
          rotation: cluster[i].rot + inertiaRotation
        });
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    gsap.ticker.add(ticker);

    // --- Phone UI Animation Sequence ---
    const uiTl = gsap.timeline({ repeat: -1 });
    
    // Set initial states
    gsap.set(".phone-s1", { autoAlpha: 1 });
    gsap.set(".phone-s2", { autoAlpha: 0 });
    gsap.set(".phone-s3", { autoAlpha: 0 });
    gsap.set(".phone-s4", { autoAlpha: 0 });
    gsap.set(".phone-s5", { autoAlpha: 0 });
    gsap.set(".phone-s6", { autoAlpha: 0 });
    gsap.set(".phone-s7", { autoAlpha: 0 });
    gsap.set(".phone-s2__flash", { autoAlpha: 0 });
    gsap.set(".phone-s3__scanner", { y: -10 });
    gsap.set([".phone-s4__match-item", ".phone-s4__item"], { y: 20, autoAlpha: 0 });
    gsap.set(".phone-s5__grid", { y: 150 });
    gsap.set([".phone-s6__image", ".phone-s6__title", ".phone-s6__btn"], { autoAlpha: 0, y: 10, scale: 0.9 });
    gsap.set(".phone-s7__bubble", { autoAlpha: 0, scale: 0.8 });

    uiTl
      // Wait on Screen 1
      .to({}, { duration: 1.5 })
      // "Click" camera button
      .to(".phone-s1__cam-btn", { scale: 0.8, duration: 0.15, yoyo: true, repeat: 1 })
      .to({}, { duration: 0.3 })
      
      // Transition to Screen 2 (Viewfinder)
      .to(".phone-s1", { autoAlpha: 0, duration: 0.4 })
      .to(".phone-s2", { autoAlpha: 1, duration: 0.4 }, "<")
      .to({}, { duration: 1.0 }) // aiming
      
      // Flash!
      .to(".phone-s2__flash", { autoAlpha: 1, duration: 0.1 })
      .to(".phone-s2__flash", { autoAlpha: 0, duration: 0.3 })
      .to({}, { duration: 0.4 })
      
      // Transition to Screen 3 (AI Match)
      .to(".phone-s2", { autoAlpha: 0, duration: 0.4 })
      .to(".phone-s3", { autoAlpha: 1, duration: 0.4 }, "<")
      // Scan up and down
      .to(".phone-s3__scanner", { y: 240, duration: 1.2, ease: "power1.inOut", yoyo: true, repeat: 1 })
      .to({}, { duration: 0.2 })
      
      // Transition to Screen 4 (Outfits)
      .to(".phone-s3", { autoAlpha: 0, duration: 0.4 })
      .to(".phone-s4", { autoAlpha: 1, duration: 0.4 }, "<")
      // Stagger in matches
      .to(".phone-s4__match-item", { autoAlpha: 1, y: 0, duration: 0.5, ease: "back.out(1.5)" })
      .to(".phone-s4__item", { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.15, ease: "back.out(1.5)" }, "-=0.2")
      .to({}, { duration: 2.0 })

      // Transition to Screen 5 (Friend's Closet)
      .to(".phone-s4", { autoAlpha: 0, duration: 0.4 })
      .to(".phone-s5", { autoAlpha: 1, duration: 0.4 }, "<")
      // Scroll the closet grid up
      .to(".phone-s5__grid", { y: -80, duration: 2.0, ease: "power1.inOut" })
      .to({}, { duration: 0.5 })

      // Transition to Screen 6 (Detail View)
      .to(".phone-s5", { autoAlpha: 0, duration: 0.4 })
      .to(".phone-s6", { autoAlpha: 1, duration: 0.4 }, "<")
      .to(".phone-s6__image", { autoAlpha: 1, scale: 1, y: 0, duration: 0.4, ease: "back.out(1.5)" })
      .to(".phone-s6__title", { autoAlpha: 1, y: 0, duration: 0.3 }, "-=0.2")
      .to(".phone-s6__btn", { autoAlpha: 1, y: 0, duration: 0.3 }, "-=0.2")
      // "Click" Borrow button
      .to({}, { duration: 1.0 })
      .to(".phone-s6__btn", { scale: 0.95, duration: 0.15, yoyo: true, repeat: 1 })
      .to({}, { duration: 0.3 })

      // Transition to Screen 7 (Messaging)
      .to(".phone-s6", { autoAlpha: 0, duration: 0.4 })
      .to(".phone-s7", { autoAlpha: 1, duration: 0.4 }, "<")
      // Pop in chat bubbles
      .to(".phone-s7__bubble", { autoAlpha: 1, scale: 1, duration: 0.5, stagger: 1.0, ease: "back.out(1.5)" })
      .to({}, { duration: 4.0 })

      // Reset back to Screen 1
      .to(".phone-s7", { autoAlpha: 0, duration: 0.5 })
      .to(".phone-s1", { autoAlpha: 1, duration: 0.5 }, "<");

    return () => {
      ctx.revert();
      window.removeEventListener("mousemove", handleMouseMove);
      gsap.ticker.remove(ticker);
    };
  }, [isLoaded]);

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
    <section ref={sectionRef} className="hero" id="hero" style={{ opacity: isLoaded ? 1 : 0, transition: "opacity 0.1s" }}>
      {/* Decorative blobs */}
      <div className="hero__shape hero__shape-1" />
      <div className="hero__shape hero__shape-2" />
      <div className="hero__shape hero__shape-3" />

      {/* Trailing Icons Snake Trail */}
      <div className="hero__floating-icons">
        <div className="hero__floating-icon" ref={(el) => iconsRef.current[0] = el}>
          <div className="hero__floating-inertia" ref={(el) => inertiaRefs.current[0] = el}>
            <img src="/images/charms/hanger.png" alt="" />
          </div>
        </div>
        <div className="hero__floating-icon" ref={(el) => iconsRef.current[1] = el}>
          <div className="hero__floating-inertia" ref={(el) => inertiaRefs.current[1] = el}>
            <img src="/images/charms/tag.png" alt="" />
          </div>
        </div>
        <div className="hero__floating-icon" ref={(el) => iconsRef.current[2] = el}>
          <div className="hero__floating-inertia" ref={(el) => inertiaRefs.current[2] = el}>
            <img src="/images/charms/handshake.png" alt="" />
          </div>
        </div>
        <div className="hero__floating-icon" ref={(el) => iconsRef.current[3] = el}>
          <div className="hero__floating-inertia" ref={(el) => inertiaRefs.current[3] = el}>
            <img src="/images/charms/tshirt.png" alt="" />
          </div>
        </div>
        <div className="hero__floating-icon" ref={(el) => iconsRef.current[4] = el}>
          <div className="hero__floating-inertia" ref={(el) => inertiaRefs.current[4] = el}>
            <img src="/images/charms/camera.png" alt="" />
          </div>
        </div>
      </div>

      <div className="hero__container">
        {/* Left Column: Text & CTA */}
        <div className="hero__content">
          <div className="hero__badge">
            <span className="hero__badge-dot" />
            Coming Soon — Join the Waitlist
          </div>

          <h1 className="hero__title">ATAYR</h1>

          <p className="hero__tagline">BUY LESS. BORROW MORE.</p>

          <p className="hero__subtitle">
            See what fits your closet before you buy it - or just borrow it from a friend.
          </p>

          <div className="hero__form-wrapper">
            {status === "success" ? (
              <div className="waitlist-form__success">
                ✓ You&apos;re on the list! We&apos;ll be in touch.
              </div>
            ) : (
              <form className="waitlist-form" onSubmit={handleSubmit}>
                <input
                  className="waitlist-form__input"
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  aria-label="Email address"
                />
                <button
                  className="waitlist-form__btn"
                  type="submit"
                  disabled={status === "submitting"}
                >
                  {status === "submitting" ? "Joining..." : "Join Waitlist"}
                </button>
              </form>
            )}
            {status === "error" && (
              <p style={{ color: "var(--coral)", marginTop: 12, fontSize: 14 }}>
                Something went wrong. Please try again.
              </p>
            )}
          </div>
        </div>

        {/* Right Column: Smartphone Mockup */}
        <div className="hero__phone-wrapper" style={{ zIndex: 100 }}>
          <div className="hero__phone-anim-wrapper" ref={phoneAnimRef}>
            <div className="hero__phone" ref={phoneRef} style={{ transform: "rotate(15deg)", transformOrigin: "center center" }}>
              <div className="hero__phone-notch">
                <div className="hero__phone-speaker" />
                <div className="hero__phone-camera" />
              </div>
              <div className="hero__phone-screen">
                <div className="phone-ui">
                  
                  {/* Screen 1: Camera Action */}
                  <div className="phone-screen phone-s1">
                    <div className="phone-app-header">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="12" x2="9" y2="6"></line><line x1="3" y1="12" x2="9" y2="18"></line></svg>
                      <span>Scan Item</span>
                      <div style={{ width: 20 }} />
                    </div>
                    <div style={{ flex: 1 }} />
                    <div className="phone-s1__cam-btn">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
                    </div>
                    <div style={{ flex: 0.2 }} />
                  </div>

                  {/* Screen 2: Viewfinder */}
                  <div className="phone-screen phone-s2">
                    <div className="phone-s2__corners" />
                    <div className="phone-s2__flash" />
                    <div className="phone-s2__img-wrapper">
                      <img src="/images/app/tshirt.png" alt="T-Shirt" />
                    </div>
                  </div>

                  {/* Screen 3: AI Matching */}
                  <div className="phone-screen phone-s3">
                    <div className="phone-s3__img-wrapper">
                      <img src="/images/app/tshirt.png" alt="T-Shirt" />
                    </div>
                    <div className="phone-s3__scanner" />
                    <div className="phone-s3__text">Scanning wardrobe...</div>
                  </div>

                  {/* Screen 4: Suggestions */}
                  <div className="phone-screen phone-s4">
                    <div className="phone-app-header">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="12" x2="9" y2="6"></line><line x1="3" y1="12" x2="9" y2="18"></line></svg>
                      <span>Perfect Match</span>
                      <div style={{ width: 20 }} />
                    </div>
                    <div className="phone-s4__match-item">
                      <img src="/images/app/tshirt.png" alt="T-Shirt" />
                    </div>
                    <div className="phone-s4__grid">
                      <div className="phone-s4__item"><img src="/images/app/jeans.png" alt="Jeans" /></div>
                      <div className="phone-s4__item"><img src="/images/app/coat.png" alt="Coat" /></div>
                      <div className="phone-s4__item"><img src="/images/app/sneakers.png" alt="Sneakers" /></div>
                      <div className="phone-s4__item"><img src="/images/app/bag.png" alt="Bag" /></div>
                    </div>
                  </div>

                  {/* Screen 5: Friend's Closet */}
                  <div className="phone-screen phone-s5">
                    <div className="phone-app-header">
                      <div style={{ width: 20 }} />
                      <span>Aisha's Closet</span>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    </div>
                    <div className="phone-s5__scroll">
                      <div className="phone-s5__grid">
                        <div className="phone-s5__item"><img src="/images/app/coat.png" alt="Coat" /></div>
                        <div className="phone-s5__item"><img src="/images/app/jeans.png" alt="Jeans" /></div>
                        <div className="phone-s5__item"><img src="/images/app/kurta.png" alt="Kurta" /></div>
                        <div className="phone-s5__item"><img src="/images/app/tshirt.png" alt="T-Shirt" /></div>
                        <div className="phone-s5__item"><img src="/images/app/sneakers.png" alt="Sneakers" /></div>
                        <div className="phone-s5__item"><img src="/images/app/bag.png" alt="Bag" /></div>
                      </div>
                    </div>
                  </div>

                  {/* Screen 6: Detail View */}
                  <div className="phone-screen phone-s6">
                    <div className="phone-app-header">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="12" x2="9" y2="6"></line><line x1="3" y1="12" x2="9" y2="18"></line></svg>
                      <span>Item Details</span>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                    </div>
                    <div className="phone-s6__image">
                      <img src="/images/app/kurta.png" alt="Kurta" />
                    </div>
                    <div className="phone-s6__title">Silk Kurta</div>
                    <div className="phone-s6__btn">Borrow Item</div>
                  </div>

                  {/* Screen 7: Messaging */}
                  <div className="phone-screen phone-s7">
                    <div className="phone-app-header">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="12" x2="9" y2="6"></line><line x1="3" y1="12" x2="9" y2="18"></line></svg>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--coral)', color: 'var(--dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 'bold' }}>A</div>
                        <span>Aisha</span>
                      </div>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
                    </div>
                    <div className="phone-s7__chat">
                      <div className="phone-s7__bubble phone-s7__bubble--sent">hey i found you kurta looks good can i borrow it i have function to attend to and cant spend much for one day</div>
                      <div className="phone-s7__bubble phone-s7__bubble--received">sure you can!</div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hero__scroll">
        <span>Scroll</span>
        <div className="hero__scroll-line" />
      </div>
    </section>
  );
}
