import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseCreateApiV1ProjectsIdOrNameMembersArgs = {
  idOrName: string;
  teamId?: string | undefined;
  slug?: string | undefined;
  body:
    | {
        uid: string;
        username?: string | undefined;
        email?: string | undefined;
        role: "ADMIN" | "PROJECT_VIEWER" | "PROJECT_DEVELOPER";
      }
    | {
        uid?: string | undefined;
        username: string;
        email?: string | undefined;
        role: "ADMIN" | "PROJECT_VIEWER" | "PROJECT_DEVELOPER";
      }
    | {
        uid?: string | undefined;
        username?: string | undefined;
        email: string;
        role: "ADMIN" | "PROJECT_VIEWER" | "PROJECT_DEVELOPER";
      };
};

export const useCreateApiV1ProjectsIdOrNameMembersResponse = z.object({ id: z.string() });

export type UseCreateApiV1ProjectsIdOrNameMembersResponse = { id: string };

export type CreateApiV1ProjectsIdOrNameMembersBody =
  | {
      uid: string;
      username?: string | undefined;
      email?: string | undefined;
      role: "ADMIN" | "PROJECT_VIEWER" | "PROJECT_DEVELOPER";
    }
  | {
      uid?: string | undefined;
      username: string;
      email?: string | undefined;
      role: "ADMIN" | "PROJECT_VIEWER" | "PROJECT_DEVELOPER";
    }
  | {
      uid?: string | undefined;
      username?: string | undefined;
      email: string;
      role: "ADMIN" | "PROJECT_VIEWER" | "PROJECT_DEVELOPER";
    };

export const useCreateApiV1ProjectsIdOrNameMembers = (
  options: UseMutationOptions<
    UseCreateApiV1ProjectsIdOrNameMembersResponse,
    Error,
    UseCreateApiV1ProjectsIdOrNameMembersArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiV1ProjectsIdOrNameMembersArgs) =>
      apiFetch(
        buildUrl("/v1/projects/{idOrName}/members", {
          idOrName: args.idOrName,
          teamId: args.teamId,
          slug: args.slug,
        }),
        useCreateApiV1ProjectsIdOrNameMembersResponse,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(args.body),
        },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["projectMembers"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
