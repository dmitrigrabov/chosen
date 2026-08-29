import {Hono} from 'hono'
import type {Env} from '../env'
import {withAuth, type AuthVariables, type AuthUser} from '../middleware/auth'
import {toErrorResponse, validate} from './errors'
import {z} from 'zod'
import {createDb, type Db} from '../db'
import {postV1Env, getV1Env, patchV1Env, deleteV1Env, getV1EnvId, patchV1EnvIdUnlinkProjectId} from './handlers/env'
import type {Pagination} from 'packages/models/src/pagination.generated.ts'

export const app = new Hono<{ Bindings: Env; Variables: AuthVariables }>()

app.onError(toErrorResponse)

app.use('*', withAuth)

app.post(
'/v1/env',
  validate('query', z.object({teamId: z.string().optional(), slug: z.string().optional()})),
  validate('json', postV1EnvBody),
  async c => {
    const db = createDb(c.env.DB)
    const query = c.req.valid('query')
    const body = c.req.valid('json')
    return c.json(await postV1Env({db, env: c.env, user: c.var.user, query, body}), 201)
  }
)
app.get(
'/v1/env',
  validate('query', z.object({search: z.string().optional(), projectId: z.string().optional(), ids: z.string().optional(), exclude_ids: z.string().optional(), "'exclude-ids'": z.string().optional(), exclude_projectId: z.string().optional(), "'exclude-projectId'": z.string().optional(), teamId: z.string().optional(), slug: z.string().optional()})),
  async c => {
    const db = createDb(c.env.DB)
    const query = c.req.valid('query')
    return c.json(await getV1Env({db, env: c.env, user: c.var.user, query}))
  }
)
app.patch(
'/v1/env',
  validate('query', z.object({teamId: z.string().optional(), slug: z.string().optional()})),
  validate('json', patchV1EnvBody),
  async c => {
    const db = createDb(c.env.DB)
    const query = c.req.valid('query')
    const body = c.req.valid('json')
    return c.json(await patchV1Env({db, env: c.env, user: c.var.user, query, body}))
  }
)
app.delete(
'/v1/env',
  validate('query', z.object({teamId: z.string().optional(), slug: z.string().optional()})),
  validate('json', deleteV1EnvBody),
  async c => {
    const db = createDb(c.env.DB)
    const query = c.req.valid('query')
    const body = c.req.valid('json')
    return c.json(await deleteV1Env({db, env: c.env, user: c.var.user, query, body}))
  }
)
app.get(
'/v1/env/:id',
  validate('param', z.object({id: z.string()})),
  validate('query', z.object({teamId: z.string().optional(), slug: z.string().optional()})),
  async c => {
    const db = createDb(c.env.DB)
    const params = c.req.valid('param')
    const query = c.req.valid('query')
    return c.json(await getV1EnvId({db, env: c.env, user: c.var.user, params, query}))
  }
)
app.patch(
'/v1/env/:id/unlink/:projectId',
  validate('param', z.object({id: z.string(), projectId: z.string()})),
  validate('query', z.object({teamId: z.string().optional(), slug: z.string().optional()})),
  async c => {
    const db = createDb(c.env.DB)
    const params = c.req.valid('param')
    const query = c.req.valid('query')
    return c.json(await patchV1EnvIdUnlinkProjectId({db, env: c.env, user: c.var.user, params, query}))
  }
)
;

export const postV1EnvBody = z.union([z.object({evs: z.array(z.object({key: z.string(), value: z.string(), comment: z.string().max(500).optional()})), type: z.enum(["encrypted", "sensitive"]).optional(), target: z.array(z.enum(["production", "preview", "development"])), projectId: z.array(z.string()).optional()}), z.object({evs: z.array(z.object({key: z.string(), value: z.string(), comment: z.string().max(500).optional()})), type: z.enum(["encrypted", "sensitive"]).optional(), target: z.array(z.enum(["production", "preview", "development"])).optional(), projectId: z.array(z.string()).optional()}), z.object({evs: z.array(z.object({key: z.string(), value: z.string(), comment: z.string().max(500).optional()})), type: z.enum(["encrypted", "sensitive"]).optional(), target: z.array(z.enum(["production", "preview", "development"])).optional(), projectId: z.array(z.string()).optional()})]);

