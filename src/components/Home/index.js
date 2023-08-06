import { motion } from "framer-motion";

import Slider from "./Slider";
import Trending from "./Trending";
import Popular from "./Popular";

const Home = () => {
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
            <Slider />
            <Trending />
            <Popular />
        </motion.div>
    );
};

export default Home;
