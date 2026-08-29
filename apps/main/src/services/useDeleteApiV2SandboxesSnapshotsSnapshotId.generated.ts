import { snapshot, type Snapshot } from "packages/models/src/snapshot.generated.ts";
import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseDeleteApiV2SandboxesSnapshotsSnapshotIdArgs = {
  snapshotId: string;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const useDeleteApiV2SandboxesSnapshotsSnapshotIdResponse = z.object({ snapshot: snapshot });

export type UseDeleteApiV2SandboxesSnapshotsSnapshotIdResponse = { snapshot: Snapshot };

export type DeleteApiV2SandboxesSnapshotsSnapshotIdBody = void;

export const useDeleteApiV2SandboxesSnapshotsSnapshotId = (
  options: UseMutationOptions<
    UseDeleteApiV2SandboxesSnapshotsSnapshotIdResponse,
    Error,
    UseDeleteApiV2SandboxesSnapshotsSnapshotIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseDeleteApiV2SandboxesSnapshotsSnapshotIdArgs) =>
      apiFetch(
        buildUrl("/v2/sandboxes/snapshots/{snapshotId}", {
          snapshotId: args.snapshotId,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useDeleteApiV2SandboxesSnapshotsSnapshotIdResponse,
        { method: "DELETE" },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["sandboxes"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
