import React from "react";
import { BentoCard, BentoGrid } from "../magicui/bento-grid";
import Profile from "../Profile";
import Techstack from "../TechStack";
import Links from "../Links";
import Projects from "../Projects";
import Labs from "../Labs";
import Spam from "../Spam";
import Link from "next/link";
import Footer from "../Footer";

const features = [
  {
    initial: { opacity: 0, y: -50 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1 },
    className:
      "sm:col-start-3 sm:col-end-7 sm:row-start-1 sm:row-end-3 z-10 max-sm:h-max dark:p-1 p-0.5 !border-dark-3/70 dark:!border-0 dark:bg-white/30",
    background: <Profile />,
  },
  {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 1 },
    className:
      "sm:col-start-1 sm:col-end-3 sm:row-start-1 sm:row-end-6 z-[8] max-sm:h-max relative !border-dark-3 dark:!border-0 [box-shadow:0_0px_60px_-25px_#ffffff1f_inset] dark:[box-shadow:0px_0px_40px_5px_#c6c6c635_inset] dark:p-1 p-0.5 dark:bg-white/30",
    background: <Techstack />,
  },
  {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1 },
    className:
      "sm:col-start-3 sm:col-end-7 sm:row-start-3 sm:row-end-6 border-none dark:bg-transparent [box-shadow:0_0px_0px_-0px_#ffffff1f_inset] dark:[box-shadow:0_0px_0px_-0px_#ffffff1f_inset] z-[9] bg-transparent max-sm:h-max",
    background: <Spam />,
  },
  {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 1 },
    className:
      " row-start-2 sm:col-start-7 sm:col-end-9 sm:row-start-1 sm:row-end-2 w-full sm:h-max sm:mt-auto sm:mr-auto border-none bg-transparent   [box-shadow:0_0px_0px_-0px_#ffffff1f_inset] dark:[box-shadow:0_0px_0px_-0px_#ffffff1f_inset] z-[7] max-sm:h-max dark:bg-transparent",
    background: <Links />,
  },
  {
    initial: { scale: 1, opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    transition: { opacity: { duration: 1 }, x: { duration: 1 } },
    whileHover: { scale: 0.95, transition: { duration: 0.15 } },
    className:
      "row-start-4 sm:col-start-7 sm:col-end-9 sm:row-start-2 sm:row-end-4 p-0 bg-purple-600 dark:bg-purple-600 border-none relative hover:scale-125 z-[8] max-sm:h-max mx-auto overflow-hidden",
    background: (
      <Link href="/projects">
        <Projects />
      </Link>
    ),
  },
  {
    initial: { scale: 1, opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    transition: { opacity: { duration: 1 }, x: { duration: 1 } },
    whileHover: { scale: 0.95, transition: { duration: 0.15 } },
    className:
      "row-start-5 sm:col-start-7 sm:col-end-9 sm:row-start-4 sm:row-end-6 p-0 bg-technoGreen-600 dark:bg-technoGreen-600 border-none relative hover:scale-125 z-[8] max-sm:h-max mx-auto overflow-hidden",
    background: (
      <Link href="/labs">
        <Labs />
      </Link>
    ),
  },
];

const Grid = () => {
  return (
    <div className="flex items-center justify-center max-sm:flex-col sm:flex-row bg-transparent">
      <BentoGrid className="grid-cols-1 sm:grid-cols-8 sm:grid-rows-5 p-5 max-sm:p-4 sm:h-[770px] relative w-full max-sm:gap-3 max-sm:min-h-screen">
        {features.map((feature, idx) => (
          <BentoCard key={idx} {...feature} />
        ))}
      </BentoGrid>
      <div className="sm:hidden w-full">
        <Footer />
      </div>
    </div>
  );
};

export default Grid;
