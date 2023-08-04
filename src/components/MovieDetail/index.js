import { useParams } from "react-router";

import { useContext, useState, useEffect } from "react";

import { motion } from "framer-motion";

import { AppContext } from "../../providers/context";

import api from "../../api/movies";

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
                console.log(id);
                console.log(response.data);
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
            <section className="movie">
                <div className="movie__container">
                    {!isLoadingMovie && (
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
                                    {movie.genres.map((genre) => (
                                        <li className="movie__genre">
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
                </div>
            </section>
        </motion.div>
    );
};

export default MovieDetail;
