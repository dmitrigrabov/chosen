import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseCreateApiV9ProjectsIdOrNameDomainsDomainVerifyArgs = {
  idOrName: string;
  domain: string;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const useCreateApiV9ProjectsIdOrNameDomainsDomainVerifyResponse = z.object({
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
});

export type UseCreateApiV9ProjectsIdOrNameDomainsDomainVerifyResponse = {
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
};

export type CreateApiV9ProjectsIdOrNameDomainsDomainVerifyBody = void;

export const useCreateApiV9ProjectsIdOrNameDomainsDomainVerify = (
  options: UseMutationOptions<
    UseCreateApiV9ProjectsIdOrNameDomainsDomainVerifyResponse,
    Error,
    UseCreateApiV9ProjectsIdOrNameDomainsDomainVerifyArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiV9ProjectsIdOrNameDomainsDomainVerifyArgs) =>
      apiFetch(
        buildUrl("/v9/projects/{idOrName}/domains/{domain}/verify", {
          idOrName: args.idOrName,
          domain: args.domain,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useCreateApiV9ProjectsIdOrNameDomainsDomainVerifyResponse,
        { method: "POST" },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["projects"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
