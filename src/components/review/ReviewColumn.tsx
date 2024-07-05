"use client";
import { CSSProperties, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import Review from "@/components/review/Review";

type ReviewColumnProps = {
  reviews: string[];
  className?: string;
  reviewClassName?: (reviewIndex: number) => string;
  msPerPixel?: number;
};
const ReviewColumn = ({
  reviews,
  className,
  reviewClassName,
  msPerPixel = 0,
}: ReviewColumnProps) => {
  const columnRef = useRef<HTMLDivElement | null>(null);
  const [columnHeight, setColumnHeight] = useState<number>(0);
  const duration = `${columnHeight * msPerPixel}ms`;
  useEffect(() => {
    if (!columnRef?.current) {
      return;
    }
    const resizeObserver = new ResizeObserver(() => {
      setColumnHeight(columnRef.current?.offsetHeight || 0);
    });
    resizeObserver.observe(columnRef.current);
    return () => {
      resizeObserver.disconnect();
    };
  }, []);
  return (
    <div
      ref={columnRef}
      className={cn("animate-marquee space-y-8 py-4", className)}
      style={{ "--marquee-duration": duration } as CSSProperties}
    >
      {reviews.concat(reviews).map((imgSrc, reviewIndex) => (
        <Review
          key={reviewIndex}
          imgSrc={imgSrc}
          className={reviewClassName?.(reviewIndex % reviews.length)}
        />
      ))}
    </div>
  );
};

export default ReviewColumn;
