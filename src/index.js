import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./components/App";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { AppContextProvider } from "./providers/context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    // <React.StrictMode>
    <AppContextProvider>
        <Router>
            <Routes>
                <Route path="/*" element={<App />} />
            </Routes>
        </Router>
    </AppContextProvider>
    // </React.StrictMode>
);
