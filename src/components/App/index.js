import { Route, Routes, useLocation, useSearchParams } from "react-router-dom";

import { AnimatePresence, motion } from "framer-motion";

import { useContext, useState, useEffect } from "react";
import { AppContext } from "../../providers/context";

import api from "../../api/movies";

import Header from "../Header";
import Home from "../Home";
import Movies from "../Movies";
import Shows from "../Shows";
import UpBtn from "../UpBtn";
import MovieDetail from "../MovieDetail";

// import bg from "./seamless-gc155f437a_640.jpg";
import bg from "./02.jpg";
// import bg from "./03.jpg";

function App() {
    const { state, dispatch } = useContext(AppContext);
    const { language, languageList } = state;

    const [languages, setLanguages] = useState([]);
    const [error, setError] = useState("");
    const [isLoadingLanguage, setIsLoadingLanguage] = useState([]);

    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const fetchLanguages = async () => {
            try {
                setIsLoadingLanguage(true);

                const response = await api.get(`configuration/languages`);

                setLanguages(response.data);

                dispatch({
                    type: "changeLanguages",
                    languages: response.data,
                });

                console.log(response.data);
                setError("");
            } catch (error) {
                setError(error);
                console.log(error);
            } finally {
                setIsLoadingLanguage(false);
            }
        };

        fetchLanguages();

        // if (searchParams.get("language")) {
        //     dispatch({
        //         type: "changeLanguage",
        //         language: searchParams.get("language"),
        //     });
        // }
    }, [setLanguages]);

    const style = {
        backgroundImage: `url(${bg})`,
        backgroundRepeat: "repeat",
        backgroundSize: "5%",
        backgroundAttachment: "fixed",
        width: "100%",
    };

    const location = useLocation();
    return (
        <div className="App" style={{}}>
            <Header />

            <main className="main">
                <AnimatePresence mode="wait" initial={false}>
                    <Routes location={location} key={location.pathname}>
                        <Route path="/" element={<Home />} />
                        <Route path="/movie" element={<Movies />} />
                        <Route path="/movie/:id" element={<MovieDetail />} />
                        <Route path="/tv" element={<Shows />} />
                    </Routes>
                </AnimatePresence>
            </main>

            <UpBtn></UpBtn>
        </div>
    );
}

export default App;
