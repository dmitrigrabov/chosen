import { z } from "zod";
import { useQuery, queryOptions, keepPreviousData } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api/client";

export const useGetApiV2ObservabilitySchemaResponse = z.object({
  metrics: z.array(z.object({ id: z.string(), description: z.string() })),
});

export type UseGetApiV2ObservabilitySchemaArgs = Record<string, never>;

export const getApiV2ObservabilitySchemaQueryOptions = () =>
  queryOptions({
    queryKey: ["GET /v2/observability/schema"],
    queryFn: () =>
      apiFetch("/v2/observability/schema", useGetApiV2ObservabilitySchemaResponse, {
        method: "GET",
      }),
    placeholderData: keepPreviousData,
  });

export const useGetApiV2ObservabilitySchema = () =>
  useQuery(getApiV2ObservabilitySchemaQueryOptions());
