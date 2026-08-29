import { z } from "zod";
import { useQuery, queryOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiV1MicrofrontendsProjectsProjectIdOrNameProductionMfeConfigArgs = {
  projectIdOrName: string;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const useGetApiV1MicrofrontendsProjectsProjectIdOrNameProductionMfeConfigResponse = z.object(
  {
    config: z
      .object({
        $schema: z.string().optional(),
        version: z.literal("1").optional(),
        applications: z.record(
          z.string(),
          z.union([
            z.object({
              development: z.object({
                fallback: z.string(),
                local: z.union([z.string(), z.number()]).optional(),
                task: z.string().optional(),
              }),
              packageName: z.string().optional(),
              projectId: z.string(),
            }),
            z.object({
              development: z
                .object({
                  fallback: z.string().optional(),
                  local: z.union([z.string(), z.number()]).optional(),
                  task: z.string().optional(),
                })
                .optional(),
              routing: z.array(
                z.object({
                  group: z.string().optional(),
                  flag: z.string().optional(),
                  paths: z.array(z.string()),
                }),
              ),
              assetPrefix: z.string().optional(),
              packageName: z.string().optional(),
              projectId: z.string(),
            }),
          ]),
        ),
        options: z
          .object({
            disableOverrides: z.boolean().optional(),
            localProxyPort: z.number().optional(),
          })
          .optional(),
      })
      .nullable(),
  },
);

export const getApiV1MicrofrontendsProjectsProjectIdOrNameProductionMfeConfigQueryOptions = (
  args: UseGetApiV1MicrofrontendsProjectsProjectIdOrNameProductionMfeConfigArgs,
) =>
  queryOptions({
    queryKey: [
      "GET /v1/microfrontends/projects/{projectIdOrName}/production-mfe-config",
      "microfrontends",
      args.projectIdOrName,
      args.teamId,
      args.slug,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/v1/microfrontends/projects/{projectIdOrName}/production-mfe-config", {
          projectIdOrName: args.projectIdOrName,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useGetApiV1MicrofrontendsProjectsProjectIdOrNameProductionMfeConfigResponse,
        { method: "GET" },
      ),
  });

export const useGetApiV1MicrofrontendsProjectsProjectIdOrNameProductionMfeConfig = (
  args: UseGetApiV1MicrofrontendsProjectsProjectIdOrNameProductionMfeConfigArgs,
) => useQuery(getApiV1MicrofrontendsProjectsProjectIdOrNameProductionMfeConfigQueryOptions(args));
