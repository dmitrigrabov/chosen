import { userEvent } from "packages/models/src/userEvent.generated.ts";
import { z } from "zod";
import { useQuery, queryOptions, keepPreviousData } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export const useGetApiV3EventsResponse = z.object({ events: z.array(userEvent) });

export type UseGetApiV3EventsArgs = {
  limit?: number | undefined;
  since?: string | undefined;
  until?: string | undefined;
  types?: string | undefined;
  userId?: string | undefined;
  principalId?: string | undefined;
  projectIds?: string | undefined;
  entityId?: string | undefined;
  withPayload?: string | undefined;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const getApiV3EventsQueryOptions = (args: UseGetApiV3EventsArgs) =>
  queryOptions({
    queryKey: [
      "GET /v3/events",
      "user",
      args.limit,
      args.since,
      args.until,
      args.types,
      args.userId,
      args.principalId,
      args.projectIds,
      args.entityId,
      args.withPayload,
      args.teamId,
      args.slug,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/v3/events", {
          limit: args.limit,
          since: args.since,
          until: args.until,
          types: args.types,
          userId: args.userId,
          principalId: args.principalId,
          projectIds: args.projectIds,
          entityId: args.entityId,
          withPayload: args.withPayload,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useGetApiV3EventsResponse,
        { method: "GET" },
      ),
    placeholderData: keepPreviousData,
  });

export const useGetApiV3Events = (args: UseGetApiV3EventsArgs) =>
  useQuery(getApiV3EventsQueryOptions(args));
