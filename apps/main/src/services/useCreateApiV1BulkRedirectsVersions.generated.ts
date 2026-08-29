import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseCreateApiV1BulkRedirectsVersionsArgs = {
  projectId: string;
  teamId?: string | undefined;
  slug?: string | undefined;
  body: { id: string; action: "promote" | "restore" | "discard"; name?: string | undefined };
};

export const useCreateApiV1BulkRedirectsVersionsResponse = z.object({
  version: z.object({
    id: z.string(),
    key: z.string(),
    lastModified: z.number(),
    createdBy: z.string(),
    name: z.string().optional(),
    isStaging: z.boolean().optional(),
    isLive: z.boolean().optional(),
    redirectCount: z.number().optional(),
    alias: z.string().optional(),
  }),
});

export type UseCreateApiV1BulkRedirectsVersionsResponse = {
  version: {
    id: string;
    key: string;
    lastModified: number;
    createdBy: string;
    name?: string | undefined;
    isStaging?: boolean | undefined;
    isLive?: boolean | undefined;
    redirectCount?: number | undefined;
    alias?: string | undefined;
  };
};

export type CreateApiV1BulkRedirectsVersionsBody = {
  id: string;
  action: "promote" | "restore" | "discard";
  name?: string | undefined;
};

export const useCreateApiV1BulkRedirectsVersions = (
  options: UseMutationOptions<
    UseCreateApiV1BulkRedirectsVersionsResponse,
    Error,
    UseCreateApiV1BulkRedirectsVersionsArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiV1BulkRedirectsVersionsArgs) =>
      apiFetch(
        buildUrl("/v1/bulk-redirects/versions", {
          projectId: args.projectId,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useCreateApiV1BulkRedirectsVersionsResponse,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(args.body),
        },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["bulk-redirects"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
