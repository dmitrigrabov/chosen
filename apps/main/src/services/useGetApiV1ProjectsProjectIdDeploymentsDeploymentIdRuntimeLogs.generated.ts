import { z } from "zod";
import { useQuery, queryOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiV1ProjectsProjectIdDeploymentsDeploymentIdRuntimeLogsArgs = {
  projectId: string;
  deploymentId: string;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const useGetApiV1ProjectsProjectIdDeploymentsDeploymentIdRuntimeLogsResponse = z.void();

export const getApiV1ProjectsProjectIdDeploymentsDeploymentIdRuntimeLogsQueryOptions = (
  args: UseGetApiV1ProjectsProjectIdDeploymentsDeploymentIdRuntimeLogsArgs,
) =>
  queryOptions({
    queryKey: [
      "GET /v1/projects/{projectId}/deployments/{deploymentId}/runtime-logs",
      "logs",
      args.projectId,
      args.deploymentId,
      args.teamId,
      args.slug,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/v1/projects/{projectId}/deployments/{deploymentId}/runtime-logs", {
          projectId: args.projectId,
          deploymentId: args.deploymentId,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useGetApiV1ProjectsProjectIdDeploymentsDeploymentIdRuntimeLogsResponse,
        { method: "GET" },
      ),
  });

export const useGetApiV1ProjectsProjectIdDeploymentsDeploymentIdRuntimeLogs = (
  args: UseGetApiV1ProjectsProjectIdDeploymentsDeploymentIdRuntimeLogsArgs,
) => useQuery(getApiV1ProjectsProjectIdDeploymentsDeploymentIdRuntimeLogsQueryOptions(args));
