const UpBtn = () => {
    return (
        <div
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
            UpBtn
        </div>
    );
};

export default UpBtn;
