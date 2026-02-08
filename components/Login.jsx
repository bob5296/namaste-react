import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "react-oidc-context";

const Login = () => {
    const auth = useAuth();

    // Redirect if already authenticated
    if (auth.isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    const handleLogin = () => {
        auth.signinRedirect();
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-header">
                    <span className="login-logo">🍕</span>
                    <h1>Welcome to FoodExpress</h1>
                    <p>Sign in to continue</p>
                </div>
                <button 
                    className="login-btn" 
                    onClick={handleLogin}
                    disabled={auth.isLoading}
                >
                    {auth.isLoading ? "Loading..." : "Sign in with Identity Server"}
                </button>
            </div>
        </div>
    );
};

export default Login;
