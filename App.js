import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Body from "./components/Body";
import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import RestaurantMenu from "./components/restaurantMenu/RestaurantMenu";
import AboutClass from "./components/classComponents/AboutClass";
import { Provider } from "react-redux";
import store from "./appStore";
import Login from "./components/Login";
import Callback from "./components/Callback";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "react-oidc-context";
import { oidcConfig } from "./utils/auth";

// Lazy load Profile component
const Profile = React.lazy(() => import("./components/Profile")); // how to get context here

const App = () => {
    return (
        <AuthProvider {...oidcConfig}>
        <Provider store={store}>
        <BrowserRouter>
            <Routes>
                {/* Auth routes - outside AppLayout */}
                <Route path="/login" element={<Login />} />
                <Route path="/callback" element={<Callback />} />
                
                {/* Protected routes - require authentication */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/" element={<AppLayout />}>
                        {/* Child routes - rendered in <Outlet /> */}
                        <Route index element={<Body />} />
                        <Route path="profile" element={
                            <Suspense fallback={<div>Loading Profile...</div>}>
                                <Profile />
                            </Suspense>
                        } />
                        <Route path="about" element={<AboutClass />} />
                        <Route path="restaurant/:Id" element={<RestaurantMenu />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
        </Provider>
        </AuthProvider>
    );
};

export default App;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);