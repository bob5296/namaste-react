import React from "react";
import ReactDOM from "react-dom/client";
import AppLayout from "./components/AppLayout";


const g = {
    name: "gaurav",
    age: 20,
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<AppLayout args={g}>Children data</AppLayout>);