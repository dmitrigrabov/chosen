import { z } from "zod";
import { pagination } from "packages/models/src/pagination.generated.ts";
import { useQuery, queryOptions, keepPreviousData } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export const useGetApiV8CertsResponse = z.object({
  certs: z.array(
    z.object({
      id: z.string(),
      createdAt: z.number(),
      expiresAt: z.number(),
      autoRenew: z.boolean(),
      cns: z.array(z.string()),
    }),
  ),
  pagination: pagination,
});

export type UseGetApiV8CertsArgs = { teamId?: string | undefined; slug?: string | undefined };

export const getApiV8CertsQueryOptions = (args: UseGetApiV8CertsArgs) =>
  queryOptions({
    queryKey: ["GET /v8/certs", "certs", args.teamId, args.slug],
    queryFn: () =>
      apiFetch(
        buildUrl("/v8/certs", { teamId: args.teamId, slug: args.slug }),
        useGetApiV8CertsResponse,
        { method: "GET" },
      ),
    placeholderData: keepPreviousData,
  });

export const useGetApiV8Certs = (args: UseGetApiV8CertsArgs) =>
  useQuery(getApiV8CertsQueryOptions(args));
