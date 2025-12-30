import React from "react";
import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";

const AppLayout = (
    {args,children}
) => {
    return (
        <div>
            {children}
            <br></br>
            {args.name}
            <Header />
            <Body />
            <Footer />
        </div>
    );
};

export default AppLayout;

