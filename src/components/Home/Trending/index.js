import api from "../../../api/movies";

import { AppContext } from "../../../providers/context";

import { useState, useEffect, useContext } from "react";
import Loader from "../../Loader";
import Switcher from "../../Switcher";
import ItemMovie from "../../ItemMovie";

const Trending = () => {
    const [movies, setMovies] = useState([]);
    const [isLoadingMovies, setIsLoadingMovies] = useState(true);
    const [error, setError] = useState("");
    const [period, setPeriod] = useState("day");

    const { language } = useContext(AppContext).state;

    const values = [
        { value: "day", title: "Today" },
        { value: "week", title: "This Week" },
    ];
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                setIsLoadingMovies(true);

                const response = await api.get(
                    `trending/all/${period}?language=${language}&region=ua`
                );

                if (response.data.results.length > 0) {
                    console.log(response.data.results);
                    setMovies(response.data.results);
                    setError("");
                } else {
                    throw new Error("No movies found");
                }
            } catch (error) {
                setError(error);
            } finally {
                setIsLoadingMovies(false);
            }
        };

        fetchMovies();
    }, [period, language]);

    return (
        <section className="trending">
            <div className="trending__container">
                <div className="trending__header">
                    <h2 className="trending__title title">Trending</h2>
                    <Switcher
                        values={values}
                        setValue={setPeriod}
                        defaultValue={values[0]}
                    />
                </div>
                <div className="trending__movies">
                    {!isLoadingMovies &&
                        !error &&
                        movies.map((movie) => <ItemMovie movie={movie} />)}
                    {isLoadingMovies && <Loader />}
                    {error && !isLoadingMovies && <div> {error.message}</div>}
                </div>
            </div>
        </section>
    );
};

export default Trending;
