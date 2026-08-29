import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseCreateApiV1KmsIssuersIssuerIdSignMessageArgs = {
  issuerId: string;
  body: { message: string };
};

export const useCreateApiV1KmsIssuersIssuerIdSignMessageResponse = z.object({
  signature: z.object({
    payload: z.string(),
    signature: z.string(),
    header: z
      .object({
        alg: z.string().optional(),
        b64: z.boolean().optional(),
        crit: z.array(z.string()).optional(),
        kid: z.string().optional(),
        x5t: z.string().optional(),
        x5c: z.array(z.string()).optional(),
        x5u: z.string().optional(),
        jku: z.string().optional(),
        jwk: z
          .object({
            n: z.string().optional(),
            e: z.string().optional(),
            kty: z.string().optional(),
            crv: z.string().optional(),
            x: z.string().optional(),
            y: z.string().optional(),
            alg: z.string().optional(),
            pub: z.string().optional(),
          })
          .optional(),
        typ: z.string().optional(),
        cty: z.string().optional(),
      })
      .optional(),
    protected: z.string().optional(),
  }),
});

export type UseCreateApiV1KmsIssuersIssuerIdSignMessageResponse = {
  signature: {
    payload: string;
    signature: string;
    header?:
      | {
          alg?: string | undefined;
          b64?: boolean | undefined;
          crit?: Array<string> | undefined;
          kid?: string | undefined;
          x5t?: string | undefined;
          x5c?: Array<string> | undefined;
          x5u?: string | undefined;
          jku?: string | undefined;
          jwk?:
            | {
                n?: string | undefined;
                e?: string | undefined;
                kty?: string | undefined;
                crv?: string | undefined;
                x?: string | undefined;
                y?: string | undefined;
                alg?: string | undefined;
                pub?: string | undefined;
              }
            | undefined;
          typ?: string | undefined;
          cty?: string | undefined;
        }
      | undefined;
    protected?: string | undefined;
  };
};

export type CreateApiV1KmsIssuersIssuerIdSignMessageBody = { message: string };

export const useCreateApiV1KmsIssuersIssuerIdSignMessage = (
  options: UseMutationOptions<
    UseCreateApiV1KmsIssuersIssuerIdSignMessageResponse,
    Error,
    UseCreateApiV1KmsIssuersIssuerIdSignMessageArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiV1KmsIssuersIssuerIdSignMessageArgs) =>
      apiFetch(
        buildUrl("/v1/kms/issuers/{issuerId}/sign/message", { issuerId: args.issuerId }),
        useCreateApiV1KmsIssuersIssuerIdSignMessageResponse,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(args.body),
        },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["kms"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
