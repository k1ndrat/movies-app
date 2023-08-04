import ItemMovie from "../ItemMovie";
import Filter from "../Filter";
import Loader from "../Loader";

import api from "../../api/movies";

import { motion } from "framer-motion";

import { useSearchParams } from "react-router-dom";

import { AppContext } from "../../providers/context";
import { useRef, useState, useEffect, useContext, useCallback } from "react";

const Movies = () => {
    // url-params
    let [searchParams, setSearchParams] = useSearchParams();

    const pageCount = useRef(0);

    const { language } = useContext(AppContext).state;
    const { dispatch } = useContext(AppContext);

    const [pagee, setPagee] = useState(1);
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState("");

    // loadings
    const [isLoadingMovies, setIsLoadingMovies] = useState(true);

    // sorting & filtering
    const [sort, setSort] = useState(
        searchParams.get("sort_by") || "popularity.desc"
    );
    const [genres, setGenres] = useState(
        searchParams.get("with_genres")?.split("%2C") || []
    );
    const [voteCount, setVoteCount] = useState({
        lte: searchParams.get("vote_count.lte") || null,
        gte: searchParams.get("vote_count.gte") || null,
    });
    const [runtime, setRuntime] = useState({
        lte: searchParams.get("with_runtime.lte") || null,
        gte: searchParams.get("with_runtime.gte") || null,
    });
    const [userScore, setUserScore] = useState({
        lte: searchParams.get("vote_average.lte") || null,
        gte: searchParams.get("vote_average.gte") || null,
    });

    useEffect(() => {
        const createQuery = () => {
            // const currentDate = new Date().toISOString().split("T")[0]; // Get the current date in the format YYYY-MM-DD
            const urlQuery =
                (genres.length ? `&with_genres=${genres.join(",")}` : "") +
                (sort ? `&sort_by=${sort}` : "") +
                (voteCount.lte ? `&vote_count.lte=${voteCount.lte}` : "") +
                (voteCount.gte ? `&vote_count.gte=${voteCount.gte}` : "") +
                (runtime.lte ? `&with_runtime.lte=${runtime.lte}` : "") +
                (runtime.gte ? `&with_runtime.gte=${runtime.gte}` : "") +
                (userScore.lte ? `&vote_average.lte=${userScore.lte}` : "") +
                (userScore.gte ? `&vote_average.gte=${userScore.gte}` : "");
            const query =
                "?language=" +
                language +
                (pagee ? `&page=${pagee}` : "") +
                `&region=ua` +
                urlQuery;
            // (currentDate
            //     ? `&primary_release_date.lte=${currentDate}`
            //     : "") +

            // console.log(query);

            return { query, urlQuery };
        };

        const fetchMovies = async () => {
            try {
                setIsLoadingMovies(true);
                if (pagee === 0) {
                    window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                    });
                    setPagee(1);
                    return;
                }

                const { query, urlQuery } = createQuery();
                const response = await api.get(`discover/movie${query}`);

                setSearchParams(urlQuery);

                if (response.data.results.length > 0) {
                    if (pagee === 1) {
                        setMovies(response.data.results);
                        pageCount.current = response.data.total_pages;
                        // console.log(pageCount.current);
                    } else {
                        setMovies((prevMovies) => [
                            ...prevMovies,
                            ...response.data.results,
                        ]);
                    }

                    setError("");
                } else {
                    if (pagee === 1) {
                        throw new Error("No movies found");
                    }
                }
            } catch (error) {
                setError(error);
            } finally {
                setIsLoadingMovies(false);
            }
        };

        fetchMovies();
    }, [
        pagee,
        sort,
        genres,
        voteCount,
        runtime,
        userScore,
        setPagee,
        setMovies,
        setIsLoadingMovies,
    ]);

    const handleScroll = useCallback(() => {
        if (isLoadingMovies || pagee >= pageCount.current || pagee === 0)
            return;

        const { scrollTop, clientHeight, scrollHeight } =
            document.documentElement;
        if (
            scrollHeight - scrollTop <= clientHeight + 150 &&
            !isLoadingMovies
        ) {
            setPagee(+pagee + 1);
        }
    }, [isLoadingMovies, pagee, pageCount]);

    useEffect(() => {
        // Attach scroll event listener to window
        window.addEventListener("scroll", handleScroll);
        return () => {
            // Cleanup: remove the scroll event listener when component is unmounted
            window.removeEventListener("scroll", handleScroll);
        };
    }, [isLoadingMovies, handleScroll]);

    return (
        <motion.div
            initial={{
                opacity: 0,
                transform: "translateX(-200px)",
            }}
            animate={{
                opacity: 1,
                transform: "translateX(0)",
            }}
            exit={{
                opacity: 0,
                transform: "translateX(200px)",
            }}
            // transition={{ duration: 0.5 }}
        >
            <div className="main__container">
                <Filter
                    sort={sort}
                    setSort={setSort}
                    setPagee={setPagee}
                    setMovies={setMovies}
                    genres={genres}
                    setGenres={setGenres}
                    voteCount={voteCount}
                    setVoteCount={setVoteCount}
                    runtime={runtime}
                    setRuntime={setRuntime}
                    setUserScore={setUserScore}
                    type={"movie"}
                />

                <div className="main__movies">
                    {error && (
                        <div className="error-message">{error.message}</div>
                    )}
                    {!error && (
                        <ul className={"main__list"}>
                            {movies.map((movie, index) => (
                                <ItemMovie
                                    key={index}
                                    movie={movie}
                                    type={"movie"}
                                />
                            ))}
                        </ul>
                    )}
                    {!error && isLoadingMovies && <Loader />}
                </div>
            </div>
        </motion.div>
    );
};

export default Movies;
