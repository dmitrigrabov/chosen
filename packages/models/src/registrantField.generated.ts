import { z } from "zod";

export type RegistrantField =
  | {
      description: string;
      required: boolean;
      label?: string | undefined;
      validation?: string | undefined;
      required_when?: (string | { value_in: Array<string> }) | undefined;
      type: "string";
      options?:
        | Array<{ value: string; label: string; fields?: Record<string, never> | undefined }>
        | undefined;
      fields?: Record<string, never> | undefined;
    }
  | {
      description: string;
      required: boolean;
      label?: string | undefined;
      validation?: string | undefined;
      required_when?: (string | { value_in: Array<string> }) | undefined;
      type: "enum";
      options: Array<{ value: string; label: string; fields?: Record<string, never> | undefined }>;
      fields?: Record<string, never> | undefined;
    }
  | {
      description: string;
      required: boolean;
      label?: string | undefined;
      validation?: string | undefined;
      required_when?: (string | { value_in: Array<string> }) | undefined;
      type: "acknowledgement";
      value?: string | undefined;
    }
  | {
      description: string;
      required: boolean;
      label?: string | undefined;
      validation?: string | undefined;
      required_when?: (string | { value_in: Array<string> }) | undefined;
      type: "notice";
    };

export const registrantField = z.union([
  z.object({
    description: z.string(),
    required: z.boolean(),
    label: z.string().optional(),
    validation: z.string().optional(),
    required_when: z.union([z.string(), z.object({ value_in: z.array(z.string()) })]).optional(),
    type: z.literal("string"),
    options: z
      .array(z.object({ value: z.string(), label: z.string(), fields: z.object({}).optional() }))
      .optional(),
    fields: z.object({}).optional(),
  }),
  z.object({
    description: z.string(),
    required: z.boolean(),
    label: z.string().optional(),
    validation: z.string().optional(),
    required_when: z.union([z.string(), z.object({ value_in: z.array(z.string()) })]).optional(),
    type: z.literal("enum"),
    options: z.array(
      z.object({ value: z.string(), label: z.string(), fields: z.object({}).optional() }),
    ),
    fields: z.object({}).optional(),
  }),
  z.object({
    description: z.string(),
    required: z.boolean(),
    label: z.string().optional(),
    validation: z.string().optional(),
    required_when: z.union([z.string(), z.object({ value_in: z.array(z.string()) })]).optional(),
    type: z.literal("acknowledgement"),
    value: z.string().optional(),
  }),
  z.object({
    description: z.string(),
    required: z.boolean(),
    label: z.string().optional(),
    validation: z.string().optional(),
    required_when: z.union([z.string(), z.object({ value_in: z.array(z.string()) })]).optional(),
    type: z.literal("notice"),
  }),
]);
