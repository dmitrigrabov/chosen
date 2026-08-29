import { z } from "zod";

export type AuthUserLimited = {
  limited: true;
  id: string;
  email: string;
  name: string | null;
  username: string;
  avatar: string | null;
  defaultTeamId: string | null;
  isEnterpriseManaged?: boolean | undefined;
  shouldShowEnterpriseManagedWelcome?: boolean | undefined;
};

export const authUserLimited = z.object({
  limited: z.literal(true),
  id: z.string(),
  email: z.string(),
  name: z.string().nullable(),
  username: z.string(),
  avatar: z.string().nullable(),
  defaultTeamId: z.string().nullable(),
  isEnterpriseManaged: z.boolean().optional(),
  shouldShowEnterpriseManagedWelcome: z.boolean().optional(),
});
