import { useSwiper } from "swiper/react";

const SwiperNavPrev = () => {
    const swiper = useSwiper();

    return <button onClick={() => swiper.slidePrev()}>Prev</button>;
};
const SwiperNavNext = () => {
    const swiper = useSwiper();

    return <button onClick={() => swiper.slideNext()}>Next</button>;
};

export { SwiperNavPrev, SwiperNavNext };
