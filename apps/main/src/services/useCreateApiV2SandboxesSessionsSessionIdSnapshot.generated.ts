import { snapshot, type Snapshot } from "packages/models/src/snapshot.generated.ts";
import { session, type Session } from "packages/models/src/session.generated.ts";
import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseCreateApiV2SandboxesSessionsSessionIdSnapshotArgs = {
  sessionId: string;
  teamId?: string | undefined;
  slug?: string | undefined;
  body: { expiration?: (unknown | number) | undefined };
};

export const useCreateApiV2SandboxesSessionsSessionIdSnapshotResponse = z.object({
  snapshot: snapshot,
  session: session,
});

export type UseCreateApiV2SandboxesSessionsSessionIdSnapshotResponse = {
  snapshot: Snapshot;
  session: Session;
};

export type CreateApiV2SandboxesSessionsSessionIdSnapshotBody = {
  expiration?: (unknown | number) | undefined;
};

export const useCreateApiV2SandboxesSessionsSessionIdSnapshot = (
  options: UseMutationOptions<
    UseCreateApiV2SandboxesSessionsSessionIdSnapshotResponse,
    Error,
    UseCreateApiV2SandboxesSessionsSessionIdSnapshotArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiV2SandboxesSessionsSessionIdSnapshotArgs) =>
      apiFetch(
        buildUrl("/v2/sandboxes/sessions/{sessionId}/snapshot", {
          sessionId: args.sessionId,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useCreateApiV2SandboxesSessionsSessionIdSnapshotResponse,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(args.body),
        },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["sandboxes"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
