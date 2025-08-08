import { Link } from "react-router"

export function Header() {
    return (
        <header>
            <Link to="/"><img src="/images/heritage-logo.png" alt="Heritage Academy Logo" /></Link>
            <ul className="links">
                <li><Link to="/newsletter" className="headLink">Newsletter</Link></li>
                <li><Link to="/calender" className="headLink">Calender</Link></li>
                <li><Link to="/sponsors" className="headLink">Sponsors</Link></li>
                <li className="hoverLink">
                    <Link to="/donate" className="headLink">Donate</Link>
                    <ul className="hide">
                        <div className="spacer"></div>
                        <li>Sponsor Us</li>
                        <li>Tax Credits</li>
                        <li>Volunteer</li>
                    </ul>
                </li>
                <li className="hoverLink">
                    <Link to="/teams" className="headLink">Teams</Link>
                    <ul className="hide">
                        <div className="spacer"></div>
                        <li><a href="https://cis.herobotix.com">C.I.S.</a></li>
                        <li><a href="https://beaniebots.herobotix.com">Beanie Bots</a></li>
                        <li><a href="https://spartech.herobotix.com">Spar-Tech</a></li>
                    </ul>
                </li>
            </ul>
        </header>
    );
}