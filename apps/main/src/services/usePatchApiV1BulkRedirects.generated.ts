import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UsePatchApiV1BulkRedirectsArgs = {
  projectId: string;
  teamId?: string | undefined;
  slug?: string | undefined;
  body: {
    name?: string | undefined;
    redirect: {
      source: string;
      destination?: string | undefined;
      statusCode?: number | undefined;
      permanent?: boolean | undefined;
      caseSensitive?: boolean | undefined;
      query?: boolean | undefined;
      preserveQueryParams?: boolean | undefined;
    };
    restore?: boolean | undefined;
  };
};

export const usePatchApiV1BulkRedirectsResponse = z.object({
  alias: z.string().nullable(),
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

export type UsePatchApiV1BulkRedirectsResponse = {
  alias: string | null;
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

export type PatchApiV1BulkRedirectsBody = {
  name?: string | undefined;
  redirect: {
    source: string;
    destination?: string | undefined;
    statusCode?: number | undefined;
    permanent?: boolean | undefined;
    caseSensitive?: boolean | undefined;
    query?: boolean | undefined;
    preserveQueryParams?: boolean | undefined;
  };
  restore?: boolean | undefined;
};

export const usePatchApiV1BulkRedirects = (
  options: UseMutationOptions<
    UsePatchApiV1BulkRedirectsResponse,
    Error,
    UsePatchApiV1BulkRedirectsArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UsePatchApiV1BulkRedirectsArgs) =>
      apiFetch(
        buildUrl("/v1/bulk-redirects", {
          projectId: args.projectId,
          teamId: args.teamId,
          slug: args.slug,
        }),
        usePatchApiV1BulkRedirectsResponse,
        {
          method: "PATCH",
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
