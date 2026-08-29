import { z } from "zod";
import { useQuery, queryOptions, keepPreviousData } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export const useGetApiV1IntegrationsGitNamespacesResponse = z.array(
  z.object({
    provider: z.string(),
    slug: z.string(),
    id: z.union([z.string(), z.number()]),
    ownerType: z.string(),
    name: z.string().optional(),
    isAccessRestricted: z.boolean().optional(),
    installationId: z.number().optional(),
    requireReauth: z.boolean().optional(),
    viewer: z
      .object({
        canCreateApp: z.boolean().optional(),
        role: z.union([z.string(), z.number()]).optional(),
      })
      .optional(),
  }),
);

export type UseGetApiV1IntegrationsGitNamespacesArgs = {
  host?: string | undefined;
  provider?:
    | ("github" | "github-limited" | "github-custom-host" | "gitlab" | "bitbucket")
    | undefined;
  viewerMetadata?: boolean | undefined;
};

export const getApiV1IntegrationsGitNamespacesQueryOptions = (
  args: UseGetApiV1IntegrationsGitNamespacesArgs,
) =>
  queryOptions({
    queryKey: [
      "GET /v1/integrations/git-namespaces",
      "integrations",
      args.host,
      args.provider,
      args.viewerMetadata,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/v1/integrations/git-namespaces", {
          host: args.host,
          provider: args.provider,
          viewerMetadata: args.viewerMetadata,
        }),
        useGetApiV1IntegrationsGitNamespacesResponse,
        { method: "GET" },
      ),
    placeholderData: keepPreviousData,
  });

export const useGetApiV1IntegrationsGitNamespaces = (
  args: UseGetApiV1IntegrationsGitNamespacesArgs,
) => useQuery(getApiV1IntegrationsGitNamespacesQueryOptions(args));
