import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "react-oidc-context";

const ProtectedRoute = () => {
    const auth = useAuth();

    // Show loading while checking auth status
    if (auth.isLoading) {
        return (
            <div className="auth-loading">
                <p>Loading...</p>
            </div>
        );
    }

    // Redirect to login if not authenticated
    if (!auth.isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
