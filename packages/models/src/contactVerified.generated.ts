import { z } from "zod";

export type ContactVerified = { verified: true };

export const contactVerified = z.object({ verified: z.literal(true) });
