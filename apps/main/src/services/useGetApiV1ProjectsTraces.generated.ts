import { z } from "zod";
import { useQuery, queryOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseGetApiV1ProjectsTracesArgs = {
  projectId: string;
  requestId: string;
  teamId?: string | undefined;
  slug?: string | undefined;
};

export const useGetApiV1ProjectsTracesResponse = z.object({
  trace: z.object({
    traceId: z.string(),
    resources: z
      .array(z.object({ name: z.string(), attributes: z.record(z.string(), z.string()) }))
      .optional(),
    spans: z.array(
      z.object({
        name: z.string(),
        kind: z.number(),
        resource: z.string(),
        library: z.object({ name: z.string(), version: z.string().optional() }),
        spanId: z.string(),
        parentSpanId: z.string().optional(),
        status: z.object({ code: z.number(), message: z.string().optional() }),
        traceState: z.string().optional(),
        traceFlags: z.number(),
        attributes: z.record(z.string(), z.unknown()),
        links: z.array(z.record(z.string(), z.unknown())),
        events: z.array(
          z.object({
            name: z.string(),
            timestamp: z.array(z.union([z.number(), z.number()])),
            attributes: z.record(z.string(), z.unknown()),
          }),
        ),
        startTime: z.array(z.union([z.number(), z.number()])),
        endTime: z.array(z.union([z.number(), z.number()])),
        duration: z.array(z.union([z.number(), z.number()])),
      }),
    ),
    rootSpanId: z.string().optional(),
  }),
});

export const getApiV1ProjectsTracesQueryOptions = (args: UseGetApiV1ProjectsTracesArgs) =>
  queryOptions({
    queryKey: [
      "GET /v1/projects/traces",
      "projects",
      args.projectId,
      args.requestId,
      args.teamId,
      args.slug,
    ],
    queryFn: () =>
      apiFetch(
        buildUrl("/v1/projects/traces", {
          projectId: args.projectId,
          requestId: args.requestId,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useGetApiV1ProjectsTracesResponse,
        { method: "GET" },
      ),
  });

export const useGetApiV1ProjectsTraces = (args: UseGetApiV1ProjectsTracesArgs) =>
  useQuery(getApiV1ProjectsTracesQueryOptions(args));
