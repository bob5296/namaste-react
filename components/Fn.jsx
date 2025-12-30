import React from "react";
import { H } from "./H";

const Fn = ({args, children}) => {
    const [count, setCount] = React.useState(0);
    return (
        <div>
            <p>Name: {args.name}, Age: {args.age}</p>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>Increment</button>
            {H()}
            {children}
        </div>
    );
    ///react functional component jsx -> babel -> react element -> virtual dom -
    // -> fibre -> reconcilation/diffing -> real dom -> browser
};

export default Fn;




