import { z } from "zod";
import { useQuery, queryOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiV2TeamSlugProjectSlugRepositoryNameManifestsReferenceArgs = {
  teamSlug: string;
  projectSlug: string;
  repositoryName: string;
  reference: string;
};

export const useGetApiV2TeamSlugProjectSlugRepositoryNameManifestsReferenceResponse = z.void();

export const getApiV2TeamSlugProjectSlugRepositoryNameManifestsReferenceQueryOptions = (
  args: UseGetApiV2TeamSlugProjectSlugRepositoryNameManifestsReferenceArgs,
) =>
  queryOptions({
    queryKey: [
      "GET /v2/{teamSlug}/{projectSlug}/{repositoryName}/manifests/{reference}",
      "vcr",
      args.teamSlug,
      args.projectSlug,
      args.repositoryName,
      args.reference,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/v2/{teamSlug}/{projectSlug}/{repositoryName}/manifests/{reference}", {
          teamSlug: args.teamSlug,
          projectSlug: args.projectSlug,
          repositoryName: args.repositoryName,
          reference: args.reference,
        }),
        useGetApiV2TeamSlugProjectSlugRepositoryNameManifestsReferenceResponse,
        { method: "GET" },
      ),
  });

export const useGetApiV2TeamSlugProjectSlugRepositoryNameManifestsReference = (
  args: UseGetApiV2TeamSlugProjectSlugRepositoryNameManifestsReferenceArgs,
) => useQuery(getApiV2TeamSlugProjectSlugRepositoryNameManifestsReferenceQueryOptions(args));
