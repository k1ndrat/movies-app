import { Link } from "react-router-dom";

import LogoIcon from "./logo.svg";

const Logo = () => {
    return (
        <Link to="/" className="header__logo">
            <img src={LogoIcon} alt="logo-icon" />
            <span>Filmagnet</span>
            {/* <span>SwordFilms</span> */}
            {/* <span>i love kaneli</span> */}
        </Link>
    );
};

export default Logo;
