"use client";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/* The EB frieze. Texture, not wallpaper: never put text over it.
   Two tiles side by side; translating -50% loops seamlessly. */
export function PatternBand({
  tone = "default",
  drift = false,
  scale = 1,
  align = "center",
  className,
}: {
  tone?: "default" | "inverse";
  drift?: boolean;
  /** Tile size multiplier. Larger + top-aligned gives the cropped look. */
  scale?: number;
  align?: "center" | "top";
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!drift || !ref.current) return;
    const io = new IntersectionObserver(([e]) => setPaused(!e.isIntersecting));
    io.observe(ref.current);
    return () => io.disconnect();
  }, [drift]);

  const w = 2304 * scale;
  return (
    <div
      ref={ref}
      aria-hidden
      className={cn(
        "h-24 overflow-hidden",
        tone === "inverse" ? "text-white opacity-[0.08]" : "text-navy-900",
        className,
      )}
    >
      <div className={cn("flex h-full w-max", drift && "pattern-drift")} data-paused={paused}>
        {[0, 1].map((i) => (
          <span
            key={i}
            className="pattern-tile"
            style={{
              width: w,
              maskSize: `${w}px auto`,
              WebkitMaskSize: `${w}px auto`,
              maskPosition: align === "top" ? "0 0" : "0 50%",
              WebkitMaskPosition: align === "top" ? "0 0" : "0 50%",
            }}
          />
        ))}
      </div>
    </div>
  );
}
