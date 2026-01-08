export type Variant = {
  size: "Small" | "Regular";
  price: number;
};

export type ExtraPriceBySize = {
  Small?: number;
  Regular?: number;
};

export type Choice = {
  name: string; // Veg | Egg | Chicken | Mixed | Non-Veg
  extraPrice?: number;
  extraPriceBySize?: ExtraPriceBySize;
};

export type MenuItem = {
  _id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  isAvailable: boolean;
  variants: Variant[];
  choices: Choice[];
};
