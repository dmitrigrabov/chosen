import { z } from "zod";

export type EmailAddress = string;

export const emailAddress = z.string().min(1);
