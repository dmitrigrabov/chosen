import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseUpdateApiV1BulkRedirectsArgs = {
  teamId?: string | undefined;
  slug?: string | undefined;
  body: {
    projectId: string;
    teamId: string;
    overwrite?: boolean | undefined;
    name?: string | undefined;
    redirects?:
      | Array<{
          source: string;
          destination: string;
          statusCode?: (number | string) | undefined;
          permanent?: boolean | undefined;
          caseSensitive?: boolean | undefined;
          query?: boolean | undefined;
          preserveQueryParams?: boolean | undefined;
        }>
      | undefined;
  };
};

export const useUpdateApiV1BulkRedirectsResponse = z.object({
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

export type UseUpdateApiV1BulkRedirectsResponse = {
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

export type UpdateApiV1BulkRedirectsBody = {
  projectId: string;
  teamId: string;
  overwrite?: boolean | undefined;
  name?: string | undefined;
  redirects?:
    | Array<{
        source: string;
        destination: string;
        statusCode?: (number | string) | undefined;
        permanent?: boolean | undefined;
        caseSensitive?: boolean | undefined;
        query?: boolean | undefined;
        preserveQueryParams?: boolean | undefined;
      }>
    | undefined;
};

export const useUpdateApiV1BulkRedirects = (
  options: UseMutationOptions<
    UseUpdateApiV1BulkRedirectsResponse,
    Error,
    UseUpdateApiV1BulkRedirectsArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseUpdateApiV1BulkRedirectsArgs) =>
      apiFetch(
        buildUrl("/v1/bulk-redirects", { teamId: args.teamId, slug: args.slug }),
        useUpdateApiV1BulkRedirectsResponse,
        {
          method: "PUT",
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
