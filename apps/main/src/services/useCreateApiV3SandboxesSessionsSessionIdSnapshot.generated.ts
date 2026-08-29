import { snapshot, type Snapshot } from "packages/models/src/snapshot.generated.ts";
import { session, type Session } from "packages/models/src/session.generated.ts";
import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseCreateApiV3SandboxesSessionsSessionIdSnapshotArgs = {
  sessionId: string;
  teamId?: string | undefined;
  slug?: string | undefined;
  body: { expiration?: (unknown | number) | undefined };
};

export const useCreateApiV3SandboxesSessionsSessionIdSnapshotResponse = z.object({
  snapshot: snapshot,
  session: session,
});

export type UseCreateApiV3SandboxesSessionsSessionIdSnapshotResponse = {
  snapshot: Snapshot;
  session: Session;
};

export type CreateApiV3SandboxesSessionsSessionIdSnapshotBody = {
  expiration?: (unknown | number) | undefined;
};

export const useCreateApiV3SandboxesSessionsSessionIdSnapshot = (
  options: UseMutationOptions<
    UseCreateApiV3SandboxesSessionsSessionIdSnapshotResponse,
    Error,
    UseCreateApiV3SandboxesSessionsSessionIdSnapshotArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiV3SandboxesSessionsSessionIdSnapshotArgs) =>
      apiFetch(
        buildUrl("/v3/sandboxes/sessions/{sessionId}/snapshot", {
          sessionId: args.sessionId,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useCreateApiV3SandboxesSessionsSessionIdSnapshotResponse,
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
