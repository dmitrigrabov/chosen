import { z } from "zod";
import { useQuery, queryOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiV2TeamSlugProjectSlugRepositoryNameBlobsUploadsUuidArgs = {
  teamSlug: string;
  projectSlug: string;
  repositoryName: string;
  uuid: string;
};

export const useGetApiV2TeamSlugProjectSlugRepositoryNameBlobsUploadsUuidResponse = z.unknown();

export const getApiV2TeamSlugProjectSlugRepositoryNameBlobsUploadsUuidQueryOptions = (
  args: UseGetApiV2TeamSlugProjectSlugRepositoryNameBlobsUploadsUuidArgs,
) =>
  queryOptions({
    queryKey: [
      "GET /v2/{teamSlug}/{projectSlug}/{repositoryName}/blobs/uploads/{uuid}",
      "vcr",
      args.teamSlug,
      args.projectSlug,
      args.repositoryName,
      args.uuid,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/v2/{teamSlug}/{projectSlug}/{repositoryName}/blobs/uploads/{uuid}", {
          teamSlug: args.teamSlug,
          projectSlug: args.projectSlug,
          repositoryName: args.repositoryName,
          uuid: args.uuid,
        }),
        useGetApiV2TeamSlugProjectSlugRepositoryNameBlobsUploadsUuidResponse,
        { method: "GET" },
      ),
  });

export const useGetApiV2TeamSlugProjectSlugRepositoryNameBlobsUploadsUuid = (
  args: UseGetApiV2TeamSlugProjectSlugRepositoryNameBlobsUploadsUuidArgs,
) => useQuery(getApiV2TeamSlugProjectSlugRepositoryNameBlobsUploadsUuidQueryOptions(args));
