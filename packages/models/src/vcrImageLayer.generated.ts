import { z } from "zod";

export type VcrImageLayer =
  | {
      createdBy: string | null;
      digest: string | null;
      operation:
        | "ADD"
        | "ARG"
        | "CMD"
        | "COPY"
        | "ENTRYPOINT"
        | "ENV"
        | "EXPOSE"
        | "FROM"
        | "HEALTHCHECK"
        | "LABEL"
        | "ONBUILD"
        | "RUN"
        | "SHELL"
        | "STOPSIGNAL"
        | "UNKNOWN"
        | "USER"
        | "VOLUME"
        | "WORKDIR";
      sizeBytes: number | null;
      type: "FROM";
      baseImage: string | null;
      collapsedDigests: Array<string>;
      collapsedLayerCount: number;
    }
  | {
      createdBy: string | null;
      digest: string | null;
      operation:
        | "ADD"
        | "ARG"
        | "CMD"
        | "COPY"
        | "ENTRYPOINT"
        | "ENV"
        | "EXPOSE"
        | "FROM"
        | "HEALTHCHECK"
        | "LABEL"
        | "ONBUILD"
        | "RUN"
        | "SHELL"
        | "STOPSIGNAL"
        | "UNKNOWN"
        | "USER"
        | "VOLUME"
        | "WORKDIR";
      sizeBytes: number | null;
      type: "RUN";
      command: string | null;
    }
  | {
      createdBy: string | null;
      digest: string | null;
      operation:
        | "ADD"
        | "ARG"
        | "CMD"
        | "COPY"
        | "ENTRYPOINT"
        | "ENV"
        | "EXPOSE"
        | "FROM"
        | "HEALTHCHECK"
        | "LABEL"
        | "ONBUILD"
        | "RUN"
        | "SHELL"
        | "STOPSIGNAL"
        | "UNKNOWN"
        | "USER"
        | "VOLUME"
        | "WORKDIR";
      sizeBytes: number | null;
      type: "ENV";
      env: string | null;
    }
  | {
      createdBy: string | null;
      digest: string | null;
      operation:
        | "ADD"
        | "ARG"
        | "CMD"
        | "COPY"
        | "ENTRYPOINT"
        | "ENV"
        | "EXPOSE"
        | "FROM"
        | "HEALTHCHECK"
        | "LABEL"
        | "ONBUILD"
        | "RUN"
        | "SHELL"
        | "STOPSIGNAL"
        | "UNKNOWN"
        | "USER"
        | "VOLUME"
        | "WORKDIR";
      sizeBytes: number | null;
      type:
        | "ADD"
        | "ARG"
        | "CMD"
        | "COPY"
        | "ENTRYPOINT"
        | "EXPOSE"
        | "HEALTHCHECK"
        | "LABEL"
        | "ONBUILD"
        | "SHELL"
        | "STOPSIGNAL"
        | "UNKNOWN"
        | "USER"
        | "VOLUME"
        | "WORKDIR";
      value: string | null;
    };

export const vcrImageLayer = z.union([
  z.object({
    createdBy: z.string().nullable(),
    digest: z.string().nullable(),
    operation: z.enum([
      "ADD",
      "ARG",
      "CMD",
      "COPY",
      "ENTRYPOINT",
      "ENV",
      "EXPOSE",
      "FROM",
      "HEALTHCHECK",
      "LABEL",
      "ONBUILD",
      "RUN",
      "SHELL",
      "STOPSIGNAL",
      "UNKNOWN",
      "USER",
      "VOLUME",
      "WORKDIR",
    ]),
    sizeBytes: z.number().nullable(),
    type: z.literal("FROM"),
    baseImage: z.string().nullable(),
    collapsedDigests: z.array(z.string()),
    collapsedLayerCount: z.number(),
  }),
  z.object({
    createdBy: z.string().nullable(),
    digest: z.string().nullable(),
    operation: z.enum([
      "ADD",
      "ARG",
      "CMD",
      "COPY",
      "ENTRYPOINT",
      "ENV",
      "EXPOSE",
      "FROM",
      "HEALTHCHECK",
      "LABEL",
      "ONBUILD",
      "RUN",
      "SHELL",
      "STOPSIGNAL",
      "UNKNOWN",
      "USER",
      "VOLUME",
      "WORKDIR",
    ]),
    sizeBytes: z.number().nullable(),
    type: z.literal("RUN"),
    command: z.string().nullable(),
  }),
  z.object({
    createdBy: z.string().nullable(),
    digest: z.string().nullable(),
    operation: z.enum([
      "ADD",
      "ARG",
      "CMD",
      "COPY",
      "ENTRYPOINT",
      "ENV",
      "EXPOSE",
      "FROM",
      "HEALTHCHECK",
      "LABEL",
      "ONBUILD",
      "RUN",
      "SHELL",
      "STOPSIGNAL",
      "UNKNOWN",
      "USER",
      "VOLUME",
      "WORKDIR",
    ]),
    sizeBytes: z.number().nullable(),
    type: z.literal("ENV"),
    env: z.string().nullable(),
  }),
  z.object({
    createdBy: z.string().nullable(),
    digest: z.string().nullable(),
    operation: z.enum([
      "ADD",
      "ARG",
      "CMD",
      "COPY",
      "ENTRYPOINT",
      "ENV",
      "EXPOSE",
      "FROM",
      "HEALTHCHECK",
      "LABEL",
      "ONBUILD",
      "RUN",
      "SHELL",
      "STOPSIGNAL",
      "UNKNOWN",
      "USER",
      "VOLUME",
      "WORKDIR",
    ]),
    sizeBytes: z.number().nullable(),
    type: z.enum([
      "ADD",
      "ARG",
      "CMD",
      "COPY",
      "ENTRYPOINT",
      "EXPOSE",
      "HEALTHCHECK",
      "LABEL",
      "ONBUILD",
      "SHELL",
      "STOPSIGNAL",
      "UNKNOWN",
      "USER",
      "VOLUME",
      "WORKDIR",
    ]),
    value: z.string().nullable(),
  }),
]);
