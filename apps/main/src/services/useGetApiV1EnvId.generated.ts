import { z } from "zod";
import { useQuery, queryOptions, keepPreviousData } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export const useGetApiV1EnvIdResponse = z.object({
  created: z.string().optional(),
  key: z.string().optional(),
  ownerId: z.string().nullable().optional(),
  id: z.string().optional(),
  createdBy: z.string().nullable().optional(),
  deletedBy: z.string().nullable().optional(),
  updatedBy: z.string().nullable().optional(),
  createdAt: z.number().optional(),
  deletedAt: z.number().optional(),
  updatedAt: z.number().optional(),
  value: z.string().optional(),
  projectId: z.array(z.string()).optional(),
  type: z.enum(["encrypted", "plain", "sensitive", "system"]).optional(),
  target: z.array(z.enum(["development", "preview", "production"])).optional(),
  applyToAllCustomEnvironments: z.boolean().optional(),
  customEnvironmentIds: z.array(z.string()).optional(),
  decrypted: z.boolean().optional(),
  comment: z.string().optional(),
  lastEditedByDisplayName: z.string().optional(),
});

export type UseGetApiV1EnvIdArgs = {
  id: string;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const getApiV1EnvIdQueryOptions = (args: UseGetApiV1EnvIdArgs) =>
  queryOptions({
    queryKey: ["GET /v1/env/{id}", "environment", args.id, args.teamId, args.slug],
    queryFn: () =>
      apiFetch(
        buildUrl("/v1/env/{id}", { id: args.id, teamId: args.teamId, slug: args.slug }),
        useGetApiV1EnvIdResponse,
        { method: "GET" },
      ),
    placeholderData: keepPreviousData,
  });

export const useGetApiV1EnvId = (args: UseGetApiV1EnvIdArgs) =>
  useQuery(getApiV1EnvIdQueryOptions(args));
