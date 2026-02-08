import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "react-oidc-context";
import { clearUser } from "../appSlice";

const Header = () => {
    const auth = useAuth();
    const cartItems = useSelector((state) => state.app.cartItems);
    const user = useSelector((state) => state.app.loggedInUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleAuthClick = () => {
        if (auth.isAuthenticated) {
            dispatch(clearUser());
            auth.signoutRedirect();
        } else {
            navigate("/login");
        }
    };
    
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
                {user && <label className="user-label">{user}</label>}
                <button className="menu-item login-button" onClick={handleAuthClick}>
                    <span>{auth.isAuthenticated ? "Logout" : "Login"}</span>
                </button>
            </nav>
        </div>
    );
};

export default Header;

