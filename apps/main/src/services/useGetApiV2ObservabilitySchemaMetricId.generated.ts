import { z } from "zod";
import { useQuery, queryOptions, keepPreviousData } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export const useGetApiV2ObservabilitySchemaMetricIdResponse = z.array(
  z.object({
    id: z.string(),
    description: z.string(),
    dimensions: z.array(
      z.object({ name: z.string(), label: z.string(), description: z.string().optional() }),
    ),
    unit: z.string(),
    aggregations: z.array(z.string()),
    defaultAggregation: z.string(),
  }),
);

export type UseGetApiV2ObservabilitySchemaMetricIdArgs = { metricId: string };

export const getApiV2ObservabilitySchemaMetricIdQueryOptions = (
  args: UseGetApiV2ObservabilitySchemaMetricIdArgs,
) =>
  queryOptions({
    queryKey: ["GET /v2/observability/schema/{metricId}", args.metricId],
    queryFn: () =>
      apiFetch(
        buildUrl("/v2/observability/schema/{metricId}", { metricId: args.metricId }),
        useGetApiV2ObservabilitySchemaMetricIdResponse,
        { method: "GET" },
      ),
    placeholderData: keepPreviousData,
  });

export const useGetApiV2ObservabilitySchemaMetricId = (
  args: UseGetApiV2ObservabilitySchemaMetricIdArgs,
) => useQuery(getApiV2ObservabilitySchemaMetricIdQueryOptions(args));
