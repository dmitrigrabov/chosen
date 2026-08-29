import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UsePatchApiV1ProjectsIdOrNameProtectionBypassArgs = {
  idOrName: string;
  teamId?: string | undefined;
  slug?: string | undefined;
  body: {
    revoke?: { secret: string; regenerate: boolean } | undefined;
    generate?: { secret?: string | undefined; note?: string | undefined } | undefined;
    update?:
      | { secret: string; isEnvVar?: boolean | undefined; note?: string | undefined }
      | undefined;
  };
};

export const usePatchApiV1ProjectsIdOrNameProtectionBypassResponse = z.object({
  protectionBypass: z
    .record(
      z.string(),
      z.union([
        z.object({
          createdAt: z.number(),
          createdBy: z.string(),
          scope: z.literal("integration-automation-bypass"),
          integrationId: z.string(),
          configurationId: z.string(),
        }),
        z.object({
          createdAt: z.number(),
          createdBy: z.string(),
          scope: z.literal("automation-bypass"),
          isEnvVar: z.boolean().optional(),
          note: z.string().optional(),
        }),
      ]),
    )
    .optional(),
});

export type UsePatchApiV1ProjectsIdOrNameProtectionBypassResponse = {
  protectionBypass?:
    | Record<
        string,
        | {
            createdAt: number;
            createdBy: string;
            scope: "integration-automation-bypass";
            integrationId: string;
            configurationId: string;
          }
        | {
            createdAt: number;
            createdBy: string;
            scope: "automation-bypass";
            isEnvVar?: boolean | undefined;
            note?: string | undefined;
          }
      >
    | undefined;
};

export type PatchApiV1ProjectsIdOrNameProtectionBypassBody = {
  revoke?: { secret: string; regenerate: boolean } | undefined;
  generate?: { secret?: string | undefined; note?: string | undefined } | undefined;
  update?:
    | { secret: string; isEnvVar?: boolean | undefined; note?: string | undefined }
    | undefined;
};

export const usePatchApiV1ProjectsIdOrNameProtectionBypass = (
  options: UseMutationOptions<
    UsePatchApiV1ProjectsIdOrNameProtectionBypassResponse,
    Error,
    UsePatchApiV1ProjectsIdOrNameProtectionBypassArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UsePatchApiV1ProjectsIdOrNameProtectionBypassArgs) =>
      apiFetch(
        buildUrl("/v1/projects/{idOrName}/protection-bypass", {
          idOrName: args.idOrName,
          teamId: args.teamId,
          slug: args.slug,
        }),
        usePatchApiV1ProjectsIdOrNameProtectionBypassResponse,
        {
          method: "PATCH",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(args.body),
        },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["projects"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
