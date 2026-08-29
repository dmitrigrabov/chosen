import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api/client";

export type UseCreateApiV1TeamsArgs = {
  body: {
    slug: string;
    name?: string | undefined;
    attribution?:
      | {
          sessionReferrer?: string | undefined;
          landingPage?: string | undefined;
          pageBeforeConversionPage?: string | undefined;
          utm?:
            | {
                utmSource?: string | undefined;
                utmMedium?: string | undefined;
                utmCampaign?: string | undefined;
                utmTerm?: string | undefined;
              }
            | undefined;
        }
      | undefined;
  };
};

export const useCreateApiV1TeamsResponse = z.object({ id: z.string(), slug: z.string() });

export type UseCreateApiV1TeamsResponse = { id: string; slug: string };

export type CreateApiV1TeamsBody = {
  slug: string;
  name?: string | undefined;
  attribution?:
    | {
        sessionReferrer?: string | undefined;
        landingPage?: string | undefined;
        pageBeforeConversionPage?: string | undefined;
        utm?:
          | {
              utmSource?: string | undefined;
              utmMedium?: string | undefined;
              utmCampaign?: string | undefined;
              utmTerm?: string | undefined;
            }
          | undefined;
      }
    | undefined;
};

export const useCreateApiV1Teams = (
  options: UseMutationOptions<
    UseCreateApiV1TeamsResponse,
    Error,
    UseCreateApiV1TeamsArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiV1TeamsArgs) =>
      apiFetch("/v1/teams", useCreateApiV1TeamsResponse, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(args.body),
      }),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["teams"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
