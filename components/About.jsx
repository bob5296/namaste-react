import React from "react";

const About = () => {
    React.useEffect(() => {
        const timer = setInterval(() => {
            console.log("functional did mount");
        }, 1000);
        
        return () => clearInterval(timer);
        }, []);
    return(
        <div>
            <h1>About</h1>
        </div>
    )
};

export default About;