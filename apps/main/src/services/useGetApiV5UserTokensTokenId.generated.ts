import { authToken } from "packages/models/src/authToken.generated.ts";
import { z } from "zod";
import { useQuery, queryOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiV5UserTokensTokenIdArgs = { tokenId: string };

export const useGetApiV5UserTokensTokenIdResponse = z.object({ token: authToken });

export const getApiV5UserTokensTokenIdQueryOptions = (args: UseGetApiV5UserTokensTokenIdArgs) =>
  queryOptions({
    queryKey: ["GET /v5/user/tokens/{tokenId}", "authentication", args.tokenId],
    queryFn: () =>
      apiFetch(
        buildUrl("/v5/user/tokens/{tokenId}", { tokenId: args.tokenId }),
        useGetApiV5UserTokensTokenIdResponse,
        { method: "GET" },
      ),
  });

export const useGetApiV5UserTokensTokenId = (args: UseGetApiV5UserTokensTokenIdArgs) =>
  useQuery(getApiV5UserTokensTokenIdQueryOptions(args));
