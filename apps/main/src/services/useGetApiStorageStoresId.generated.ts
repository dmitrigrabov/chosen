import {z} from 'zod'
import {useQuery, queryOptions} from '@tanstack/react-query'
import {apiFetch, buildUrl} from '@/lib/api/client'

export type UseGetApiStorageStoresIdArgs = {id: string, ''skip-metadata''?: boolean | undefined, ''include-guides''?: boolean | undefined};

export const useGetApiStorageStoresIdResponse = z.object({store: z.object({projectsMetadata: z.array(z.object({id: z.string(), projectId: z.string(), name: z.string(), framework: z.enum(["actix-web", "angular", "ash", "astro", "axum", "blitzjs", "brunch", "bun", "container", "create-react-app", "django", "docusaurus", "docusaurus-2", "dojo", "eleventy", "elysia", "ember", "eve", "express", "fastapi", "fasthtml", "fastify", "flask", "gatsby", "go", "gridsome", "h3", "hexo", "hono", "hugo", "hydrogen", "ionic-angular", "ionic-react", "jekyll", "koa", "mastra", "middleman", "nestjs", "nextjs", "nitro", "node", "nuxtjs", "parcel", "polymer", "preact", "python", "react-router", "redwoodjs", "remix", "ruby", "rust", "saber", "sanity", "sanity-v2", "sapper", "scully", "services", "solidstart", "solidstart-1", "stencil", "storybook", "svelte", "sveltekit", "sveltekit-1", "tanstack-start", "tanstack-start-lovable", "umijs", "vite", "vitepress", "vue", "vuepress", "xmcp", "zola", "null"]).nullable().optional(), latestDeployment: z.string().optional(), environments: z.array(z.string()), envVarPrefix: z.string().nullable(), environmentVariables: z.array(z.string()), deployments: z.object({required: z.boolean(), actions: z.array(z.object({slug: z.string(), environments: z.array(z.enum(["development", "preview", "production"]))}))}).optional(), makeEnvVarsSensitive: z.boolean().optional()})), projectFilter: z.object({git: z.object({providers: z.union([z.array(z.enum(["bitbucket", "github", "gitlab"])), z.literal("*")]), owners: z.array(z.string()).optional(), repos: z.array(z.string()).optional()}).optional()}).optional(), totalConnectedProjects: z.number().optional(), usageQuotaExceeded: z.boolean(), status: z.enum(["available", "error", "initializing", "limits-exceeded-suspended", "limits-exceeded-suspended-store-count", "onboarding", "suspended", "uninstalled", "null"]).nullable()})});

export const getApiStorageStoresIdQueryOptions = (args: UseGetApiStorageStoresIdArgs) =>
      queryOptions({
        queryKey: ['GET /storage/stores/{id}', 'storage', args.id, args.''skip-metadata'', args.''include-guides''],
        queryFn: () => apiFetch(buildUrl('/storage/stores/{id}', { id: args.id, 'skip-metadata': args.'skip-metadata', 'include-guides': args.'include-guides' }), useGetApiStorageStoresIdResponse, { method: 'GET' })
      });

export const useGetApiStorageStoresId = (args: UseGetApiStorageStoresIdArgs) => useQuery(getApiStorageStoresIdQueryOptions(args));
