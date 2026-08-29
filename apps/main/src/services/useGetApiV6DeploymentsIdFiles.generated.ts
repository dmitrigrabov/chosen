import { fileTree } from "packages/models/src/fileTree.generated.ts";
import { z } from "zod";
import { useQuery, queryOptions, keepPreviousData } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export const useGetApiV6DeploymentsIdFilesResponse = z.array(fileTree);

export type UseGetApiV6DeploymentsIdFilesArgs = {
  id: string;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const getApiV6DeploymentsIdFilesQueryOptions = (args: UseGetApiV6DeploymentsIdFilesArgs) =>
  queryOptions({
    queryKey: ["GET /v6/deployments/{id}/files", "deployments", args.id, args.teamId, args.slug],
    queryFn: () =>
      apiFetch(
        buildUrl("/v6/deployments/{id}/files", {
          id: args.id,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useGetApiV6DeploymentsIdFilesResponse,
        { method: "GET" },
      ),
    placeholderData: keepPreviousData,
  });

export const useGetApiV6DeploymentsIdFiles = (args: UseGetApiV6DeploymentsIdFilesArgs) =>
  useQuery(getApiV6DeploymentsIdFilesQueryOptions(args));
