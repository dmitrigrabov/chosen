import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseCreateApiV2SandboxesSessionsSessionIdFsReadArgs = {
  sessionId: string;
  teamId?: string | undefined;
  slug?: string | undefined;
  body: { cwd?: string | undefined; path: string };
};

export const useCreateApiV2SandboxesSessionsSessionIdFsReadResponse = z.void();

export type UseCreateApiV2SandboxesSessionsSessionIdFsReadResponse = void;

export type CreateApiV2SandboxesSessionsSessionIdFsReadBody = {
  cwd?: string | undefined;
  path: string;
};

export const useCreateApiV2SandboxesSessionsSessionIdFsRead = (
  options: UseMutationOptions<
    UseCreateApiV2SandboxesSessionsSessionIdFsReadResponse,
    Error,
    UseCreateApiV2SandboxesSessionsSessionIdFsReadArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiV2SandboxesSessionsSessionIdFsReadArgs) =>
      apiFetch(
        buildUrl("/v2/sandboxes/sessions/{sessionId}/fs/read", {
          sessionId: args.sessionId,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useCreateApiV2SandboxesSessionsSessionIdFsReadResponse,
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
