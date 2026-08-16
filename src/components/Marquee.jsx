"use client";

export default function Marquee() {
  const items = [
    "PRE-PURCHASE ADVISOR",
    "◆",
    "AI OUTFIT MATCHING",
    "◆",
    "BORROW FROM FRIENDS",
    "◆",
    "DIGITAL WARDROBE",
    "◆",
    "SUSTAINABLE FASHION",
    "◆",
    "BUY LESS",
    "◆",
    "BORROW MORE",
    "◆",
  ];

  return (
    <div className="marquee-section">
      <div className="marquee-track">
        {[...items, ...items].map((item, i) => (
          <span key={i} className={item === "◆" ? "divider" : ""}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
