export type OrderItem = {
  _id: string;
  name: string;
  size: string;
  choice?: string;
  quantity: number;
  status: "PENDING" | "PREPARING" | "READY" | "SERVED";
};

export enum OrderStatus {
  PLACED = "PLACED",
  ACTIVE = "ACTIVE",
  COMPLETED = "COMPLETED",
}

export interface Order_type {
  _id: string;
  table: string;
  items: OrderItem[];
  status: OrderStatus;
  grandTotal: number;
  createdAt: Date;
  updatedAt: Date;
}