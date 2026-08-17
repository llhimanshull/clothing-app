"use client";

export default function Marquee() {
  const items = [
    "PRE-PURCHASE ADVISOR",
    "â-†",
    "AI OUTFIT MATCHING",
    "â-†",
    "BORROW FROM FRIENDS",
    "â-†",
    "DIGITAL WARDROBE",
    "â-†",
    "SUSTAINABLE FASHION",
    "â-†",
    "BUY LESS",
    "â-†",
    "BORROW MORE",
    "â-†",
  ];

  return (
    <div className="marquee-section">
      <div className="marquee-track">
        {[...items, ...items].map((item, i) => (
          <span key={i} className={item === "â-†" ? "divider" : ""}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

