import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UsePatchApiV1DeploymentsDeploymentIdChecksCheckIdArgs = {
  deploymentId: string;
  checkId: string;
  teamId?: string | undefined;
  slug?: string | undefined;
  body: {
    name?: string | undefined;
    path?: string | undefined;
    status?: ("running" | "completed") | undefined;
    conclusion?: ("canceled" | "failed" | "neutral" | "succeeded" | "skipped") | undefined;
    detailsUrl?: string | undefined;
    output?:
      | {
          metrics?:
            | {
                FCP: {
                  value: number | null;
                  previousValue?: number | undefined;
                  source: "web-vitals";
                };
                LCP: {
                  value: number | null;
                  previousValue?: number | undefined;
                  source: "web-vitals";
                };
                CLS: {
                  value: number | null;
                  previousValue?: number | undefined;
                  source: "web-vitals";
                };
                TBT: {
                  value: number | null;
                  previousValue?: number | undefined;
                  source: "web-vitals";
                };
                virtualExperienceScore?:
                  | {
                      value: number | null;
                      previousValue?: number | undefined;
                      source: "web-vitals";
                    }
                  | undefined;
              }
            | undefined;
        }
      | undefined;
    externalId?: string | undefined;
  };
};

export const usePatchApiV1DeploymentsDeploymentIdChecksCheckIdResponse = z.object({
  id: z.string(),
  name: z.string(),
  createdAt: z.number(),
  updatedAt: z.number(),
  deploymentId: z.string(),
  status: z.enum(["completed", "registered", "running"]),
  conclusion: z.enum(["canceled", "failed", "neutral", "skipped", "stale", "succeeded"]).optional(),
  externalId: z.string().optional(),
  output: z
    .object({
      metrics: z
        .object({
          FCP: z.object({
            value: z.number().nullable(),
            previousValue: z.number().optional(),
            source: z.literal("web-vitals"),
          }),
          LCP: z.object({
            value: z.number().nullable(),
            previousValue: z.number().optional(),
            source: z.literal("web-vitals"),
          }),
          CLS: z.object({
            value: z.number().nullable(),
            previousValue: z.number().optional(),
            source: z.literal("web-vitals"),
          }),
          TBT: z.object({
            value: z.number().nullable(),
            previousValue: z.number().optional(),
            source: z.literal("web-vitals"),
          }),
          virtualExperienceScore: z
            .object({
              value: z.number().nullable(),
              previousValue: z.number().optional(),
              source: z.literal("web-vitals"),
            })
            .optional(),
        })
        .optional(),
    })
    .optional(),
  completedAt: z.number().optional(),
  path: z.string().optional(),
  blocking: z.boolean(),
  detailsUrl: z.string().optional(),
  integrationId: z.string(),
  startedAt: z.number().optional(),
  rerequestable: z.boolean().optional(),
});

export type UsePatchApiV1DeploymentsDeploymentIdChecksCheckIdResponse = {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number;
  deploymentId: string;
  status: "completed" | "registered" | "running";
  conclusion?: ("canceled" | "failed" | "neutral" | "skipped" | "stale" | "succeeded") | undefined;
  externalId?: string | undefined;
  output?:
    | {
        metrics?:
          | {
              FCP: {
                value: number | null;
                previousValue?: number | undefined;
                source: "web-vitals";
              };
              LCP: {
                value: number | null;
                previousValue?: number | undefined;
                source: "web-vitals";
              };
              CLS: {
                value: number | null;
                previousValue?: number | undefined;
                source: "web-vitals";
              };
              TBT: {
                value: number | null;
                previousValue?: number | undefined;
                source: "web-vitals";
              };
              virtualExperienceScore?:
                | { value: number | null; previousValue?: number | undefined; source: "web-vitals" }
                | undefined;
            }
          | undefined;
      }
    | undefined;
  completedAt?: number | undefined;
  path?: string | undefined;
  blocking: boolean;
  detailsUrl?: string | undefined;
  integrationId: string;
  startedAt?: number | undefined;
  rerequestable?: boolean | undefined;
};

export type PatchApiV1DeploymentsDeploymentIdChecksCheckIdBody = {
  name?: string | undefined;
  path?: string | undefined;
  status?: ("running" | "completed") | undefined;
  conclusion?: ("canceled" | "failed" | "neutral" | "succeeded" | "skipped") | undefined;
  detailsUrl?: string | undefined;
  output?:
    | {
        metrics?:
          | {
              FCP: {
                value: number | null;
                previousValue?: number | undefined;
                source: "web-vitals";
              };
              LCP: {
                value: number | null;
                previousValue?: number | undefined;
                source: "web-vitals";
              };
              CLS: {
                value: number | null;
                previousValue?: number | undefined;
                source: "web-vitals";
              };
              TBT: {
                value: number | null;
                previousValue?: number | undefined;
                source: "web-vitals";
              };
              virtualExperienceScore?:
                | { value: number | null; previousValue?: number | undefined; source: "web-vitals" }
                | undefined;
            }
          | undefined;
      }
    | undefined;
  externalId?: string | undefined;
};

export const usePatchApiV1DeploymentsDeploymentIdChecksCheckId = (
  options: UseMutationOptions<
    UsePatchApiV1DeploymentsDeploymentIdChecksCheckIdResponse,
    Error,
    UsePatchApiV1DeploymentsDeploymentIdChecksCheckIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UsePatchApiV1DeploymentsDeploymentIdChecksCheckIdArgs) =>
      apiFetch(
        buildUrl("/v1/deployments/{deploymentId}/checks/{checkId}", {
          deploymentId: args.deploymentId,
          checkId: args.checkId,
          teamId: args.teamId,
          slug: args.slug,
        }),
        usePatchApiV1DeploymentsDeploymentIdChecksCheckIdResponse,
        {
          method: "PATCH",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(args.body),
        },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["checks"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
