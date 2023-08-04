import { Link } from "react-router-dom";

import { AppContext } from "../../../providers/context";
import { useContext } from "react";

const NavBar = ({ navRef, showNavBar }) => {
    const { language } = useContext(AppContext).state;

    const closeNavBar = () => {
        showNavBar("close");
    };

    return (
        <nav className="header__menu" ref={navRef}>
            <div className="header__menu-link" onClick={closeNavBar}>
                <Link to="/">{language === "uk" ? "Головна" : "Home"}</Link>
            </div>
            <div className="header__menu-link" onClick={closeNavBar}>
                <Link to="/movie">
                    {language === "uk" ? "Фільми" : "Movies"}
                </Link>
            </div>
            <div className="header__menu-link" onClick={closeNavBar}>
                <Link to="/tv">
                    {language === "uk" ? "Серіали" : "TV Shows"}
                </Link>
            </div>
        </nav>
    );
};

export default NavBar;
