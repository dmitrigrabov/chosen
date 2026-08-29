import { z } from "zod";
import { flag, type Flag } from "packages/models/src/flag.generated.ts";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UsePatchApiV1ProjectsProjectIdOrNameFeatureFlagsFlagsFlagIdOrSlugArgs = {
  projectIdOrName: string;
  flagIdOrSlug: string;
  ifMatch?: string | undefined;
  withMetadata?: boolean | undefined;
  teamId?: string | undefined;
  slug?: string | undefined;
  body: {
    createdBy?: string | undefined;
    message?: string | undefined;
    variants?:
      | Array<{
          id: string;
          label?: string | undefined;
          description?: string | undefined;
          value: string | number | boolean | Record<string, never> | Array<unknown> | string;
        }>
      | undefined;
    environments?:
      | Record<
          string,
          {
            active: boolean;
            reuse?: { active: boolean; environment: string } | undefined;
            targets?:
              | Record<
                  string,
                  Record<
                    string,
                    Record<string, Array<{ note?: string | undefined; value: string }>>
                  >
                >
              | undefined;
            pausedOutcome: { type: unknown; variantId: string };
            rules: Array<{
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
                | { type: unknown; variantId: string }
                | {
                    type: unknown;
                    base: { type: unknown; kind: string; attribute: string };
                    weights: Record<string, number>;
                    defaultVariantId: string;
                  }
                | {
                    type: unknown;
                    base: { type: unknown; kind: string; attribute: string };
                    startTimestamp: number;
                    rollFromVariantId: string;
                    rollToVariantId: string;
                    defaultVariantId: string;
                    slots: Array<{ promille: number; durationMs: number }>;
                  };
            }>;
            fallthrough:
              | { type: unknown; variantId: string }
              | {
                  type: unknown;
                  base: { type: unknown; kind: string; attribute: string };
                  weights: Record<string, number>;
                  defaultVariantId: string;
                }
              | {
                  type: unknown;
                  base: { type: unknown; kind: string; attribute: string };
                  startTimestamp: number;
                  rollFromVariantId: string;
                  rollToVariantId: string;
                  defaultVariantId: string;
                  slots: Array<{ promille: number; durationMs: number }>;
                };
            revision?: number | undefined;
          }
        >
      | undefined;
    seed?: number | undefined;
    description?: string | undefined;
    state?: ("active" | "archived") | undefined;
    maintainerIds?: Array<string> | undefined;
    permanent?: boolean | undefined;
    tags?: Array<string> | undefined;
  };
};

export const usePatchApiV1ProjectsProjectIdOrNameFeatureFlagsFlagsFlagIdOrSlugResponse = z.union([
  z.object({
    description: z.string().optional(),
    variants: z.array(z.object({})),
    id: z.string(),
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
            base: z.object({ type: z.literal("entity"), kind: z.string(), attribute: z.string() }),
            weights: z.record(z.string(), z.number()),
            defaultVariantId: z.string(),
          }),
          z.object({
            type: z.literal("rollout"),
            base: z.object({ type: z.literal("entity"), kind: z.string(), attribute: z.string() }),
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
                    z.object({ type: z.literal("regex"), pattern: z.string(), flags: z.string() }),
                    z.boolean(),
                  ])
                  .optional(),
                cmpOptions: z.object({ ignoreCase: z.boolean().optional() }).optional(),
                lhs: z.union([
                  z.object({ type: z.literal("segment") }),
                  z.object({ type: z.literal("entity"), kind: z.string(), attribute: z.string() }),
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
    kind: z.enum(["boolean", "json", "number", "string"]),
    revision: z.number(),
    seed: z.number(),
    state: z.enum(["active", "archived"]),
    maintainerIds: z.array(z.string()).optional(),
    permanent: z.boolean().optional(),
    tags: z.array(z.string()).optional(),
    slug: z.string(),
    createdAt: z.number(),
    updatedAt: z.number(),
    updatedBy: z.string().optional(),
    createdBy: z.string(),
    ownerId: z.string(),
    projectId: z.string(),
    typeName: z.literal("flag"),
  }),
  flag,
]);

