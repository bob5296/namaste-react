import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAuth } from "react-oidc-context";
import { setLoggedInUser } from "../appSlice";

const Callback = () => {
    const auth = useAuth();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    React.useEffect(() => {
        // oidc-client-ts handles the callback automatically
        // Once authenticated, update Redux and redirect
        if (auth.isAuthenticated && auth.user) {
            const user = auth.user.profile;
            dispatch(setLoggedInUser(user.name || user.email || user.sub));
            navigate("/", { replace: true });
        }
    }, [auth.isAuthenticated, auth.user, navigate, dispatch]);

    if (auth.error) {
        return (
            <div className="callback-page">
                <div className="callback-error">
                    <h2>Authentication Error</h2>
                    <p>{auth.error.message}</p>
                    <button onClick={() => navigate("/login")}>Try Again</button>
                </div>
            </div>
        );
    }

    return (
        <div className="callback-page">
            <div className="callback-loading">
                <p>Completing sign in...</p>
            </div>
        </div>
    );
};

export default Callback;
