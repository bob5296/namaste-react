import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
    const [login, setLogin] = React.useState("Login");

    return (
        <div className="header">
            <div className="logo">
                <span className="logo-icon">🍕</span>
                <Link to="/">FoodExpress</Link>
            </div>
            <nav className="menu-bar">
                <Link to="/profile" className="menu-item">
                    <span className="menu-icon">👤</span>
                    <span>Profile</span>
                </Link>
                <Link to="/cart" className="menu-item">
                    <span className="menu-icon">🛒</span>
                    <span>Cart</span>
                </Link>
                <button className="menu-item login-button" onClick={() => {
                    setLogin(login === "Login" ? "Logout" : "Login");
                }}>
                    <span>{login}</span>
                </button>
            </nav>
        </div>
    );
};

export default Header;

