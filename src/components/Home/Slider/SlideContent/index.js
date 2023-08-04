import icon from "./tmdb.svg";
import { Link } from "react-router-dom";

const SlideContent = ({ movie }) => {
    const StyleBG = {
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
    };
    return (
        <div className="slide__content" style={StyleBG}>
            <div className="slide__container">
                <div className="slide__poster">
                    <img
                        src={`https://image.tmdb.org/t/p/w400/${movie.poster_path}`}
                        alt={movie.title}
                    />
                </div>
                <div className="slide__body body-slide">
                    <div className="body-slide__rating">
                        <img src={icon} alt={"tmdb-logo"} width={"50px"} />
                        {movie.vote_average}
                    </div>
                    <h3 className="body-slide__title">{movie.title}</h3>
                    <p className="body-slide__description">{movie.overview}</p>
                    <div className="body-slide__btns">
                        <Link
                            to={`/movie/${movie.id}`}
                            className="body-slide__btn btn"
                        >
                            Details
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SlideContent;
