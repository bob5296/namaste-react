import React from "react";
import UserClass from "./UserClass";
class AboutClass extends React.Component {
    constructor(props) {        
        super(props);
    }

    render() {
        return(
            <div>
                <h1>AboutClass</h1>
                <UserClass name="Prabhakar" location="Pune" contact="1234567890" />
            </div>
        );
    }

    componentDidMount() {
        console.log("parent did mount");
    }
    
    componentDidUpdate() {
        // console.log("parent did update");
    }

    componentWillUnmount() {
        clearInterval(this.timer);
        // console.log("parent will unmount");
    }
}

export default AboutClass;