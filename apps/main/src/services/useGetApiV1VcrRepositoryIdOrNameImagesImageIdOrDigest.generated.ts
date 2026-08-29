import { vcrImageDetail } from "packages/models/src/vcrImageDetail.generated.ts";
import { z } from "zod";
import { useQuery, queryOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiV1VcrRepositoryIdOrNameImagesImageIdOrDigestArgs = {
  projectId: string;
  idOrName: string;
  imageIdOrDigest: string;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const useGetApiV1VcrRepositoryIdOrNameImagesImageIdOrDigestResponse = z.object({
  image: vcrImageDetail,
});

export const getApiV1VcrRepositoryIdOrNameImagesImageIdOrDigestQueryOptions = (
  args: UseGetApiV1VcrRepositoryIdOrNameImagesImageIdOrDigestArgs,
) =>
  queryOptions({
    queryKey: [
      "GET /v1/vcr/repository/{idOrName}/images/{imageIdOrDigest}",
      "vcr",
      args.projectId,
      args.idOrName,
      args.imageIdOrDigest,
      args.teamId,
      args.slug,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/v1/vcr/repository/{idOrName}/images/{imageIdOrDigest}", {
          idOrName: args.idOrName,
          imageIdOrDigest: args.imageIdOrDigest,
          projectId: args.projectId,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useGetApiV1VcrRepositoryIdOrNameImagesImageIdOrDigestResponse,
        { method: "GET" },
      ),
  });

export const useGetApiV1VcrRepositoryIdOrNameImagesImageIdOrDigest = (
  args: UseGetApiV1VcrRepositoryIdOrNameImagesImageIdOrDigestArgs,
) => useQuery(getApiV1VcrRepositoryIdOrNameImagesImageIdOrDigestQueryOptions(args));
