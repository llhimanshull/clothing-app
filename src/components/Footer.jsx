export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" id="footer">
      <div className="footer__grid">
        <div className="footer__brand">
          <div className="footer__logo">ATAYR</div>
          <p className="footer__tagline">
            Buy less. Borrow more. Your pre-purchase wardrobe advisor - powered by AI, backed by friends.
          </p>
        </div>

        <div className="footer__links">
          <div className="footer__col">
            <h4>Product</h4>
            <a href="#buy-smart">Buy Smart</a>
            <a href="#borrow-more">Borrow More</a>
            <a href="#waitlist">Join Waitlist</a>
          </div>
          <div className="footer__col">
            <h4>Connect</h4>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              Twitter / X
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        © {currentYear} Atayr. All rights reserved. Built with purpose.
      </div>
    </footer>
  );
}
