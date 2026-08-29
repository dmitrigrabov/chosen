import { namedSandbox } from "packages/models/src/namedSandbox.generated.ts";
import { session } from "packages/models/src/session.generated.ts";
import { sandboxPublicRoute } from "packages/models/src/sandboxPublicRoute.generated.ts";
import { z } from "zod";
import { useQuery, queryOptions, keepPreviousData } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export const useGetApiV2SandboxesNameResponse = z.object({
  sandbox: namedSandbox,
  session: session,
  routes: z.array(sandboxPublicRoute),
  resumed: z.boolean(),
});

export type UseGetApiV2SandboxesNameArgs = {
  name: string;
  projectId?: string | undefined;
  resume?: boolean | undefined;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const getApiV2SandboxesNameQueryOptions = (args: UseGetApiV2SandboxesNameArgs) =>
  queryOptions({
    queryKey: [
      "GET /v2/sandboxes/{name}",
      "sandboxes",
      args.name,
      args.projectId,
      args.resume,
      args.teamId,
      args.slug,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/v2/sandboxes/{name}", {
          name: args.name,
          projectId: args.projectId,
          resume: args.resume,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useGetApiV2SandboxesNameResponse,
        { method: "GET" },
      ),
    placeholderData: keepPreviousData,
  });

export const useGetApiV2SandboxesName = (args: UseGetApiV2SandboxesNameArgs) =>
  useQuery(getApiV2SandboxesNameQueryOptions(args));
