import { useRef, useEffect, useCallback } from "react";

import Actives from "./Actives";
import NavBar from "./NavBar";
import Logo from "./Logo";

import { FaBars, FaTimes } from "react-icons/fa";

const Header = () => {
    const navRef = useRef();
    const headerRef = useRef();

    const showNavBar = (action = "toggle") => {
        action === "close"
            ? navRef.current.classList.remove("_open")
            : navRef.current.classList.toggle("_open");
    };

    const handleScroll = useCallback(() => {
        const { scrollTop, clientHeight, scrollHeight } =
            document.documentElement;

        if (scrollTop === 0) {
            headerRef.current.classList.remove("_scroll");
        } else {
            headerRef.current.classList.add("_scroll");
        }
        // console.log(scrollTop, clientHeight, scrollHeight);
    }, []);

    useEffect(() => {
        // Attach scroll event listener to window
        window.addEventListener("scroll", handleScroll);
        return () => {
            // Cleanup: remove the scroll event listener when component is unmounted
            window.removeEventListener("scroll", handleScroll);
        };
    }, [handleScroll]);

    return (
        <header className="header" ref={headerRef}>
            <div className="header__container">
                <Logo />
                <NavBar navRef={navRef} showNavBar={showNavBar} />
                <Actives />
                <button className="header__menu-btn" onClick={showNavBar}>
                    <FaBars />
                </button>
                <button className="header__menu-close-btn" onClick={showNavBar}>
                    <FaTimes />
                </button>
            </div>
        </header>
    );
};

export default Header;
