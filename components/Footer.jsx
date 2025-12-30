import React from "react";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3>FoodExpress</h3>
                    <p>Your favorite food delivered fast and fresh</p>
                    <div className="social-links">
                        <a href="#" className="social-link">📘</a>
                        <a href="#" className="social-link">📷</a>
                        <a href="#" className="social-link">🐦</a>
                        <a href="#" className="social-link">📺</a>
                    </div>
                </div>

                <div className="footer-section">
                    <h4>Company</h4>
                    <ul className="footer-links">
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">Careers</a></li>
                        <li><a href="#">Team</a></li>
                        <li><a href="#">Blog</a></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4>Support</h4>
                    <ul className="footer-links">
                        <li><a href="#">Contact Us</a></li>
                        <li><a href="#">Help Center</a></li>
                        <li><a href="#">FAQs</a></li>
                        <li><a href="#">Terms & Conditions</a></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4>Legal</h4>
                    <ul className="footer-links">
                        <li><a href="#">Privacy Policy</a></li>
                        <li><a href="#">Cookie Policy</a></li>
                        <li><a href="#">Refund Policy</a></li>
                        <li><a href="#">Partner with Us</a></li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2024 FoodExpress. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;

