import {z} from 'zod'
import {pagination} from 'packages/models/src/pagination.generated.ts'
import {useQuery, queryOptions, keepPreviousData} from '@tanstack/react-query'
import {apiFetch, buildUrl} from '@/lib/api/client'

export const useGetApiV1EnvResponse = z.object({data: z.array(z.object({created: z.string().optional(), key: z.string().optional(), ownerId: z.string().nullable().optional(), id: z.string().optional(), createdBy: z.string().nullable().optional(), deletedBy: z.string().nullable().optional(), updatedBy: z.string().nullable().optional(), createdAt: z.number().optional(), deletedAt: z.number().optional(), updatedAt: z.number().optional(), value: z.string().optional(), projectId: z.array(z.string()).optional(), type: z.enum(["encrypted", "plain", "sensitive", "system"]).optional(), target: z.array(z.enum(["development", "preview", "production"])).optional(), applyToAllCustomEnvironments: z.boolean().optional(), customEnvironmentIds: z.array(z.string()).optional(), decrypted: z.boolean().optional(), comment: z.string().optional(), lastEditedByDisplayName: z.string().optional()})), pagination: pagination});

export type UseGetApiV1EnvArgs = {search?: string | undefined, projectId?: string | undefined, ids?: string | undefined, exclude_ids?: string | undefined, ''exclude-ids''?: string | undefined, exclude_projectId?: string | undefined, ''exclude-projectId''?: string | undefined, teamId?: string | undefined, slug?: string | undefined};

export const getApiV1EnvQueryOptions = (args: UseGetApiV1EnvArgs) =>
      queryOptions({
        queryKey: ['GET /v1/env', 'environment', args.search, args.projectId, args.ids, args.exclude_ids, args.''exclude-ids'', args.exclude_projectId, args.''exclude-projectId'', args.teamId, args.slug],
        queryFn: () => apiFetch(buildUrl('/v1/env', { search: args.search, projectId: args.projectId, ids: args.ids, exclude_ids: args.exclude_ids, 'exclude-ids': args.'exclude-ids', exclude_projectId: args.exclude_projectId, 'exclude-projectId': args.'exclude-projectId', teamId: args.teamId, slug: args.slug }), useGetApiV1EnvResponse, { method: 'GET' }),
        placeholderData: keepPreviousData
      });

export const useGetApiV1Env = (args: UseGetApiV1EnvArgs) => useQuery(getApiV1EnvQueryOptions(args));
