import { z } from "zod";
import { useQuery, queryOptions, keepPreviousData } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export const useGetApiV8CertsIdResponse = z.object({
  id: z.string(),
  createdAt: z.number(),
  expiresAt: z.number(),
  autoRenew: z.boolean(),
  cns: z.array(z.string()),
});

export type UseGetApiV8CertsIdArgs = {
  id: string;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const getApiV8CertsIdQueryOptions = (args: UseGetApiV8CertsIdArgs) =>
  queryOptions({
    queryKey: ["GET /v8/certs/{id}", "certs", args.id, args.teamId, args.slug],
    queryFn: () =>
      apiFetch(
        buildUrl("/v8/certs/{id}", { id: args.id, teamId: args.teamId, slug: args.slug }),
        useGetApiV8CertsIdResponse,
        { method: "GET" },
      ),
    placeholderData: keepPreviousData,
  });

export const useGetApiV8CertsId = (args: UseGetApiV8CertsIdArgs) =>
  useQuery(getApiV8CertsIdQueryOptions(args));
