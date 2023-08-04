import React from "react";

import Button from "../../Button";
import Search from "./Search";
import SelectLanguage from "./SelectLanguage";

const Actives = () => {
    return (
        <div className="header__actives">
            <Search />
            <SelectLanguage />
            {/* <Button /> */}
        </div>
    );
};

export default Actives;
