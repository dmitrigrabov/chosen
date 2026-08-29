import { z } from "zod";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { apiFetch, buildUrl } from "@/lib/api/client";

export type UseCreateApiV1WebhooksArgs = {
  teamId?: string | undefined;
  slug?: string | undefined;
  body: {
    url: string;
    events: Array<
      | "budget.reached"
      | "domain.created"
      | "domain.dns.records.changed"
      | "domain.transfer-in.started"
      | "domain.transfer-in.completed"
      | "domain.transfer-in.failed"
      | "domain.certificate.add"
      | "domain.certificate.add.failed"
      | "domain.certificate.renew"
      | "domain.certificate.renew.failed"
      | "domain.certificate.deleted"
      | "domain.renewal"
      | "domain.renewal.failed"
      | "domain.auto-renew.changed"
      | "deployment.created"
      | "deployment.build-requested"
      | "deployment.cleanup"
      | "deployment.error"
      | "deployment.blocked"
      | "deployment.canceled"
      | "deployment.succeeded"
      | "deployment.ready"
      | "deployment.check-rerequested"
      | "deployment.promoted"
      | "deployment.rollback"
      | "deployment.integration.action.start"
      | "deployment.integration.action.cancel"
      | "deployment.integration.action.cleanup"
      | "deployment.checkrun.start"
      | "deployment.checkrun.cancel"
      | "edge-config.created"
      | "edge-config.deleted"
      | "edge-config.items.updated"
      | "firewall.attack"
      | "firewall.system-rule-anomaly"
      | "firewall.custom-rule-anomaly"
      | "function.archival-required"
      | "function.removal-required"
      | "alerts.triggered"
      | "integration-configuration.permission-upgraded"
      | "integration-configuration.removed"
      | "integration-configuration.scope-change-confirmed"
      | "integration-configuration.transferred"
      | "integration-resource.project-connected"
      | "integration-resource.project-disconnected"
      | "project.created"
      | "project.removed"
      | "project.renamed"
      | "project.env-variable.created"
      | "project.env-variable.updated"
      | "project.env-variable.deleted"
      | "project.domain.created"
      | "project.domain.updated"
      | "project.domain.deleted"
      | "project.domain.verified"
      | "project.domain.unverified"
      | "project.domain.moved"
      | "project.rolling-release.started"
      | "project.rolling-release.aborted"
      | "project.rolling-release.completed"
      | "project.rolling-release.approved"
      | "deployment.checks.failed"
      | "deployment.checks.succeeded"
      | "deployment-checks-completed"
      | "deployment-ready"
      | "deployment-prepared"
      | "deployment-error"
      | "deployment-check-rerequested"
      | "deployment-canceled"
      | "project-created"
      | "project-removed"
      | "domain-created"
      | "deployment"
      | "integration-configuration-permission-updated"
      | "integration-configuration-removed"
      | "integration-configuration-scope-change-confirmed"
      | "marketplace.member.changed"
      | "marketplace.invoice.created"
      | "marketplace.invoice.paid"
      | "marketplace.invoice.notpaid"
      | "marketplace.invoice.overdue"
      | "marketplace.invoice.refunded"
      | "ai-gateway.balance-depleted"
      | "ai-gateway.auto-reload.limit-reached"
      | "observability.anomaly"
      | "observability.anomaly-error"
      | "observability.usage-anomaly"
      | "observability.error-anomaly"
      | "botid.anomaly"
      | "flag.created"
      | "flag.updated"
      | "flag.deleted"
      | "flag.segment.created"
      | "flag.segment.updated"
      | "flag.segment.deleted"
      | "test-webhook"
      | "message.created"
      | "message.updated"
      | "message.deleted"
      | "thread.resolved"
      | "thread.unresolved"
      | "message.reaction-added"
      | "message.reaction-removed"
      | "message.mentioned"
      | "comment.created"
      | "comment.updated"
      | "comment.deleted"
      | "comment.resolved"
      | "comment.unresolved"
      | "comment.reaction-added"
      | "comment.reaction-removed"
      | "comment.mentioned"
    >;
    projectIds?: Array<string> | undefined;
  };
};

