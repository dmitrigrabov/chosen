import {
  type DateFromString,
  dateFromString,
} from "packages/models/src/dateFromString.generated.ts";
import { z } from "zod";

export type ContactPendingVerification = {
  verified: false;
  verifyBy: DateFromString;
  email: string;
};

export const contactPendingVerification = z.object({
  verified: z.literal(false),
  verifyBy: dateFromString,
  email: z.string(),
});
