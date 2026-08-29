import {z} from 'zod'
import {useMutation, useQueryClient, type UseMutationOptions} from '@tanstack/react-query'
import {apiFetch, buildUrl} from '@/lib/api/client'

export type UseCreateApiV8ArtifactsEventsArgs = {''x-Artifact-Client-Ci''?: string | undefined, ''x-Artifact-Client-Interactive''?: number | undefined, teamId?: string | undefined, slug?: string | undefined, body: Array<{sessionId: string, source: 'LOCAL' | 'REMOTE', event: 'HIT' | 'MISS', hash: string, duration?: number | undefined}>};

export const useCreateApiV8ArtifactsEventsResponse = z.void();

export type UseCreateApiV8ArtifactsEventsResponse = void;

export type CreateApiV8ArtifactsEventsBody = Array<{sessionId: string, source: 'LOCAL' | 'REMOTE', event: 'HIT' | 'MISS', hash: string, duration?: number | undefined}>;

export const useCreateApiV8ArtifactsEvents = (options: UseMutationOptions<UseCreateApiV8ArtifactsEventsResponse,Error,UseCreateApiV8ArtifactsEventsArgs,unknown> = {}) => {
      const queryClient = useQueryClient()

      const { onSuccess, ...rest } = options

      return useMutation({
        mutationFn: (args: UseCreateApiV8ArtifactsEventsArgs) => apiFetch(buildUrl('/v8/artifacts/events', { teamId: args.teamId, slug: args.slug }), useCreateApiV8ArtifactsEventsResponse, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(args.body) }),
        onSuccess: (data, variables, onMutateResult, context) => {
          // Invalidate and refetch
          void queryClient.invalidateQueries({ queryKey: ['artifacts']})

          onSuccess?.(data, variables, onMutateResult, context)
        },
        ...rest
      })
    };