export const useCreateApiV1WebhooksResponse = z.object({
  secret: z.string(),
  alertRuleIds: z.array(z.string()).optional(),
  events: z.array(
    z.enum([
      "ai-gateway.auto-reload.limit-reached",
      "ai-gateway.balance-depleted",
      "alerts.triggered",
      "botid.anomaly",
      "budget.reached",
      "comment.created",
      "comment.deleted",
      "comment.mentioned",
      "comment.reaction-added",
      "comment.reaction-removed",
      "comment.resolved",
      "comment.unresolved",
      "comment.updated",
      "deployment",
      "deployment-canceled",
      "deployment-check-rerequested",
      "deployment-checks-completed",
      "deployment-error",
      "deployment-prepared",
      "deployment-ready",
      "deployment.blocked",
      "deployment.build-requested",
      "deployment.canceled",
      "deployment.check-rerequested",
      "deployment.checkrun.cancel",
      "deployment.checkrun.start",
      "deployment.checks.failed",
      "deployment.checks.succeeded",
      "deployment.cleanup",
      "deployment.created",
      "deployment.error",
      "deployment.integration.action.cancel",
      "deployment.integration.action.cleanup",
      "deployment.integration.action.start",
      "deployment.promoted",
      "deployment.ready",
      "deployment.rollback",
      "deployment.succeeded",
      "domain-created",
      "domain.auto-renew.changed",
      "domain.certificate.add",
      "domain.certificate.add.failed",
      "domain.certificate.deleted",
      "domain.certificate.renew",
      "domain.certificate.renew.failed",
      "domain.created",
      "domain.dns.records.changed",
      "domain.renewal",
      "domain.renewal.failed",
      "domain.transfer-in.completed",
      "domain.transfer-in.failed",
      "domain.transfer-in.started",
      "edge-config.created",
      "edge-config.deleted",
      "edge-config.items.updated",
      "firewall.attack",
      "firewall.custom-rule-anomaly",
      "firewall.system-rule-anomaly",
      "flag.created",
      "flag.deleted",
      "flag.segment.created",
      "flag.segment.deleted",
      "flag.segment.updated",
      "flag.updated",
      "function.archival-required",
      "function.removal-required",
      "integration-configuration-permission-updated",
      "integration-configuration-removed",
      "integration-configuration-scope-change-confirmed",
      "integration-configuration.permission-upgraded",
      "integration-configuration.removed",
      "integration-configuration.scope-change-confirmed",
      "integration-configuration.transferred",
      "integration-resource.project-connected",
      "integration-resource.project-disconnected",
      "marketplace.invoice.created",
      "marketplace.invoice.notpaid",
      "marketplace.invoice.overdue",
      "marketplace.invoice.paid",
      "marketplace.invoice.refunded",
      "marketplace.member.changed",
      "message.created",
      "message.deleted",
      "message.mentioned",
      "message.reaction-added",
      "message.reaction-removed",
      "message.updated",
      "observability.anomaly",
      "observability.anomaly-error",
      "observability.error-anomaly",
      "observability.usage-anomaly",
      "project-created",
      "project-removed",
      "project.created",
      "project.domain.created",
      "project.domain.deleted",
      "project.domain.moved",
      "project.domain.unverified",
      "project.domain.updated",
      "project.domain.verified",
      "project.env-variable.created",
      "project.env-variable.deleted",
      "project.env-variable.updated",
      "project.removed",
      "project.renamed",
      "project.rolling-release.aborted",
      "project.rolling-release.approved",
      "project.rolling-release.completed",
      "project.rolling-release.started",
      "test-webhook",
      "thread.resolved",
      "thread.unresolved",
    ]),
  ),
  id: z.string(),
  url: z.string(),
  ownerId: z.string(),
  createdAt: z.number(),
  updatedAt: z.number(),
  projectIds: z.array(z.string()).optional(),
});

