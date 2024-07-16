// bg-blue-800 border-blue-800
// bg-rose-950 border-rose-950
// bg-zinc-900 border-zinc-900
// bg-white-100 border-white-100
import { PRODUCT_PRICES } from "@/configs/product";

export type DesignItemType = {
  label: string;
  value: string;
  tw?: string;
};

export type SellingItemType = {
  price: number;
  description?: string;
} & DesignItemType;

export type DesignWrapperType<T> = {
  name: string;
  options: T[];
};

export const DEFAULT_COLOR: DesignItemType = {
  label: "Black",
  value: "black",
  tw: "zinc-900",
};
export const DEFAULT_MODEL: DesignItemType = {
  label: "iPhone X",
  value: "iphonex",
};
export const DEFAULT_MATERIAL: SellingItemType = {
  label: "Silicon",
  value: "silicon",
  price: PRODUCT_PRICES.material.silicon,
};
export const DEFAULT_FINISH: SellingItemType = {
  label: "Smooth Finish",
  value: "smooth",
  price: PRODUCT_PRICES.finish.smooth,
};
export const COLORS: DesignItemType[] = [
  DEFAULT_COLOR,
  { label: "Blue", value: "blue", tw: "blue-800" },
  { label: "Rose", value: "rose", tw: "rose-950" },
  { label: "White", value: "white", tw: "white-100" },
] as const;

export const MODELS: DesignWrapperType<DesignItemType> = {
  name: "model",
  options: [
    DEFAULT_MODEL,
    { label: "iPhone 11", value: "iphone11" },
    { label: "iPhone 12", value: "iphone12" },
    { label: "iPhone 13", value: "iphone13" },
    { label: "iPhone 14", value: "iphone14" },
    { label: "iPhone 15", value: "iphone15" },
  ],
} as const;
export const MATERIALS: DesignWrapperType<SellingItemType> = {
  name: "material",
  options: [
    DEFAULT_MATERIAL,
    {
      label: "Soft Polycarbonate",
      value: "polycarbonate",
      description: "Scratch-resistant coating",
      price: PRODUCT_PRICES.material.polycarbonate,
    },
  ],
} as const;
export const FINISHES: DesignWrapperType<SellingItemType> = {
  name: "finish",
  options: [
    DEFAULT_FINISH,
    {
      label: "Textured Finish",
      value: "textured",
      description: "Soft grippy texture",
      price: PRODUCT_PRICES.finish.textured,
    },
  ],
} as const;
