import type { TldName } from "packages/models/src/tldName.generated.ts";
import { z } from "zod";
import { useQuery, queryOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiV1RegistrarTldsTldArgs = { tld: TldName; teamId?: string | undefined };

export const useGetApiV1RegistrarTldsTldResponse = z.object({
  supportedLanguageCodes: z.record(z.string(), z.string()),
});

export const getApiV1RegistrarTldsTldQueryOptions = (args: UseGetApiV1RegistrarTldsTldArgs) =>
  queryOptions({
    queryKey: ["GET /v1/registrar/tlds/{tld}", "domains-registrar", args.tld, args.teamId],
    queryFn: () =>
      apiFetch(
        buildUrl("/v1/registrar/tlds/{tld}", { tld: args.tld, teamId: args.teamId }),
        useGetApiV1RegistrarTldsTldResponse,
        { method: "GET" },
      ),
  });

export const useGetApiV1RegistrarTldsTld = (args: UseGetApiV1RegistrarTldsTldArgs) =>
  useQuery(getApiV1RegistrarTldsTldQueryOptions(args));
