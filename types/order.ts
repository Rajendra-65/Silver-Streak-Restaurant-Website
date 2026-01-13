export type OrderItem = {
  _id: string;
  name: string;
  size: string;
  choice?: string;
  quantity: number;
  status: "PENDING" | "PREPARING" | "READY" | "SERVED";
};
