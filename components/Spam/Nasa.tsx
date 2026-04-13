"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface ImageObject {
  urls: {
    regular: string;
  };
  user: {
    name: string;
  };
  created_at: string;
  alt_description: string;
}

const Nasa = () => {
  const [image, setImage] = useState<ImageObject | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const fetchImage = async () => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;

      if (!apiKey) {
        setHasError(true);
        setIsLoading(false);
        return;
      }

      // 1. Added 'dark-purple-aesthetic' and 'nebula' for better results
      // 2. Added '&color=purple' to the URL to force the color palette
      const response = await fetch(
        `https://api.unsplash.com/photos/random?query=dark-purple-aesthetic,nebula,night-sky&color=purple&client_id=${apiKey}`,
        { method: "GET" }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch");
      }

      const data = await response.json();
      setImage(data);
    } catch (error) {
      console.error("Error fetching purple aesthetic:", error);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchImage();
  }, []);

  return (
    <>
      <div className="sm:col-start-4 sm:col-end-6 sm:row-start-1 sm:row-end-4 relative border border-zinc-700/20 rounded-3xl max-sm:h-[400px]">
        {isLoading ? (
          <div className="absolute p-2 size-full rounded-3xl flex items-center justify-center">
            {/* Added a subtle purple text-glow for the loader to match the theme */}
            <p className="font-mono text-center text-purple-1/80 animate-pulse">
              Fetching Purple...
            </p>
          </div>
        ) : (
          (image || hasError) && (
            <Image
              src={hasError ? "/assets/orion.jpg" : image?.urls.regular || ""}
              alt={image?.alt_description || "Purple Aesthetic Image"}
              width={1024}
              height={1024}
              unoptimized
              className="object-cover size-full rounded-3xl shadow-[0_0_20px_rgba(168,85,247,0.05)]"
            />
          )
        )}
      </div>

      <div className="sm:col-start-4 sm:col-end-6 sm:row-start-4 sm:row-end-5">
        {(image || hasError) && (
          <div className="p-0 flex flex-col justify-start h-full px-1 items-end overflow-hidden">
            <p className="font-mono text-xs line-clamp-1 text-zinc-200 dark:text-dark-4">
              <span className="text-[#dbbaf8]">
                via Unsplash:
              </span>{" "}
              {hasError ? "2026-04-12" : image?.created_at.split("T")[0]}
            </p>
            <p className="font-mono text-[0.6rem] text-end line-clamp-1 text-wrap text-zinc-300 dark:text-dark-4">
              {hasError ? "The Sword of Orion" : `Shot by ${image?.user.name}`}
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default Nasa;