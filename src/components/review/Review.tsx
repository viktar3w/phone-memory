import { CSSProperties, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { POSSIBLE_ANIMATION_DELAYS } from "@/constants/phones";
import Phone from "@/components/common/Phone";

type ReviewProps = {
  imgSrc: string;
} & HTMLAttributes<HTMLDivElement>;
const Review = ({ imgSrc, className, ...props }: ReviewProps) => {
  const animationDelay =
    POSSIBLE_ANIMATION_DELAYS[
      Math.floor(Math.random() * POSSIBLE_ANIMATION_DELAYS.length)
    ];
  return (
    <div
      className={cn(
        "animate-fade-in rounded-[2.25rem] bg-white p-6 opacity-0 shadow-xl shadow-slate-900/5",
        className,
      )}
      style={{ animationDelay } as CSSProperties}
      {...props}
    >
        <Phone imgSrc={imgSrc} />
    </div>
  );
};

export default Review;
