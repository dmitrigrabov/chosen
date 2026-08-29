import { z } from "zod";
import { snapshot } from "packages/models/src/snapshot.generated.ts";
import { useQuery, queryOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiV2SandboxesSnapshotsArgs = {
  project?: string | undefined;
  name?: string | undefined;
  limit?: number | undefined;
  cursor?: string | undefined;
  sortOrder?: ("asc" | "desc") | undefined;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const useGetApiV2SandboxesSnapshotsResponse = z.union([
  z.object({}),
  z.object({
    snapshots: z.array(snapshot),
    pagination: z.object({ count: z.number(), next: z.string().nullable() }),
  }),
]);

export const getApiV2SandboxesSnapshotsQueryOptions = (args: UseGetApiV2SandboxesSnapshotsArgs) =>
  queryOptions({
    queryKey: [
      "GET /v2/sandboxes/snapshots",
      "sandboxes",
      args.project,
      args.name,
      args.limit,
      args.cursor,
      args.sortOrder,
      args.teamId,
      args.slug,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/v2/sandboxes/snapshots", {
          project: args.project,
          name: args.name,
          limit: args.limit,
          cursor: args.cursor,
          sortOrder: args.sortOrder,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useGetApiV2SandboxesSnapshotsResponse,
        { method: "GET" },
      ),
  });

export const useGetApiV2SandboxesSnapshots = (args: UseGetApiV2SandboxesSnapshotsArgs) =>
  useQuery(getApiV2SandboxesSnapshotsQueryOptions(args));
