"use client";
import { useRef, useState } from "react";
import {
  DEFAULT_COLOR,
  DEFAULT_FINISH,
  DEFAULT_MATERIAL,
  DEFAULT_MODEL,
  DesignItemType,
  SellingItemType,
} from "@/constants/design";
import { base64ToBlob } from "@/lib/image";
import { useUploadThing } from "@/lib/uploadthing";
import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import { ConfigImageType } from "@/types/design";
import _saveConfig from "@/actions/save-config";
import { useRouter } from "next/navigation";

type SaveImageConfigurationProps = {
  configId: string;
  imgUrl: string;
  imgDimensions: {
    width: number;
    height: number;
  };
};
type OptionType = {
  [key: string]: SellingItemType
};
export const useSaveImageConfiguration = ({
  configId,
  imgUrl,
  imgDimensions,
}: SaveImageConfigurationProps) => {
  const { toast } = useToast();
  const { push } = useRouter();
  const { mutate: saveConfig } = useMutation({
    mutationKey: ["save-config"],
    mutationFn: async (args: ConfigImageType) => {
      await Promise.all([saveConfiguration(), _saveConfig(args)]);
    },
    onError: () => {
      toast({
        title: "Something was wrong",
        description: "There was an error on our end. Please try again.",
        variant: "destructive",
      });
    },
    onSuccess: () => push(`/configure/preview?id=${configId}`),
  });
  const [options, setOptions] = useState<OptionType>({
    color: DEFAULT_COLOR,
    model: DEFAULT_MODEL,
    material: DEFAULT_MATERIAL,
    finish: DEFAULT_FINISH,
  });
  const [renderedDimension, setRenderedDimension] = useState({
    width: imgDimensions.width / 4,
    height: imgDimensions.height / 4,
  });
  const [renderedPosition, setRenderedPosition] = useState({
    x: 150,
    y: 205,
  });
  const phoneCaseRef = useRef<HTMLDivElement | null>(null);

  const containerRef = useRef<HTMLDivElement | null>(null);

  const { startUpload } = useUploadThing("imageUploader");

  const saveConfiguration = async () => {
    try {
      const {
        left: caseLeft,
        top: caseTop,
        width,
        height,
      } = phoneCaseRef.current!.getBoundingClientRect();
      const { left: containerLeft, top: containerTop } =
        containerRef.current!.getBoundingClientRect();
      const leftOffset = caseLeft - containerLeft;
      const topOffset = caseTop - containerTop;
      const actualX = renderedPosition.x - leftOffset;
      const actualY = renderedPosition.y - topOffset;
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      const userImg = new Image();
      userImg.crossOrigin = "anonymous";
      userImg.src = imgUrl;
      await new Promise((resolve) => (userImg.onload = resolve));
      ctx?.drawImage(
        userImg,
        actualX,
        actualY,
        renderedDimension.width,
        renderedDimension.height,
      );
      const base64 = canvas.toDataURL();
      const base64Data = base64.split(",")[1];
      const blob = base64ToBlob(base64Data, "image/png");
      const file = new File([blob], "filename.png", { type: "image/png" });
      await startUpload([file], { configId });
    } catch (err: any) {
      toast({
        title: "Something was wrong.",
        description: "There was problem saving your config, please try again!",
        variant: "destructive",
      });
    }
  };

  return {
    options,
    setOptions,
    renderedDimension,
    setRenderedDimension,
    renderedPosition,
    setRenderedPosition,
    phoneCaseRef,
    containerRef,
    saveConfig,
  };
};
