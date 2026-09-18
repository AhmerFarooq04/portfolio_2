"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface ImageObject {
  urls: {
    regular: string;
  };
  user: {
    name: string;
    profile: string;
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
      const response = await fetch("/api/space-image");

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
              onError={() => setHasError(true)}
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
                {hasError ? "Local fallback" : "via Unsplash:"}
              </span>{" "}
              {hasError ? "" : image?.created_at.split("T")[0]}
            </p>
            <p className="font-mono text-[0.6rem] text-end line-clamp-1 text-wrap text-zinc-300 dark:text-dark-4">
              {hasError ? "The Sword of Orion" : (
                <a href={`${image?.user.profile}?utm_source=ahmer_portfolio&utm_medium=referral`} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  Shot by {image?.user.name} on Unsplash
                </a>
              )}
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default Nasa;