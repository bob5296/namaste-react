import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Body from "./components/Body";
import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import RestaurantMenu from "./components/restaurantMenu/RestaurantMenu";
import AboutClass from "./components/classComponents/AboutClass";

// Lazy load Profile component
const Profile = React.lazy(() => import("./components/Profile"));

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* AppLayout wraps all routes */}
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
            </Routes>
        </BrowserRouter>
    );
};

export default App;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);