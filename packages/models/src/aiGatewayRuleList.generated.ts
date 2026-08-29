import { type AiGatewayRule, aiGatewayRule } from "packages/models/src/aiGatewayRule.generated.ts";
import { z } from "zod";

export type AiGatewayRuleList = { rules: Array<AiGatewayRule> };

export const aiGatewayRuleList = z.object({ rules: z.array(aiGatewayRule) });
