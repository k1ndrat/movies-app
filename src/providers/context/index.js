import { createContext, useReducer } from "react";
import defaultContext from "./defaultContext";

const AppContext = createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case "changeLanguage":
            return {
                ...state,
                language: action.language,
            };
        case "changeLanguages":
            return {
                ...state,
                languageList: action.languages,
            };
        case "changePage":
            return {
                ...state,
                page: action.page,
            };

        case "reset":
            return defaultContext;

        default: {
            throw new Error("No action");
        }
    }
};

const AppContextProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, defaultContext);
    const value = { state, dispatch };
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export { AppContext, AppContextProvider };
