import { z } from "zod";

export type DateFromString = string;

export const dateFromString = z.string();
