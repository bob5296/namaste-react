import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Body from "./components/Body";
import Profile from "./components/Profile";
import React from "react";
import ReactDOM from "react-dom/client";
import RestaurantMenu from "./components/RestaurantMenu";

import AboutClass from "./components/AboutClass";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* AppLayout wraps all routes */}
                <Route path="/" element={<AppLayout />}>
                    {/* Child routes - rendered in <Outlet /> */}
                    <Route index element={<Body />} />
                    <Route path="profile" element={<Profile />} />
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