import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseDeleteApiV1EnvArgs = {
  teamId?: string | undefined;
  slug?: string | undefined;
  body: { ids: Array<string> };
};

export const useDeleteApiV1EnvResponse = z.object({
  deleted: z.array(z.string()),
  failed: z.array(
    z.object({
      error: z.object({
        code: z.string(),
        message: z.string(),
        key: z.string().optional(),
        envVarId: z.string().optional(),
        envVarKey: z.string().optional(),
        action: z.string().optional(),
        link: z.string().optional(),
        value: z
          .union([
            z.string(),
            z.array(z.enum(["development", "development", "preview", "preview", "production"])),
          ])
          .optional(),
        gitBranch: z.string().optional(),
        target: z
          .union([
            z.array(z.enum(["development", "development", "preview", "preview", "production"])),
            z.enum(["development", "development", "preview", "preview", "production"]),
          ])
          .optional(),
        project: z.string().optional(),
      }),
    }),
  ),
});

export type UseDeleteApiV1EnvResponse = {
  deleted: Array<string>;
  failed: Array<{
    error: {
      code: string;
      message: string;
      key?: string | undefined;
      envVarId?: string | undefined;
      envVarKey?: string | undefined;
      action?: string | undefined;
      link?: string | undefined;
      value?:
        | (string | Array<"development" | "development" | "preview" | "preview" | "production">)
        | undefined;
      gitBranch?: string | undefined;
      target?:
        | (
            | Array<"development" | "development" | "preview" | "preview" | "production">
            | "development"
            | "development"
            | "preview"
            | "preview"
            | "production"
          )
        | undefined;
      project?: string | undefined;
    };
  }>;
};

export type DeleteApiV1EnvBody = { ids: Array<string> };

export const useDeleteApiV1Env = (
  options: UseMutationOptions<
    UseDeleteApiV1EnvResponse,
    Error,
    UseDeleteApiV1EnvArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseDeleteApiV1EnvArgs) =>
      apiFetch(
        buildUrl("/v1/env", { teamId: args.teamId, slug: args.slug }),
        useDeleteApiV1EnvResponse,
        {
          method: "DELETE",
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
