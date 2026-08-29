import {
  sessionCommand,
  type SessionCommand,
} from "packages/models/src/sessionCommand.generated.ts";
import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseCreateApiV2SandboxesSessionsSessionIdCmdCmdIdKillArgs = {
  cmdId: string;
  sessionId: string;
  teamId?: string | undefined;
  slug?: string | undefined;
  body: { signal: number };
};

export const useCreateApiV2SandboxesSessionsSessionIdCmdCmdIdKillResponse = z.object({
  command: sessionCommand,
});

export type UseCreateApiV2SandboxesSessionsSessionIdCmdCmdIdKillResponse = {
  command: SessionCommand;
};

export type CreateApiV2SandboxesSessionsSessionIdCmdCmdIdKillBody = { signal: number };

export const useCreateApiV2SandboxesSessionsSessionIdCmdCmdIdKill = (
  options: UseMutationOptions<
    UseCreateApiV2SandboxesSessionsSessionIdCmdCmdIdKillResponse,
    Error,
    UseCreateApiV2SandboxesSessionsSessionIdCmdCmdIdKillArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiV2SandboxesSessionsSessionIdCmdCmdIdKillArgs) =>
      apiFetch(
        buildUrl("/v2/sandboxes/sessions/{sessionId}/cmd/{cmdId}/kill", {
          cmdId: args.cmdId,
          sessionId: args.sessionId,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useCreateApiV2SandboxesSessionsSessionIdCmdCmdIdKillResponse,
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
