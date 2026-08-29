import type { TldName } from "packages/models/src/tldName.generated.ts";
import { z } from "zod";
import { useQuery, queryOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiV1RegistrarTldsTldPriceArgs = {
  tld: TldName;
  years?: string | undefined;
  teamId?: string | undefined;
};

export const useGetApiV1RegistrarTldsTldPriceResponse = z.object({
  years: z.number(),
  purchasePrice: z.union([z.number().gte(0.01), z.string()]),
  renewalPrice: z.union([z.number().gte(0.01), z.string()]),
  transferPrice: z.union([z.number().gte(0.01), z.string()]),
});

export const getApiV1RegistrarTldsTldPriceQueryOptions = (
  args: UseGetApiV1RegistrarTldsTldPriceArgs,
) =>
  queryOptions({
    queryKey: [
      "GET /v1/registrar/tlds/{tld}/price",
      "domains-registrar",
      args.tld,
      args.years,
      args.teamId,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/v1/registrar/tlds/{tld}/price", {
          tld: args.tld,
          years: args.years,
          teamId: args.teamId,
        }),
        useGetApiV1RegistrarTldsTldPriceResponse,
        { method: "GET" },
      ),
  });

export const useGetApiV1RegistrarTldsTldPrice = (args: UseGetApiV1RegistrarTldsTldPriceArgs) =>
  useQuery(getApiV1RegistrarTldsTldPriceQueryOptions(args));
