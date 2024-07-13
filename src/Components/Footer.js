import React from "react";

const Footer = () => {
  return (
    <footer class="footer-distributed">
      <div class="footer-right">
        <a href="#">
        <img src="/twitter.png" width="20px"></img>
        </a>
        <a href="#">
        <img src="/facebook.png" width="20px"></img>
        </a>
        <a href="#">
          <img src="/linkedin.png" width="20px"></img>
        </a>
      </div>

      <div class="footer-left">
        <p class="footer-links">
          <a class="link-1" href="#">
            Home
          </a>

          <a href="#">Blog</a>

          <a href="#">Pricing</a>

          <a href="#">About</a>

          <a href="#">Faq</a>

          <a href="#">Contact</a>
        </p>

        <p>Foodie Delight &copy; 2024</p>
      </div>
    </footer>
  );
};

export default Footer;