export type UseCreateApiV1WebhooksResponse = {
  secret: string;
  alertRuleIds?: Array<string> | undefined;
  events: Array<
    | "ai-gateway.auto-reload.limit-reached"
    | "ai-gateway.balance-depleted"
    | "alerts.triggered"
    | "botid.anomaly"
    | "budget.reached"
    | "comment.created"
    | "comment.deleted"
    | "comment.mentioned"
    | "comment.reaction-added"
    | "comment.reaction-removed"
    | "comment.resolved"
    | "comment.unresolved"
    | "comment.updated"
    | "deployment"
    | "deployment-canceled"
    | "deployment-check-rerequested"
    | "deployment-checks-completed"
    | "deployment-error"
    | "deployment-prepared"
    | "deployment-ready"
    | "deployment.blocked"
    | "deployment.build-requested"
    | "deployment.canceled"
    | "deployment.check-rerequested"
    | "deployment.checkrun.cancel"
    | "deployment.checkrun.start"
    | "deployment.checks.failed"
    | "deployment.checks.succeeded"
    | "deployment.cleanup"
    | "deployment.created"
    | "deployment.error"
    | "deployment.integration.action.cancel"
    | "deployment.integration.action.cleanup"
    | "deployment.integration.action.start"
    | "deployment.promoted"
    | "deployment.ready"
    | "deployment.rollback"
    | "deployment.succeeded"
    | "domain-created"
    | "domain.auto-renew.changed"
    | "domain.certificate.add"
    | "domain.certificate.add.failed"
    | "domain.certificate.deleted"
    | "domain.certificate.renew"
    | "domain.certificate.renew.failed"
    | "domain.created"
    | "domain.dns.records.changed"
    | "domain.renewal"
    | "domain.renewal.failed"
    | "domain.transfer-in.completed"
    | "domain.transfer-in.failed"
    | "domain.transfer-in.started"
    | "edge-config.created"
    | "edge-config.deleted"
    | "edge-config.items.updated"
    | "firewall.attack"
    | "firewall.custom-rule-anomaly"
    | "firewall.system-rule-anomaly"
    | "flag.created"
    | "flag.deleted"
    | "flag.segment.created"
    | "flag.segment.deleted"
    | "flag.segment.updated"
    | "flag.updated"
    | "function.archival-required"
    | "function.removal-required"
    | "integration-configuration-permission-updated"
    | "integration-configuration-removed"
    | "integration-configuration-scope-change-confirmed"
    | "integration-configuration.permission-upgraded"
    | "integration-configuration.removed"
    | "integration-configuration.scope-change-confirmed"
    | "integration-configuration.transferred"
    | "integration-resource.project-connected"
    | "integration-resource.project-disconnected"
    | "marketplace.invoice.created"
    | "marketplace.invoice.notpaid"
    | "marketplace.invoice.overdue"
    | "marketplace.invoice.paid"
    | "marketplace.invoice.refunded"
    | "marketplace.member.changed"
    | "message.created"
    | "message.deleted"
    | "message.mentioned"
    | "message.reaction-added"
    | "message.reaction-removed"
    | "message.updated"
    | "observability.anomaly"
    | "observability.anomaly-error"
    | "observability.error-anomaly"
    | "observability.usage-anomaly"
    | "project-created"
    | "project-removed"
    | "project.created"
    | "project.domain.created"
    | "project.domain.deleted"
    | "project.domain.moved"
    | "project.domain.unverified"
    | "project.domain.updated"
    | "project.domain.verified"
    | "project.env-variable.created"
    | "project.env-variable.deleted"
    | "project.env-variable.updated"
    | "project.removed"
    | "project.renamed"
    | "project.rolling-release.aborted"
    | "project.rolling-release.approved"
    | "project.rolling-release.completed"
    | "project.rolling-release.started"
    | "test-webhook"
    | "thread.resolved"
    | "thread.unresolved"
  >;
  id: string;
  url: string;
  ownerId: string;
  createdAt: number;
  updatedAt: number;
  projectIds?: Array<string> | undefined;
};

