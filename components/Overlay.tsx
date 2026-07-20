"use client";

import { useTransform, motion, MotionValue } from "framer-motion";

const Section = ({
    text,
    subText,
    align = "center",
    start,
    end,
    scrollYProgress,
}: {
    text: string;
    subText?: string;
    align?: "left" | "center" | "right";
    start: number;
    end: number;
    scrollYProgress: MotionValue<number>;
}) => {
    const opacity = useTransform(
        scrollYProgress,
        [start - 0.05, start, end, end + 0.05],
        [0, 1, 1, 0]
    );

    const y = useTransform(
        scrollYProgress,
        [start - 0.05, end + 0.05],
        [50, -50]
    );

    const alignClass =
        align === "left"
            ? "items-start text-left"
            : align === "right"
                ? "items-end text-right"
                : "items-center text-center";

    return (
        <motion.div
            style={{ opacity, y }}
            className={`fixed top-0 left-0 w-full h-full pointer-events-none flex flex-col justify-center px-8 md:px-20 ${alignClass}`}
        >
            <h2 className="text-4xl md:text-7xl font-bold tracking-tighter text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
                {text}
            </h2>
            {subText && (
                <p className="text-lg md:text-2xl text-zinc-300 mt-4 font-light tracking-wide max-w-2xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                    {subText}
                </p>
            )}
        </motion.div>
    );
};

export default function Overlay({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
    return (
        <>
            <Section
                text="Mahesh Namdev Khandebharad"
                subText="Building Technology. Sharing Knowledge. Creating Impact."
                align="center"
                start={0.05}
                end={0.2}
                scrollYProgress={scrollYProgress}
            />
            <Section
                text="Technical Trainer & Student Leader"
                subText="President of T&P Student Cell, leading technical seminars and placement prep for 1000+ peers."
                align="left"
                start={0.3}
                end={0.45}
                scrollYProgress={scrollYProgress}
            />
            <Section
                text="Linux & DevOps Enthusiast"
                subText="Red Hat Certified System Administrator (RHCSA), building cloud architectures and automated pipelines."
                align="right"
                start={0.6}
                end={0.75}
                scrollYProgress={scrollYProgress}
            />
        </>
    );
}
