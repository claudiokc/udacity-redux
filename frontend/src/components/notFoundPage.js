import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

class NotFoundPage extends Component {
    render() {
        return (
            <div>
                <h1>Page Not Found</h1>
                <p>Sorry, there is nothing to see here.</p>
                <p><NavLink to="/">Back to Home</NavLink></p>
            </div>
        )
    }
}

export default NotFoundPage