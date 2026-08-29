import { z } from "zod";
import { useQuery, queryOptions, keepPreviousData } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export const useGetApiV2DeploymentsIdAliasesResponse = z.object({
  aliases: z.array(
    z.object({
      uid: z.string(),
      alias: z.string(),
      created: z.string(),
      redirect: z.string().nullable().optional(),
      protectionBypass: z
        .record(
          z.string(),
          z.union([
            z.object({
              createdAt: z.number(),
              createdBy: z.string(),
              scope: z.literal("shareable-link"),
              expires: z.number().optional(),
            }),
            z.object({
              createdAt: z.number(),
              lastUpdatedAt: z.number(),
              lastUpdatedBy: z.string(),
              access: z.enum(["granted", "requested"]),
              scope: z.literal("user"),
            }),
            z.object({
              createdAt: z.number(),
              createdBy: z.string(),
              scope: z.literal("alias-protection-override"),
            }),
            z.object({
              createdAt: z.number(),
              lastUpdatedAt: z.number(),
              lastUpdatedBy: z.string(),
              scope: z.literal("email_invite"),
            }),
          ]),
        )
        .optional(),
    }),
  ),
});

export type UseGetApiV2DeploymentsIdAliasesArgs = {
  id: string;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const getApiV2DeploymentsIdAliasesQueryOptions = (
  args: UseGetApiV2DeploymentsIdAliasesArgs,
) =>
  queryOptions({
    queryKey: ["GET /v2/deployments/{id}/aliases", "aliases", args.id, args.teamId, args.slug],
    queryFn: () =>
      apiFetch(
        buildUrl("/v2/deployments/{id}/aliases", {
          id: args.id,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useGetApiV2DeploymentsIdAliasesResponse,
        { method: "GET" },
      ),
    placeholderData: keepPreviousData,
  });

export const useGetApiV2DeploymentsIdAliases = (args: UseGetApiV2DeploymentsIdAliasesArgs) =>
  useQuery(getApiV2DeploymentsIdAliasesQueryOptions(args));
