import {
  type AiGatewayProviderOptionBag,
  aiGatewayProviderOptionBag,
} from "packages/models/src/aiGatewayProviderOptionBag.generated.ts";
import { z } from "zod";

export type AiGatewayVirtualModelConfig = {
  ownerId: string;
  virtualModelSlug: string;
  displayName?: string | undefined;
  description?: string | undefined;
  deleted: boolean;
  status: string;
  visibility?: string | undefined;
  updatedBy?: string | undefined;
  kind: string;
  baseUrl?: string | undefined;
  instanceId?: string | undefined;
  providerOrder?: Array<string> | undefined;
  providerOnly?: Array<string> | undefined;
  providerOptions?: Record<string, AiGatewayProviderOptionBag> | undefined;
  inferenceRegion?:
    | {
        providers?:
          | Record<
              string,
              {
                scope?: ("global" | "specific" | "zone") | undefined;
                geoRegion?: string | undefined;
                providerRegion?: string | undefined;
              } | null
            >
          | undefined;
        scope?: ("global" | "specific" | "zone") | undefined;
        geoRegion?: string | undefined;
        providerRegion?: string | undefined;
      }
    | undefined;
  modelSlug?: string | undefined;
  models?: Array<string> | undefined;
  selector?: ("cost" | "priority" | "tps" | "ttft") | undefined;
  requires?: Array<string> | undefined;
  byokCredentialIds?: Array<string> | undefined;
  observabilityTags?: Array<string> | undefined;
  sort?: ("cost" | "latency" | "price" | "throughput" | "tps" | "ttft") | undefined;
  has?: Array<"implicit-caching" | "vision"> | undefined;
  caching?: "auto" | undefined;
  serviceTier?: ("fast" | "flex" | "priority") | undefined;
  providerTimeouts?: { byok?: Record<string, number> | undefined } | undefined;
  zeroDataRetention?: boolean | undefined;
  hipaaCompliant?: boolean | undefined;
  disallowPromptTraining?: boolean | undefined;
  speed?: "fast" | undefined;
  allowFallbackFromFast?: boolean | undefined;
  createdAt: number;
  updatedAt: number;
};

export const aiGatewayVirtualModelConfig = z.object({
  ownerId: z.string(),
  virtualModelSlug: z.string(),
  displayName: z.string().optional(),
  description: z.string().optional(),
  deleted: z.boolean(),
  status: z.string(),
  visibility: z.string().optional(),
  updatedBy: z.string().optional(),
  kind: z.string(),
  baseUrl: z.string().optional(),
  instanceId: z.string().optional(),
  providerOrder: z.array(z.string()).optional(),
  providerOnly: z.array(z.string()).optional(),
  providerOptions: z.record(z.string(), aiGatewayProviderOptionBag).optional(),
  inferenceRegion: z
    .object({
      providers: z
        .record(
          z.string(),
          z
            .object({
              scope: z.enum(["global", "specific", "zone"]).optional(),
              geoRegion: z.string().optional(),
              providerRegion: z.string().optional(),
            })
            .nullable(),
        )
        .optional(),
      scope: z.enum(["global", "specific", "zone"]).optional(),
      geoRegion: z.string().optional(),
      providerRegion: z.string().optional(),
    })
    .optional(),
  modelSlug: z.string().optional(),
  models: z.array(z.string()).optional(),
  selector: z.enum(["cost", "priority", "tps", "ttft"]).optional(),
  requires: z.array(z.string()).optional(),
  byokCredentialIds: z.array(z.string()).optional(),
  observabilityTags: z.array(z.string()).optional(),
  sort: z.enum(["cost", "latency", "price", "throughput", "tps", "ttft"]).optional(),
  has: z.array(z.enum(["implicit-caching", "vision"])).optional(),
  caching: z.literal("auto").optional(),
  serviceTier: z.enum(["fast", "flex", "priority"]).optional(),
  providerTimeouts: z.object({ byok: z.record(z.string(), z.number()).optional() }).optional(),
  zeroDataRetention: z.boolean().optional(),
  hipaaCompliant: z.boolean().optional(),
  disallowPromptTraining: z.boolean().optional(),
  speed: z.literal("fast").optional(),
  allowFallbackFromFast: z.boolean().optional(),
  createdAt: z.number(),
  updatedAt: z.number(),
});
