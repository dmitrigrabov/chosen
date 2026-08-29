import { z } from "zod";

export type DomainName = string;

export const domainName = z.string();
