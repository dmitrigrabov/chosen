import { z } from "zod";

export type Network = {
  awsAccountId: string;
  awsAvailabilityZoneIds?: Array<string> | undefined;
  awsRegion: string;
  cidr: string;
  createdAt: number;
  egressIpAddresses?: Array<string> | undefined;
  reservedEgressIpAddresses?: Array<string> | undefined;
  egressCidrBlock?: string | undefined;
  hostedZones?: { count: number } | undefined;
  id: string;
  name: string;
  peeringConnections?: { count: number } | undefined;
  projects?: { count: number; ids: Array<string> } | undefined;
  region?: string | undefined;
  status: "create_in_progress" | "delete_in_progress" | "error" | "ready";
  teamId: string;
  vpcId?: string | undefined;
};

export const network = z.object({
  awsAccountId: z.string(),
  awsAvailabilityZoneIds: z.array(z.string()).optional(),
  awsRegion: z.string(),
  cidr: z.string(),
  createdAt: z.number(),
  egressIpAddresses: z.array(z.string()).optional(),
  reservedEgressIpAddresses: z.array(z.string()).optional(),
  egressCidrBlock: z.string().optional(),
  hostedZones: z.object({ count: z.number() }).optional(),
  id: z.string(),
  name: z.string(),
  peeringConnections: z.object({ count: z.number() }).optional(),
  projects: z.object({ count: z.number(), ids: z.array(z.string()) }).optional(),
  region: z.string().optional(),
  status: z.enum(["create_in_progress", "delete_in_progress", "error", "ready"]),
  teamId: z.string(),
  vpcId: z.string().optional(),
});
