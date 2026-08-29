import { z } from "zod";

export type AiGatewayRule = {
  ownerId: string;
  ruleId: string;
  type: "deny" | "rewrite";
  match?: { model?: string | undefined } | undefined;
  action?: { rewriteModel?: string | undefined; reason?: string | undefined } | undefined;
  enabled: boolean;
  deleted?: boolean | undefined;
  description?: string | undefined;
  createdBy?: string | undefined;
  updatedBy?: string | undefined;
  createdAt: number;
  updatedAt: number;
};

export const aiGatewayRule = z.object({
  ownerId: z.string(),
  ruleId: z.string(),
  type: z.enum(["deny", "rewrite"]),
  match: z.object({ model: z.string().optional() }).optional(),
  action: z
    .object({ rewriteModel: z.string().optional(), reason: z.string().optional() })
    .optional(),
  enabled: z.boolean(),
  deleted: z.boolean().optional(),
  description: z.string().optional(),
  createdBy: z.string().optional(),
  updatedBy: z.string().optional(),
  createdAt: z.number(),
  updatedAt: z.number(),
});
