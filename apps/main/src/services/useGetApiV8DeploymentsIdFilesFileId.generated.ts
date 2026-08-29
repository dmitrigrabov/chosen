import { z } from "zod";
import { useQuery, queryOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiV8DeploymentsIdFilesFileIdArgs = {
  id: string;
  fileId: string;
  path?: string | undefined;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const useGetApiV8DeploymentsIdFilesFileIdResponse = z.void();

export const getApiV8DeploymentsIdFilesFileIdQueryOptions = (
  args: UseGetApiV8DeploymentsIdFilesFileIdArgs,
) =>
  queryOptions({
    queryKey: [
      "GET /v8/deployments/{id}/files/{fileId}",
      "deployments",
      args.id,
      args.fileId,
      args.path,
      args.teamId,
      args.slug,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/v8/deployments/{id}/files/{fileId}", {
          id: args.id,
          fileId: args.fileId,
          path: args.path,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useGetApiV8DeploymentsIdFilesFileIdResponse,
        { method: "GET" },
      ),
  });

export const useGetApiV8DeploymentsIdFilesFileId = (
  args: UseGetApiV8DeploymentsIdFilesFileIdArgs,
) => useQuery(getApiV8DeploymentsIdFilesFileIdQueryOptions(args));
