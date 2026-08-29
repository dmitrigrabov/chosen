import {z} from 'zod'
import {useMutation, useQueryClient, type UseMutationOptions} from '@tanstack/react-query'
import {apiFetch, buildUrl} from '@/lib/api/client'

export type UseCreateApiV2FilesArgs = {''content-Length''?: number | undefined, ''x-Vercel-Digest''?: string | undefined, ''x-Now-Digest''?: string | undefined, ''x-Now-Size''?: number | undefined, teamId?: string | undefined, slug?: string | undefined};

export const useCreateApiV2FilesResponse = z.union([z.object({urls: z.array(z.string())}), z.object({})]);

export type UseCreateApiV2FilesResponse = {urls: Array<string>} | Record<string, never>;

export type CreateApiV2FilesBody = void;

export const useCreateApiV2Files = (options: UseMutationOptions<UseCreateApiV2FilesResponse,Error,UseCreateApiV2FilesArgs,unknown> = {}) => {
      const queryClient = useQueryClient()

      const { onSuccess, ...rest } = options

      return useMutation({
        mutationFn: (args: UseCreateApiV2FilesArgs) => apiFetch(buildUrl('/v2/files', { teamId: args.teamId, slug: args.slug }), useCreateApiV2FilesResponse, { method: 'POST' }),
        onSuccess: (data, variables, onMutateResult, context) => {
          // Invalidate and refetch
          void queryClient.invalidateQueries({ queryKey: ['deployments']})

          onSuccess?.(data, variables, onMutateResult, context)
        },
        ...rest
      })
    };
