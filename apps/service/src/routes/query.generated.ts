import { Hono } from "hono";
import type { Env } from "../env";
import { withAuth, type AuthVariables, type AuthUser } from "../middleware/auth";
import { toErrorResponse, validate } from "./errors";
import { z } from "zod";
import { createDb, type Db } from "../db";
import {
  getV1QueryWebAnalyticsVisitsAggregate,
  getV1QueryWebAnalyticsEventsAggregate,
  getV1QueryWebAnalyticsVisitsCount,
  getV1QueryWebAnalyticsEventsCount,
} from "./handlers/query";

export const app = new Hono<{ Bindings: Env; Variables: AuthVariables }>();

app.onError(toErrorResponse);

app.use("*", withAuth);

app.get(
  "/v1/query/web-analytics/visits/aggregate",
  validate(
    "query",
    z.object({
      projectId: z.string(),
      by: z.array(
        z.union([
          z.enum([
            "hour",
            "day",
            "week",
            "month",
            "year",
            "country",
            "deviceType",
            "environment",
            "requestPath",
            "referrerHostname",
            "osName",
            "browserName",
            "route",
            "utmSource",
            "utmMedium",
            "utmCampaign",
            "utmContent",
            "utmTerm",
            "flags",
          ]),
          z.string().regex(/^(flags)(\/([0-9A-Za-z_]+|'([^']|'')*'))+$/),
        ]),
      ),
      since: z.union([z.coerce.number(), z.string()]),
      until: z.union([z.coerce.number(), z.string()]),
      limit: z.coerce.number().int().gte(1).lte(100).optional(),
      filter: z.string().optional(),
      teamId: z.string().optional(),
      slug: z.string().optional(),
    }),
  ),
  async (c) => {
    const db = createDb(c.env.DB);
    const query = c.req.valid("query");
    return c.json(
      await getV1QueryWebAnalyticsVisitsAggregate({ db, env: c.env, user: c.var.user, query }),
    );
  },
);
app.get(
  "/v1/query/web-analytics/events/aggregate",
  validate(
    "query",
    z.object({
      projectId: z.string(),
      by: z.array(
        z.union([
          z.enum([
            "hour",
            "day",
            "week",
            "month",
            "year",
            "country",
            "deviceType",
            "environment",
            "requestPath",
            "referrerHostname",
            "osName",
            "browserName",
            "route",
            "utmSource",
            "utmMedium",
            "utmCampaign",
            "utmContent",
            "utmTerm",
            "eventName",
            "flags",
            "eventData",
          ]),
          z.string().regex(/^(flags|eventData)(\/([0-9A-Za-z_]+|'([^']|'')*'))+$/),
        ]),
      ),
      since: z.union([z.coerce.number(), z.string()]),
      until: z.union([z.coerce.number(), z.string()]),
      limit: z.coerce.number().int().gte(1).lte(100).optional(),
      filter: z.string().optional(),
      teamId: z.string().optional(),
      slug: z.string().optional(),
    }),
  ),
  async (c) => {
    const db = createDb(c.env.DB);
    const query = c.req.valid("query");
    return c.json(
      await getV1QueryWebAnalyticsEventsAggregate({ db, env: c.env, user: c.var.user, query }),
    );
  },
);
app.get(
  "/v1/query/web-analytics/visits/count",
  validate(
    "query",
    z.object({
      projectId: z.string(),
      since: z.union([z.coerce.number(), z.string()]).optional(),
      until: z.union([z.coerce.number(), z.string()]).optional(),
      filter: z.string().optional(),
      teamId: z.string().optional(),
      slug: z.string().optional(),
    }),
  ),
  async (c) => {
    const db = createDb(c.env.DB);
    const query = c.req.valid("query");
    return c.json(
      await getV1QueryWebAnalyticsVisitsCount({ db, env: c.env, user: c.var.user, query }),
    );
  },
);
app.get(
  "/v1/query/web-analytics/events/count",
  validate(
    "query",
    z.object({
      projectId: z.string(),
      since: z.union([z.coerce.number(), z.string()]).optional(),
      until: z.union([z.coerce.number(), z.string()]).optional(),
      filter: z.string().optional(),
      teamId: z.string().optional(),
      slug: z.string().optional(),
    }),
  ),
  async (c) => {
    const db = createDb(c.env.DB);
    const query = c.req.valid("query");
    return c.json(
      await getV1QueryWebAnalyticsEventsCount({ db, env: c.env, user: c.var.user, query }),
    );
  },
);

export type GetV1QueryWebAnalyticsVisitsAggregateResponse = {
  version: number;
  query: {
    since: string;
    until: string;
    groupBy?:
      | Array<
          | string
          | "browserName"
          | "country"
          | "deviceType"
          | "environment"
          | "flags"
          | "osName"
          | "referrerHostname"
          | "requestPath"
          | "route"
          | "utmCampaign"
          | "utmContent"
          | "utmMedium"
          | "utmSource"
          | "utmTerm"
        >
      | undefined;
    filter?: string | undefined;
    limit: number;
  };
  data:
    | Array<{
        projectId?: string | undefined;
        country?: string | undefined;
        deviceType?: string | undefined;
        environment?: string | undefined;
        requestPath?: string | undefined;
        referrerHostname?: string | undefined;
        osName?: string | undefined;
        browserName?: string | undefined;
        route?: string | undefined;
        utmSource?: string | undefined;
        utmMedium?: string | undefined;
        utmCampaign?: string | undefined;
        utmContent?: string | undefined;
        utmTerm?: string | undefined;
        flags?: string | undefined;
        errorMessage?: string | undefined;
        entryRevalidateSeconds?: string | undefined;
        projectName?: string | undefined;
        deploymentId?: string | undefined;
        pathType?: string | undefined;
        pathTypeVariant?: string | undefined;
        requestHostname?: string | undefined;
        requestResolvedIp?: string | undefined;
        requestMethod?: string | undefined;
        requestExtension?: string | undefined;
        requestId?: string | undefined;
        requestApi?: string | undefined;
        referrerUrl?: string | undefined;
        serverActionName?: string | undefined;
        httpStatus?: string | undefined;
        errorCode?: string | undefined;
        source?: string | undefined;
        edgeType?: string | undefined;
        reason?: string | undefined;
        edgeNetworkRegion?: string | undefined;
        functionRegion?: string | undefined;
        imageTransformationRegion?: string | undefined;
        dataCacheRegion?: string | undefined;
        cause?: string | undefined;
        runtime?: string | undefined;
        provider?: string | undefined;
        isrCacheRegion?: string | undefined;
        isrAction?: string | undefined;
        cacheResult?: string | undefined;
        cacheOperation?: string | undefined;
        cacheHostname?: string | undefined;
        cachePath?: string | undefined;
        cacheHitState?: string | undefined;
        cacheHitLevel?: string | undefined;
        cacheApi?: string | undefined;
        cacheReason?: string | undefined;
        pprState?: string | undefined;
        clientIp?: string | undefined;
        clientIpCountry?: string | undefined;
        clientUserAgent?: string | undefined;
        httpAccept?: string | undefined;
        clientJa4Digest?: string | undefined;
        asnId?: string | undefined;
        asnName?: string | undefined;
        botName?: string | undefined;
        botCategory?: string | undefined;
        botCategoryLegacy?: string | undefined;
        botVerified?: string | undefined;
        botCheckResult?: string | undefined;
        deepAnalysisCheck?: string | undefined;
        wafAction?: string | undefined;
        wafRuleId?: string | undefined;
        ruleCategory?: string | undefined;
        skewProtection?: string | undefined;
        functionStartType?: string | undefined;
        functionDispatcher?: string | undefined;
        isAdditionalRequest?: string | undefined;
        originHostname?: string | undefined;
        originPath?: string | undefined;
        originRoute?: string | undefined;
        fetchType?: string | undefined;
        fetchIndex?: string | undefined;
        imageSource?: string | undefined;
        sourceImage?: string | undefined;
        sourceImagePathname?: string | undefined;
        sourceImageHostname?: string | undefined;
        sourceImageHash?: string | undefined;
        optimizedQuality?: string | undefined;
        optimizedWidthPixels?: string | undefined;
        optimizedFormatMimeType?: string | undefined;
        vdcOperationOrigin?: string | undefined;
        entryName?: string | undefined;
        entryId?: string | undefined;
        entryItemId?: string | undefined;
        tagName?: string | undefined;
        cacheTags?: string | undefined;
        storeId?: string | undefined;
        storeName?: string | undefined;
        blobOperationType?: string | undefined;
        blobOperationLevel?: string | undefined;
        visitorId?: string | undefined;
        eventName?: string | undefined;
        attributionTarget?: string | undefined;
        attributionEventName?: string | undefined;
        metricName?: string | undefined;
        attributes?: string | undefined;
        flagKey?: string | undefined;
        flagVariant?: string | undefined;
        flagEvaluationReason?: string | undefined;
        flagClientName?: string | undefined;
        sdkKeyId?: string | undefined;
        sdkKeyEnvironment?: string | undefined;
        reportingProjectId?: string | undefined;
        reportingProjectName?: string | undefined;
        eventData?: string | undefined;
        middlewareAction?: string | undefined;
        middlewareActionTarget?: string | undefined;
        aiModel?: string | undefined;
        aiGatewayModelId?: string | undefined;
        aiProvider?: string | undefined;
        aiModelType?: string | undefined;
        servedSpeed?: string | undefined;
        virtualModelSlug?: string | undefined;
        virtualModelKind?: string | undefined;
        inferenceEndpointSlug?: string | undefined;
        inferenceScope?: string | undefined;
        inferenceGeoRegion?: string | undefined;
        inferenceProviderRegion?: string | undefined;
        requestedInferenceRegion?: string | undefined;
        costCurrency?: string | undefined;
        marketCostCurrency?: string | undefined;
        cachedInputTokensCurrency?: string | undefined;
        cacheCreationInputTokensCurrency?: string | undefined;
        cacheCreation1hInputTokensCurrency?: string | undefined;
        surchargeCostCurrency?: string | undefined;
        gatewayCostCurrency?: string | undefined;
        keyId?: string | undefined;
        keyName?: string | undefined;
        authMethod?: string | undefined;
        appName?: string | undefined;
        codingAgent?: string | undefined;
        isByok?: string | undefined;
        spendAttribution?: string | undefined;
        isPrivateModel?: string | undefined;
        isRequestZdr?: string | undefined;
        hipaaRequested?: string | undefined;
        quotaRequested?: string | undefined;
        quotaEntityId?: string | undefined;
        quotaEntityType?: string | undefined;
        videoResolution?: string | undefined;
        videoAspectRatio?: string | undefined;
        piiRedactionApplied?: string | undefined;
        moderationApplied?: string | undefined;
        queueName?: string | undefined;
        consumerGroup?: string | undefined;
        messageId?: string | undefined;
        eventType?: string | undefined;
        notificationUrl?: string | undefined;
        queueRegion?: string | undefined;
        sandboxSessionId?: string | undefined;
        sandboxName?: string | undefined;
        workflowRunId?: string | undefined;
        workflowName?: string | undefined;
        workflowStatus?: string | undefined;
        stepRunId?: string | undefined;
        workflowStepName?: string | undefined;
        workflowEventType?: string | undefined;
        region?: string | undefined;
        specVersion?: string | undefined;
        contentType?: string | undefined;
        rewriteDestinationHostname?: string | undefined;
        externalRewriteTargetHost?: string | undefined;
        externalRewriteTargetPath?: string | undefined;
        commitSha?: string | undefined;
        reviewConclusion?: string | undefined;
        pullRequestNumber?: string | undefined;
        repositoryName?: string | undefined;
        repositoryOwner?: string | undefined;
        reviewStatus?: string | undefined;
        pullRequestState?: string | undefined;
        triggeringTag?: string | undefined;
        redirectLocation?: string | undefined;
        microfrontendsResponseReason?: string | undefined;
        microfrontendsMatchedPath?: string | undefined;
        microfrontendsDefaultAppDeploymentId?: string | undefined;
        microfrontendsDefaultAppProjectId?: string | undefined;
        service?: string | undefined;
        isPrefetchRequest?: string | undefined;
        spendReportGroupBy?: string | undefined;
        spendReportDatePart?: string | undefined;
        providerAttemptCanonicalSlug?: string | undefined;
        providerAttemptCredentialType?: string | undefined;
        providerAttemptSuccess?: string | undefined;
        providerAttemptStatusCode?: string | undefined;
        providerAttemptTimeout?: string | undefined;
        providerAttemptIsFinal?: string | undefined;
        providerAttemptNumber?: string | undefined;
        providerAttemptTotalInRequest?: string | undefined;
        generationId?: string | undefined;
        sessionId?: string | undefined;
        contentCaptureStatus?: string | undefined;
        contentCaptureInputs?: string | undefined;
        contentCaptureOutputs?: string | undefined;
        transcriptStatus?: string | undefined;
        transcriptInputs?: string | undefined;
        transcriptOutputs?: string | undefined;
        providerAttemptError?: string | undefined;
        providerAttemptSafetyIdentifier?: string | undefined;
        providerAttemptDevSafetyIdentifier?: string | undefined;
        providerAttemptRegion?: string | undefined;
        providerAttemptModelIndex?: string | undefined;
        toolCallType?: string | undefined;
        toolCallProvider?: string | undefined;
        toolCallSuccess?: string | undefined;
        toolCallErrorType?: string | undefined;
        toolCallStatusCode?: string | undefined;
        environmentId?: string | undefined;
        billableRegion?: string | undefined;
        direction?: string | undefined;
        networkTenancy?: string | undefined;
        trafficSource?: string | undefined;
        networkId?: string | undefined;
        privatelinkEndpointId?: string | undefined;
        privatelinkDnsName?: string | undefined;
        privatelinkIpAddress?: string | undefined;
        timestamp: string;
      }>
    | Array<
        | {
            projectId: string;
            country: string;
            deviceType: string;
            environment: string;
            requestPath: string;
            referrerHostname: string;
            osName: string;
            browserName: string;
            route: string;
            utmSource: string;
            utmMedium: string;
            utmCampaign: string;
            utmContent: string;
            utmTerm: string;
            flags: string;
            errorMessage: string;
            entryRevalidateSeconds: string;
            projectName: string;
            deploymentId: string;
            pathType: string;
            pathTypeVariant: string;
            requestHostname: string;
            requestResolvedIp: string;
            requestMethod: string;
            requestExtension: string;
            requestId: string;
            requestApi: string;
            referrerUrl: string;
            serverActionName: string;
            httpStatus: string;
            errorCode: string;
            source: string;
            edgeType: string;
            reason: string;
            edgeNetworkRegion: string;
            functionRegion: string;
            imageTransformationRegion: string;
            dataCacheRegion: string;
            cause: string;
            runtime: string;
            provider: string;
            isrCacheRegion: string;
            isrAction: string;
            cacheResult: string;
            cacheOperation: string;
            cacheHostname: string;
            cachePath: string;
            cacheHitState: string;
            cacheHitLevel: string;
            cacheApi: string;
            cacheReason: string;
            pprState: string;
            clientIp: string;
            clientIpCountry: string;
            clientUserAgent: string;
            httpAccept: string;
            clientJa4Digest: string;
            asnId: string;
            asnName: string;
            botName: string;
            botCategory: string;
            botCategoryLegacy: string;
            botVerified: string;
            botCheckResult: string;
            deepAnalysisCheck: string;
            wafAction: string;
            wafRuleId: string;
            ruleCategory: string;
            skewProtection: string;
            functionStartType: string;
            functionDispatcher: string;
            isAdditionalRequest: string;
            originHostname: string;
            originPath: string;
            originRoute: string;
            fetchType: string;
            fetchIndex: string;
            imageSource: string;
            sourceImage: string;
            sourceImagePathname: string;
            sourceImageHostname: string;
            sourceImageHash: string;
            optimizedQuality: string;
            optimizedWidthPixels: string;
            optimizedFormatMimeType: string;
            vdcOperationOrigin: string;
            entryName: string;
            entryId: string;
            entryItemId: string;
            tagName: string;
            cacheTags: string;
            storeId: string;
            storeName: string;
            blobOperationType: string;
            blobOperationLevel: string;
            visitorId: string;
            eventName: string;
            attributionTarget: string;
            attributionEventName: string;
            metricName: string;
            attributes: string;
            flagKey: string;
            flagVariant: string;
            flagEvaluationReason: string;
            flagClientName: string;
            sdkKeyId: string;
            sdkKeyEnvironment: string;
            reportingProjectId: string;
            reportingProjectName: string;
            eventData: string;
            middlewareAction: string;
            middlewareActionTarget: string;
            aiModel: string;
            aiGatewayModelId: string;
            aiProvider: string;
            aiModelType: string;
            servedSpeed: string;
            virtualModelSlug: string;
            virtualModelKind: string;
            inferenceEndpointSlug: string;
            inferenceScope: string;
            inferenceGeoRegion: string;
            inferenceProviderRegion: string;
            requestedInferenceRegion: string;
            costCurrency: string;
            marketCostCurrency: string;
            cachedInputTokensCurrency: string;
            cacheCreationInputTokensCurrency: string;
            cacheCreation1hInputTokensCurrency: string;
            surchargeCostCurrency: string;
            gatewayCostCurrency: string;
            keyId: string;
            keyName: string;
            authMethod: string;
            appName: string;
            codingAgent: string;
            isByok: string;
            spendAttribution: string;
            isPrivateModel: string;
            isRequestZdr: string;
            hipaaRequested: string;
            quotaRequested: string;
            quotaEntityId: string;
            quotaEntityType: string;
            videoResolution: string;
            videoAspectRatio: string;
            piiRedactionApplied: string;
            moderationApplied: string;
            queueName: string;
            consumerGroup: string;
            messageId: string;
            eventType: string;
            notificationUrl: string;
            queueRegion: string;
            sandboxSessionId: string;
            sandboxName: string;
            workflowRunId: string;
            workflowName: string;
            workflowStatus: string;
            stepRunId: string;
            workflowStepName: string;
            workflowEventType: string;
            region: string;
            specVersion: string;
            contentType: string;
            rewriteDestinationHostname: string;
            externalRewriteTargetHost: string;
            externalRewriteTargetPath: string;
            commitSha: string;
            reviewConclusion: string;
            pullRequestNumber: string;
            repositoryName: string;
            repositoryOwner: string;
            reviewStatus: string;
            pullRequestState: string;
            triggeringTag: string;
            redirectLocation: string;
            microfrontendsResponseReason: string;
            microfrontendsMatchedPath: string;
            microfrontendsDefaultAppDeploymentId: string;
            microfrontendsDefaultAppProjectId: string;
            service: string;
            isPrefetchRequest: string;
            spendReportGroupBy: string;
            spendReportDatePart: string;
            providerAttemptCanonicalSlug: string;
            providerAttemptCredentialType: string;
            providerAttemptSuccess: string;
            providerAttemptStatusCode: string;
            providerAttemptTimeout: string;
            providerAttemptIsFinal: string;
            providerAttemptNumber: string;
            providerAttemptTotalInRequest: string;
            generationId: string;
            sessionId: string;
            contentCaptureStatus: string;
            contentCaptureInputs: string;
            contentCaptureOutputs: string;
            transcriptStatus: string;
            transcriptInputs: string;
            transcriptOutputs: string;
            providerAttemptError: string;
            providerAttemptSafetyIdentifier: string;
            providerAttemptDevSafetyIdentifier: string;
            providerAttemptRegion: string;
            providerAttemptModelIndex: string;
            toolCallType: string;
            toolCallProvider: string;
            toolCallSuccess: string;
            toolCallErrorType: string;
            toolCallStatusCode: string;
            environmentId: string;
            billableRegion: string;
            direction: string;
            networkTenancy: string;
            trafficSource: string;
            networkId: string;
            privatelinkEndpointId: string;
            privatelinkDnsName: string;
            privatelinkIpAddress: string;
          }
        | Record<string, number | null>
      >;
};

export type GetV1QueryWebAnalyticsVisitsAggregateInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  query: {
    projectId: string;
    by: Array<
      | "hour"
      | "day"
      | "week"
      | "month"
      | "year"
      | "country"
      | "deviceType"
      | "environment"
      | "requestPath"
      | "referrerHostname"
      | "osName"
      | "browserName"
      | "route"
      | "utmSource"
      | "utmMedium"
      | "utmCampaign"
      | "utmContent"
      | "utmTerm"
      | "flags"
      | string
    >;
    since: number | string;
    until: number | string;
    limit?: number | undefined;
    filter?: string | undefined;
    teamId?: string | undefined;
    slug?: string | undefined;
  };
};

export type GetV1QueryWebAnalyticsVisitsAggregateHandler = (
  input: GetV1QueryWebAnalyticsVisitsAggregateInput,
) => Promise<GetV1QueryWebAnalyticsVisitsAggregateResponse>;

export type GetV1QueryWebAnalyticsEventsAggregateResponse = {
  version: number;
  query: {
    since: string;
    until: string;
    groupBy?:
      | Array<
          | string
          | "browserName"
          | "country"
          | "deviceType"
          | "environment"
          | "eventData"
          | "eventName"
          | "flags"
          | "osName"
          | "referrerHostname"
          | "requestPath"
          | "route"
          | "utmCampaign"
          | "utmContent"
          | "utmMedium"
          | "utmSource"
          | "utmTerm"
        >
      | undefined;
    filter?: string | undefined;
    limit: number;
  };
  data:
    | Array<{
        projectId?: string | undefined;
        country?: string | undefined;
        deviceType?: string | undefined;
        environment?: string | undefined;
        requestPath?: string | undefined;
        referrerHostname?: string | undefined;
        osName?: string | undefined;
        browserName?: string | undefined;
        route?: string | undefined;
        utmSource?: string | undefined;
        utmMedium?: string | undefined;
        utmCampaign?: string | undefined;
        utmContent?: string | undefined;
        utmTerm?: string | undefined;
        flags?: string | undefined;
        errorMessage?: string | undefined;
        entryRevalidateSeconds?: string | undefined;
        projectName?: string | undefined;
        deploymentId?: string | undefined;
        pathType?: string | undefined;
        pathTypeVariant?: string | undefined;
        requestHostname?: string | undefined;
        requestResolvedIp?: string | undefined;
        requestMethod?: string | undefined;
        requestExtension?: string | undefined;
        requestId?: string | undefined;
        requestApi?: string | undefined;
        referrerUrl?: string | undefined;
        serverActionName?: string | undefined;
        httpStatus?: string | undefined;
        errorCode?: string | undefined;
        source?: string | undefined;
        edgeType?: string | undefined;
        reason?: string | undefined;
        edgeNetworkRegion?: string | undefined;
        functionRegion?: string | undefined;
        imageTransformationRegion?: string | undefined;
        dataCacheRegion?: string | undefined;
        cause?: string | undefined;
        runtime?: string | undefined;
        provider?: string | undefined;
        isrCacheRegion?: string | undefined;
        isrAction?: string | undefined;
        cacheResult?: string | undefined;
        cacheOperation?: string | undefined;
        cacheHostname?: string | undefined;
        cachePath?: string | undefined;
        cacheHitState?: string | undefined;
        cacheHitLevel?: string | undefined;
        cacheApi?: string | undefined;
        cacheReason?: string | undefined;
        pprState?: string | undefined;
        clientIp?: string | undefined;
        clientIpCountry?: string | undefined;
        clientUserAgent?: string | undefined;
        httpAccept?: string | undefined;
        clientJa4Digest?: string | undefined;
        asnId?: string | undefined;
        asnName?: string | undefined;
        botName?: string | undefined;
        botCategory?: string | undefined;
        botCategoryLegacy?: string | undefined;
        botVerified?: string | undefined;
        botCheckResult?: string | undefined;
        deepAnalysisCheck?: string | undefined;
        wafAction?: string | undefined;
        wafRuleId?: string | undefined;
        ruleCategory?: string | undefined;
        skewProtection?: string | undefined;
        functionStartType?: string | undefined;
        functionDispatcher?: string | undefined;
        isAdditionalRequest?: string | undefined;
        originHostname?: string | undefined;
        originPath?: string | undefined;
        originRoute?: string | undefined;
        fetchType?: string | undefined;
        fetchIndex?: string | undefined;
        imageSource?: string | undefined;
        sourceImage?: string | undefined;
        sourceImagePathname?: string | undefined;
        sourceImageHostname?: string | undefined;
        sourceImageHash?: string | undefined;
        optimizedQuality?: string | undefined;
        optimizedWidthPixels?: string | undefined;
        optimizedFormatMimeType?: string | undefined;
        vdcOperationOrigin?: string | undefined;
        entryName?: string | undefined;
        entryId?: string | undefined;
        entryItemId?: string | undefined;
        tagName?: string | undefined;
        cacheTags?: string | undefined;
        storeId?: string | undefined;
        storeName?: string | undefined;
        blobOperationType?: string | undefined;
        blobOperationLevel?: string | undefined;
        visitorId?: string | undefined;
        eventName?: string | undefined;
        attributionTarget?: string | undefined;
        attributionEventName?: string | undefined;
        metricName?: string | undefined;
        attributes?: string | undefined;
        flagKey?: string | undefined;
        flagVariant?: string | undefined;
        flagEvaluationReason?: string | undefined;
        flagClientName?: string | undefined;
        sdkKeyId?: string | undefined;
        sdkKeyEnvironment?: string | undefined;
        reportingProjectId?: string | undefined;
        reportingProjectName?: string | undefined;
        eventData?: string | undefined;
        middlewareAction?: string | undefined;
        middlewareActionTarget?: string | undefined;
        aiModel?: string | undefined;
        aiGatewayModelId?: string | undefined;
        aiProvider?: string | undefined;
        aiModelType?: string | undefined;
        servedSpeed?: string | undefined;
        virtualModelSlug?: string | undefined;
        virtualModelKind?: string | undefined;
        inferenceEndpointSlug?: string | undefined;
        inferenceScope?: string | undefined;
        inferenceGeoRegion?: string | undefined;
        inferenceProviderRegion?: string | undefined;
        requestedInferenceRegion?: string | undefined;
        costCurrency?: string | undefined;
        marketCostCurrency?: string | undefined;
        cachedInputTokensCurrency?: string | undefined;
        cacheCreationInputTokensCurrency?: string | undefined;
        cacheCreation1hInputTokensCurrency?: string | undefined;
        surchargeCostCurrency?: string | undefined;
        gatewayCostCurrency?: string | undefined;
        keyId?: string | undefined;
        keyName?: string | undefined;
        authMethod?: string | undefined;
        appName?: string | undefined;
        codingAgent?: string | undefined;
        isByok?: string | undefined;
        spendAttribution?: string | undefined;
        isPrivateModel?: string | undefined;
        isRequestZdr?: string | undefined;
        hipaaRequested?: string | undefined;
        quotaRequested?: string | undefined;
        quotaEntityId?: string | undefined;
        quotaEntityType?: string | undefined;
        videoResolution?: string | undefined;
        videoAspectRatio?: string | undefined;
        piiRedactionApplied?: string | undefined;
        moderationApplied?: string | undefined;
        queueName?: string | undefined;
        consumerGroup?: string | undefined;
        messageId?: string | undefined;
        eventType?: string | undefined;
        notificationUrl?: string | undefined;
        queueRegion?: string | undefined;
        sandboxSessionId?: string | undefined;
        sandboxName?: string | undefined;
        workflowRunId?: string | undefined;
        workflowName?: string | undefined;
        workflowStatus?: string | undefined;
        stepRunId?: string | undefined;
        workflowStepName?: string | undefined;
        workflowEventType?: string | undefined;
        region?: string | undefined;
        specVersion?: string | undefined;
        contentType?: string | undefined;
        rewriteDestinationHostname?: string | undefined;
        externalRewriteTargetHost?: string | undefined;
        externalRewriteTargetPath?: string | undefined;
        commitSha?: string | undefined;
        reviewConclusion?: string | undefined;
        pullRequestNumber?: string | undefined;
        repositoryName?: string | undefined;
        repositoryOwner?: string | undefined;
        reviewStatus?: string | undefined;
        pullRequestState?: string | undefined;
        triggeringTag?: string | undefined;
        redirectLocation?: string | undefined;
        microfrontendsResponseReason?: string | undefined;
        microfrontendsMatchedPath?: string | undefined;
        microfrontendsDefaultAppDeploymentId?: string | undefined;
        microfrontendsDefaultAppProjectId?: string | undefined;
        service?: string | undefined;
        isPrefetchRequest?: string | undefined;
        spendReportGroupBy?: string | undefined;
        spendReportDatePart?: string | undefined;
        providerAttemptCanonicalSlug?: string | undefined;
        providerAttemptCredentialType?: string | undefined;
        providerAttemptSuccess?: string | undefined;
        providerAttemptStatusCode?: string | undefined;
        providerAttemptTimeout?: string | undefined;
        providerAttemptIsFinal?: string | undefined;
        providerAttemptNumber?: string | undefined;
        providerAttemptTotalInRequest?: string | undefined;
        generationId?: string | undefined;
        sessionId?: string | undefined;
        contentCaptureStatus?: string | undefined;
        contentCaptureInputs?: string | undefined;
        contentCaptureOutputs?: string | undefined;
        transcriptStatus?: string | undefined;
        transcriptInputs?: string | undefined;
        transcriptOutputs?: string | undefined;
        providerAttemptError?: string | undefined;
        providerAttemptSafetyIdentifier?: string | undefined;
        providerAttemptDevSafetyIdentifier?: string | undefined;
        providerAttemptRegion?: string | undefined;
        providerAttemptModelIndex?: string | undefined;
        toolCallType?: string | undefined;
        toolCallProvider?: string | undefined;
        toolCallSuccess?: string | undefined;
        toolCallErrorType?: string | undefined;
        toolCallStatusCode?: string | undefined;
        environmentId?: string | undefined;
        billableRegion?: string | undefined;
        direction?: string | undefined;
        networkTenancy?: string | undefined;
        trafficSource?: string | undefined;
        networkId?: string | undefined;
        privatelinkEndpointId?: string | undefined;
        privatelinkDnsName?: string | undefined;
        privatelinkIpAddress?: string | undefined;
        timestamp: string;
      }>
    | Array<
        | {
            projectId: string;
            country: string;
            deviceType: string;
            environment: string;
            requestPath: string;
            referrerHostname: string;
            osName: string;
            browserName: string;
            route: string;
            utmSource: string;
            utmMedium: string;
            utmCampaign: string;
            utmContent: string;
            utmTerm: string;
            flags: string;
            errorMessage: string;
            entryRevalidateSeconds: string;
            projectName: string;
            deploymentId: string;
            pathType: string;
            pathTypeVariant: string;
            requestHostname: string;
            requestResolvedIp: string;
            requestMethod: string;
            requestExtension: string;
            requestId: string;
            requestApi: string;
            referrerUrl: string;
            serverActionName: string;
            httpStatus: string;
            errorCode: string;
            source: string;
            edgeType: string;
            reason: string;
            edgeNetworkRegion: string;
            functionRegion: string;
            imageTransformationRegion: string;
            dataCacheRegion: string;
            cause: string;
            runtime: string;
            provider: string;
            isrCacheRegion: string;
            isrAction: string;
            cacheResult: string;
            cacheOperation: string;
            cacheHostname: string;
            cachePath: string;
            cacheHitState: string;
            cacheHitLevel: string;
            cacheApi: string;
            cacheReason: string;
            pprState: string;
            clientIp: string;
            clientIpCountry: string;
            clientUserAgent: string;
            httpAccept: string;
            clientJa4Digest: string;
            asnId: string;
            asnName: string;
            botName: string;
            botCategory: string;
            botCategoryLegacy: string;
            botVerified: string;
            botCheckResult: string;
            deepAnalysisCheck: string;
            wafAction: string;
            wafRuleId: string;
            ruleCategory: string;
            skewProtection: string;
            functionStartType: string;
            functionDispatcher: string;
            isAdditionalRequest: string;
            originHostname: string;
            originPath: string;
            originRoute: string;
            fetchType: string;
            fetchIndex: string;
            imageSource: string;
            sourceImage: string;
            sourceImagePathname: string;
            sourceImageHostname: string;
            sourceImageHash: string;
            optimizedQuality: string;
            optimizedWidthPixels: string;
            optimizedFormatMimeType: string;
            vdcOperationOrigin: string;
            entryName: string;
            entryId: string;
            entryItemId: string;
            tagName: string;
            cacheTags: string;
            storeId: string;
            storeName: string;
            blobOperationType: string;
            blobOperationLevel: string;
            visitorId: string;
            eventName: string;
            attributionTarget: string;
            attributionEventName: string;
            metricName: string;
            attributes: string;
            flagKey: string;
            flagVariant: string;
            flagEvaluationReason: string;
            flagClientName: string;
            sdkKeyId: string;
            sdkKeyEnvironment: string;
            reportingProjectId: string;
            reportingProjectName: string;
            eventData: string;
            middlewareAction: string;
            middlewareActionTarget: string;
            aiModel: string;
            aiGatewayModelId: string;
            aiProvider: string;
            aiModelType: string;
            servedSpeed: string;
            virtualModelSlug: string;
            virtualModelKind: string;
            inferenceEndpointSlug: string;
            inferenceScope: string;
            inferenceGeoRegion: string;
            inferenceProviderRegion: string;
            requestedInferenceRegion: string;
            costCurrency: string;
            marketCostCurrency: string;
            cachedInputTokensCurrency: string;
            cacheCreationInputTokensCurrency: string;
            cacheCreation1hInputTokensCurrency: string;
            surchargeCostCurrency: string;
            gatewayCostCurrency: string;
            keyId: string;
            keyName: string;
            authMethod: string;
            appName: string;
            codingAgent: string;
            isByok: string;
            spendAttribution: string;
            isPrivateModel: string;
            isRequestZdr: string;
            hipaaRequested: string;
            quotaRequested: string;
            quotaEntityId: string;
            quotaEntityType: string;
            videoResolution: string;
            videoAspectRatio: string;
            piiRedactionApplied: string;
            moderationApplied: string;
            queueName: string;
            consumerGroup: string;
            messageId: string;
            eventType: string;
            notificationUrl: string;
            queueRegion: string;
            sandboxSessionId: string;
            sandboxName: string;
            workflowRunId: string;
            workflowName: string;
            workflowStatus: string;
            stepRunId: string;
            workflowStepName: string;
            workflowEventType: string;
            region: string;
            specVersion: string;
            contentType: string;
            rewriteDestinationHostname: string;
            externalRewriteTargetHost: string;
            externalRewriteTargetPath: string;
            commitSha: string;
            reviewConclusion: string;
            pullRequestNumber: string;
            repositoryName: string;
            repositoryOwner: string;
            reviewStatus: string;
            pullRequestState: string;
            triggeringTag: string;
            redirectLocation: string;
            microfrontendsResponseReason: string;
            microfrontendsMatchedPath: string;
            microfrontendsDefaultAppDeploymentId: string;
            microfrontendsDefaultAppProjectId: string;
            service: string;
            isPrefetchRequest: string;
            spendReportGroupBy: string;
            spendReportDatePart: string;
            providerAttemptCanonicalSlug: string;
            providerAttemptCredentialType: string;
            providerAttemptSuccess: string;
            providerAttemptStatusCode: string;
            providerAttemptTimeout: string;
            providerAttemptIsFinal: string;
            providerAttemptNumber: string;
            providerAttemptTotalInRequest: string;
            generationId: string;
            sessionId: string;
            contentCaptureStatus: string;
            contentCaptureInputs: string;
            contentCaptureOutputs: string;
            transcriptStatus: string;
            transcriptInputs: string;
            transcriptOutputs: string;
            providerAttemptError: string;
            providerAttemptSafetyIdentifier: string;
            providerAttemptDevSafetyIdentifier: string;
            providerAttemptRegion: string;
            providerAttemptModelIndex: string;
            toolCallType: string;
            toolCallProvider: string;
            toolCallSuccess: string;
            toolCallErrorType: string;
            toolCallStatusCode: string;
            environmentId: string;
            billableRegion: string;
            direction: string;
            networkTenancy: string;
            trafficSource: string;
            networkId: string;
            privatelinkEndpointId: string;
            privatelinkDnsName: string;
            privatelinkIpAddress: string;
          }
        | Record<string, number | null>
      >;
};

export type GetV1QueryWebAnalyticsEventsAggregateInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  query: {
    projectId: string;
    by: Array<
      | "hour"
      | "day"
      | "week"
      | "month"
      | "year"
      | "country"
      | "deviceType"
      | "environment"
      | "requestPath"
      | "referrerHostname"
      | "osName"
      | "browserName"
      | "route"
      | "utmSource"
      | "utmMedium"
      | "utmCampaign"
      | "utmContent"
      | "utmTerm"
      | "eventName"
      | "flags"
      | "eventData"
      | string
    >;
    since: number | string;
    until: number | string;
    limit?: number | undefined;
    filter?: string | undefined;
    teamId?: string | undefined;
    slug?: string | undefined;
  };
};

