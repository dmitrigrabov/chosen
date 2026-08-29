import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseCreateApiV9ProjectsIdOrNameCustomEnvironmentsArgs = {
  idOrName: string;
  teamId?: string | undefined;
  slug?: string | undefined;
  body: {
    slug?: string | undefined;
    description?: string | undefined;
    branchMatcher?: { type: "equals" | "startsWith" | "endsWith"; pattern: string } | undefined;
    copyEnvVarsFrom?: string | undefined;
  };
};

export const useCreateApiV9ProjectsIdOrNameCustomEnvironmentsResponse = z.object({
  id: z.string(),
  slug: z.string(),
  type: z.enum(["development", "preview", "production"]),
  description: z.string().optional(),
  branchMatcher: z
    .object({ type: z.enum(["endsWith", "equals", "startsWith"]), pattern: z.string() })
    .optional(),
  domains: z
    .array(
      z.object({
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
            z.object({
              type: z.string(),
              domain: z.string(),
              value: z.string(),
              reason: z.string(),
            }),
          )
          .optional(),
      }),
    )
    .optional(),
  currentDeploymentAliases: z.array(z.string()).optional(),
  createdAt: z.number(),
  updatedAt: z.number(),
});

export type UseCreateApiV9ProjectsIdOrNameCustomEnvironmentsResponse = {
  id: string;
  slug: string;
  type: "development" | "preview" | "production";
  description?: string | undefined;
  branchMatcher?: { type: "endsWith" | "equals" | "startsWith"; pattern: string } | undefined;
  domains?:
    | Array<{
        name: string;
        apexName: string;
        projectId: string;
        redirect?: (string | null) | undefined;
        redirectStatusCode?: (number | null) | undefined;
        gitBranch?: (string | null) | undefined;
        customEnvironmentId?: (string | null) | undefined;
        updatedAt?: number | undefined;
        createdAt?: number | undefined;
        verified: boolean;
        verification?:
          | Array<{ type: string; domain: string; value: string; reason: string }>
          | undefined;
      }>
    | undefined;
  currentDeploymentAliases?: Array<string> | undefined;
  createdAt: number;
  updatedAt: number;
};

export type CreateApiV9ProjectsIdOrNameCustomEnvironmentsBody = {
  slug?: string | undefined;
  description?: string | undefined;
  branchMatcher?: { type: "equals" | "startsWith" | "endsWith"; pattern: string } | undefined;
  copyEnvVarsFrom?: string | undefined;
};

export const useCreateApiV9ProjectsIdOrNameCustomEnvironments = (
  options: UseMutationOptions<
    UseCreateApiV9ProjectsIdOrNameCustomEnvironmentsResponse,
    Error,
    UseCreateApiV9ProjectsIdOrNameCustomEnvironmentsArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiV9ProjectsIdOrNameCustomEnvironmentsArgs) =>
      apiFetch(
        buildUrl("/v9/projects/{idOrName}/custom-environments", {
          idOrName: args.idOrName,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useCreateApiV9ProjectsIdOrNameCustomEnvironmentsResponse,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(args.body),
        },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["environment"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
