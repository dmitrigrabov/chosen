import { z } from "zod";

export type AuthUser = {
  createdAt: number;
  softBlock: {
    blockedAt: number;
    reason:
      | "BLOCKED_FOR_PLATFORM_ABUSE"
      | "DOMAIN_OWNER_DELETION_REQUEST"
      | "ENTERPRISE_TRIAL_ENDED"
      | "ENTERPRISE_UNPAID_INVOICE"
      | "EXPOSURE_CAP_EXCEEDED"
      | "FAIR_USE_LIMITS_EXCEEDED"
      | "HOBBY_ALLOCATION_PAUSED"
      | "SUBSCRIPTION_CANCELED"
      | "SUBSCRIPTION_EXPIRED"
      | "UNPAID_INVOICE";
    blockedDueToOverageType?:
      | (
          | "analyticsUsage"
          | "artifacts"
          | "bandwidth"
          | "blobDataTransfer"
          | "blobTotalAdvancedRequests"
          | "blobTotalAvgSizeInBytes"
          | "blobTotalGetResponseObjectSizeInBytes"
          | "blobTotalSimpleRequests"
          | "connectDataTransfer"
          | "dataCacheRead"
          | "dataCacheWrite"
          | "edgeConfigRead"
          | "edgeConfigWrite"
          | "edgeFunctionExecutionUnits"
          | "edgeMiddlewareInvocations"
          | "edgeRequest"
          | "edgeRequestAdditionalCpuDuration"
          | "elasticConcurrencyBuildSlots"
          | "fastDataTransfer"
          | "fastOriginTransfer"
          | "fluidCpuDuration"
          | "fluidDuration"
          | "functionDuration"
          | "functionInvocation"
          | "imageOptimizationCacheRead"
          | "imageOptimizationCacheWrite"
          | "imageOptimizationTransformation"
          | "logDrainsVolume"
          | "monitoringMetric"
          | "observabilityEvent"
          | "onDemandConcurrencyMinutes"
          | "runtimeCacheRead"
          | "runtimeCacheWrite"
          | "serverlessFunctionExecution"
          | "sourceImages"
          | "wafOwaspExcessBytes"
          | "wafOwaspRequests"
          | "wafRateLimitRequest"
          | "webAnalyticsEvent"
        )
      | undefined;
    hobbyAllocationPause?:
      | {
          pausedUntil: number;
          pausedAt: number;
          triggers: Array<{
            allocation:
              | "analyticsUsage"
              | "artifacts"
              | "bandwidth"
              | "blobDataTransfer"
              | "blobTotalAdvancedRequests"
              | "blobTotalAvgSizeInBytes"
              | "blobTotalGetResponseObjectSizeInBytes"
              | "blobTotalSimpleRequests"
              | "connectDataTransfer"
              | "dataCacheRead"
              | "dataCacheWrite"
              | "edgeConfigRead"
              | "edgeConfigWrite"
              | "edgeFunctionExecutionUnits"
              | "edgeMiddlewareInvocations"
              | "edgeRequest"
              | "edgeRequestAdditionalCpuDuration"
              | "elasticConcurrencyBuildSlots"
              | "fastDataTransfer"
              | "fastOriginTransfer"
              | "fluidCpuDuration"
              | "fluidDuration"
              | "functionDuration"
              | "functionInvocation"
              | "imageOptimizationCacheRead"
              | "imageOptimizationCacheWrite"
              | "imageOptimizationTransformation"
              | "logDrainsVolume"
              | "monitoringMetric"
              | "observabilityEvent"
              | "onDemandConcurrencyMinutes"
              | "runtimeCacheRead"
              | "runtimeCacheWrite"
              | "serverlessFunctionExecution"
              | "sourceImages"
              | "wafOwaspExcessBytes"
              | "wafOwaspRequests"
              | "wafRateLimitRequest"
              | "webAnalyticsEvent";
            usage: number;
          }>;
          cohort: string;
        }
      | undefined;
  } | null;
  billing: Record<string, never> | null;
  resourceConfig: {
    concurrentBuilds?: number | undefined;
    nodeType?: string | undefined;
    elasticConcurrencyEnabled?: boolean | undefined;
    buildEntitlements?: { enhancedBuilds?: boolean | undefined } | undefined;
    buildQueue?:
      | { configuration?: ("SKIP_NAMESPACE_QUEUE" | "WAIT_FOR_NAMESPACE_QUEUE") | undefined }
      | undefined;
    awsAccountType?: string | undefined;
    awsAccountIds?: Array<string> | undefined;
    cfZoneName?: string | undefined;
    imageOptimizationType?: string | undefined;
    edgeConfigs?: number | undefined;
    edgeConfigSize?: number | undefined;
    edgeFunctionMaxSizeBytes?: number | undefined;
    edgeFunctionExecutionTimeoutMs?: number | undefined;
    serverlessFunctionMaxDuration?: number | undefined;
    serverlessFunctionMaxMemorySize?: number | undefined;
    kvDatabases?: number | undefined;
    postgresDatabases?: number | undefined;
    blobStores?: number | undefined;
    integrationStores?: number | undefined;
    cronJobsPerProject?: number | undefined;
    microfrontendGroupsPerTeam?: number | undefined;
    microfrontendProjectsPerGroup?: number | undefined;
    flagsExplorerOverridesThreshold?: number | undefined;
    flagsExplorerUnlimitedOverrides?: boolean | undefined;
    customEnvironmentsPerProject?: number | undefined;
    security?:
      | {
          customRules?: number | undefined;
          ipBlocks?: number | undefined;
          ipBypass?: number | undefined;
          rateLimit?: number | undefined;
        }
      | undefined;
    bulkRedirectsFreeLimitOverride?: number | undefined;
  };
  stagingPrefix: string;
  activeDashboardViews?:
    | Array<{
        scopeId: string;
        viewPreference?: ("cards" | "list" | "null" | null) | undefined;
        favoritesViewPreference?: ("closed" | "open" | "null" | null) | undefined;
        recentsViewPreference?: ("closed" | "open" | "null" | null) | undefined;
      }>
    | undefined;
  importFlowGitNamespace?: (string | number | null) | undefined;
  importFlowGitNamespaceId?: (string | number | null) | undefined;
  importFlowGitProvider?:
    | (
        | "bitbucket"
        | "cursor-origin"
        | "github"
        | "github-custom-host"
        | "github-limited"
        | "gitlab"
        | "vercel"
        | "null"
        | null
      )
    | undefined;
  preferredScopesAndGitNamespaces?:
    | Array<{ scopeId: string; gitNamespaceId: string | number | null }>
    | undefined;
  dismissedToasts?:
    | Array<{ name: string; dismissals: Array<{ scopeId: string; createdAt: number }> }>
    | undefined;
  favoriteProjectsAndSpaces?: Array<{ teamId: string; projectId: string }> | undefined;
  hasTrialAvailable: boolean;
  remoteCaching?: { enabled?: boolean | undefined } | undefined;
  dataCache?: { excessBillingEnabled?: boolean | undefined } | undefined;
  featureBlocks?:
    | {
        webAnalytics?:
          | {
              blockedFrom?: number | undefined;
              blockedUntil?: number | undefined;
              isCurrentlyBlocked: boolean;
            }
          | undefined;
        speedInsightsFree?:
          | {
              blockedFrom?: number | undefined;
              blockedUntil?: number | undefined;
              blockReason: "admin_override" | "hard_blocked" | "limits_exceeded";
              isCurrentlyBlocked: boolean;
            }
          | undefined;
      }
    | undefined;
  isAccountUpdateRequired?: boolean | undefined;
  accountUpdateContext?:
    | {
        canOptOut: boolean;
        organization?: { id: string; name: string; slug: string } | undefined;
        managedTeams: Array<{
          teamId: string;
          slug: string;
          name: string;
          avatar: string | null;
          workEmail: string;
        }>;
        verifiedEmuDomains: Array<string>;
      }
    | undefined;
  id: string;
  email: string;
  name: string | null;
  username: string;
  avatar: string | null;
  defaultTeamId: string | null;
  isEnterpriseManaged?: boolean | undefined;
  shouldShowEnterpriseManagedWelcome?: boolean | undefined;
};

