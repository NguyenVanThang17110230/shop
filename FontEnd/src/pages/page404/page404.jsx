import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import "../page404/page404.css";
class Page404 extends Component {
    state = {}
    render() {
        return (
            <div>
                <div id="notfound">
                    <div class="notfound">
                        <div class="notfound-404">
                            <h1>Oops!</h1>
                        </div>
                        <h2>404 - Page not found</h2>
                        <p>The page you are looking for might have been removed had its name changed or is temporarily unavailable.</p>
                        <Link className="nav-link" to="/">Go To Homepage</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Page404;