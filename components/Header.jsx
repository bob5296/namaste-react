import React from "react";

const Header = () => {
    const [login, setLogin] = React.useState("Login");
    console.log("Header rendered");
    return (
        <div className="header">
            <div className="logo">
                <span className="logo-icon">🍕</span>
                <h1>FoodExpress</h1>
            </div>
            <nav className="menu-bar">
                <button className="menu-item">
                    <span className="menu-icon">👤</span>
                    <span>Profile</span>
                </button>
                <button className="menu-item">
                    <span className="menu-icon">🛒</span>
                    <span>Cart</span>
                </button>
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

