"use client";
import React, {
  useEffect,
  useRef,
  useState,
  createContext,
  useId,
} from "react";
import { IconArrowNarrowLeft, IconArrowNarrowRight } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Image, { ImageProps } from "next/image";
import Link from "next/link";
import { ArrowTopRightIcon, GitHubLogoIcon } from "@radix-ui/react-icons";
import { X } from "lucide-react";

interface CarouselProps {
  items: React.ReactElement[];
  initialScroll?: number;
}

type Card = {
  src: ImageProps["src"];
  title: string;
  category: string;
  link?: string;
  github?: string;
  tags?: string[];
  description: string;
  details: { title: string; text: string }[];
};

export const CarouselContext = createContext<{
  onCardClose: (index: number) => void;
  currentIndex: number;
}>({
  onCardClose: () => { },
  currentIndex: 0,
});

export const Carousel = ({ items, initialScroll = 0 }: CarouselProps) => {
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const checkScrollability = React.useCallback(() => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  }, []);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
  }, [initialScroll, checkScrollability]);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const handleCardClose = (index: number) => {
    if (carouselRef.current) {
      const cardWidth = isMobile() ? 230 : 384; // (md:w-96)
      const gap = isMobile() ? 4 : 8;
      const scrollPosition = (cardWidth + gap) * (index + 1);
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  const isMobile = () => {
    return window && window.innerWidth < 768;
  };

  return (
    <CarouselContext.Provider
      value={{ onCardClose: handleCardClose, currentIndex }}
    >
      <div className="relative w-full ">
        <div
          className="flex w-full overflow-x-scroll overscroll-x-auto md:py-5 scroll-smooth [scrollbar-width:none "
          ref={carouselRef}
          onScroll={checkScrollability}
        >
          <div
            className={cn(
              "absolute right-0  z-[1000] h-auto  w-[5%] overflow-hidden bg-gradient-to-l"
            )}
          ></div>

          <div
            className={cn(
              "flex flex-row justify-start gap-7 pl-4 my-3",
              "max-w-7xl mx-auto" // remove max-w-4xl if you want the carousel to span the full width of its container
            )}
          >
            {items.map((item, index) => (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    delay: 0.2 * index,
                    ease: "easeOut",
                  },
                }}
                key={"card" + index}
                className="last:pr-[5%] md:last:pr-[33%] rounded-3xl"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
        <div className="flex justify-end gap-2  absolute -top-8 max-md:-top-10 right-3 ">
          <button
            className="relative z-0 h-10 w-10 rounded-full bg-gray-100  dark:bg-white flex items-center justify-center disabled:opacity-50 max-sm:size-10"
            onClick={scrollLeft}
            disabled={!canScrollLeft}
          >
            <IconArrowNarrowLeft className="h-6 w-6 text-gray-500 dark:text-dark-1" />
          </button>
          <button
            className="relative z-40 h-10 w-10 rounded-full bg-gray-100 dark:bg-white dark:text-white flex items-center justify-center disabled:opacity-50 max-sm:size-10"
            onClick={scrollRight}
            disabled={!canScrollRight}
          >
            <IconArrowNarrowRight className="h-6 w-6 text-gray-500 dark:text-dark-1" />
          </button>
        </div>
      </div>
    </CarouselContext.Provider>
  );
};

export const Card = ({
  card,
  index,
  layout = false,
}: {
  card: Card;
  index: number;
  layout?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    dialog?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog?.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <>
      <motion.button
        type="button"
        layoutId={layout ? `card-${index}-${card.title}` : undefined}
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-label={`Explore ${card.title}`}
        className="group relative flex h-[20rem] w-64 overflow-hidden rounded-3xl bg-white/10 p-1.5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-1 md:h-[35rem] md:w-[26rem]"
      >
        <div className="relative size-full overflow-hidden rounded-2xl bg-dark-1">
          <BlurImage src={card.src} alt={card.title} fill sizes="(max-width: 767px) 256px, 416px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/10 to-black/90" />
          <div className="relative p-6 text-white md:p-8">
            <p className="font-glancyr text-sm">{card.category}</p>
            <h2 className="mt-2 font-glancyr700 text-2xl md:text-4xl">{card.title}</h2>
          </div>
          <div className="absolute inset-x-0 bottom-0 p-5 text-white md:p-8">
            <div className="mb-5 flex flex-wrap gap-2">
              {card.tags?.map((tag) => (
                <span key={tag} className="rounded-lg bg-white/80 px-2 py-1 text-xs font-semibold text-dark-1">{tag}</span>
              ))}
            </div>
            <span className="flex items-center gap-2 text-sm font-semibold">Explore project <ArrowTopRightIcon className="size-5" /></span>
          </div>
        </div>
      </motion.button>

      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        onCancel={() => setOpen(false)}
        onClose={() => setOpen(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) setOpen(false);
        }}
        className="fixed inset-0 m-auto max-h-[90dvh] w-[calc(100%_-_2rem)] max-w-6xl overflow-y-auto rounded-[2rem] border border-white/20 bg-dark-1 p-0 text-white shadow-2xl backdrop:bg-black/75 backdrop:backdrop-blur-sm"
      >
        {open && (
          <div className="p-4 md:p-7">
            <div className="mb-5 flex items-center justify-between gap-4">
              <p className="font-glancyr text-sm text-zinc-400">{card.category} / Project overview</p>
              <button type="button" autoFocus onClick={() => setOpen(false)} aria-label="Close project details" className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-purple-1">
                <X className="size-5" />
              </button>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="relative min-h-64 overflow-hidden rounded-3xl border border-white/10 bg-zinc-900 md:min-h-96">
                <BlurImage src={card.src} alt={`${card.title} preview`} fill sizes="(max-width: 767px) 90vw, 560px" className="object-contain p-3" />
              </div>
              <section className="flex flex-col rounded-3xl bg-purple-1 p-6 text-dark-1 md:p-8">
                <p className="text-xs font-semibold uppercase tracking-widest">About the project</p>
                <h2 id={titleId} className="mt-4 font-glancyr700 text-3xl md:text-5xl">{card.title}</h2>
                <p className="mt-5 leading-relaxed">{card.description}</p>
                <div className="mb-6 mt-5 flex flex-wrap gap-2">
                  {card.tags?.map((tag) => <span key={tag} className="rounded-full border border-black/20 px-3 py-1 text-xs">{tag}</span>)}
                </div>
                <div className="mt-auto flex flex-wrap gap-3">
                  {card.link && <Link href={card.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-dark-1 px-4 py-3 text-sm text-white">Visit project <ArrowTopRightIcon className="size-4" /></Link>}
                  {card.github && <Link href={card.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-black/25 px-4 py-3 text-sm"><GitHubLogoIcon className="size-4" /> GitHub</Link>}
                </div>
              </section>
              <div className="grid gap-4 md:col-span-2 md:grid-cols-3">
                {card.details.map((detail, detailIndex) => (
                  <section key={detail.title} className="rounded-3xl border border-white/10 bg-zinc-900 p-6 md:p-8">
                    <p className="mb-6 font-mono text-xs text-purple-1">{String(detailIndex + 1).padStart(2, "0")}</p>
                    <h3 className="font-glancyr700 text-xl">{detail.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-zinc-400">{detail.text}</p>
                  </section>
                ))}
              </div>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
};

export const BlurImage = ({
  height,
  width,
  src,
  className,
  alt,
  ...rest
}: ImageProps) => {
  const [isLoading, setLoading] = useState(true);
  return (
    <Image
      className={cn(
        "transition duration-300",
        isLoading ? "blur-sm" : "blur-0",
        className
      )}
      onLoad={() => setLoading(false)}
      src={src}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      blurDataURL={typeof src === "string" ? src : undefined}
      alt={alt ? alt : "Background of a beautiful view"}
      {...rest}
    />
  );
};
