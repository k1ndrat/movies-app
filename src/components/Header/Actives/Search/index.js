import searchIcon from "./search.svg";

const Search = () => {
    return (
        <form
            className="header__search"
            onSubmit={(e) => {
                e.preventDefault();
                console.log("Search");
            }}
        >
            <div className="header__input-search-block">
                <input
                    className="header__input-search"
                    type="text"
                    name="search"
                    placeholder="Search..."
                    size={1}
                />
                <button className="header__submit-extra" type="submit">
                    <img src={searchIcon} alt="search-icon" />
                </button>
            </div>
            <button className="header__submit" type="submit">
                <img src={searchIcon} alt="search-icon" />
            </button>
        </form>
    );
};

export default Search;
