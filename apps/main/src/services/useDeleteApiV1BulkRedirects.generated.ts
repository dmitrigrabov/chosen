import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseDeleteApiV1BulkRedirectsArgs = {
  projectId: string;
  teamId?: string | undefined;
  slug?: string | undefined;
  body: { name?: string | undefined; redirects: Array<string> };
};

export const useDeleteApiV1BulkRedirectsResponse = z.union([
  z.object({
    alias: z.string().optional(),
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
  }),
  z.object({
    alias: z.unknown(),
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
  }),
  z.object({
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
  }),
]);

export type UseDeleteApiV1BulkRedirectsResponse =
  | {
      alias?: string | undefined;
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
    }
  | {
      alias: unknown;
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
    }
  | {
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

export type DeleteApiV1BulkRedirectsBody = { name?: string | undefined; redirects: Array<string> };

export const useDeleteApiV1BulkRedirects = (
  options: UseMutationOptions<
    UseDeleteApiV1BulkRedirectsResponse,
    Error,
    UseDeleteApiV1BulkRedirectsArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseDeleteApiV1BulkRedirectsArgs) =>
      apiFetch(
        buildUrl("/v1/bulk-redirects", {
          projectId: args.projectId,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useDeleteApiV1BulkRedirectsResponse,
        {
          method: "DELETE",
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
