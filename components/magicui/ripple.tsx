import React, { CSSProperties } from "react";

import { cn } from "@/lib/utils";

interface RippleProps {
  mainCircleSize?: number;
  mainCircleOpacity?: number;
  numCircles?: number;
  desktopMainCircleSize?: number;
  desktopCircleSpacing?: number;
  className?: string;
}

const Ripple = React.memo(function Ripple({
  mainCircleSize = 230,
  mainCircleOpacity = 0.23,
  numCircles = 8,
  desktopMainCircleSize,
  desktopCircleSpacing = 80,
  className,
}: RippleProps) {
  return (
    <div
      className={cn(
        "absolute inset-0 bg-transparent",
        className,
      )}
    >
      {Array.from({ length: numCircles }, (_, i) => {
        const size = mainCircleSize + i * 80;
        const desktopSize = desktopMainCircleSize
          ? desktopMainCircleSize + i * desktopCircleSpacing
          : size;
        const opacity = mainCircleOpacity - i * 0.03;
        const animationDelay = `${i * 0.06}s`;
        const borderStyle = i === numCircles - 1 ? "dashed" : "solid";
        const borderOpacity = 5 + i * 5;

        return (
          <div
            key={i}
            className={`absolute animate-ripple rounded-full bg-white dark:bg-zinc-100/80 shadow-xl border sm:w-[var(--desktop-ripple-size)] sm:h-[var(--desktop-ripple-size)] [--i:${i}]`}
            style={
              {
                width: `${size}px`,
                height: `${size}px`,
                "--desktop-ripple-size": `${desktopSize}px`,
                opacity,
                animationDelay,
                borderStyle,
                borderWidth: "1px",
                borderColor: `hsl(var(--foreground), ${borderOpacity / 100})`,
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%) scale(1)",
              } as CSSProperties
            }
          />
        );
      })}
    </div>
  );
});


export default Ripple;