export const authUser = z.object({
  createdAt: z.number(),
  softBlock: z
    .object({
      blockedAt: z.number(),
      reason: z.enum([
        "BLOCKED_FOR_PLATFORM_ABUSE",
        "DOMAIN_OWNER_DELETION_REQUEST",
        "ENTERPRISE_TRIAL_ENDED",
        "ENTERPRISE_UNPAID_INVOICE",
        "EXPOSURE_CAP_EXCEEDED",
        "FAIR_USE_LIMITS_EXCEEDED",
        "HOBBY_ALLOCATION_PAUSED",
        "SUBSCRIPTION_CANCELED",
        "SUBSCRIPTION_EXPIRED",
        "UNPAID_INVOICE",
      ]),
      blockedDueToOverageType: z
        .enum([
          "analyticsUsage",
          "artifacts",
          "bandwidth",
          "blobDataTransfer",
          "blobTotalAdvancedRequests",
          "blobTotalAvgSizeInBytes",
          "blobTotalGetResponseObjectSizeInBytes",
          "blobTotalSimpleRequests",
          "connectDataTransfer",
          "dataCacheRead",
          "dataCacheWrite",
          "edgeConfigRead",
          "edgeConfigWrite",
          "edgeFunctionExecutionUnits",
          "edgeMiddlewareInvocations",
          "edgeRequest",
          "edgeRequestAdditionalCpuDuration",
          "elasticConcurrencyBuildSlots",
          "fastDataTransfer",
          "fastOriginTransfer",
          "fluidCpuDuration",
          "fluidDuration",
          "functionDuration",
          "functionInvocation",
          "imageOptimizationCacheRead",
          "imageOptimizationCacheWrite",
          "imageOptimizationTransformation",
          "logDrainsVolume",
          "monitoringMetric",
          "observabilityEvent",
          "onDemandConcurrencyMinutes",
          "runtimeCacheRead",
          "runtimeCacheWrite",
          "serverlessFunctionExecution",
          "sourceImages",
          "wafOwaspExcessBytes",
          "wafOwaspRequests",
          "wafRateLimitRequest",
          "webAnalyticsEvent",
        ])
        .optional(),
      hobbyAllocationPause: z
        .object({
          pausedUntil: z.number(),
          pausedAt: z.number(),
          triggers: z.array(
            z.object({
              allocation: z.enum([
                "analyticsUsage",
                "artifacts",
                "bandwidth",
                "blobDataTransfer",
                "blobTotalAdvancedRequests",
                "blobTotalAvgSizeInBytes",
                "blobTotalGetResponseObjectSizeInBytes",
                "blobTotalSimpleRequests",
                "connectDataTransfer",
                "dataCacheRead",
                "dataCacheWrite",
                "edgeConfigRead",
                "edgeConfigWrite",
                "edgeFunctionExecutionUnits",
                "edgeMiddlewareInvocations",
                "edgeRequest",
                "edgeRequestAdditionalCpuDuration",
                "elasticConcurrencyBuildSlots",
                "fastDataTransfer",
                "fastOriginTransfer",
                "fluidCpuDuration",
                "fluidDuration",
                "functionDuration",
                "functionInvocation",
                "imageOptimizationCacheRead",
                "imageOptimizationCacheWrite",
                "imageOptimizationTransformation",
                "logDrainsVolume",
                "monitoringMetric",
                "observabilityEvent",
                "onDemandConcurrencyMinutes",
                "runtimeCacheRead",
                "runtimeCacheWrite",
                "serverlessFunctionExecution",
                "sourceImages",
                "wafOwaspExcessBytes",
                "wafOwaspRequests",
                "wafRateLimitRequest",
                "webAnalyticsEvent",
              ]),
              usage: z.number(),
            }),
          ),
          cohort: z.string(),
        })
        .optional(),
    })
    .nullable(),
  billing: z.object({}).nullable(),
  resourceConfig: z.object({
    concurrentBuilds: z.number().optional(),
    nodeType: z.string().optional(),
    elasticConcurrencyEnabled: z.boolean().optional(),
    buildEntitlements: z.object({ enhancedBuilds: z.boolean().optional() }).optional(),
    buildQueue: z
      .object({
        configuration: z.enum(["SKIP_NAMESPACE_QUEUE", "WAIT_FOR_NAMESPACE_QUEUE"]).optional(),
      })
      .optional(),
    awsAccountType: z.string().optional(),
    awsAccountIds: z.array(z.string()).optional(),
    cfZoneName: z.string().optional(),
    imageOptimizationType: z.string().optional(),
    edgeConfigs: z.number().optional(),
    edgeConfigSize: z.number().optional(),
    edgeFunctionMaxSizeBytes: z.number().optional(),
    edgeFunctionExecutionTimeoutMs: z.number().optional(),
    serverlessFunctionMaxDuration: z.number().optional(),
    serverlessFunctionMaxMemorySize: z.number().optional(),
    kvDatabases: z.number().optional(),
    postgresDatabases: z.number().optional(),
    blobStores: z.number().optional(),
    integrationStores: z.number().optional(),
    cronJobsPerProject: z.number().optional(),
    microfrontendGroupsPerTeam: z.number().optional(),
    microfrontendProjectsPerGroup: z.number().optional(),
    flagsExplorerOverridesThreshold: z.number().optional(),
    flagsExplorerUnlimitedOverrides: z.boolean().optional(),
    customEnvironmentsPerProject: z.number().optional(),
    security: z
      .object({
        customRules: z.number().optional(),
        ipBlocks: z.number().optional(),
        ipBypass: z.number().optional(),
        rateLimit: z.number().optional(),
      })
      .optional(),
    bulkRedirectsFreeLimitOverride: z.number().optional(),
  }),
  stagingPrefix: z.string(),
  activeDashboardViews: z
    .array(
      z.object({
        scopeId: z.string(),
        viewPreference: z.enum(["cards", "list", "null"]).nullable().optional(),
        favoritesViewPreference: z.enum(["closed", "open", "null"]).nullable().optional(),
        recentsViewPreference: z.enum(["closed", "open", "null"]).nullable().optional(),
      }),
    )
    .optional(),
  importFlowGitNamespace: z.union([z.string(), z.number()]).nullable().optional(),
  importFlowGitNamespaceId: z.union([z.string(), z.number()]).nullable().optional(),
  importFlowGitProvider: z
    .enum([
      "bitbucket",
      "cursor-origin",
      "github",
      "github-custom-host",
      "github-limited",
      "gitlab",
      "vercel",
      "null",
    ])
    .nullable()
    .optional(),
  preferredScopesAndGitNamespaces: z
    .array(
      z.object({
        scopeId: z.string(),
        gitNamespaceId: z.union([z.string(), z.number()]).nullable(),
      }),
    )
    .optional(),
  dismissedToasts: z
    .array(
      z.object({
        name: z.string(),
        dismissals: z.array(z.object({ scopeId: z.string(), createdAt: z.number() })),
      }),
    )
    .optional(),
  favoriteProjectsAndSpaces: z
    .array(z.object({ teamId: z.string(), projectId: z.string() }))
    .optional(),
  hasTrialAvailable: z.boolean(),
  remoteCaching: z.object({ enabled: z.boolean().optional() }).optional(),
  dataCache: z.object({ excessBillingEnabled: z.boolean().optional() }).optional(),
  featureBlocks: z
    .object({
      webAnalytics: z
        .object({
          blockedFrom: z.number().optional(),
          blockedUntil: z.number().optional(),
          isCurrentlyBlocked: z.boolean(),
        })
        .optional(),
      speedInsightsFree: z
        .object({
          blockedFrom: z.number().optional(),
          blockedUntil: z.number().optional(),
          blockReason: z.enum(["admin_override", "hard_blocked", "limits_exceeded"]),
          isCurrentlyBlocked: z.boolean(),
        })
        .optional(),
    })
    .optional(),
  isAccountUpdateRequired: z.boolean().optional(),
  accountUpdateContext: z
    .object({
      canOptOut: z.boolean(),
      organization: z.object({ id: z.string(), name: z.string(), slug: z.string() }).optional(),
      managedTeams: z.array(
        z.object({
          teamId: z.string(),
          slug: z.string(),
          name: z.string(),
          avatar: z.string().nullable(),
          workEmail: z.string(),
        }),
      ),
      verifiedEmuDomains: z.array(z.string()),
    })
    .optional(),
  id: z.string(),
  email: z.string(),
  name: z.string().nullable(),
  username: z.string(),
  avatar: z.string().nullable(),
  defaultTeamId: z.string().nullable(),
  isEnterpriseManaged: z.boolean().optional(),
  shouldShowEnterpriseManagedWelcome: z.boolean().optional(),
});
