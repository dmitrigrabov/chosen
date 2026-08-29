import { snapshot } from "packages/models/src/snapshot.generated.ts";
import { z } from "zod";
import { useQuery, queryOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiV2SandboxesSnapshotsSnapshotIdArgs = {
  snapshotId: string;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const useGetApiV2SandboxesSnapshotsSnapshotIdResponse = z.object({ snapshot: snapshot });

export const getApiV2SandboxesSnapshotsSnapshotIdQueryOptions = (
  args: UseGetApiV2SandboxesSnapshotsSnapshotIdArgs,
) =>
  queryOptions({
    queryKey: [
      "GET /v2/sandboxes/snapshots/{snapshotId}",
      "sandboxes",
      args.snapshotId,
      args.teamId,
      args.slug,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/v2/sandboxes/snapshots/{snapshotId}", {
          snapshotId: args.snapshotId,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useGetApiV2SandboxesSnapshotsSnapshotIdResponse,
        { method: "GET" },
      ),
  });

export const useGetApiV2SandboxesSnapshotsSnapshotId = (
  args: UseGetApiV2SandboxesSnapshotsSnapshotIdArgs,
) => useQuery(getApiV2SandboxesSnapshotsSnapshotIdQueryOptions(args));
