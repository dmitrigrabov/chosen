import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseCreateApiV1BulkRedirectsRestoreArgs = {
  projectId: string;
  teamId?: string | undefined;
  slug?: string | undefined;
  body: { name?: string | undefined; redirects: Array<string> };
};

export const useCreateApiV1BulkRedirectsRestoreResponse = z.object({
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
  restored: z.array(z.string()),
  failedToRestore: z.array(z.string()),
});

export type UseCreateApiV1BulkRedirectsRestoreResponse = {
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
  restored: Array<string>;
  failedToRestore: Array<string>;
};

export type CreateApiV1BulkRedirectsRestoreBody = {
  name?: string | undefined;
  redirects: Array<string>;
};

export const useCreateApiV1BulkRedirectsRestore = (
  options: UseMutationOptions<
    UseCreateApiV1BulkRedirectsRestoreResponse,
    Error,
    UseCreateApiV1BulkRedirectsRestoreArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiV1BulkRedirectsRestoreArgs) =>
      apiFetch(
        buildUrl("/v1/bulk-redirects/restore", {
          projectId: args.projectId,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useCreateApiV1BulkRedirectsRestoreResponse,
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
