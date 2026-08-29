import { z } from "zod";
import { useQuery, queryOptions, keepPreviousData } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export const useGetApiV2IntegrationsLogDrainsResponse = z.array(
  z.object({
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
  }),
);

export type UseGetApiV2IntegrationsLogDrainsArgs = {
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const getApiV2IntegrationsLogDrainsQueryOptions = (
  args: UseGetApiV2IntegrationsLogDrainsArgs,
) =>
  queryOptions({
    queryKey: ["GET /v2/integrations/log-drains", "logDrains", args.teamId, args.slug],
    queryFn: () =>
      apiFetch(
        buildUrl("/v2/integrations/log-drains", { teamId: args.teamId, slug: args.slug }),
        useGetApiV2IntegrationsLogDrainsResponse,
        { method: "GET" },
      ),
    placeholderData: keepPreviousData,
  });

export const useGetApiV2IntegrationsLogDrains = (args: UseGetApiV2IntegrationsLogDrainsArgs) =>
  useQuery(getApiV2IntegrationsLogDrainsQueryOptions(args));