export type GetV1QueryWebAnalyticsEventsAggregateHandler = (
  input: GetV1QueryWebAnalyticsEventsAggregateInput,
) => Promise<GetV1QueryWebAnalyticsEventsAggregateResponse>;

export type GetV1QueryWebAnalyticsVisitsCountResponse = {
  version: number;
  query: { since: string; until: string; filter?: string | undefined };
  data:
    | {
        projectId: string;
        country: string;
        deviceType: string;
        environment: string;
        requestPath: string;
        referrerHostname: string;
        osName: string;
        browserName: string;
        route: string;
        utmSource: string;
        utmMedium: string;
        utmCampaign: string;
        utmContent: string;
        utmTerm: string;
        flags: string;
        errorMessage: string;
        entryRevalidateSeconds: string;
        projectName: string;
        deploymentId: string;
        pathType: string;
        pathTypeVariant: string;
        requestHostname: string;
        requestResolvedIp: string;
        requestMethod: string;
        requestExtension: string;
        requestId: string;
        requestApi: string;
        referrerUrl: string;
        serverActionName: string;
        httpStatus: string;
        errorCode: string;
        source: string;
        edgeType: string;
        reason: string;
        edgeNetworkRegion: string;
        functionRegion: string;
        imageTransformationRegion: string;
        dataCacheRegion: string;
        cause: string;
        runtime: string;
        provider: string;
        isrCacheRegion: string;
        isrAction: string;
        cacheResult: string;
        cacheOperation: string;
        cacheHostname: string;
        cachePath: string;
        cacheHitState: string;
        cacheHitLevel: string;
        cacheApi: string;
        cacheReason: string;
        pprState: string;
        clientIp: string;
        clientIpCountry: string;
        clientUserAgent: string;
        httpAccept: string;
        clientJa4Digest: string;
        asnId: string;
        asnName: string;
        botName: string;
        botCategory: string;
        botCategoryLegacy: string;
        botVerified: string;
        botCheckResult: string;
        deepAnalysisCheck: string;
        wafAction: string;
        wafRuleId: string;
        ruleCategory: string;
        skewProtection: string;
        functionStartType: string;
        functionDispatcher: string;
        isAdditionalRequest: string;
        originHostname: string;
        originPath: string;
        originRoute: string;
        fetchType: string;
        fetchIndex: string;
        imageSource: string;
        sourceImage: string;
        sourceImagePathname: string;
        sourceImageHostname: string;
        sourceImageHash: string;
        optimizedQuality: string;
        optimizedWidthPixels: string;
        optimizedFormatMimeType: string;
        vdcOperationOrigin: string;
        entryName: string;
        entryId: string;
        entryItemId: string;
        tagName: string;
        cacheTags: string;
        storeId: string;
        storeName: string;
        blobOperationType: string;
        blobOperationLevel: string;
        visitorId: string;
        eventName: string;
        attributionTarget: string;
        attributionEventName: string;
        metricName: string;
        attributes: string;
        flagKey: string;
        flagVariant: string;
        flagEvaluationReason: string;
        flagClientName: string;
        sdkKeyId: string;
        sdkKeyEnvironment: string;
        reportingProjectId: string;
        reportingProjectName: string;
        eventData: string;
        middlewareAction: string;
        middlewareActionTarget: string;
        aiModel: string;
        aiGatewayModelId: string;
        aiProvider: string;
        aiModelType: string;
        servedSpeed: string;
        virtualModelSlug: string;
        virtualModelKind: string;
        inferenceEndpointSlug: string;
        inferenceScope: string;
        inferenceGeoRegion: string;
        inferenceProviderRegion: string;
        requestedInferenceRegion: string;
        costCurrency: string;
        marketCostCurrency: string;
        cachedInputTokensCurrency: string;
        cacheCreationInputTokensCurrency: string;
        cacheCreation1hInputTokensCurrency: string;
        surchargeCostCurrency: string;
        gatewayCostCurrency: string;
        keyId: string;
        keyName: string;
        authMethod: string;
        appName: string;
        codingAgent: string;
        isByok: string;
        spendAttribution: string;
        isPrivateModel: string;
        isRequestZdr: string;
        hipaaRequested: string;
        quotaRequested: string;
        quotaEntityId: string;
        quotaEntityType: string;
        videoResolution: string;
        videoAspectRatio: string;
        piiRedactionApplied: string;
        moderationApplied: string;
        queueName: string;
        consumerGroup: string;
        messageId: string;
        eventType: string;
        notificationUrl: string;
        queueRegion: string;
        sandboxSessionId: string;
        sandboxName: string;
        workflowRunId: string;
        workflowName: string;
        workflowStatus: string;
        stepRunId: string;
        workflowStepName: string;
        workflowEventType: string;
        region: string;
        specVersion: string;
        contentType: string;
        rewriteDestinationHostname: string;
        externalRewriteTargetHost: string;
        externalRewriteTargetPath: string;
        commitSha: string;
        reviewConclusion: string;
        pullRequestNumber: string;
        repositoryName: string;
        repositoryOwner: string;
        reviewStatus: string;
        pullRequestState: string;
        triggeringTag: string;
        redirectLocation: string;
        microfrontendsResponseReason: string;
        microfrontendsMatchedPath: string;
        microfrontendsDefaultAppDeploymentId: string;
        microfrontendsDefaultAppProjectId: string;
        service: string;
        isPrefetchRequest: string;
        spendReportGroupBy: string;
        spendReportDatePart: string;
        providerAttemptCanonicalSlug: string;
        providerAttemptCredentialType: string;
        providerAttemptSuccess: string;
        providerAttemptStatusCode: string;
        providerAttemptTimeout: string;
        providerAttemptIsFinal: string;
        providerAttemptNumber: string;
        providerAttemptTotalInRequest: string;
        generationId: string;
        sessionId: string;
        contentCaptureStatus: string;
        contentCaptureInputs: string;
        contentCaptureOutputs: string;
        transcriptStatus: string;
        transcriptInputs: string;
        transcriptOutputs: string;
        providerAttemptError: string;
        providerAttemptSafetyIdentifier: string;
        providerAttemptDevSafetyIdentifier: string;
        providerAttemptRegion: string;
        providerAttemptModelIndex: string;
        toolCallType: string;
        toolCallProvider: string;
        toolCallSuccess: string;
        toolCallErrorType: string;
        toolCallStatusCode: string;
        environmentId: string;
        billableRegion: string;
        direction: string;
        networkTenancy: string;
        trafficSource: string;
        networkId: string;
        privatelinkEndpointId: string;
        privatelinkDnsName: string;
        privatelinkIpAddress: string;
      }
    | Record<string, number | null>
    | { visitors: number; pageviews: number };
};

