import { Link, NavLink } from "react-router"
import {useState} from "react";

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
                        <li><Link to={"/donate/sponsor"} className={"nestLink"}>Sponsor Us</Link></li>
                        <li><Link to={"/donate/credit"} className={"nestLink"}>Tax Credits</Link></li>
                        <li><Link to={"/donate/volunteer"} className={"nestLink"}>Volunteer</Link></li>
                    </ul>
                </li>
                <li className="hoverLink">
                    <Link to="/teams" className="headLink">Teams</Link>
                    <ul className="hide">
                        <div className="spacer"></div>
                        <li><a href="https://cis.herobotix.com" className={"nestLink"}>C.I.S.</a></li>
                        <li><a href="https://beaniebots.herobotix.com" className={"nestLink"}>Beanie Bots</a></li>
                        <li><a href="https://spartech.herobotix.com" className={"nestLink"}>Spar-Tech</a></li>
                    </ul>
                </li>
            </ul>
        </header>
    );
}

export function MobileHeader() {
    const [menuState, setMenuState] = useState(false);
    function toggleMenu() {
        if(!menuState) {
            document.body.style.overflowY = "hidden";
            document.documentElement.style.overflowY = "hidden";
        } else {
            document.body.style.overflowY = "auto";
            document.documentElement.style.overflowY = "auto";
        }
        setMenuState(!menuState);
    }
    return (
        <header>
            <img src={"/images/mobile-heritage.png"} alt="Heritage Academy Logo" />
            <svg onClick={toggleMenu} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" transform="matrix(-1, 0, 0, 1, 0, 0)"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 6H20M4 12H14M4 18H9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
            <section onClick={toggleMenu} className={`mobileLinks ${menuState ? "" : "hide"}`}>
                <ul className={`links ${menuState ? "" : "hide"}`}>
                    <svg onClick={toggleMenu} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" transform="matrix(-1, 0, 0, 1, 0, 0)"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 6H20M4 12H14M4 18H9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                    <li><NavLink onClick={toggleMenu} to="/" className={({ isActive }) => isActive ? "activeLink headLink" : "headLink"}>Home</NavLink></li>
                    <li><NavLink onClick={toggleMenu} to="/teams" className={({ isActive }) => isActive ? "activeLink headLink" : "headLink"}>Teams</NavLink></li>
                    <li><NavLink onClick={toggleMenu} to="/donate" className={({ isActive }) => isActive ? "activeLink headLink" : "headLink"}>Donate</NavLink></li>
                    <li><NavLink onClick={toggleMenu} to="/sponsors" className={({ isActive }) => isActive ? "activeLink headLink" : "headLink"}>Sponsors</NavLink></li>
                    <li><NavLink onClick={toggleMenu} to="/calender" className={({ isActive }) => isActive ? "activeLink headLink" : "headLink"}>Calender</NavLink></li>
                    <li><NavLink onClick={toggleMenu} to="/newsletter" className={({ isActive }) => isActive ? "activeLink headLink" : "headLink"}>Newsletter</NavLink></li>
                </ul>
            </section>
        </header>
    )
} 