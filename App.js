        import React from "react";
        import ReactDOM from "react-dom/client";
        const heading = React.createElement(
            "h1",
            {id: "heading"},
            "Hello World from React!"
        );
        

        console.log(heading);

        //JSX
        const H = () => <h1 id="heading">Namaste React</h1>; // react component
        //react element
        
        const Fn = () => {
            
            return (
            <div>
                {h} //react element inside react component
                {console.log(h)}
                <H/>
                {H()} // can be called as function insidde JSX as component is a function
            <h1 id="heading">Namaste React from react component</h1>
            </div>
            );
            ///react functional component jsx -> babel -> react element -> virtual dom -
            // -> fibre -> reconcilation/diffing -> real dom -> browser
        };

        const h = (
            <div>
        <h1 id="heading">Namaste React</h1>
        </div>
        );
        console.log(Fn);
        console.log(H);
        const root = ReactDOM.createRoot(document.getElementById("root"));
        root.render(<Fn/>);