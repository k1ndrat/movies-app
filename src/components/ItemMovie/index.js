// import api from "../../api/movies";
// import { AppContext } from "../../providers/context";
import { useState } from "react";

import { Link } from "react-router-dom";

import errorImg from "./error.jpg";

const ItemMovie = ({ movie, type }) => {
    const [isLoadingImg, setIsLoadingImg] = useState(false);
    const [imageError, setImageError] = useState(false);

    const onLoad = () => {
        setIsLoadingImg(true);
    };

    const onError = () => {
        setImageError(true);
    };

    const style = {
        opacity: isLoadingImg ? 1 : 0,
        transition: "all 0.5s ease",
        filter: isLoadingImg ? "blur(0px)" : "blur(5px)",
    };

    if (movie.original_language === "ru") {
        style.opacity = 0.1;
    }

    return (
        <>
            <li className="main__item item-movie" style={style}>
                <Link
                    to={`/${movie.media_type || type}/${movie.id}`}
                    className="item-movie__img-link"
                >
                    <img
                        src={
                            !imageError
                                ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                                : errorImg
                        }
                        alt={movie.title}
                        // onLoad={imageLoaded}
                        onLoad={onLoad}
                        onError={onError}
                    />
                </Link>
                <div className="item-movie__body">
                    <div className="item-movie__title-date">
                        <Link
                            to={`/${movie.media_type || type}/${movie.id}`}
                            className="item-movie__title-link"
                        >
                            {movie.title || movie.name}
                        </Link>
                        <p>{movie.vote_average}</p>
                    </div>
                    <div className="item-movie__duration-rate">
                        <p className="item-movie__date">
                            {movie.release_date || movie.first_air_date}
                        </p>
                    </div>
                </div>
            </li>
        </>
    );
};

export default ItemMovie;
