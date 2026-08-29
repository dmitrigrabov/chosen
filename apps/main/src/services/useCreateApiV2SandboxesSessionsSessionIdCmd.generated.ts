import {
  sessionCommand,
  type SessionCommand,
} from "packages/models/src/sessionCommand.generated.ts";
import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseCreateApiV2SandboxesSessionsSessionIdCmdArgs = {
  sessionId: string;
  cmdId: string;
  teamId?: string | undefined;
  slug?: string | undefined;
  body: {
    command: string;
    args?: Array<string> | undefined;
    cwd?: string | undefined;
    env?: Record<string, string> | undefined;
    sudo?: boolean | undefined;
    wait?: boolean | undefined;
    logs?: boolean | undefined;
    timeout?: number | undefined;
  };
};

export const useCreateApiV2SandboxesSessionsSessionIdCmdResponse = z.object({
  command: sessionCommand,
});

export type UseCreateApiV2SandboxesSessionsSessionIdCmdResponse = { command: SessionCommand };

export type CreateApiV2SandboxesSessionsSessionIdCmdBody = {
  command: string;
  args?: Array<string> | undefined;
  cwd?: string | undefined;
  env?: Record<string, string> | undefined;
  sudo?: boolean | undefined;
  wait?: boolean | undefined;
  logs?: boolean | undefined;
  timeout?: number | undefined;
};

export const useCreateApiV2SandboxesSessionsSessionIdCmd = (
  options: UseMutationOptions<
    UseCreateApiV2SandboxesSessionsSessionIdCmdResponse,
    Error,
    UseCreateApiV2SandboxesSessionsSessionIdCmdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiV2SandboxesSessionsSessionIdCmdArgs) =>
      apiFetch(
        buildUrl("/v2/sandboxes/sessions/{sessionId}/cmd", {
          sessionId: args.sessionId,
          cmdId: args.cmdId,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useCreateApiV2SandboxesSessionsSessionIdCmdResponse,
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
