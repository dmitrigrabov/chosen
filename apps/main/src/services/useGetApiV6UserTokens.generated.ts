import { authToken } from "packages/models/src/authToken.generated.ts";
import { z } from "zod";
import { pagination } from "packages/models/src/pagination.generated.ts";
import { useQuery, queryOptions } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api/client";

export type UseGetApiV6UserTokensArgs = Record<string, never>;

export const useGetApiV6UserTokensResponse = z.union([
  z.object({
    tokens: z.array(authToken),
    pagination: z.object({
      count: z.number(),
      next: z.string().nullable(),
      prev: z.string().nullable(),
    }),
  }),
  z.object({ tokens: z.array(authToken), pagination: pagination }),
]);

export const getApiV6UserTokensQueryOptions = () =>
  queryOptions({
    queryKey: ["GET /v6/user/tokens", "authentication"],
    queryFn: () => apiFetch("/v6/user/tokens", useGetApiV6UserTokensResponse, { method: "GET" }),
  });

export const useGetApiV6UserTokens = () => useQuery(getApiV6UserTokensQueryOptions());
