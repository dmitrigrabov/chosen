import { z } from "zod";

export type OrderId = string;

export const orderId = z.string();