export type CreateApiV1WebhooksBody = {
  url: string;
  events: Array<
    | "budget.reached"
    | "domain.created"
    | "domain.dns.records.changed"
    | "domain.transfer-in.started"
    | "domain.transfer-in.completed"
    | "domain.transfer-in.failed"
    | "domain.certificate.add"
    | "domain.certificate.add.failed"
    | "domain.certificate.renew"
    | "domain.certificate.renew.failed"
    | "domain.certificate.deleted"
    | "domain.renewal"
    | "domain.renewal.failed"
    | "domain.auto-renew.changed"
    | "deployment.created"
    | "deployment.build-requested"
    | "deployment.cleanup"
    | "deployment.error"
    | "deployment.blocked"
    | "deployment.canceled"
    | "deployment.succeeded"
    | "deployment.ready"
    | "deployment.check-rerequested"
    | "deployment.promoted"
    | "deployment.rollback"
    | "deployment.integration.action.start"
    | "deployment.integration.action.cancel"
    | "deployment.integration.action.cleanup"
    | "deployment.checkrun.start"
    | "deployment.checkrun.cancel"
    | "edge-config.created"
    | "edge-config.deleted"
    | "edge-config.items.updated"
    | "firewall.attack"
    | "firewall.system-rule-anomaly"
    | "firewall.custom-rule-anomaly"
    | "function.archival-required"
    | "function.removal-required"
    | "alerts.triggered"
    | "integration-configuration.permission-upgraded"
    | "integration-configuration.removed"
    | "integration-configuration.scope-change-confirmed"
    | "integration-configuration.transferred"
    | "integration-resource.project-connected"
    | "integration-resource.project-disconnected"
    | "project.created"
    | "project.removed"
    | "project.renamed"
    | "project.env-variable.created"
    | "project.env-variable.updated"
    | "project.env-variable.deleted"
    | "project.domain.created"
    | "project.domain.updated"
    | "project.domain.deleted"
    | "project.domain.verified"
    | "project.domain.unverified"
    | "project.domain.moved"
    | "project.rolling-release.started"
    | "project.rolling-release.aborted"
    | "project.rolling-release.completed"
    | "project.rolling-release.approved"
    | "deployment.checks.failed"
    | "deployment.checks.succeeded"
    | "deployment-checks-completed"
    | "deployment-ready"
    | "deployment-prepared"
    | "deployment-error"
    | "deployment-check-rerequested"
    | "deployment-canceled"
    | "project-created"
    | "project-removed"
    | "domain-created"
    | "deployment"
    | "integration-configuration-permission-updated"
    | "integration-configuration-removed"
    | "integration-configuration-scope-change-confirmed"
    | "marketplace.member.changed"
    | "marketplace.invoice.created"
    | "marketplace.invoice.paid"
    | "marketplace.invoice.notpaid"
    | "marketplace.invoice.overdue"
    | "marketplace.invoice.refunded"
    | "ai-gateway.balance-depleted"
    | "ai-gateway.auto-reload.limit-reached"
    | "observability.anomaly"
    | "observability.anomaly-error"
    | "observability.usage-anomaly"
    | "observability.error-anomaly"
    | "botid.anomaly"
    | "flag.created"
    | "flag.updated"
    | "flag.deleted"
    | "flag.segment.created"
    | "flag.segment.updated"
    | "flag.segment.deleted"
    | "test-webhook"
    | "message.created"
    | "message.updated"
    | "message.deleted"
    | "thread.resolved"
    | "thread.unresolved"
    | "message.reaction-added"
    | "message.reaction-removed"
    | "message.mentioned"
    | "comment.created"
    | "comment.updated"
    | "comment.deleted"
    | "comment.resolved"
    | "comment.unresolved"
    | "comment.reaction-added"
    | "comment.reaction-removed"
    | "comment.mentioned"
  >;
  projectIds?: Array<string> | undefined;
};

export const useCreateApiV1Webhooks = (
  options: UseMutationOptions<
    UseCreateApiV1WebhooksResponse,
    Error,
    UseCreateApiV1WebhooksArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation({
    mutationFn: (args: UseCreateApiV1WebhooksArgs) =>
      apiFetch(
        buildUrl("/v1/webhooks", { teamId: args.teamId, slug: args.slug }),
        useCreateApiV1WebhooksResponse,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(args.body),
        },
      ),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ["webhooks"] });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    ...rest,
  });
};
