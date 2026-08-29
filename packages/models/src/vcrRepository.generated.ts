import { z } from "zod";

export type VcrRepository = {
  id: string;
  projectId: string;
  name: string;
  public: boolean;
  createdAt: string;
  updatedAt: string;
};

export const vcrRepository = z.object({
  id: z.string(),
  projectId: z.string(),
  name: z.string(),
  public: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
