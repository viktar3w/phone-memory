import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { BASE_PRICE, PRODUCT_PRICES } from "@/configs/product";
import { CaseFinish, CaseMaterial } from "@prisma/client";
import { MetadataProps } from "@/types/page";
import { Metadata } from "next";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const splitArray = <T>(
  array: Array<T>,
  numberPart: number,
): Array<Array<T>> => {
  const result: Array<Array<T>> = [];
  for (let i = 0; i < array.length; i++) {
    const index = i % numberPart;
    if (!result[index]) {
      result[index] = [];
    }
    result[index].push(array[i]);
  }
  return result;
};

export const formatPrice = (price: number): string => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  return formatter.format(price);
};

export const getTotalPrice = (
  material: CaseMaterial | null,
  finish?: CaseFinish | null,
) => {
  let totalPrice = BASE_PRICE;
  if (material === "polycarbonate") {
    totalPrice += PRODUCT_PRICES.material.polycarbonate;
  }
  if (finish === "textured") {
    totalPrice += PRODUCT_PRICES.finish.textured;
  }
  return totalPrice;
};

export const constructMetadata = ({
  title = "PhoneMemory - you can remember your case",
  description = "Create custom memory case",
  image = "/thumbnail.png",
  icons = "/favicon.ico",
}: MetadataProps = {}): Metadata => {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
    icons,
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
};
