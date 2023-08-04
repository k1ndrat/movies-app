const defaultContext = {
    // language: "uk-UA",
    language: localStorage.getItem("language") || "uk",
    // languageList: ["EN", "uk-UA"],
    languageList: [],
    page: 1,
};

export default defaultContext;
