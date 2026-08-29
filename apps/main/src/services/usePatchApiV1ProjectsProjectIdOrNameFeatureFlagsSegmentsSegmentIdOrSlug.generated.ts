import { z } from "zod";
import { segment, type Segment } from "packages/models/src/segment.generated.ts";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UsePatchApiV1ProjectsProjectIdOrNameFeatureFlagsSegmentsSegmentIdOrSlugArgs = {
  projectIdOrName: string;
  segmentIdOrSlug: string;
  withMetadata?: boolean | undefined;
  teamId?: string | undefined;
  slug?: string | undefined;
  body: {
    operations?:
      | Array<{
          action: "add" | "remove";
          field: "include" | "exclude";
          entity: string;
          attribute: string;
          value: { note?: string | undefined; value: string };
        }>
      | undefined;
    label?: string | undefined;
    description?: string | undefined;
    data?:
      | {
          rules?:
            | Array<{
                id: string;
                conditions: Array<{
                  lhs: { type: unknown } | { type: unknown; kind: string; attribute: string };
                  cmp:
                    | "eq"
                    | "!eq"
                    | "oneOf"
                    | "!oneOf"
                    | "containsAllOf"
                    | "containsAnyOf"
                    | "containsNoneOf"
                    | "startsWith"
                    | "!startsWith"
                    | "endsWith"
                    | "!endsWith"
                    | "contains"
                    | "!contains"
                    | "ex"
                    | "!ex"
                    | "gt"
                    | "gte"
                    | "lt"
                    | "lte"
                    | "regex"
                    | "!regex"
                    | "before"
                    | "after";
                  rhs?:
                    | (
                        | {
                            type: "list/inline" | "list";
                            items: Array<
                              | {
                                  label?: string | undefined;
                                  note?: string | undefined;
                                  value: number;
                                }
                              | {
                                  label?: string | undefined;
                                  note?: string | undefined;
                                  value: string;
                                }
                            >;
                          }
                        | { type: unknown; pattern: string; flags: string }
                        | string
                        | number
                        | boolean
                      )
                    | undefined;
                  cmpOptions?: { ignoreCase?: boolean | undefined } | undefined;
                }>;
                outcome:
                  | { type: unknown }
                  | {
                      type: unknown;
                      base: { type: unknown; kind: string; attribute: string };
                      passPromille: number;
                    };
              }>
            | undefined;
          include?:
            | Record<string, Record<string, Array<{ note?: string | undefined; value: string }>>>
            | undefined;
          exclude?:
            | Record<string, Record<string, Array<{ note?: string | undefined; value: string }>>>
            | undefined;
        }
      | undefined;
    hint?: string | undefined;
  };
};

