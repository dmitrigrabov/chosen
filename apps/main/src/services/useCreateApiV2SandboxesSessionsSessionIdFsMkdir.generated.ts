import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseCreateApiV2SandboxesSessionsSessionIdFsMkdirArgs = {
  sessionId: string;
  teamId?: string | undefined;
  slug?: string | undefined;
  body: { cwd?: string | undefined; path: string; recursive?: boolean | undefined };
};

export const useCreateApiV2SandboxesSessionsSessionIdFsMkdirResponse = z.object({});

export type UseCreateApiV2SandboxesSessionsSessionIdFsMkdirResponse = Record<string, never>;

export type CreateApiV2SandboxesSessionsSessionIdFsMkdirBody = {
  cwd?: string | undefined;
  path: string;
  recursive?: boolean | undefined;
};

export const useCreateApiV2SandboxesSessionsSessionIdFsMkdir = (
  options: UseMutationOptions<
    UseCreateApiV2SandboxesSessionsSessionIdFsMkdirResponse,
    Error,
    UseCreateApiV2SandboxesSessionsSessionIdFsMkdirArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiV2SandboxesSessionsSessionIdFsMkdirArgs) =>
      apiFetch(
        buildUrl("/v2/sandboxes/sessions/{sessionId}/fs/mkdir", {
          sessionId: args.sessionId,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useCreateApiV2SandboxesSessionsSessionIdFsMkdirResponse,
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
