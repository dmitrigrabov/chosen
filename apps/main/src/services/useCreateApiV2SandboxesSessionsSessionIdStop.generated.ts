import { session, type Session } from "packages/models/src/session.generated.ts";
import { z } from "zod";
import { snapshot, type Snapshot } from "packages/models/src/snapshot.generated.ts";
import { namedSandbox, type NamedSandbox } from "packages/models/src/namedSandbox.generated.ts";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseCreateApiV2SandboxesSessionsSessionIdStopArgs = {
  sessionId: string;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const useCreateApiV2SandboxesSessionsSessionIdStopResponse = z.union([
  z.object({ session: session }),
  z.object({ snapshot: snapshot, sandbox: namedSandbox, session: session }),
]);

export type UseCreateApiV2SandboxesSessionsSessionIdStopResponse =
  | { session: Session }
  | { snapshot: Snapshot; sandbox: NamedSandbox; session: Session };

export type CreateApiV2SandboxesSessionsSessionIdStopBody = void;

export const useCreateApiV2SandboxesSessionsSessionIdStop = (
  options: UseMutationOptions<
    UseCreateApiV2SandboxesSessionsSessionIdStopResponse,
    Error,
    UseCreateApiV2SandboxesSessionsSessionIdStopArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiV2SandboxesSessionsSessionIdStopArgs) =>
      apiFetch(
        buildUrl("/v2/sandboxes/sessions/{sessionId}/stop", {
          sessionId: args.sessionId,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useCreateApiV2SandboxesSessionsSessionIdStopResponse,
        { method: "POST" },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["sandboxes"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
