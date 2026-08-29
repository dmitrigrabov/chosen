import { z } from "zod";
import { useQuery, queryOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiV1ProjectsIdOrNameRollingReleaseBillingArgs = {
  idOrName: string;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const useGetApiV1ProjectsIdOrNameRollingReleaseBillingResponse = z.union([
  z.object({
    availableSlots: z.literal(0),
    reason: z.literal("plan_not_supported"),
    message: z.string(),
  }),
  z.object({
    availableSlots: z.literal("unlimited"),
    reason: z.literal("unlimited_slots"),
    message: z.string(),
  }),
  z.object({
    availableSlots: z.literal(0),
    reason: z.literal("no_available_slots"),
    message: z.string(),
    enabledProjects: z.array(z.string()),
  }),
  z.object({
    availableSlots: z.number(),
    reason: z.literal("available_slots"),
    message: z.string(),
  }),
]);

export const getApiV1ProjectsIdOrNameRollingReleaseBillingQueryOptions = (
  args: UseGetApiV1ProjectsIdOrNameRollingReleaseBillingArgs,
) =>
  queryOptions({
    queryKey: [
      "GET /v1/projects/{idOrName}/rolling-release/billing",
      "rolling-release",
      args.idOrName,
      args.teamId,
      args.slug,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/v1/projects/{idOrName}/rolling-release/billing", {
          idOrName: args.idOrName,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useGetApiV1ProjectsIdOrNameRollingReleaseBillingResponse,
        { method: "GET" },
      ),
  });

export const useGetApiV1ProjectsIdOrNameRollingReleaseBilling = (
  args: UseGetApiV1ProjectsIdOrNameRollingReleaseBillingArgs,
) => useQuery(getApiV1ProjectsIdOrNameRollingReleaseBillingQueryOptions(args));
