import { z } from "zod";
import { useQuery, queryOptions, keepPreviousData } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export const useGetApiV1LogDrainsIdResponse = z.object({
  createdFrom: z.string(),
  clientId: z.string().optional(),
  configurationId: z.string().optional(),
  projectsMetadata: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        framework: z
          .enum([
            "actix-web",
            "angular",
            "ash",
            "astro",
            "axum",
            "blitzjs",
            "brunch",
            "bun",
            "container",
            "create-react-app",
            "django",
            "docusaurus",
            "docusaurus-2",
            "dojo",
            "eleventy",
            "elysia",
            "ember",
            "eve",
            "express",
            "fastapi",
            "fasthtml",
            "fastify",
            "flask",
            "gatsby",
            "go",
            "gridsome",
            "h3",
            "hexo",
            "hono",
            "hugo",
            "hydrogen",
            "ionic-angular",
            "ionic-react",
            "jekyll",
            "koa",
            "mastra",
            "middleman",
            "nestjs",
            "nextjs",
            "nitro",
            "node",
            "nuxtjs",
            "parcel",
            "polymer",
            "preact",
            "python",
            "react-router",
            "redwoodjs",
            "remix",
            "ruby",
            "rust",
            "saber",
            "sanity",
            "sanity-v2",
            "sapper",
            "scully",
            "services",
            "solidstart",
            "solidstart-1",
            "stencil",
            "storybook",
            "svelte",
            "sveltekit",
            "sveltekit-1",
            "tanstack-start",
            "tanstack-start-lovable",
            "umijs",
            "vite",
            "vitepress",
            "vue",
            "vuepress",
            "xmcp",
            "zola",
            "null",
          ])
          .nullable()
          .optional(),
        latestDeployment: z.string().optional(),
      }),
    )
    .nullable()
    .optional(),
  integrationIcon: z.string().optional(),
  integrationConfigurationUri: z.string().optional(),
  integrationWebsite: z.string().optional(),
});

export type UseGetApiV1LogDrainsIdArgs = {
  id: string;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const getApiV1LogDrainsIdQueryOptions = (args: UseGetApiV1LogDrainsIdArgs) =>
  queryOptions({
    queryKey: ["GET /v1/log-drains/{id}", "logDrains", args.id, args.teamId, args.slug],
    queryFn: () =>
      apiFetch(
        buildUrl("/v1/log-drains/{id}", { id: args.id, teamId: args.teamId, slug: args.slug }),
        useGetApiV1LogDrainsIdResponse,
        { method: "GET" },
      ),
    placeholderData: keepPreviousData,
  });

export const useGetApiV1LogDrainsId = (args: UseGetApiV1LogDrainsIdArgs) =>
  useQuery(getApiV1LogDrainsIdQueryOptions(args));
