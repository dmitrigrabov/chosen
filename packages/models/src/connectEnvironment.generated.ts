import { z } from "zod";

export type ConnectEnvironment = "development" | "preview" | "production" | string;

export const connectEnvironment = z.union([
  z.enum(["development", "preview", "production"]),
  z.string().regex(/^env_/),
]);
