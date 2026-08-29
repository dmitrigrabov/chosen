import { z } from "zod";
import { useQuery, queryOptions, keepPreviousData } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export const useGetApiV1ProjectsProjectIdOrNameFeatureFlagsFlagsFlagIdOrSlugVersionsResponse =
  z.object({
    versions: z.array(
      z.object({
        id: z.string(),
        revision: z.number(),
        createdAt: z.number(),
        createdBy: z.string().optional(),
        message: z.string().optional(),
        flagId: z.string(),
        changedEnvironments: z.array(z.string()),
        data: z.object({
          description: z.string().optional(),
          variants: z.array(z.object({})),
          environments: z.record(
            z.string(),
            z.object({
              reuse: z.object({ active: z.boolean(), environment: z.string() }).optional(),
              targets: z
                .record(
                  z.string(),
                  z.record(
                    z.string(),
                    z.record(
                      z.string(),
                      z.array(z.object({ note: z.string().optional(), value: z.string() })),
                    ),
                  ),
                )
                .optional(),
              revision: z.number().optional(),
              pausedOutcome: z.object({ type: z.literal("variant"), variantId: z.string() }),
              fallthrough: z.union([
                z.object({ type: z.literal("variant"), variantId: z.string() }),
                z.object({
                  type: z.literal("split"),
                  base: z.object({
                    type: z.literal("entity"),
                    kind: z.string(),
                    attribute: z.string(),
                  }),
                  weights: z.record(z.string(), z.number()),
                  defaultVariantId: z.string(),
                }),
                z.object({
                  type: z.literal("rollout"),
                  base: z.object({
                    type: z.literal("entity"),
                    kind: z.string(),
                    attribute: z.string(),
                  }),
                  defaultVariantId: z.string(),
                  startTimestamp: z.number(),
                  rollFromVariantId: z.string(),
                  rollToVariantId: z.string(),
                  slots: z.array(z.object({ promille: z.number(), durationMs: z.number() })),
                }),
                z.object({ type: z.literal("experiment") }),
              ]),
              active: z.boolean(),
              rules: z.array(
                z.object({
                  id: z.string(),
                  outcome: z.union([
                    z.object({ type: z.literal("variant"), variantId: z.string() }),
                    z.object({
                      type: z.literal("split"),
                      base: z.object({
                        type: z.literal("entity"),
                        kind: z.string(),
                        attribute: z.string(),
                      }),
                      weights: z.record(z.string(), z.number()),
                      defaultVariantId: z.string(),
                    }),
                    z.object({
                      type: z.literal("rollout"),
                      base: z.object({
                        type: z.literal("entity"),
                        kind: z.string(),
                        attribute: z.string(),
                      }),
                      defaultVariantId: z.string(),
                      startTimestamp: z.number(),
                      rollFromVariantId: z.string(),
                      rollToVariantId: z.string(),
                      slots: z.array(z.object({ promille: z.number(), durationMs: z.number() })),
                    }),
                    z.object({ type: z.literal("experiment") }),
                  ]),
                  conditions: z.array(
                    z.object({
                      rhs: z
                        .union([
                          z.string(),
                          z.number(),
                          z.object({
                            type: z.enum(["list", "list/inline"]),
                            items: z.array(
                              z.union([
                                z.object({
                                  label: z.string().optional(),
                                  note: z.string().optional(),
                                  value: z.number(),
                                }),
                                z.object({
                                  label: z.string().optional(),
                                  note: z.string().optional(),
                                  value: z.string(),
                                }),
                              ]),
                            ),
                          }),
                          z.object({
                            type: z.literal("regex"),
                            pattern: z.string(),
                            flags: z.string(),
                          }),
                          z.boolean(),
                        ])
                        .optional(),
                      cmpOptions: z.object({ ignoreCase: z.boolean().optional() }).optional(),
                      lhs: z.union([
                        z.object({ type: z.literal("segment") }),
                        z.object({
                          type: z.literal("entity"),
                          kind: z.string(),
                          attribute: z.string(),
                        }),
                      ]),
                      cmp: z.enum([
                        "!contains",
                        "!endsWith",
                        "!eq",
                        "!ex",
                        "!oneOf",
                        "!regex",
                        "!startsWith",
                        "after",
                        "before",
                        "contains",
                        "containsAllOf",
                        "containsAnyOf",
                        "containsNoneOf",
                        "endsWith",
                        "eq",
                        "ex",
                        "gt",
                        "gte",
                        "lt",
                        "lte",
                        "oneOf",
                        "regex",
                        "startsWith",
                      ]),
                    }),
                  ),
                }),
              ),
            }),
          ),
          seed: z.number(),
          state: z.enum(["active", "archived"]),
          maintainerIds: z.array(z.string()).optional(),
          permanent: z.boolean().optional(),
          tags: z.array(z.string()).optional(),
        }),
        metadata: z
          .object({ creator: z.object({ id: z.string(), name: z.string() }).optional() })
          .optional(),
      }),
    ),
    pagination: z.object({}),
  });

export type UseGetApiV1ProjectsProjectIdOrNameFeatureFlagsFlagsFlagIdOrSlugVersionsArgs = {
  projectIdOrName: string;
  flagIdOrSlug: string;
  limit?: number | undefined;
  cursor?: string | undefined;
  environment?: string | undefined;
  withMetadata?: boolean | undefined;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const getApiV1ProjectsProjectIdOrNameFeatureFlagsFlagsFlagIdOrSlugVersionsQueryOptions = (
  args: UseGetApiV1ProjectsProjectIdOrNameFeatureFlagsFlagsFlagIdOrSlugVersionsArgs,
) =>
  queryOptions({
    queryKey: [
      "GET /v1/projects/{projectIdOrName}/feature-flags/flags/{flagIdOrSlug}/versions",
      "feature-flags",
      args.projectIdOrName,
      args.flagIdOrSlug,
      args.limit,
      args.cursor,
      args.environment,
      args.withMetadata,
      args.teamId,
      args.slug,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/v1/projects/{projectIdOrName}/feature-flags/flags/{flagIdOrSlug}/versions", {
          projectIdOrName: args.projectIdOrName,
          flagIdOrSlug: args.flagIdOrSlug,
          limit: args.limit,
          cursor: args.cursor,
          environment: args.environment,
          withMetadata: args.withMetadata,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useGetApiV1ProjectsProjectIdOrNameFeatureFlagsFlagsFlagIdOrSlugVersionsResponse,
        { method: "GET" },
      ),
    placeholderData: keepPreviousData,
  });

export const useGetApiV1ProjectsProjectIdOrNameFeatureFlagsFlagsFlagIdOrSlugVersions = (
  args: UseGetApiV1ProjectsProjectIdOrNameFeatureFlagsFlagsFlagIdOrSlugVersionsArgs,
) =>
  useQuery(getApiV1ProjectsProjectIdOrNameFeatureFlagsFlagsFlagIdOrSlugVersionsQueryOptions(args));
