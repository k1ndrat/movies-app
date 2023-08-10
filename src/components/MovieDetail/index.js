import { useParams } from "react-router";

import { useContext, useState, useEffect } from "react";

import { motion } from "framer-motion";

import { AppContext } from "../../providers/context";

import api from "../../api/movies";

import Loader from "../Loader";

const MovieDetail = () => {
    const { id } = useParams();

    const [movie, setMovie] = useState({});
    const [isLoadingMovie, setIsLoadingMovie] = useState(true);
    const [error, setError] = useState("");

    const { language } = useContext(AppContext).state;

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                setIsLoadingMovie(true);

                const response = await api.get(
                    `/movie/${id}?language=${language}`
                );

                if (response.data) {
                    setMovie(response.data);
                    setError("");
                } else {
                    throw new Error("Movie not found");
                }
            } catch (error) {
                setError(error);
            } finally {
                setIsLoadingMovie(false);
            }
        };

        fetchMovie();
    }, [language, id]);
    return (
        <motion.div
            initial={{
                opacity: 0,
                x: -200,
            }}
            animate={{
                opacity: 1,
                x: 0,
            }}
            exit={{
                opacity: 0,
                x: 200,
            }}
            transition={{
                type: "tween",
            }}
        >
            <section className="movie">
                <div className="movie__container">
                    {!error && !isLoadingMovie && (
                        <div className="movie__item">
                            <div className="movie__poster">
                                <img
                                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                                    alt={movie.title}
                                />
                            </div>

                            <div className="movie__content">
                                <h2 className="movie__title title">
                                    <span>{movie.title}</span> (
                                    {movie.release_date})
                                </h2>

                                <ul className="movie__genres">
                                    {movie.genres.map((genre, index) => (
                                        <li
                                            className="movie__genre"
                                            key={index}
                                        >
                                            {genre.name}
                                        </li>
                                    ))}
                                </ul>

                                <p className="movie__tagline">
                                    {movie.tagline}
                                </p>
                                <div className="movie__description">
                                    <h3>Опис</h3>
                                    <p>{movie.overview}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {error && <div>{error.message}</div>}
                    {isLoadingMovie && <Loader />}
                </div>
            </section>
        </motion.div>
    );
};

export default MovieDetail;
