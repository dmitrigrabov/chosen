import { z } from "zod";
import { useQuery, queryOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiV8ArtifactsStatusArgs = {
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const useGetApiV8ArtifactsStatusResponse = z.union([
  z.object({ status: z.string() }),
  z.object({ status: z.enum(["disabled", "enabled", "over_limit", "paused"]) }),
]);

export const getApiV8ArtifactsStatusQueryOptions = (args: UseGetApiV8ArtifactsStatusArgs) =>
  queryOptions({
    queryKey: ["GET /v8/artifacts/status", "artifacts", args.teamId, args.slug],
    queryFn: () =>
      apiFetch(
        buildUrl("/v8/artifacts/status", { teamId: args.teamId, slug: args.slug }),
        useGetApiV8ArtifactsStatusResponse,
        { method: "GET" },
      ),
  });

export const useGetApiV8ArtifactsStatus = (args: UseGetApiV8ArtifactsStatusArgs) =>
  useQuery(getApiV8ArtifactsStatusQueryOptions(args));
