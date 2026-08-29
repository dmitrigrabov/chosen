import { z } from "zod";
import { useQuery, queryOptions, keepPreviousData } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export const useGetApiV9ProjectsIdOrNameDomainsDomainResponse = z.object({
  name: z.string(),
  apexName: z.string(),
  projectId: z.string(),
  redirect: z.string().nullable().optional(),
  redirectStatusCode: z
    .union([z.literal(301), z.literal(302), z.literal(307), z.literal(308), z.literal(null)])
    .nullable()
    .optional(),
  gitBranch: z.string().nullable().optional(),
  customEnvironmentId: z.string().nullable().optional(),
  updatedAt: z.number().optional(),
  createdAt: z.number().optional(),
  verified: z.boolean(),
  verification: z
    .array(
      z.object({ type: z.string(), domain: z.string(), value: z.string(), reason: z.string() }),
    )
    .optional(),
});

export type UseGetApiV9ProjectsIdOrNameDomainsDomainArgs = {
  idOrName: string;
  domain: string;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const getApiV9ProjectsIdOrNameDomainsDomainQueryOptions = (
  args: UseGetApiV9ProjectsIdOrNameDomainsDomainArgs,
) =>
  queryOptions({
    queryKey: [
      "GET /v9/projects/{idOrName}/domains/{domain}",
      "projects",
      args.idOrName,
      args.domain,
      args.teamId,
      args.slug,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/v9/projects/{idOrName}/domains/{domain}", {
          idOrName: args.idOrName,
          domain: args.domain,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useGetApiV9ProjectsIdOrNameDomainsDomainResponse,
        { method: "GET" },
      ),
    placeholderData: keepPreviousData,
  });

export const useGetApiV9ProjectsIdOrNameDomainsDomain = (
  args: UseGetApiV9ProjectsIdOrNameDomainsDomainArgs,
) => useQuery(getApiV9ProjectsIdOrNameDomainsDomainQueryOptions(args));
