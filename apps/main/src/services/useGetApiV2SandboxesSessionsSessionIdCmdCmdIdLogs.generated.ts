import { z } from "zod";
import { useQuery, queryOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiV2SandboxesSessionsSessionIdCmdCmdIdLogsArgs = {
  sessionId: string;
  cmdId: string;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const useGetApiV2SandboxesSessionsSessionIdCmdCmdIdLogsResponse = z.void();

export const getApiV2SandboxesSessionsSessionIdCmdCmdIdLogsQueryOptions = (
  args: UseGetApiV2SandboxesSessionsSessionIdCmdCmdIdLogsArgs,
) =>
  queryOptions({
    queryKey: [
      "GET /v2/sandboxes/sessions/{sessionId}/cmd/{cmdId}/logs",
      "sandboxes",
      args.sessionId,
      args.cmdId,
      args.teamId,
      args.slug,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/v2/sandboxes/sessions/{sessionId}/cmd/{cmdId}/logs", {
          sessionId: args.sessionId,
          cmdId: args.cmdId,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useGetApiV2SandboxesSessionsSessionIdCmdCmdIdLogsResponse,
        { method: "GET" },
      ),
  });

export const useGetApiV2SandboxesSessionsSessionIdCmdCmdIdLogs = (
  args: UseGetApiV2SandboxesSessionsSessionIdCmdCmdIdLogsArgs,
) => useQuery(getApiV2SandboxesSessionsSessionIdCmdCmdIdLogsQueryOptions(args));
