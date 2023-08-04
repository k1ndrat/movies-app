const Loader = ({ isFullScreen }) => {
    const style = { height: "100vh" };
    return (
        <div className="main__loader-wrap" style={isFullScreen && style}>
            <div className="main__loader"></div>
            <div className="main__loader loader-inner"></div>
        </div>
    );
};

export default Loader;