export type UsePatchApiV1ProjectsProjectIdOrNameFeatureFlagsFlagsFlagIdOrSlugResponse =
  | {
      description?: string | undefined;
      variants: Array<Record<string, never>>;
      id: string;
      environments: Record<
        string,
        {
          reuse?: { active: boolean; environment: string } | undefined;
          targets?:
            | Record<
                string,
                Record<string, Record<string, Array<{ note?: string | undefined; value: string }>>>
              >
            | undefined;
          revision?: number | undefined;
          pausedOutcome: { type: "variant"; variantId: string };
          fallthrough:
            | { type: "variant"; variantId: string }
            | {
                type: "split";
                base: { type: "entity"; kind: string; attribute: string };
                weights: Record<string, number>;
                defaultVariantId: string;
              }
            | {
                type: "rollout";
                base: { type: "entity"; kind: string; attribute: string };
                defaultVariantId: string;
                startTimestamp: number;
                rollFromVariantId: string;
                rollToVariantId: string;
                slots: Array<{ promille: number; durationMs: number }>;
              }
            | { type: "experiment" };
          active: boolean;
          rules: Array<{
            id: string;
            outcome:
              | { type: "variant"; variantId: string }
              | {
                  type: "split";
                  base: { type: "entity"; kind: string; attribute: string };
                  weights: Record<string, number>;
                  defaultVariantId: string;
                }
              | {
                  type: "rollout";
                  base: { type: "entity"; kind: string; attribute: string };
                  defaultVariantId: string;
                  startTimestamp: number;
                  rollFromVariantId: string;
                  rollToVariantId: string;
                  slots: Array<{ promille: number; durationMs: number }>;
                }
              | { type: "experiment" };
            conditions: Array<{
              rhs?:
                | (
                    | string
                    | number
                    | {
                        type: "list" | "list/inline";
                        items: Array<
                          | { label?: string | undefined; note?: string | undefined; value: number }
                          | { label?: string | undefined; note?: string | undefined; value: string }
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
          }>;
        }
      >;
      kind: "boolean" | "json" | "number" | "string";
      revision: number;
      seed: number;
      state: "active" | "archived";
      maintainerIds?: Array<string> | undefined;
      permanent?: boolean | undefined;
      tags?: Array<string> | undefined;
      slug: string;
      createdAt: number;
      updatedAt: number;
      updatedBy?: string | undefined;
      createdBy: string;
      ownerId: string;
      projectId: string;
      typeName: "flag";
    }
  | Flag;

export type PatchApiV1ProjectsProjectIdOrNameFeatureFlagsFlagsFlagIdOrSlugBody = {
  createdBy?: string | undefined;
  message?: string | undefined;
  variants?:
    | Array<{
        id: string;
        label?: string | undefined;
        description?: string | undefined;
        value: string | number | boolean | Record<string, never> | Array<unknown> | string;
      }>
    | undefined;
  environments?:
    | Record<
        string,
        {
          active: boolean;
          reuse?: { active: boolean; environment: string } | undefined;
          targets?:
            | Record<
                string,
                Record<string, Record<string, Array<{ note?: string | undefined; value: string }>>>
              >
            | undefined;
          pausedOutcome: { type: unknown; variantId: string };
          rules: Array<{
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
                          | { label?: string | undefined; note?: string | undefined; value: number }
                          | { label?: string | undefined; note?: string | undefined; value: string }
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
              | { type: unknown; variantId: string }
              | {
                  type: unknown;
                  base: { type: unknown; kind: string; attribute: string };
                  weights: Record<string, number>;
                  defaultVariantId: string;
                }
              | {
                  type: unknown;
                  base: { type: unknown; kind: string; attribute: string };
                  startTimestamp: number;
                  rollFromVariantId: string;
                  rollToVariantId: string;
                  defaultVariantId: string;
                  slots: Array<{ promille: number; durationMs: number }>;
                };
          }>;
          fallthrough:
            | { type: unknown; variantId: string }
            | {
                type: unknown;
                base: { type: unknown; kind: string; attribute: string };
                weights: Record<string, number>;
                defaultVariantId: string;
              }
            | {
                type: unknown;
                base: { type: unknown; kind: string; attribute: string };
                startTimestamp: number;
                rollFromVariantId: string;
                rollToVariantId: string;
                defaultVariantId: string;
                slots: Array<{ promille: number; durationMs: number }>;
              };
          revision?: number | undefined;
        }
      >
    | undefined;
  seed?: number | undefined;
  description?: string | undefined;
  state?: ("active" | "archived") | undefined;
  maintainerIds?: Array<string> | undefined;
  permanent?: boolean | undefined;
  tags?: Array<string> | undefined;
};

export const usePatchApiV1ProjectsProjectIdOrNameFeatureFlagsFlagsFlagIdOrSlug = (
  options: UseMutationOptions<
    UsePatchApiV1ProjectsProjectIdOrNameFeatureFlagsFlagsFlagIdOrSlugResponse,
    Error,
    UsePatchApiV1ProjectsProjectIdOrNameFeatureFlagsFlagsFlagIdOrSlugArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UsePatchApiV1ProjectsProjectIdOrNameFeatureFlagsFlagsFlagIdOrSlugArgs) =>
      apiFetch(
        buildUrl("/v1/projects/{projectIdOrName}/feature-flags/flags/{flagIdOrSlug}", {
          projectIdOrName: args.projectIdOrName,
          flagIdOrSlug: args.flagIdOrSlug,
          ifMatch: args.ifMatch,
          withMetadata: args.withMetadata,
          teamId: args.teamId,
          slug: args.slug,
        }),
        usePatchApiV1ProjectsProjectIdOrNameFeatureFlagsFlagsFlagIdOrSlugResponse,
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
