import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseCreateApiV2IntegrationsLogDrainsArgs = {
  teamId?: string | undefined;
  slug?: string | undefined;
  body: {
    name: string;
    projectIds?: Array<string> | undefined;
    secret?: string | undefined;
    deliveryFormat?: ("json" | "ndjson") | undefined;
    url: string;
    sources?: Array<"static" | "lambda" | "build" | "edge" | "external" | "firewall"> | undefined;
    headers?: Record<string, string> | undefined;
    environments?: Array<"preview" | "production"> | undefined;
  };
};

export const useCreateApiV2IntegrationsLogDrainsResponse = z.object({
  clientId: z.string().optional(),
  configurationId: z.string().optional(),
  createdAt: z.number(),
  id: z.string(),
  deliveryFormat: z.enum(["json", "ndjson", "protobuf"]).optional(),
  name: z.string(),
  ownerId: z.string(),
  projectId: z.string().nullable().optional(),
  projectIds: z.array(z.string()).optional(),
  url: z.string(),
  sources: z
    .array(z.enum(["build", "edge", "external", "firewall", "lambda", "redirect", "static"]))
    .optional(),
  createdFrom: z.enum(["integration", "self-served"]).optional(),
  headers: z.record(z.string(), z.string()).optional(),
  environments: z.array(z.enum(["preview", "production"])).optional(),
  branch: z.string().optional(),
  samplingRate: z.number().optional(),
  source: z.union([
    z.object({ kind: z.literal("self-served") }),
    z.object({
      kind: z.literal("integration"),
      resourceId: z.string().optional(),
      externalResourceId: z.string().optional(),
      integrationId: z.string(),
      integrationConfigurationId: z.string(),
    }),
  ]),
});

export type UseCreateApiV2IntegrationsLogDrainsResponse = {
  clientId?: string | undefined;
  configurationId?: string | undefined;
  createdAt: number;
  id: string;
  deliveryFormat?: ("json" | "ndjson" | "protobuf") | undefined;
  name: string;
  ownerId: string;
  projectId?: (string | null) | undefined;
  projectIds?: Array<string> | undefined;
  url: string;
  sources?:
    | Array<"build" | "edge" | "external" | "firewall" | "lambda" | "redirect" | "static">
    | undefined;
  createdFrom?: ("integration" | "self-served") | undefined;
  headers?: Record<string, string> | undefined;
  environments?: Array<"preview" | "production"> | undefined;
  branch?: string | undefined;
  samplingRate?: number | undefined;
  source:
    | { kind: "self-served" }
    | {
        kind: "integration";
        resourceId?: string | undefined;
        externalResourceId?: string | undefined;
        integrationId: string;
        integrationConfigurationId: string;
      };
};

export type CreateApiV2IntegrationsLogDrainsBody = {
  name: string;
  projectIds?: Array<string> | undefined;
  secret?: string | undefined;
  deliveryFormat?: ("json" | "ndjson") | undefined;
  url: string;
  sources?: Array<"static" | "lambda" | "build" | "edge" | "external" | "firewall"> | undefined;
  headers?: Record<string, string> | undefined;
  environments?: Array<"preview" | "production"> | undefined;
};

export const useCreateApiV2IntegrationsLogDrains = (
  options: UseMutationOptions<
    UseCreateApiV2IntegrationsLogDrainsResponse,
    Error,
    UseCreateApiV2IntegrationsLogDrainsArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiV2IntegrationsLogDrainsArgs) =>
      apiFetch(
        buildUrl("/v2/integrations/log-drains", { teamId: args.teamId, slug: args.slug }),
        useCreateApiV2IntegrationsLogDrainsResponse,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(args.body),
        },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["logDrains"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
