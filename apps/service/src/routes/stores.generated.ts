import {Hono} from 'hono'
import type {Env} from '../env'
import {withAuth, type AuthVariables, type AuthUser} from '../middleware/auth'
import {toErrorResponse, validate} from './errors'
import {z} from 'zod'
import {createDb, type Db} from '../db'
import {getStorageStoresId, postStorageStoresBlob, deleteStorageStoresBlobId} from './handlers/stores'

export const app = new Hono<{ Bindings: Env; Variables: AuthVariables }>()

app.onError(toErrorResponse)

app.use('*', withAuth)

app.get(
'/storage/stores/:id',
  validate('param', z.object({id: z.string()})),
  validate('query', z.object({"'skip-metadata'": z.preprocess(v => v === 'true' ? true : v === 'false' ? false : v, z.boolean()).optional(), "'include-guides'": z.preprocess(v => v === 'true' ? true : v === 'false' ? false : v, z.boolean()).optional()})),
  async c => {
    const db = createDb(c.env.DB)
    const params = c.req.valid('param')
    const query = c.req.valid('query')
    return c.json(await getStorageStoresId({db, env: c.env, user: c.var.user, params, query}))
  }
)
app.post(
'/storage/stores/blob',
  validate('json', postStorageStoresBlobBody),
  async c => {
    const db = createDb(c.env.DB)
    const body = c.req.valid('json')
    return c.json(await postStorageStoresBlob({db, env: c.env, user: c.var.user, body}))
  }
)
app.delete(
'/storage/stores/blob/:id',
  validate('param', z.object({id: z.string()})),
  async c => {
    const db = createDb(c.env.DB)
    const params = c.req.valid('param')
    return c.json(await deleteStorageStoresBlobId({db, env: c.env, user: c.var.user, params}))
  }
)
;

export type GetStorageStoresIdResponse = {store: {projectsMetadata: Array<{id: string, projectId: string, name: string, framework?: ('actix-web' | 'angular' | 'ash' | 'astro' | 'axum' | 'blitzjs' | 'brunch' | 'bun' | 'container' | 'create-react-app' | 'django' | 'docusaurus' | 'docusaurus-2' | 'dojo' | 'eleventy' | 'elysia' | 'ember' | 'eve' | 'express' | 'fastapi' | 'fasthtml' | 'fastify' | 'flask' | 'gatsby' | 'go' | 'gridsome' | 'h3' | 'hexo' | 'hono' | 'hugo' | 'hydrogen' | 'ionic-angular' | 'ionic-react' | 'jekyll' | 'koa' | 'mastra' | 'middleman' | 'nestjs' | 'nextjs' | 'nitro' | 'node' | 'nuxtjs' | 'parcel' | 'polymer' | 'preact' | 'python' | 'react-router' | 'redwoodjs' | 'remix' | 'ruby' | 'rust' | 'saber' | 'sanity' | 'sanity-v2' | 'sapper' | 'scully' | 'services' | 'solidstart' | 'solidstart-1' | 'stencil' | 'storybook' | 'svelte' | 'sveltekit' | 'sveltekit-1' | 'tanstack-start' | 'tanstack-start-lovable' | 'umijs' | 'vite' | 'vitepress' | 'vue' | 'vuepress' | 'xmcp' | 'zola' | 'null' | null) | undefined, latestDeployment?: string | undefined, environments: Array<string>, envVarPrefix: string | null, environmentVariables: Array<string>, deployments?: ({required: boolean, actions: Array<{slug: string, environments: Array<'development' | 'preview' | 'production'>}>}) | undefined, makeEnvVarsSensitive?: boolean | undefined}>, projectFilter?: ({git?: ({providers: Array<'bitbucket' | 'github' | 'gitlab'> | '*', owners?: Array<string> | undefined, repos?: Array<string> | undefined}) | undefined}) | undefined, totalConnectedProjects?: number | undefined, usageQuotaExceeded: boolean, status: 'available' | 'error' | 'initializing' | 'limits-exceeded-suspended' | 'limits-exceeded-suspended-store-count' | 'onboarding' | 'suspended' | 'uninstalled' | 'null' | null}};

export type GetStorageStoresIdInput = {
  db: Db
  env: Env
  user: AuthUser | null
  params: {id: string}
  query: {''skip-metadata''?: boolean | undefined, ''include-guides''?: boolean | undefined}
};

export type GetStorageStoresIdHandler = (input: GetStorageStoresIdInput) => Promise<GetStorageStoresIdResponse>;

