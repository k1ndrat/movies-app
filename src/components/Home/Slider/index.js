import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectFade, Pagination } from "swiper/modules";

// import { SwiperNavPrev, SwiperNavNext } from "./SwiperNavButtons";
import SlideContent from "./SlideContent";

import api from "../../../api/movies";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import { AppContext } from "../../../providers/context";

import { useState, useEffect, useContext } from "react";
import Loader from "../../Loader";

const Slider = () => {
    const [movies, setMovies] = useState([]);
    const [isLoadingMovies, setIsLoadingMovies] = useState(true);
    const [error, setError] = useState("");

    const { language } = useContext(AppContext).state;

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                setIsLoadingMovies(true);

                const response = await api.get(
                    `movie/now_playing?language=${language}&region=ua`
                );

                if (response.data.results.length > 0) {
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
    }, [language]);

    return (
        <section className="slider">
            <div className="slider__container">
                {!isLoadingMovies && !error && (
                    <Swiper
                        modules={[Navigation, Autoplay, EffectFade, Pagination]}
                        spaceBetween={0}
                        slidesPerView={1}
                        loop={true}
                        autoplay={{
                            delay: 10000,
                            disableOnInteraction: false,
                        }}
                        pagination={{ clickable: true }}
                        effect={"fade"}
                        // onSlideChange={() => console.log("slide change")}
                        // onSwiper={(swiper) => console.log(swiper)}
                    >
                        {movies.map((movie, index) => (
                            <SwiperSlide key={index}>
                                <SlideContent movie={movie} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
                {isLoadingMovies && <Loader isFullScreen={true} />}
                {error && <div> {error.message}</div>}
            </div>
        </section>
    );
};

export default Slider;
