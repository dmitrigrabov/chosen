import { sessionCommand } from "packages/models/src/sessionCommand.generated.ts";
import { z } from "zod";
import { useQuery, queryOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiV2SandboxesSessionsSessionIdCmdCmdIdArgs = {
  sessionId: string;
  cmdId: string;
  wait?: ("true" | "false") | undefined;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const useGetApiV2SandboxesSessionsSessionIdCmdCmdIdResponse = z.object({
  command: sessionCommand,
});

export const getApiV2SandboxesSessionsSessionIdCmdCmdIdQueryOptions = (
  args: UseGetApiV2SandboxesSessionsSessionIdCmdCmdIdArgs,
) =>
  queryOptions({
    queryKey: [
      "GET /v2/sandboxes/sessions/{sessionId}/cmd/{cmdId}",
      "sandboxes",
      args.sessionId,
      args.cmdId,
      args.wait,
      args.teamId,
      args.slug,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/v2/sandboxes/sessions/{sessionId}/cmd/{cmdId}", {
          sessionId: args.sessionId,
          cmdId: args.cmdId,
          wait: args.wait,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useGetApiV2SandboxesSessionsSessionIdCmdCmdIdResponse,
        { method: "GET" },
      ),
  });

export const useGetApiV2SandboxesSessionsSessionIdCmdCmdId = (
  args: UseGetApiV2SandboxesSessionsSessionIdCmdCmdIdArgs,
) => useQuery(getApiV2SandboxesSessionsSessionIdCmdCmdIdQueryOptions(args));
