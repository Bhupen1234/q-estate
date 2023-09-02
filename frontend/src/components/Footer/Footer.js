import React from "react";
import "./Footer.css";
const Footer = () => {
  return (
    <div className="footer-container">
      <div className="first-col">
        <h3 className="company-name">QEstate Homes</h3>
        <p className="company-decription">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laborum
          velit molestias ea dolor fugiat dignissimos at nam veritatis aliquid,
          accusamus cupiditate ab facere corporis fugit officia neque voluptates
          provident a.
        </p>
      </div>
      <div className="second-col">
        <h3>Contact</h3>
         <ul className="footer-links">
            <li>Bengaluru,India</li>
            <li>qestate@gmail.com</li>
            <li>+91900000112</li>
            <li>+021 93489223</li>
         </ul>
      </div>
    </div>
  );
};

export default Footer;
