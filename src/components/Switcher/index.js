import { useEffect, useRef } from "react";

const Switcher = ({ values, setValue, defaultValue }) => {
    const bg = useRef();
    const switcher = useRef();

    useEffect(() => {
        const defaultElem = switcher.current.querySelector(
            `[data-value='${defaultValue.value}']`
        );

        const leftPos =
            defaultElem.getBoundingClientRect().x -
            switcher.current.getBoundingClientRect().x;
        const width = defaultElem.clientWidth;
        bg.current.style.width = width + "px";
        bg.current.style.left = leftPos + "px";
    }, []);

    const onClick = (e, value) => {
        // bg position & size
        const elem = e.target.closest(".switcher__element");
        const leftPos =
            elem.getBoundingClientRect().x -
            switcher.current.getBoundingClientRect().x;
        const width = elem.clientWidth;
        bg.current.style.width = width + "px";
        bg.current.style.left = leftPos + "px";

        // toggle classlist
        const children = Array.from(switcher.current.childNodes);
        children.forEach((child) => {
            child.classList.remove("_selected");
        });
        elem.classList.add("_selected");

        setValue(value);
    };

    return (
        <div className="switcher" ref={switcher}>
            {values.map((el, index) => (
                <div
                    className="switcher__element"
                    key={index}
                    onClick={(e) => onClick(e, el.value)}
                    data-value={el.value}
                >
                    <p className="switcher__title">{el.title}</p>
                </div>
            ))}

            <div className="switcher__bg" ref={bg}></div>
        </div>
    );
};

export default Switcher;
