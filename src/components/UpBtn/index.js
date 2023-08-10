import { useEffect, useRef } from "react";
import { FaArrowUp } from "react-icons/fa";

const UpBtn = () => {
    const btnRef = useRef();

    const handleScroll = () => {
        const { scrollTop, clientHeight, scrollHeight } =
            document.documentElement;

        console.log(scrollTop, clientHeight, scrollHeight);

        if (scrollTop >= 1200) {
            btnRef.current.classList.add("_show");
        } else {
            btnRef.current.classList.remove("_show");
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div
            ref={btnRef}
            className="up-btn"
            onClick={() => {
                // console.log(window.pageYOffset);
                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: "smooth",
                });
            }}
        >
            <FaArrowUp />
        </div>
    );
};

export default UpBtn;
