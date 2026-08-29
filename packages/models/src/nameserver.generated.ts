import { z } from "zod";

export type Nameserver = string;

export const nameserver = z.string();
