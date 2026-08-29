import { drive } from "packages/models/src/drive.generated.ts";
import { z } from "zod";
import { useQuery, queryOptions, keepPreviousData } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export const useGetApiV2SandboxesDrivesResponse = z.object({
  drives: z.array(drive),
  pagination: z.object({ count: z.number(), next: z.string().nullable() }),
});

export type UseGetApiV2SandboxesDrivesArgs = {
  projectId?: string | undefined;
  limit?: number | undefined;
  cursor?: string | undefined;
  sortBy?: ("createdAt" | "updatedAt" | "name") | undefined;
  namePrefix?: string | undefined;
  sortOrder?: ("asc" | "desc") | undefined;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const getApiV2SandboxesDrivesQueryOptions = (args: UseGetApiV2SandboxesDrivesArgs) =>
  queryOptions({
    queryKey: [
      "GET /v2/sandboxes/drives",
      "sandboxes",
      args.projectId,
      args.limit,
      args.cursor,
      args.sortBy,
      args.namePrefix,
      args.sortOrder,
      args.teamId,
      args.slug,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/v2/sandboxes/drives", {
          projectId: args.projectId,
          limit: args.limit,
          cursor: args.cursor,
          sortBy: args.sortBy,
          namePrefix: args.namePrefix,
          sortOrder: args.sortOrder,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useGetApiV2SandboxesDrivesResponse,
        { method: "GET" },
      ),
    placeholderData: keepPreviousData,
  });

export const useGetApiV2SandboxesDrives = (args: UseGetApiV2SandboxesDrivesArgs) =>
  useQuery(getApiV2SandboxesDrivesQueryOptions(args));
