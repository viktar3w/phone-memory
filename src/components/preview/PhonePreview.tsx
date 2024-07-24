"use client";

import { CaseColor } from "@prisma/client";
import { memo, useEffect, useRef, useState } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils";

type PhonePreviewProps = {
  croppedImgUrl: string;
  color: CaseColor;
};
const initRenderedProps = {
  width: 0,
  height: 0,
};
const PhonePreview = ({ croppedImgUrl, color }: PhonePreviewProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [renderedProps, setRenderedProps] =
    useState<typeof initRenderedProps>(initRenderedProps);
  const handleResize = () => {
    if (!ref.current) {
      return;
    }
    const { width, height } = ref.current.getBoundingClientRect();
    setRenderedProps({ width, height });
  };
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [ref.current]);
  let caseBackgroundColor = "bg-zinc-950";
  if (color === "blue") {
    caseBackgroundColor = "bg-blue-950";
  }
  if (color === "rose") {
    caseBackgroundColor = "bg-rose-950";
  }
  return (
    <AspectRatio ref={ref} ratio={3000 / 2001} className="relative">
      <div
        className="absolute z-20 scale-[1.0352]"
        style={{
          left: renderedProps.width / 2 - renderedProps.width / (1216 / 121),
          top: renderedProps.height / 6.22,
        }}
      >
        <img
          src={croppedImgUrl}
          alt="cropped img"
          className={cn(
            "phone-skew relative z-20 rounded-t-[15px] rounded-b-[10px] md:rounded-t-[30px] md:rounded-b-[20px]",
            caseBackgroundColor,
          )}
          width={renderedProps.width / (3000 / 637)}
        />
      </div>
      <div className="relative h-full w-full z-40">
        <img
          alt="phone"
          src="/clearphone.png"
          className="pointer-events-none h-full w-full antialiased rounded-md"
        />
      </div>
    </AspectRatio>
  );
};

export default memo(PhonePreview);
