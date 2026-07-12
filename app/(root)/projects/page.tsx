"use client";
import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function ProjectDisplay() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  const router = useRouter();

  const navigate = () => {
    router.push("/"); // Replace '/your-page' with the route you want to navigate to
  };

  return (
    <div className="w-full  relative z-50 ">
      <Button
        onClick={() => navigate()}
        className="mx-3 bg-white dark:bg-white hover:bg-white/70"
      >
        <ArrowLeft className="text-zinc-700 dark:text-dark-1 " />
      </Button>
      {/* <h2 className="pl-4 mx-auto text-xl md:text-5xl font-bold dark:text-neutral-800 text-neutral-200 font-sans">
        Take a look at my Work
      </h2> */}
      <Carousel items={cards} />
    </div>
  );
}

const data = [

  {
    category: "Web3 wallet",
    title: "Pandora",
    src: "/assets/pandora.png",
    link: "https://pandorasvault.zzzzshawn.cloud/",
    github: "https://github.com/zzzzshawn/Pandora",
    tags: ["Nextjs", "Framer-Motion", "Tailwindcss", "Shadcn", '@Solana/web3.js', "Ethers"],
    content: <></>,
  },
];
