import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api/client";

export type UseCreateApiStorageStoresBlobArgs = {
  body: {
    name: string;
    region?:
      | (
          | "arn1"
          | "bom1"
          | "cdg1"
          | "cle1"
          | "cpt1"
          | "dub1"
          | "dxb1"
          | "fra1"
          | "gru1"
          | "hkg1"
          | "hnd1"
          | "iad1"
          | "icn1"
          | "kix1"
          | "lhr1"
          | "pdx1"
          | "sfo1"
          | "sin1"
          | "syd1"
          | "yul1"
        )
      | undefined;
    access?: ("public" | "private") | undefined;
    projectId?: string | undefined;
  };
};

export const useCreateApiStorageStoresBlobResponse = z.object({
  store: z
    .object({
      projectsMetadata: z.array(
        z.object({
          id: z.string(),
          projectId: z.string(),
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
          environments: z.array(z.string()),
          envVarPrefix: z.string().nullable(),
          environmentVariables: z.array(z.string()),
          deployments: z
            .object({
              required: z.boolean(),
              actions: z.array(
                z.object({
                  slug: z.string(),
                  environments: z.array(z.enum(["development", "preview", "production"])),
                }),
              ),
            })
            .optional(),
          makeEnvVarsSensitive: z.boolean().optional(),
        }),
      ),
      projectFilter: z
        .object({
          git: z
            .object({
              providers: z.union([
                z.array(z.enum(["bitbucket", "github", "gitlab"])),
                z.literal("*"),
              ]),
              owners: z.array(z.string()).optional(),
              repos: z.array(z.string()).optional(),
            })
            .optional(),
        })
        .optional(),
      totalConnectedProjects: z.number().optional(),
      usageQuotaExceeded: z.boolean(),
      status: z
        .enum([
          "available",
          "error",
          "initializing",
          "limits-exceeded-suspended",
          "limits-exceeded-suspended-store-count",
          "onboarding",
          "suspended",
          "uninstalled",
          "null",
        ])
        .nullable(),
      access: z.enum(["private", "public"]).optional(),
      kind: z.enum(["project-default", "user-created"]).optional(),
      projectId: z.string().optional(),
      size: z.number(),
      count: z.number(),
      region: z.enum([
        "arn1",
        "bom1",
        "cdg1",
        "cle1",
        "cpt1",
        "dub1",
        "dxb1",
        "fra1",
        "gru1",
        "hkg1",
        "hnd1",
        "iad1",
        "icn1",
        "kix1",
        "lhr1",
        "pdx1",
        "sfo1",
        "sin1",
        "syd1",
        "yul1",
      ]),
      isTokenExpired: z.boolean(),
    })
    .nullable(),
});

export type UseCreateApiStorageStoresBlobResponse = {
  store: {
    projectsMetadata: Array<{
      id: string;
      projectId: string;
      name: string;
      framework?:
        | (
            | "actix-web"
            | "angular"
            | "ash"
            | "astro"
            | "axum"
            | "blitzjs"
            | "brunch"
            | "bun"
            | "container"
            | "create-react-app"
            | "django"
            | "docusaurus"
            | "docusaurus-2"
            | "dojo"
            | "eleventy"
            | "elysia"
            | "ember"
            | "eve"
            | "express"
            | "fastapi"
            | "fasthtml"
            | "fastify"
            | "flask"
            | "gatsby"
            | "go"
            | "gridsome"
            | "h3"
            | "hexo"
            | "hono"
            | "hugo"
            | "hydrogen"
            | "ionic-angular"
            | "ionic-react"
            | "jekyll"
            | "koa"
            | "mastra"
            | "middleman"
            | "nestjs"
            | "nextjs"
            | "nitro"
            | "node"
            | "nuxtjs"
            | "parcel"
            | "polymer"
            | "preact"
            | "python"
            | "react-router"
            | "redwoodjs"
            | "remix"
            | "ruby"
            | "rust"
            | "saber"
            | "sanity"
            | "sanity-v2"
            | "sapper"
            | "scully"
            | "services"
            | "solidstart"
            | "solidstart-1"
            | "stencil"
            | "storybook"
            | "svelte"
            | "sveltekit"
            | "sveltekit-1"
            | "tanstack-start"
            | "tanstack-start-lovable"
            | "umijs"
            | "vite"
            | "vitepress"
            | "vue"
            | "vuepress"
            | "xmcp"
            | "zola"
            | "null"
            | null
          )
        | undefined;
      latestDeployment?: string | undefined;
      environments: Array<string>;
      envVarPrefix: string | null;
      environmentVariables: Array<string>;
      deployments?:
        | {
            required: boolean;
            actions: Array<{
              slug: string;
              environments: Array<"development" | "preview" | "production">;
            }>;
          }
        | undefined;
      makeEnvVarsSensitive?: boolean | undefined;
    }>;
    projectFilter?:
      | {
          git?:
            | {
                providers: Array<"bitbucket" | "github" | "gitlab"> | "*";
                owners?: Array<string> | undefined;
                repos?: Array<string> | undefined;
              }
            | undefined;
        }
      | undefined;
    totalConnectedProjects?: number | undefined;
    usageQuotaExceeded: boolean;
    status:
      | "available"
      | "error"
      | "initializing"
      | "limits-exceeded-suspended"
      | "limits-exceeded-suspended-store-count"
      | "onboarding"
      | "suspended"
      | "uninstalled"
      | "null"
      | null;
    access?: ("private" | "public") | undefined;
    kind?: ("project-default" | "user-created") | undefined;
    projectId?: string | undefined;
    size: number;
    count: number;
    region:
      | "arn1"
      | "bom1"
      | "cdg1"
      | "cle1"
      | "cpt1"
      | "dub1"
      | "dxb1"
      | "fra1"
      | "gru1"
      | "hkg1"
      | "hnd1"
      | "iad1"
      | "icn1"
      | "kix1"
      | "lhr1"
      | "pdx1"
      | "sfo1"
      | "sin1"
      | "syd1"
      | "yul1";
    isTokenExpired: boolean;
  } | null;
};

export type CreateApiStorageStoresBlobBody = {
  name: string;
  region?:
    | (
        | "arn1"
        | "bom1"
        | "cdg1"
        | "cle1"
        | "cpt1"
        | "dub1"
        | "dxb1"
        | "fra1"
        | "gru1"
        | "hkg1"
        | "hnd1"
        | "iad1"
        | "icn1"
        | "kix1"
        | "lhr1"
        | "pdx1"
        | "sfo1"
        | "sin1"
        | "syd1"
        | "yul1"
      )
    | undefined;
  access?: ("public" | "private") | undefined;
  projectId?: string | undefined;
};

export const useCreateApiStorageStoresBlob = (
  options: UseMutationOptions<
    UseCreateApiStorageStoresBlobResponse,
    Error,
    UseCreateApiStorageStoresBlobArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiStorageStoresBlobArgs) =>
      apiFetch("/storage/stores/blob", useCreateApiStorageStoresBlobResponse, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(args.body),
      }),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["storage"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
