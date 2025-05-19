import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Footer from "./components/footer";
import Body from "./components/Body";
import RestrauntCard from "./components/RestrauntCard";

const App = () => (
    <div className="app">
        <Header />
        <Body />
        <Footer />
    </div>
);


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />); 