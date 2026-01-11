import { Variant } from "./menu";

export type CartItem = {
  id: string;
  name: string;
  image: string;
  size: Variant["size"];
  choice?: string;
  unitPrice: number;
  quantity: number;
  totalPrice? : number;
  grandTotal? : number;

};
