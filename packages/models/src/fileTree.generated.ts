import { z } from "zod";

export type FileTree = {
  name: string;
  type: "directory" | "file" | "invalid" | "lambda" | "middleware" | "symlink";
  uid?: string | undefined;
  children?: Array<FileTree> | undefined;
  contentType?: string | undefined;
  mode: number;
};

export const fileTree: z.ZodType<FileTree> = z.object({
  name: z.string(),
  type: z.enum(["directory", "file", "invalid", "lambda", "middleware", "symlink"]),
  uid: z.string().optional(),
  children: z.array(z.lazy(() => fileTree)).optional(),
  contentType: z.string().optional(),
  mode: z.number(),
});
