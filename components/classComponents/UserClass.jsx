import React from "react";
class UserClass extends React.Component {
constructor(props) {
    super(props);
    this.state = {
        userinfo : {
            login: "Dummy",
            location: "Dummy",
            contact: "Dummy"
        }
    };
    // mount flag to prevent setState after unmount
    this._isMounted = false;
    // console.log(this.props.name+"child ctgor");
}

render() {
    // console.log(this.props.name+"childer renederd");
    return(
        <div className="user-card">
            <h1>Name: {this.state.userinfo.login}</h1>
            <h2>Location: {this.state.userinfo.location}</h2>
            <h3>Contact: {this.state.userinfo.contact}</h3>
        </div>
    );
}

async componentDidMount() {
    // mark mounted before doing async work
    this._isMounted = true;
    try {
        // use a specific username if provided via props, otherwise default to 'octocat'
        const username = this.props.username || 'octocat';
        const response = await fetch(`https://api.github.com/users/${username}`);

        if (!response.ok) {
            // handle non-2xx responses explicitly
            throw new Error(`GitHub API responded with status ${response.status}`);
        }

        const data = await response.json();

        // prefer real values, then a user-friendly 'Not available', and only fall back to 'Dummy' as last resort
        const login = data.login ?? this.state.userinfo.login ?? 'Dummy';
        const location = data.location ?? 'Not available';
        const contact = data.email ?? data.blog ?? data.twitter_username ?? 'Not available';

        // only set state if still mounted
        if (this._isMounted) {
            this.setState({
                userinfo: {
                    login,
                    location,
                    contact
                }
            });
        }
    } catch (err) {
        console.error("API error:", err);
        // As a last-resort fallback keep existing state values or set them to 'Dummy' if missing
        if (this._isMounted) {
            this.setState((prev) => ({
                userinfo: {
                    login: prev.userinfo?.login ?? 'Dummy',
                    location: prev.userinfo?.location ?? 'Dummy',
                    contact: prev.userinfo?.contact ?? 'Dummy'
                }
            }));
        }
    }
}

componentWillUnmount() {
    // mark unmounted so async callbacks won't call setState
    this._isMounted = false;
}
}



export default UserClass;
