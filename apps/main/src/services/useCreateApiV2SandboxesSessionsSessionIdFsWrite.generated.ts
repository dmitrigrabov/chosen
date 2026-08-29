import {z} from 'zod'
import {useMutation, useQueryClient, type UseMutationOptions} from '@tanstack/react-query'
import {apiFetch, buildUrl} from '@/lib/api/client'

export type UseCreateApiV2SandboxesSessionsSessionIdFsWriteArgs = {''x-Cwd''?: string | undefined, sessionId: string, teamId?: string | undefined, slug?: string | undefined};

export const useCreateApiV2SandboxesSessionsSessionIdFsWriteResponse = z.object({});

export type UseCreateApiV2SandboxesSessionsSessionIdFsWriteResponse = Record<string, never>;

export type CreateApiV2SandboxesSessionsSessionIdFsWriteBody = void;

export const useCreateApiV2SandboxesSessionsSessionIdFsWrite = (options: UseMutationOptions<UseCreateApiV2SandboxesSessionsSessionIdFsWriteResponse,Error,UseCreateApiV2SandboxesSessionsSessionIdFsWriteArgs,unknown> = {}) => {
      const queryClient = useQueryClient()

      const { onSuccess, ...rest } = options

      return useMutation({
        mutationFn: (args: UseCreateApiV2SandboxesSessionsSessionIdFsWriteArgs) => apiFetch(buildUrl('/v2/sandboxes/sessions/{sessionId}/fs/write', { sessionId: args.sessionId, teamId: args.teamId, slug: args.slug }), useCreateApiV2SandboxesSessionsSessionIdFsWriteResponse, { method: 'POST' }),
        onSuccess: (data, variables, onMutateResult, context) => {
          // Invalidate and refetch
          void queryClient.invalidateQueries({ queryKey: ['sandboxes']})

          onSuccess?.(data, variables, onMutateResult, context)
        },
        ...rest
      })
    };
