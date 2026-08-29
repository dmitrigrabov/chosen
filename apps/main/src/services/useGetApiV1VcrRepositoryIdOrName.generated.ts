import { vcrRepository } from "packages/models/src/vcrRepository.generated.ts";
import { z } from "zod";
import { useQuery, queryOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiV1VcrRepositoryIdOrNameArgs = {
  projectId: string;
  idOrName: string;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const useGetApiV1VcrRepositoryIdOrNameResponse = z.object({ repository: vcrRepository });

export const getApiV1VcrRepositoryIdOrNameQueryOptions = (
  args: UseGetApiV1VcrRepositoryIdOrNameArgs,
) =>
  queryOptions({
    queryKey: [
      "GET /v1/vcr/repository/{idOrName}",
      "vcr",
      args.projectId,
      args.idOrName,
      args.teamId,
      args.slug,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/v1/vcr/repository/{idOrName}", {
          idOrName: args.idOrName,
          projectId: args.projectId,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useGetApiV1VcrRepositoryIdOrNameResponse,
        { method: "GET" },
      ),
  });

export const useGetApiV1VcrRepositoryIdOrName = (args: UseGetApiV1VcrRepositoryIdOrNameArgs) =>
  useQuery(getApiV1VcrRepositoryIdOrNameQueryOptions(args));
