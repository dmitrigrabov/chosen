import { z } from "zod";
import { useQuery, queryOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiV1IntegrationsSearchRepoArgs = {
  query?: string | undefined;
  namespaceId?: (string | number | null) | undefined;
  provider?:
    | (
        | "github"
        | "github-limited"
        | "github-custom-host"
        | "gitlab"
        | "bitbucket"
        | "cursor-origin"
      )
    | undefined;
  installationId?: string | undefined;
  host?: string | undefined;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const useGetApiV1IntegrationsSearchRepoResponse = z.union([
  z.object({}),
  z.object({ error: z.object({ code: z.literal("installation_not_found"), message: z.string() }) }),
  z.object({
    gitAccount: z.object({ provider: z.string(), namespaceId: z.string().nullable() }),
    repos: z.array(
      z.object({
        id: z.string(),
        provider: z.literal("cursor-origin"),
        url: z.string(),
        name: z.string(),
        slug: z.string(),
        namespace: z.string(),
        ownerType: z.enum(["team", "user"]),
        owner: z.object({ id: z.string(), name: z.string() }),
        private: z.boolean(),
        defaultBranch: z.string(),
        updatedAt: z.number(),
      }),
    ),
  }),
  z.object({
    gitAccount: z.object({
      provider: z.enum([
        "bitbucket",
        "cursor-origin",
        "github",
        "github-custom-host",
        "github-limited",
        "gitlab",
        "vercel",
      ]),
      namespaceId: z.union([z.string(), z.number()]).nullable(),
    }),
    repos: z.array(
      z.object({
        id: z.union([z.string(), z.number()]),
        provider: z.enum([
          "bitbucket",
          "cursor-origin",
          "github",
          "github-custom-host",
          "github-limited",
          "gitlab",
          "vercel",
        ]),
        url: z.string(),
        name: z.string(),
        slug: z.string(),
        namespace: z.string(),
        owner: z.object({ id: z.union([z.string(), z.number()]), name: z.string() }),
        ownerType: z.enum(["team", "user"]),
        private: z.boolean(),
        defaultBranch: z.string(),
        updatedAt: z.number(),
      }),
    ),
  }),
]);

export const getApiV1IntegrationsSearchRepoQueryOptions = (
  args: UseGetApiV1IntegrationsSearchRepoArgs,
) =>
  queryOptions({
    queryKey: [
      "GET /v1/integrations/search-repo",
      "integrations",
      args.query,
      args.namespaceId,
      args.provider,
      args.installationId,
      args.host,
      args.teamId,
      args.slug,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/v1/integrations/search-repo", {
          query: args.query,
          namespaceId: args.namespaceId,
          provider: args.provider,
          installationId: args.installationId,
          host: args.host,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useGetApiV1IntegrationsSearchRepoResponse,
        { method: "GET" },
      ),
  });

export const useGetApiV1IntegrationsSearchRepo = (args: UseGetApiV1IntegrationsSearchRepoArgs) =>
  useQuery(getApiV1IntegrationsSearchRepoQueryOptions(args));
