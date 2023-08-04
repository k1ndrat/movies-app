import ItemMovie from "../ItemMovie";
import Filter from "../Filter";
import Loader from "../Loader";

import { motion } from "framer-motion";

import api from "../../api/movies";

import { AppContext } from "../../providers/context";
import { useRef, useState, useEffect, useContext, useCallback } from "react";

const Movies = () => {
    const pageCount = useRef(0);

    const { language } = useContext(AppContext).state;

    const [pagee, setPagee] = useState(1);
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState("");

    // loadings
    const [isLoadingMovies, setIsLoadingMovies] = useState(true);

    // sorting & filtering
    const [sort, setSort] = useState("popularity.desc");
    const [genres, setGenres] = useState([]);
    const [voteCount, setVoteCount] = useState({
        lte: null,
        gte: null,
    });
    const [runtime, setRuntime] = useState({
        lte: null,
        gte: null,
    });
    const [userScore, setUserScore] = useState({
        lte: null,
        gte: null,
    });

    useEffect(() => {
        const createQuery = () => {
            const query =
                "?language=" +
                language +
                (pagee ? `&page=${pagee}` : "") +
                `&watch_region=ua` +
                (genres.length ? `&with_genres=${genres.join(",")}` : "") +
                (sort ? `&sort_by=${sort}` : "") +
                (voteCount.lte ? `&vote_count.lte=${voteCount.lte}` : "") +
                (voteCount.gte ? `&vote_count.gte=${voteCount.gte}` : "") +
                (runtime.lte ? `&with_runtime.lte=${runtime.lte}` : "") +
                (runtime.gte ? `&with_runtime.gte=${runtime.gte}` : "") +
                (userScore.lte ? `&vote_average.lte=${userScore.lte}` : "") +
                (userScore.gte ? `&vote_average.gte=${userScore.gte}` : "");

            console.log(query);

            return query;
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

                const response = await api.get(`discover/tv${createQuery()}`);

                if (response.data.results.length > 0) {
                    pagee === 1
                        ? setMovies(response.data.results)
                        : setMovies((prevMovies) => [
                              ...prevMovies,
                              ...response.data.results,
                          ]);

                    pageCount.current = response.data.total_pages;
                    setError("");
                    console.log(pageCount.current);
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
        setPagee,
        setMovies,
        setIsLoadingMovies,
        sort,
        genres,
        language,
        voteCount,
        runtime,
        userScore,
    ]);

    const handleScroll = useCallback(() => {
        if (isLoadingMovies || pagee >= pageCount.current || pagee === 0)
            return;

        const { scrollTop, clientHeight, scrollHeight } =
            document.documentElement;
        if (
            scrollHeight - scrollTop <= clientHeight + 120 &&
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
                transform: "translateX(0px)",
            }}
            exit={{
                opacity: 0,
                transform: "translateX(200px)",
            }}
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
                    type={"tv"}
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
                                    type={"tv"}
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