export const postStorageStoresBlobBody = z.object({name: z.string().max(70), region: z.enum(["arn1", "bom1", "cdg1", "cle1", "cpt1", "dub1", "dxb1", "fra1", "gru1", "hkg1", "hnd1", "iad1", "icn1", "kix1", "lhr1", "pdx1", "sfo1", "sin1", "syd1", "yul1"]).optional(), access: z.enum(["public", "private"]).optional(), projectId: z.string().max(50).optional()});

export type PostStorageStoresBlobBody = {name: string, region?: ('arn1' | 'bom1' | 'cdg1' | 'cle1' | 'cpt1' | 'dub1' | 'dxb1' | 'fra1' | 'gru1' | 'hkg1' | 'hnd1' | 'iad1' | 'icn1' | 'kix1' | 'lhr1' | 'pdx1' | 'sfo1' | 'sin1' | 'syd1' | 'yul1') | undefined, access?: ('public' | 'private') | undefined, projectId?: string | undefined};

export type PostStorageStoresBlobResponse = {store: {projectsMetadata: Array<{id: string, projectId: string, name: string, framework?: ('actix-web' | 'angular' | 'ash' | 'astro' | 'axum' | 'blitzjs' | 'brunch' | 'bun' | 'container' | 'create-react-app' | 'django' | 'docusaurus' | 'docusaurus-2' | 'dojo' | 'eleventy' | 'elysia' | 'ember' | 'eve' | 'express' | 'fastapi' | 'fasthtml' | 'fastify' | 'flask' | 'gatsby' | 'go' | 'gridsome' | 'h3' | 'hexo' | 'hono' | 'hugo' | 'hydrogen' | 'ionic-angular' | 'ionic-react' | 'jekyll' | 'koa' | 'mastra' | 'middleman' | 'nestjs' | 'nextjs' | 'nitro' | 'node' | 'nuxtjs' | 'parcel' | 'polymer' | 'preact' | 'python' | 'react-router' | 'redwoodjs' | 'remix' | 'ruby' | 'rust' | 'saber' | 'sanity' | 'sanity-v2' | 'sapper' | 'scully' | 'services' | 'solidstart' | 'solidstart-1' | 'stencil' | 'storybook' | 'svelte' | 'sveltekit' | 'sveltekit-1' | 'tanstack-start' | 'tanstack-start-lovable' | 'umijs' | 'vite' | 'vitepress' | 'vue' | 'vuepress' | 'xmcp' | 'zola' | 'null' | null) | undefined, latestDeployment?: string | undefined, environments: Array<string>, envVarPrefix: string | null, environmentVariables: Array<string>, deployments?: ({required: boolean, actions: Array<{slug: string, environments: Array<'development' | 'preview' | 'production'>}>}) | undefined, makeEnvVarsSensitive?: boolean | undefined}>, projectFilter?: ({git?: ({providers: Array<'bitbucket' | 'github' | 'gitlab'> | '*', owners?: Array<string> | undefined, repos?: Array<string> | undefined}) | undefined}) | undefined, totalConnectedProjects?: number | undefined, usageQuotaExceeded: boolean, status: 'available' | 'error' | 'initializing' | 'limits-exceeded-suspended' | 'limits-exceeded-suspended-store-count' | 'onboarding' | 'suspended' | 'uninstalled' | 'null' | null, access?: ('private' | 'public') | undefined, kind?: ('project-default' | 'user-created') | undefined, projectId?: string | undefined, size: number, count: number, region: 'arn1' | 'bom1' | 'cdg1' | 'cle1' | 'cpt1' | 'dub1' | 'dxb1' | 'fra1' | 'gru1' | 'hkg1' | 'hnd1' | 'iad1' | 'icn1' | 'kix1' | 'lhr1' | 'pdx1' | 'sfo1' | 'sin1' | 'syd1' | 'yul1', isTokenExpired: boolean} | null};

export type PostStorageStoresBlobInput = {
  db: Db
  env: Env
  user: AuthUser | null
  body: PostStorageStoresBlobBody
};

export type PostStorageStoresBlobHandler = (input: PostStorageStoresBlobInput) => Promise<PostStorageStoresBlobResponse>;

export type DeleteStorageStoresBlobIdResponse = {id: string};

export type DeleteStorageStoresBlobIdInput = {
  db: Db
  env: Env
  user: AuthUser | null
  params: {id: string}
};

export type DeleteStorageStoresBlobIdHandler = (input: DeleteStorageStoresBlobIdInput) => Promise<DeleteStorageStoresBlobIdResponse>;
