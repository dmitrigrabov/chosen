import { session, type Session } from "packages/models/src/session.generated.ts";
import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseCreateApiV2SandboxesSessionsSessionIdExtendTimeoutArgs = {
  sessionId: string;
  teamId?: string | undefined;
  slug?: string | undefined;
  body: { duration: number };
};

export const useCreateApiV2SandboxesSessionsSessionIdExtendTimeoutResponse = z.object({
  session: session,
});

export type UseCreateApiV2SandboxesSessionsSessionIdExtendTimeoutResponse = { session: Session };

export type CreateApiV2SandboxesSessionsSessionIdExtendTimeoutBody = { duration: number };

export const useCreateApiV2SandboxesSessionsSessionIdExtendTimeout = (
  options: UseMutationOptions<
    UseCreateApiV2SandboxesSessionsSessionIdExtendTimeoutResponse,
    Error,
    UseCreateApiV2SandboxesSessionsSessionIdExtendTimeoutArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiV2SandboxesSessionsSessionIdExtendTimeoutArgs) =>
      apiFetch(
        buildUrl("/v2/sandboxes/sessions/{sessionId}/extend-timeout", {
          sessionId: args.sessionId,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useCreateApiV2SandboxesSessionsSessionIdExtendTimeoutResponse,
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
