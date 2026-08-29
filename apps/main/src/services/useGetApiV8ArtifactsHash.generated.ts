import {z} from 'zod'
import {useQuery, queryOptions} from '@tanstack/react-query'
import {apiFetch, buildUrl} from '@/lib/api/client'

export type UseGetApiV8ArtifactsHashArgs = {''x-Artifact-Client-Ci''?: string | undefined, ''x-Artifact-Client-Interactive''?: number | undefined, hash: string, teamId?: string | undefined, slug?: string | undefined};

export const useGetApiV8ArtifactsHashResponse = z.string();

export const getApiV8ArtifactsHashQueryOptions = (args: UseGetApiV8ArtifactsHashArgs) =>
      queryOptions({
        queryKey: ['GET /v8/artifacts/{hash}', 'artifacts', args.''x-Artifact-Client-Ci'', args.''x-Artifact-Client-Interactive'', args.hash, args.teamId, args.slug],
        queryFn: () => apiFetch(buildUrl('/v8/artifacts/{hash}', { hash: args.hash, teamId: args.teamId, slug: args.slug }), useGetApiV8ArtifactsHashResponse, { method: 'GET' })
      });

export const useGetApiV8ArtifactsHash = (args: UseGetApiV8ArtifactsHashArgs) => useQuery(getApiV8ArtifactsHashQueryOptions(args));
