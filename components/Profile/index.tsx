import Image from "next/image";
import React from "react";
import MorphingText from "./morphing-text";
import Time from "./Time";
import { availableForWork } from "@/constants";
import ThemeToggler from "../theme/theme-toggler";

const Profile = () => {
  const texts = ["WebApps", "Backends", "ML Models", "Dashboards"];

  return (
    <div className="flex flex-col overflow-hidden size-full relative z-10 p-5 items-start justify-start gap-8 max-sm:h-[275px] max-sm:gap-4 dark:text-dark-4 text-white border border-dark-3 dark:border-0 rounded-xl dark:bg-[#FDFDFD]">
      <div className="w-full flex justify-between items-start">
        <div className="flex gap-3">
          <Image
            src={`/assets/pfp_1.jpg`}
            alt="profile"
            width={1024}
            height={1024}
            className="size-16 rounded-3xl opacity-90 dark:opacity-100 [box-shadow:2px_2px_85px_0px_#ffffff]/90 dark:[box-shadow:0px_0px_65px_45px_#ffffff40]"
          />
          <div className="">
            <p className="font-bold text-lg">Ahmer.</p>
            <p className="text-md font-mono dark:text-black/70 text-zinc-400/80">@mfarooq3</p>
          </div>
        </div>
        <ThemeToggler />
      </div>
      <div className="flex flex-col gap-1 overflow-hidden ">
        <div className="font-bold w-full flex items-center justify-start gap-1">
          <p className="inline text-lg whitespace-nowrap">I build </p>
          {" "}
          <div className="flex-shrink-0">
            <MorphingText texts={texts} />
          </div>
        </div>
        <div className="w-full">
          <p className="text-sm">
            Hey, I’m Ahmer! a developer/data analyst based in Edmonton - Canada.
          </p>
        </div>
      </div>
      <div className="absolute bottom-5 right-5 b">
        <div className="font-mono flex justify-end items-center gap-1 text-sm text-zinc-400 dark:text-black/70">
          <div
            className={`size-1.5 rounded-full ${availableForWork ? "bg-green" : "bg-red"
              } `}
          ></div>
          <p className="text-xs">Available for work</p>
        </div>
        <Time />
      </div>
      <div className="absolute bottom-5 left-5 max-sm:hidden">
        <div className="w-full">
          <p className="text-xs font-mono dark:text-black/70 text-zinc-400/70">
            &ldquo;Is Sisyphus <br /> happy yet?&quot;
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
