"use client";
import { motion } from "framer-motion";
import Counter from "../Counter/Counter";

interface ScoreBarProps {
    averageScore: number;
}

const ScoreBar: React.FC<ScoreBarProps> = ({ averageScore }) => {

    return (
        <div className="relative pb-12">
            <div className="w-full p-2 sm:h-12 h-8 rounded-full bg-gradient-to-r from-red-500 from-30% via-transparent to-70% to-green-500"></div>
            <motion.div
                className="absolute mt-2"
                initial={{
                    left: "50%"
                }}

                whileInView={{
                    left: String((averageScore + 1) / 2 * 100) + "%"
                }}

                viewport={{ once: true }}

                transition={{
                    duration: 1,
                    ease: "easeInOut",
                }}

            >
                <div className="flex flex-col items-center relative">
                    <svg className="p-1 h-8 w-8 absolute" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 320">
                        <path fill="currentColor" d="M182.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8H288c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z" />
                    </svg>
                    <div className="absolute mt-7">
                        <Counter from={0} to={averageScore} precission={2} />
                    </div>
                </div>

            </motion.div>

        </div>
    )

}

export default ScoreBar;