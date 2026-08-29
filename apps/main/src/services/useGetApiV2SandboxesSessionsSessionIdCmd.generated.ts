import { sessionCommand } from "packages/models/src/sessionCommand.generated.ts";
import { z } from "zod";
import { useQuery, queryOptions, keepPreviousData } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export const useGetApiV2SandboxesSessionsSessionIdCmdResponse = z.object({
  commands: z.array(sessionCommand),
});

export type UseGetApiV2SandboxesSessionsSessionIdCmdArgs = {
  sessionId: string;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const getApiV2SandboxesSessionsSessionIdCmdQueryOptions = (
  args: UseGetApiV2SandboxesSessionsSessionIdCmdArgs,
) =>
  queryOptions({
    queryKey: [
      "GET /v2/sandboxes/sessions/{sessionId}/cmd",
      "sandboxes",
      args.sessionId,
      args.teamId,
      args.slug,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/v2/sandboxes/sessions/{sessionId}/cmd", {
          sessionId: args.sessionId,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useGetApiV2SandboxesSessionsSessionIdCmdResponse,
        { method: "GET" },
      ),
    placeholderData: keepPreviousData,
  });

export const useGetApiV2SandboxesSessionsSessionIdCmd = (
  args: UseGetApiV2SandboxesSessionsSessionIdCmdArgs,
) => useQuery(getApiV2SandboxesSessionsSessionIdCmdQueryOptions(args));