export type PostV1EnvBody = {evs: Array<{key: string, value: string, comment?: string | undefined}>, type?: ('encrypted' | 'sensitive') | undefined, target: Array<'production' | 'preview' | 'development'>, projectId?: Array<string> | undefined} | {evs: Array<{key: string, value: string, comment?: string | undefined}>, type?: ('encrypted' | 'sensitive') | undefined, target?: (Array<'production' | 'preview' | 'development'>) | undefined, projectId?: Array<string> | undefined} | {evs: Array<{key: string, value: string, comment?: string | undefined}>, type?: ('encrypted' | 'sensitive') | undefined, target?: (Array<'production' | 'preview' | 'development'>) | undefined, projectId?: Array<string> | undefined};

export type PostV1EnvResponse = {created: Array<{created?: string | undefined, key?: string | undefined, ownerId?: (string | null) | undefined, id?: string | undefined, createdBy?: (string | null) | undefined, deletedBy?: (string | null) | undefined, updatedBy?: (string | null) | undefined, createdAt?: number | undefined, deletedAt?: number | undefined, updatedAt?: number | undefined, value?: string | undefined, projectId?: Array<string> | undefined, type?: ('encrypted' | 'plain' | 'sensitive' | 'system') | undefined, target?: (Array<'development' | 'preview' | 'production'>) | undefined, applyToAllCustomEnvironments?: boolean | undefined, customEnvironmentIds?: Array<string> | undefined, decrypted?: boolean | undefined, comment?: string | undefined, lastEditedByDisplayName?: string | undefined}>, failed: Array<{error: {code: string, message: string, key?: string | undefined, envVarId?: string | undefined, envVarKey?: string | undefined, action?: string | undefined, link?: string | undefined, value?: (string | Array<'development' | 'development' | 'preview' | 'preview' | 'production'>) | undefined, gitBranch?: string | undefined, target?: (Array<'development' | 'development' | 'preview' | 'preview' | 'production'> | 'development' | 'development' | 'preview' | 'preview' | 'production') | undefined, project?: string | undefined}}>};

export type PostV1EnvInput = {
  db: Db
  env: Env
  user: AuthUser | null
  query: {teamId?: string | undefined, slug?: string | undefined}
  body: PostV1EnvBody
};

export type PostV1EnvHandler = (input: PostV1EnvInput) => Promise<PostV1EnvResponse>;

export type GetV1EnvResponse = {data: Array<{created?: string | undefined, key?: string | undefined, ownerId?: (string | null) | undefined, id?: string | undefined, createdBy?: (string | null) | undefined, deletedBy?: (string | null) | undefined, updatedBy?: (string | null) | undefined, createdAt?: number | undefined, deletedAt?: number | undefined, updatedAt?: number | undefined, value?: string | undefined, projectId?: Array<string> | undefined, type?: ('encrypted' | 'plain' | 'sensitive' | 'system') | undefined, target?: (Array<'development' | 'preview' | 'production'>) | undefined, applyToAllCustomEnvironments?: boolean | undefined, customEnvironmentIds?: Array<string> | undefined, decrypted?: boolean | undefined, comment?: string | undefined, lastEditedByDisplayName?: string | undefined}>, pagination: Pagination};

export type GetV1EnvInput = {
  db: Db
  env: Env
  user: AuthUser | null
  query: {search?: string | undefined, projectId?: string | undefined, ids?: string | undefined, exclude_ids?: string | undefined, ''exclude-ids''?: string | undefined, exclude_projectId?: string | undefined, ''exclude-projectId''?: string | undefined, teamId?: string | undefined, slug?: string | undefined}
};

export type GetV1EnvHandler = (input: GetV1EnvInput) => Promise<GetV1EnvResponse>;

export const patchV1EnvBody = z.object({updates: z.record(z.string(), z.object({key: z.string().optional(), value: z.string().optional(), target: z.array(z.enum(["production", "preview", "development"])).optional(), projectId: z.array(z.string()).optional(), projectIdUpdates: z.object({link: z.array(z.string()).optional(), unlink: z.array(z.string()).optional()}).optional(), type: z.enum(["encrypted", "sensitive"]).optional(), comment: z.string().max(500).optional()}))});

export type PatchV1EnvBody = {updates: Record<string, {key?: string | undefined, value?: string | undefined, target?: (Array<'production' | 'preview' | 'development'>) | undefined, projectId?: Array<string> | undefined, projectIdUpdates?: ({link?: Array<string> | undefined, unlink?: Array<string> | undefined}) | undefined, type?: ('encrypted' | 'sensitive') | undefined, comment?: string | undefined}>};

