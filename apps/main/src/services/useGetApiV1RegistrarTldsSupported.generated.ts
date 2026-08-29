import { tldName } from "packages/models/src/tldName.generated.ts";
import { z } from "zod";
import { useQuery, queryOptions, keepPreviousData } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export const useGetApiV1RegistrarTldsSupportedResponse = z.array(tldName);

export type UseGetApiV1RegistrarTldsSupportedArgs = { teamId?: string | undefined };

export const getApiV1RegistrarTldsSupportedQueryOptions = (
  args: UseGetApiV1RegistrarTldsSupportedArgs,
) =>
  queryOptions({
    queryKey: ["GET /v1/registrar/tlds/supported", "domains-registrar", args.teamId],
    queryFn: () =>
      apiFetch(
        buildUrl("/v1/registrar/tlds/supported", { teamId: args.teamId }),
        useGetApiV1RegistrarTldsSupportedResponse,
        { method: "GET" },
      ),
    placeholderData: keepPreviousData,
  });

export const useGetApiV1RegistrarTldsSupported = (args: UseGetApiV1RegistrarTldsSupportedArgs) =>
  useQuery(getApiV1RegistrarTldsSupportedQueryOptions(args));
