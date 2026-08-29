import { z } from "zod";

export type CountryCode = string;

export const countryCode = z.string();
