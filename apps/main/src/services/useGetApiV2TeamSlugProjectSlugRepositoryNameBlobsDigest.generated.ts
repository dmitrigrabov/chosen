import { z } from "zod";
import { useQuery, queryOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiV2TeamSlugProjectSlugRepositoryNameBlobsDigestArgs = {
  teamSlug: string;
  projectSlug: string;
  repositoryName: string;
  digest: string;
};

export const useGetApiV2TeamSlugProjectSlugRepositoryNameBlobsDigestResponse = z.void();

export const getApiV2TeamSlugProjectSlugRepositoryNameBlobsDigestQueryOptions = (
  args: UseGetApiV2TeamSlugProjectSlugRepositoryNameBlobsDigestArgs,
) =>
  queryOptions({
    queryKey: [
      "GET /v2/{teamSlug}/{projectSlug}/{repositoryName}/blobs/{digest}",
      "vcr",
      args.teamSlug,
      args.projectSlug,
      args.repositoryName,
      args.digest,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/v2/{teamSlug}/{projectSlug}/{repositoryName}/blobs/{digest}", {
          teamSlug: args.teamSlug,
          projectSlug: args.projectSlug,
          repositoryName: args.repositoryName,
          digest: args.digest,
        }),
        useGetApiV2TeamSlugProjectSlugRepositoryNameBlobsDigestResponse,
        { method: "GET" },
      ),
  });

export const useGetApiV2TeamSlugProjectSlugRepositoryNameBlobsDigest = (
  args: UseGetApiV2TeamSlugProjectSlugRepositoryNameBlobsDigestArgs,
) => useQuery(getApiV2TeamSlugProjectSlugRepositoryNameBlobsDigestQueryOptions(args));
