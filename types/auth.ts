// types/auth.ts
export type AuthPayload = {
  id: string;
  role: "ADMIN" | "WAITER" | "KITCHEN";
  iat?: number;
  exp?: number;
};
