import {
  type AiGatewayVirtualModelConfig,
  aiGatewayVirtualModelConfig,
} from "packages/models/src/aiGatewayVirtualModelConfig.generated.ts";
import { z } from "zod";

export type AiGatewayVirtualModelConfigList = {
  virtualModelConfigs: Array<AiGatewayVirtualModelConfig>;
  cursor: string | null;
};

export const aiGatewayVirtualModelConfigList = z.object({
  virtualModelConfigs: z.array(aiGatewayVirtualModelConfig),
  cursor: z.string().nullable(),
});