export type GetV1QueryWebAnalyticsVisitsCountInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  query: {
    projectId: string;
    since?: (number | string) | undefined;
    until?: (number | string) | undefined;
    filter?: string | undefined;
    teamId?: string | undefined;
    slug?: string | undefined;
  };
};

export type GetV1QueryWebAnalyticsVisitsCountHandler = (
  input: GetV1QueryWebAnalyticsVisitsCountInput,
) => Promise<GetV1QueryWebAnalyticsVisitsCountResponse>;

export type GetV1QueryWebAnalyticsEventsCountResponse = {
  version: number;
  query: { since: string; until: string; filter?: string | undefined };
  data:
    | {
        projectId: string;
        country: string;
        deviceType: string;
        environment: string;
        requestPath: string;
        referrerHostname: string;
        osName: string;
        browserName: string;
        route: string;
        utmSource: string;
        utmMedium: string;
        utmCampaign: string;
        utmContent: string;
        utmTerm: string;
        flags: string;
        errorMessage: string;
        entryRevalidateSeconds: string;
        projectName: string;
        deploymentId: string;
        pathType: string;
        pathTypeVariant: string;
        requestHostname: string;
        requestResolvedIp: string;
        requestMethod: string;
        requestExtension: string;
        requestId: string;
        requestApi: string;
        referrerUrl: string;
        serverActionName: string;
        httpStatus: string;
        errorCode: string;
        source: string;
        edgeType: string;
        reason: string;
        edgeNetworkRegion: string;
        functionRegion: string;
        imageTransformationRegion: string;
        dataCacheRegion: string;
        cause: string;
        runtime: string;
        provider: string;
        isrCacheRegion: string;
        isrAction: string;
        cacheResult: string;
        cacheOperation: string;
        cacheHostname: string;
        cachePath: string;
        cacheHitState: string;
        cacheHitLevel: string;
        cacheApi: string;
        cacheReason: string;
        pprState: string;
        clientIp: string;
        clientIpCountry: string;
        clientUserAgent: string;
        httpAccept: string;
        clientJa4Digest: string;
        asnId: string;
        asnName: string;
        botName: string;
        botCategory: string;
        botCategoryLegacy: string;
        botVerified: string;
        botCheckResult: string;
        deepAnalysisCheck: string;
        wafAction: string;
        wafRuleId: string;
        ruleCategory: string;
        skewProtection: string;
        functionStartType: string;
        functionDispatcher: string;
        isAdditionalRequest: string;
        originHostname: string;
        originPath: string;
        originRoute: string;
        fetchType: string;
        fetchIndex: string;
        imageSource: string;
        sourceImage: string;
        sourceImagePathname: string;
        sourceImageHostname: string;
        sourceImageHash: string;
        optimizedQuality: string;
        optimizedWidthPixels: string;
        optimizedFormatMimeType: string;
        vdcOperationOrigin: string;
        entryName: string;
        entryId: string;
        entryItemId: string;
        tagName: string;
        cacheTags: string;
        storeId: string;
        storeName: string;
        blobOperationType: string;
        blobOperationLevel: string;
        visitorId: string;
        eventName: string;
        attributionTarget: string;
        attributionEventName: string;
        metricName: string;
        attributes: string;
        flagKey: string;
        flagVariant: string;
        flagEvaluationReason: string;
        flagClientName: string;
        sdkKeyId: string;
        sdkKeyEnvironment: string;
        reportingProjectId: string;
        reportingProjectName: string;
        eventData: string;
        middlewareAction: string;
        middlewareActionTarget: string;
        aiModel: string;
        aiGatewayModelId: string;
        aiProvider: string;
        aiModelType: string;
        servedSpeed: string;
        virtualModelSlug: string;
        virtualModelKind: string;
        inferenceEndpointSlug: string;
        inferenceScope: string;
        inferenceGeoRegion: string;
        inferenceProviderRegion: string;
        requestedInferenceRegion: string;
        costCurrency: string;
        marketCostCurrency: string;
        cachedInputTokensCurrency: string;
        cacheCreationInputTokensCurrency: string;
        cacheCreation1hInputTokensCurrency: string;
        surchargeCostCurrency: string;
        gatewayCostCurrency: string;
        keyId: string;
        keyName: string;
        authMethod: string;
        appName: string;
        codingAgent: string;
        isByok: string;
        spendAttribution: string;
        isPrivateModel: string;
        isRequestZdr: string;
        hipaaRequested: string;
        quotaRequested: string;
        quotaEntityId: string;
        quotaEntityType: string;
        videoResolution: string;
        videoAspectRatio: string;
        piiRedactionApplied: string;
        moderationApplied: string;
        queueName: string;
        consumerGroup: string;
        messageId: string;
        eventType: string;
        notificationUrl: string;
        queueRegion: string;
        sandboxSessionId: string;
        sandboxName: string;
        workflowRunId: string;
        workflowName: string;
        workflowStatus: string;
        stepRunId: string;
        workflowStepName: string;
        workflowEventType: string;
        region: string;
        specVersion: string;
        contentType: string;
        rewriteDestinationHostname: string;
        externalRewriteTargetHost: string;
        externalRewriteTargetPath: string;
        commitSha: string;
        reviewConclusion: string;
        pullRequestNumber: string;
        repositoryName: string;
        repositoryOwner: string;
        reviewStatus: string;
        pullRequestState: string;
        triggeringTag: string;
        redirectLocation: string;
        microfrontendsResponseReason: string;
        microfrontendsMatchedPath: string;
        microfrontendsDefaultAppDeploymentId: string;
        microfrontendsDefaultAppProjectId: string;
        service: string;
        isPrefetchRequest: string;
        spendReportGroupBy: string;
        spendReportDatePart: string;
        providerAttemptCanonicalSlug: string;
        providerAttemptCredentialType: string;
        providerAttemptSuccess: string;
        providerAttemptStatusCode: string;
        providerAttemptTimeout: string;
        providerAttemptIsFinal: string;
        providerAttemptNumber: string;
        providerAttemptTotalInRequest: string;
        generationId: string;
        sessionId: string;
        contentCaptureStatus: string;
        contentCaptureInputs: string;
        contentCaptureOutputs: string;
        transcriptStatus: string;
        transcriptInputs: string;
        transcriptOutputs: string;
        providerAttemptError: string;
        providerAttemptSafetyIdentifier: string;
        providerAttemptDevSafetyIdentifier: string;
        providerAttemptRegion: string;
        providerAttemptModelIndex: string;
        toolCallType: string;
        toolCallProvider: string;
        toolCallSuccess: string;
        toolCallErrorType: string;
        toolCallStatusCode: string;
        environmentId: string;
        billableRegion: string;
        direction: string;
        networkTenancy: string;
        trafficSource: string;
        networkId: string;
        privatelinkEndpointId: string;
        privatelinkDnsName: string;
        privatelinkIpAddress: string;
      }
    | Record<string, number | null>
    | { visitors: number; count: number };
};

export type GetV1QueryWebAnalyticsEventsCountInput = {
  db: Db;
  env: Env;
  user: AuthUser | null;
  query: {
    projectId: string;
    since?: (number | string) | undefined;
    until?: (number | string) | undefined;
    filter?: string | undefined;
    teamId?: string | undefined;
    slug?: string | undefined;
  };
};

export type GetV1QueryWebAnalyticsEventsCountHandler = (
  input: GetV1QueryWebAnalyticsEventsCountInput,
) => Promise<GetV1QueryWebAnalyticsEventsCountResponse>;
