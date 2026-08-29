import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseCreateApiV1ProjectsIdOrNameDomainsDomainMoveArgs = {
  idOrName: string;
  domain: string;
  teamId?: string | undefined;
  slug?: string | undefined;
  body: {
    projectId: string;
    gitBranch?: (string | null) | undefined;
    redirect?: (string | null) | undefined;
    redirectStatusCode?: (301 | 302 | 307 | 308 | null) | undefined;
  };
};

export const useCreateApiV1ProjectsIdOrNameDomainsDomainMoveResponse = z.object({
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

export type UseCreateApiV1ProjectsIdOrNameDomainsDomainMoveResponse = {
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
  verification?: Array<{ type: string; domain: string; value: string; reason: string }> | undefined;
};

export type CreateApiV1ProjectsIdOrNameDomainsDomainMoveBody = {
  projectId: string;
  gitBranch?: (string | null) | undefined;
  redirect?: (string | null) | undefined;
  redirectStatusCode?: (301 | 302 | 307 | 308 | null) | undefined;
};

export const useCreateApiV1ProjectsIdOrNameDomainsDomainMove = (
  options: UseMutationOptions<
    UseCreateApiV1ProjectsIdOrNameDomainsDomainMoveResponse,
    Error,
    UseCreateApiV1ProjectsIdOrNameDomainsDomainMoveArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiV1ProjectsIdOrNameDomainsDomainMoveArgs) =>
      apiFetch(
        buildUrl("/v1/projects/{idOrName}/domains/{domain}/move", {
          idOrName: args.idOrName,
          domain: args.domain,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useCreateApiV1ProjectsIdOrNameDomainsDomainMoveResponse,
        {
          method: "POST",
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
