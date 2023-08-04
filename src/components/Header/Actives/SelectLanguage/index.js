import { useContext } from "react";
import { AppContext } from "../../../../providers/context";

import Select from "react-select";

import worldIcon from "./world.svg";

const SelectLanguage = ({ setPagee }) => {
    const { state, dispatch } = useContext(AppContext);
    const { language, languageList } = state;

    const onChange = (value) => {
        // const { value } = e.target;

        dispatch({
            type: "changeLanguage",
            language: value,
        });
    };

    const options = languageList.map((language) => ({
        value: language.iso_639_1,
        label: language.iso_639_1.toUpperCase(),
    }));

    options.sort((a, b) => a.label.localeCompare(b.label));

    return (
        <div className="header__lang">
            <img src={worldIcon} alt="world-icon" />
            <Select
                className="basic-single"
                classNamePrefix="select"
                defaultValue={{
                    value: language,
                    label: language.toUpperCase(),
                }}
                // isDisabled={true}
                // isLoading={true}
                // isClearable={true}
                // isRtl={true}
                isSearchable={true}
                size={2}
                name="language"
                options={options}
                noOptionsMessage={() => {
                    return <p>None</p>;
                }}
                onChange={(data) => {
                    localStorage.setItem("language", data.value);
                    window.location.reload();
                    // onChange(data.value);
                }}
                onInputChange={(inputValue) => {}}
            />
        </div>
    );
};

export default SelectLanguage;
