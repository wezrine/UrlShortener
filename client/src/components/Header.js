import { NavLink } from "react-router-dom";

function Header() {

    return (
        <nav className="navbar is-link" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <NavLink to = '/' className='navbar-item'><h1>URL Shortener</h1></NavLink>
            </div>
        </nav>
    )
}

export default Header