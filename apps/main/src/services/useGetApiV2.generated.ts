import { z } from "zod";
import { useQuery, queryOptions } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api/client";

export type UseGetApiV2Args = Record<string, never>;

export const useGetApiV2Response = z.object({});

export const getApiV2QueryOptions = () =>
  queryOptions({
    queryKey: ["GET /v2/", "vcr"],
    queryFn: () => apiFetch("/v2/", useGetApiV2Response, { method: "GET" }),
  });

export const useGetApiV2 = () => useQuery(getApiV2QueryOptions());
