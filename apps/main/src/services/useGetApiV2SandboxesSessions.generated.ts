import { z } from "zod";
import { session } from "packages/models/src/session.generated.ts";
import { useQuery, queryOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiV2SandboxesSessionsArgs = {
  project?: string | undefined;
  name?: string | undefined;
  limit?: number | undefined;
  cursor?: string | undefined;
  sortOrder?: ("asc" | "desc") | undefined;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const useGetApiV2SandboxesSessionsResponse = z.union([
  z.object({}),
  z.object({
    sessions: z.array(session),
    pagination: z.object({ count: z.number(), next: z.string().nullable() }),
  }),
]);

export const getApiV2SandboxesSessionsQueryOptions = (args: UseGetApiV2SandboxesSessionsArgs) =>
  queryOptions({
    queryKey: [
      "GET /v2/sandboxes/sessions",
      "sandboxes",
      args.project,
      args.name,
      args.limit,
      args.cursor,
      args.sortOrder,
      args.teamId,
      args.slug,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/v2/sandboxes/sessions", {
          project: args.project,
          name: args.name,
          limit: args.limit,
          cursor: args.cursor,
          sortOrder: args.sortOrder,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useGetApiV2SandboxesSessionsResponse,
        { method: "GET" },
      ),
  });

export const useGetApiV2SandboxesSessions = (args: UseGetApiV2SandboxesSessionsArgs) =>
  useQuery(getApiV2SandboxesSessionsQueryOptions(args));
