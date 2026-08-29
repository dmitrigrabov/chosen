import { listEventTypesResponse } from "packages/models/src/listEventTypesResponse.generated.ts";
import { useQuery, queryOptions, keepPreviousData } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiV1EventsTypesArgs = { teamId?: string | undefined; slug?: string | undefined };

export const getApiV1EventsTypesQueryOptions = (args: UseGetApiV1EventsTypesArgs) =>
  queryOptions({
    queryKey: ["GET /v1/events/types", "user", args.teamId, args.slug],
    queryFn: () =>
      apiFetch(
        buildUrl("/v1/events/types", { teamId: args.teamId, slug: args.slug }),
        listEventTypesResponse,
        { method: "GET" },
      ),
    placeholderData: keepPreviousData,
  });

export const useGetApiV1EventsTypes = (args: UseGetApiV1EventsTypesArgs) =>
  useQuery(getApiV1EventsTypesQueryOptions(args));
