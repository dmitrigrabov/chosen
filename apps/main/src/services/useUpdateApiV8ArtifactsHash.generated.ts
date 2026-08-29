import {z} from 'zod'
import {useMutation, useQueryClient, type UseMutationOptions} from '@tanstack/react-query'
import {apiFetch, buildUrl} from '@/lib/api/client'

export type UseUpdateApiV8ArtifactsHashArgs = {''content-Length''?: number | undefined, ''x-Artifact-Duration''?: number | undefined, ''x-Artifact-Client-Ci''?: string | undefined, ''x-Artifact-Client-Interactive''?: number | undefined, ''x-Artifact-Tag''?: string | undefined, ''x-Artifact-Sha''?: string | undefined, ''x-Artifact-Dirty-Hash''?: string | undefined, hash: string, teamId?: string | undefined, slug?: string | undefined};

export const useUpdateApiV8ArtifactsHashResponse = z.object({urls: z.array(z.string())});

export type UseUpdateApiV8ArtifactsHashResponse = {urls: Array<string>};

export type UpdateApiV8ArtifactsHashBody = void;

export const useUpdateApiV8ArtifactsHash = (options: UseMutationOptions<UseUpdateApiV8ArtifactsHashResponse,Error,UseUpdateApiV8ArtifactsHashArgs,unknown> = {}) => {
      const queryClient = useQueryClient()

      const { onSuccess, ...rest } = options

      return useMutation({
        mutationFn: (args: UseUpdateApiV8ArtifactsHashArgs) => apiFetch(buildUrl('/v8/artifacts/{hash}', { hash: args.hash, teamId: args.teamId, slug: args.slug }), useUpdateApiV8ArtifactsHashResponse, { method: 'PUT' }),
        onSuccess: (data, variables, onMutateResult, context) => {
          // Invalidate and refetch
          void queryClient.invalidateQueries({ queryKey: ['artifacts']})

          onSuccess?.(data, variables, onMutateResult, context)
        },
        ...rest
      })
    };