export const usePatchApiV1ProjectsProjectIdOrNameFeatureFlagsSegmentsSegmentIdOrSlugResponse =
  z.union([
    z.object({
      description: z.string().optional(),
      createdBy: z.string().optional(),
      usedByFlags: z.array(z.string()).optional(),
      usedBySegments: z.array(z.string()).optional(),
      data: z.object({
        rules: z
          .array(
            z.object({
              id: z.string(),
              outcome: z.union([
                z.object({ type: z.literal("all") }),
                z.object({
                  type: z.literal("split"),
                  base: z.object({
                    type: z.literal("entity"),
                    kind: z.string(),
                    attribute: z.string(),
                  }),
                  passPromille: z.number(),
                }),
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
          )
          .optional(),
        include: z
          .record(
            z.string(),
            z.record(
              z.string(),
              z.array(z.object({ note: z.string().optional(), value: z.string() })),
            ),
          )
          .optional(),
        exclude: z
          .record(
            z.string(),
            z.record(
              z.string(),
              z.array(z.object({ note: z.string().optional(), value: z.string() })),
            ),
          )
          .optional(),
      }),
      id: z.string(),
      label: z.string(),
      slug: z.string(),
      createdAt: z.number(),
      updatedAt: z.number(),
      projectId: z.string(),
      typeName: z.literal("segment"),
      hint: z.string(),
    }),
    segment,
  ]);

export type UsePatchApiV1ProjectsProjectIdOrNameFeatureFlagsSegmentsSegmentIdOrSlugResponse =
  | {
      description?: string | undefined;
      createdBy?: string | undefined;
      usedByFlags?: Array<string> | undefined;
      usedBySegments?: Array<string> | undefined;
      data: {
        rules?:
          | Array<{
              id: string;
              outcome:
                | { type: "all" }
                | {
                    type: "split";
                    base: { type: "entity"; kind: string; attribute: string };
                    passPromille: number;
                  };
              conditions: Array<{
                rhs?:
                  | (
                      | string
                      | number
                      | {
                          type: "list" | "list/inline";
                          items: Array<
                            | {
                                label?: string | undefined;
                                note?: string | undefined;
                                value: number;
                              }
                            | {
                                label?: string | undefined;
                                note?: string | undefined;
                                value: string;
                              }
                          >;
                        }
                      | { type: "regex"; pattern: string; flags: string }
                      | boolean
                    )
                  | undefined;
                cmpOptions?: { ignoreCase?: boolean | undefined } | undefined;
                lhs: { type: "segment" } | { type: "entity"; kind: string; attribute: string };
                cmp:
                  | "!contains"
                  | "!endsWith"
                  | "!eq"
                  | "!ex"
                  | "!oneOf"
                  | "!regex"
                  | "!startsWith"
                  | "after"
                  | "before"
                  | "contains"
                  | "containsAllOf"
                  | "containsAnyOf"
                  | "containsNoneOf"
                  | "endsWith"
                  | "eq"
                  | "ex"
                  | "gt"
                  | "gte"
                  | "lt"
                  | "lte"
                  | "oneOf"
                  | "regex"
                  | "startsWith";
              }>;
            }>
          | undefined;
        include?:
          | Record<string, Record<string, Array<{ note?: string | undefined; value: string }>>>
          | undefined;
        exclude?:
          | Record<string, Record<string, Array<{ note?: string | undefined; value: string }>>>
          | undefined;
      };
      id: string;
      label: string;
      slug: string;
      createdAt: number;
      updatedAt: number;
      projectId: string;
      typeName: "segment";
      hint: string;
    }
  | Segment;

export type PatchApiV1ProjectsProjectIdOrNameFeatureFlagsSegmentsSegmentIdOrSlugBody = {
  operations?:
    | Array<{
        action: "add" | "remove";
        field: "include" | "exclude";
        entity: string;
        attribute: string;
        value: { note?: string | undefined; value: string };
      }>
    | undefined;
  label?: string | undefined;
  description?: string | undefined;
  data?:
    | {
        rules?:
          | Array<{
              id: string;
              conditions: Array<{
                lhs: { type: unknown } | { type: unknown; kind: string; attribute: string };
                cmp:
                  | "eq"
                  | "!eq"
                  | "oneOf"
                  | "!oneOf"
                  | "containsAllOf"
                  | "containsAnyOf"
                  | "containsNoneOf"
                  | "startsWith"
                  | "!startsWith"
                  | "endsWith"
                  | "!endsWith"
                  | "contains"
                  | "!contains"
                  | "ex"
                  | "!ex"
                  | "gt"
                  | "gte"
                  | "lt"
                  | "lte"
                  | "regex"
                  | "!regex"
                  | "before"
                  | "after";
                rhs?:
                  | (
                      | {
                          type: "list/inline" | "list";
                          items: Array<
                            | {
                                label?: string | undefined;
                                note?: string | undefined;
                                value: number;
                              }
                            | {
                                label?: string | undefined;
                                note?: string | undefined;
                                value: string;
                              }
                          >;
                        }
                      | { type: unknown; pattern: string; flags: string }
                      | string
                      | number
                      | boolean
                    )
                  | undefined;
                cmpOptions?: { ignoreCase?: boolean | undefined } | undefined;
              }>;
              outcome:
                | { type: unknown }
                | {
                    type: unknown;
                    base: { type: unknown; kind: string; attribute: string };
                    passPromille: number;
                  };
            }>
          | undefined;
        include?:
          | Record<string, Record<string, Array<{ note?: string | undefined; value: string }>>>
          | undefined;
        exclude?:
          | Record<string, Record<string, Array<{ note?: string | undefined; value: string }>>>
          | undefined;
      }
    | undefined;
  hint?: string | undefined;
};

export const usePatchApiV1ProjectsProjectIdOrNameFeatureFlagsSegmentsSegmentIdOrSlug = (
  options: UseMutationOptions<
    UsePatchApiV1ProjectsProjectIdOrNameFeatureFlagsSegmentsSegmentIdOrSlugResponse,
    Error,
    UsePatchApiV1ProjectsProjectIdOrNameFeatureFlagsSegmentsSegmentIdOrSlugArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (
      args: UsePatchApiV1ProjectsProjectIdOrNameFeatureFlagsSegmentsSegmentIdOrSlugArgs,
    ) =>
      apiFetch(
        buildUrl("/v1/projects/{projectIdOrName}/feature-flags/segments/{segmentIdOrSlug}", {
          projectIdOrName: args.projectIdOrName,
          segmentIdOrSlug: args.segmentIdOrSlug,
          withMetadata: args.withMetadata,
          teamId: args.teamId,
          slug: args.slug,
        }),
        usePatchApiV1ProjectsProjectIdOrNameFeatureFlagsSegmentsSegmentIdOrSlugResponse,
        {
          method: "PATCH",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(args.body),
        },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["feature-flags"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
