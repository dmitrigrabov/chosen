import { session } from "packages/models/src/session.generated.ts";
import { sandboxPublicRoute } from "packages/models/src/sandboxPublicRoute.generated.ts";
import { z } from "zod";
import { useQuery, queryOptions, keepPreviousData } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export const useGetApiV2SandboxesSessionsSessionIdResponse = z.object({
  session: session,
  routes: z.array(sandboxPublicRoute),
});

export type UseGetApiV2SandboxesSessionsSessionIdArgs = {
  sessionId: string;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const getApiV2SandboxesSessionsSessionIdQueryOptions = (
  args: UseGetApiV2SandboxesSessionsSessionIdArgs,
) =>
  queryOptions({
    queryKey: [
      "GET /v2/sandboxes/sessions/{sessionId}",
      "sandboxes",
      args.sessionId,
      args.teamId,
      args.slug,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/v2/sandboxes/sessions/{sessionId}", {
          sessionId: args.sessionId,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useGetApiV2SandboxesSessionsSessionIdResponse,
        { method: "GET" },
      ),
    placeholderData: keepPreviousData,
  });

export const useGetApiV2SandboxesSessionsSessionId = (
  args: UseGetApiV2SandboxesSessionsSessionIdArgs,
) => useQuery(getApiV2SandboxesSessionsSessionIdQueryOptions(args));