export type PatchV1EnvResponse = {updated: Array<{created?: string | undefined, key?: string | undefined, ownerId?: (string | null) | undefined, id?: string | undefined, createdBy?: (string | null) | undefined, deletedBy?: (string | null) | undefined, updatedBy?: (string | null) | undefined, createdAt?: number | undefined, deletedAt?: number | undefined, updatedAt?: number | undefined, value?: string | undefined, projectId?: Array<string> | undefined, type?: ('encrypted' | 'plain' | 'sensitive' | 'system') | undefined, target?: (Array<'development' | 'preview' | 'production'>) | undefined, applyToAllCustomEnvironments?: boolean | undefined, customEnvironmentIds?: Array<string> | undefined, decrypted?: boolean | undefined, comment?: string | undefined, lastEditedByDisplayName?: string | undefined}>, failed: Array<{error: {code: string, message: string, key?: string | undefined, envVarId?: string | undefined, envVarKey?: string | undefined, action?: string | undefined, link?: string | undefined, value?: (string | Array<'development' | 'development' | 'preview' | 'preview' | 'production'>) | undefined, gitBranch?: string | undefined, target?: (Array<'development' | 'development' | 'preview' | 'preview' | 'production'> | 'development' | 'development' | 'preview' | 'preview' | 'production') | undefined, project?: string | undefined}}>};

export type PatchV1EnvInput = {
  db: Db
  env: Env
  user: AuthUser | null
  query: {teamId?: string | undefined, slug?: string | undefined}
  body: PatchV1EnvBody
};

export type PatchV1EnvHandler = (input: PatchV1EnvInput) => Promise<PatchV1EnvResponse>;

export const deleteV1EnvBody = z.object({ids: z.array(z.string())});

export type DeleteV1EnvBody = {ids: Array<string>};

export type DeleteV1EnvResponse = {deleted: Array<string>, failed: Array<{error: {code: string, message: string, key?: string | undefined, envVarId?: string | undefined, envVarKey?: string | undefined, action?: string | undefined, link?: string | undefined, value?: (string | Array<'development' | 'development' | 'preview' | 'preview' | 'production'>) | undefined, gitBranch?: string | undefined, target?: (Array<'development' | 'development' | 'preview' | 'preview' | 'production'> | 'development' | 'development' | 'preview' | 'preview' | 'production') | undefined, project?: string | undefined}}>};

export type DeleteV1EnvInput = {
  db: Db
  env: Env
  user: AuthUser | null
  query: {teamId?: string | undefined, slug?: string | undefined}
  body: DeleteV1EnvBody
};

export type DeleteV1EnvHandler = (input: DeleteV1EnvInput) => Promise<DeleteV1EnvResponse>;

export type GetV1EnvIdResponse = {created?: string | undefined, key?: string | undefined, ownerId?: (string | null) | undefined, id?: string | undefined, createdBy?: (string | null) | undefined, deletedBy?: (string | null) | undefined, updatedBy?: (string | null) | undefined, createdAt?: number | undefined, deletedAt?: number | undefined, updatedAt?: number | undefined, value?: string | undefined, projectId?: Array<string> | undefined, type?: ('encrypted' | 'plain' | 'sensitive' | 'system') | undefined, target?: (Array<'development' | 'preview' | 'production'>) | undefined, applyToAllCustomEnvironments?: boolean | undefined, customEnvironmentIds?: Array<string> | undefined, decrypted?: boolean | undefined, comment?: string | undefined, lastEditedByDisplayName?: string | undefined};

export type GetV1EnvIdInput = {
  db: Db
  env: Env
  user: AuthUser | null
  params: {id: string}
  query: {teamId?: string | undefined, slug?: string | undefined}
};

export type GetV1EnvIdHandler = (input: GetV1EnvIdInput) => Promise<GetV1EnvIdResponse>;

export type PatchV1EnvIdUnlinkProjectIdResponse = {id: string};

export type PatchV1EnvIdUnlinkProjectIdInput = {
  db: Db
  env: Env
  user: AuthUser | null
  params: {id: string, projectId: string}
  query: {teamId?: string | undefined, slug?: string | undefined}
};

export type PatchV1EnvIdUnlinkProjectIdHandler = (input: PatchV1EnvIdUnlinkProjectIdInput) => Promise<PatchV1EnvIdUnlinkProjectIdResponse>;
