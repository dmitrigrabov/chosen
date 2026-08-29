import { namedSandbox } from "packages/models/src/namedSandbox.generated.ts";
import { z } from "zod";
import { useQuery, queryOptions, keepPreviousData } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export const useGetApiV2SandboxesResponse = z.object({
  sandboxes: z.array(namedSandbox),
  pagination: z.object({ count: z.number(), next: z.string().nullable() }),
});

export type UseGetApiV2SandboxesArgs = {
  project?: string | undefined;
  limit?: number | undefined;
  sortBy?: ("createdAt" | "name" | "statusUpdatedAt" | "currentSnapshotId") | undefined;
  namePrefix?: string | undefined;
  cursor?: string | undefined;
  sortOrder?: ("asc" | "desc") | undefined;
  status?: ("running" | "stopping" | "stopped") | undefined;
  tags?: (string | Array<string>) | undefined;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const getApiV2SandboxesQueryOptions = (args: UseGetApiV2SandboxesArgs) =>
  queryOptions({
    queryKey: [
      "GET /v2/sandboxes",
      "sandboxes",
      args.project,
      args.limit,
      args.sortBy,
      args.namePrefix,
      args.cursor,
      args.sortOrder,
      args.status,
      args.tags,
      args.teamId,
      args.slug,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/v2/sandboxes", {
          project: args.project,
          limit: args.limit,
          sortBy: args.sortBy,
          namePrefix: args.namePrefix,
          cursor: args.cursor,
          sortOrder: args.sortOrder,
          status: args.status,
          tags: args.tags,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useGetApiV2SandboxesResponse,
        { method: "GET" },
      ),
    placeholderData: keepPreviousData,
  });

export const useGetApiV2Sandboxes = (args: UseGetApiV2SandboxesArgs) =>
  useQuery(getApiV2SandboxesQueryOptions(args));
