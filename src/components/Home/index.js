import { motion } from "framer-motion";

import Slider from "./Slider";
import Trending from "./Trending";
import Popular from "./Popular";

const Home = () => {
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
            <Slider />
            <Trending />
            <Popular />
        </motion.div>
    );
};

export default Home;
