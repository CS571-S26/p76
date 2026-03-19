import { Link } from "react-router";

function P76NoMatch() {
    return (
        <div>
            <h2>That's a 404.</h2>
            <p>Seems you have gotten lost...</p>
            <p><Link to="/">Back to start.</Link></p>
        </div>
    );
}

export default P76NoMatch;