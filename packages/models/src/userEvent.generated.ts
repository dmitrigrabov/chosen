import { z } from "zod";

export type UserEvent = {
  id: string;
  text: string;
  entities: Array<{
    type:
      | "app"
      | "author"
      | "bitbucket_login"
      | "bold"
      | "deployment_host"
      | "deployment_inspector"
      | "dns_record"
      | "edge-config"
      | "env_var_name"
      | "flag"
      | "flags-segment"
      | "flags-settings"
      | "git_link"
      | "github_login"
      | "gitlab_login"
      | "hook_name"
      | "integration"
      | "link"
      | "project_name"
      | "scaling_rules"
      | "store"
      | "system"
      | "target";
    start: number;
    end: number;
  }>;
  type?:
    | (
        | "access-group-created"
        | "access-group-deleted"
        | "access-group-project-updated"
        | "access-group-updated"
        | "access-group-user-added"
        | "access-group-user-removed"
        | "admin-agentic-provisioning-account-unlinked"
        | "admin-plan-updated"
        | "admin-secondary-email-added"
        | "admin-secondary-email-removed"
        | "admin-team-name-update"
        | "admin-team-slug-update"
        | "admin-user-delete"
        | "admin-user-primary-email-updated"
        | "admin-username-updated"
        | "agentic-provisioning-account-blocked"
        | "agentic-provisioning-account-linked"
        | "agentic-provisioning-account-relinked"
        | "agentic-provisioning-account-unlinked"
        | "agentic-provisioning-credentials-rotated"
        | "agentic-provisioning-plan-changed"
        | "agentic-provisioning-team-created"
        | "ai-alert-investigation"
        | "ai-code-review"
        | "ai-gateway-api-key-created"
        | "ai-gateway-api-key-deleted"
        | "ai-gateway-api-key-quota-updated"
        | "ai-gateway-auto-reload-updated"
        | "ai-gateway-budget-default-updated"
        | "ai-gateway-byok-credential-created"
        | "ai-gateway-byok-credential-deleted"
        | "ai-gateway-byok-credential-updated"
        | "ai-gateway-credits-purchased"
        | "ai-gateway-guardrails-updated"
        | "ai-gateway-model-allowlist-models-updated"
        | "ai-gateway-model-allowlist-toggled"
        | "ai-gateway-private-model-created"
        | "ai-gateway-private-model-deleted"
        | "ai-gateway-private-model-updated"
        | "ai-gateway-private-provider-created"
        | "ai-gateway-private-provider-deleted"
        | "ai-gateway-private-provider-updated"
        | "ai-gateway-provider-allowlist-providers-updated"
        | "ai-gateway-provider-allowlist-toggled"
        | "ai-gateway-rule-created"
        | "ai-gateway-rule-deleted"
        | "ai-gateway-rule-updated"
        | "ai-gateway-scope-budget-updated"
        | "ai-gateway-transcripts-default-disabled"
        | "ai-gateway-transcripts-default-enabled"
        | "ai-gateway-transcripts-disabled"
        | "ai-gateway-transcripts-enabled"
        | "ai-gateway-transcripts-retention-updated"
        | "ai-gateway-virtual-model-config-archived"
        | "ai-gateway-virtual-model-config-created"
        | "ai-gateway-virtual-model-config-restored"
        | "ai-gateway-virtual-model-config-updated"
        | "ai-omniagent"
        | "alert-investigation-project-allowlist-updated"
        | "alert-rule-created"
        | "alert-rule-deleted"
        | "alert-rule-updated"
        | "alias"
        | "alias-chown"
        | "alias-delete"
        | "alias-invite-created"
        | "alias-invite-joined"
        | "alias-invite-revoked"
        | "alias-protection-bypass-created"
        | "alias-protection-bypass-exception"
        | "alias-protection-bypass-regenerated"
        | "alias-protection-bypass-revoked"
        | "alias-system"
        | "alias-user-scoped-access-denied"
        | "alias-user-scoped-access-granted"
        | "alias-user-scoped-access-requested"
        | "alias-user-scoped-access-revoked"
        | "aliases-assigned"
        | "attack-mode-disabled"
        | "attack-mode-enabled"
        | "audit-log-export-downloaded"
        | "audit-log-export-requested"
        | "authorize-git-deployment"
        | "auto-expose-system-envs"
        | "avatar"
        | "bulk-redirects-settings-updated"
        | "bulk-redirects-version-promoted"
        | "bulk-redirects-version-restored"
        | "cert"
        | "cert-autorenew"
        | "cert-chown"
        | "cert-clone"
        | "cert-delete"
        | "cert-renew"
        | "cert-replace"
        | "cert-system-create"
        | "code-owners-config-updated"
        | "compliance-document-downloaded"
        | "compliance-document-previewed"
        | "compliance-documents-bulk-downloaded"
        | "concurrent-builds-update"
        | "connect-attach-project"
        | "connect-bitbucket"
        | "connect-bitbucket-app"
        | "connect-configuration-created"
        | "connect-configuration-deleted"
        | "connect-configuration-link-updated"
        | "connect-configuration-linked"
        | "connect-configuration-unlinked"
        | "connect-configuration-updated"
        | "connect-create-connector"
        | "connect-delete-connector"
        | "connect-delete-installation"
        | "connect-detach-project"
        | "connect-github"
        | "connect-github-custom-host"
        | "connect-github-limited"
        | "connect-gitlab"
        | "connect-gitlab-app"
        | "connect-import-tokens"
        | "connect-revoke-all-tokens"
        | "connect-update-connector"
        | "connect-update-trigger-destinations"
        | "connect-upsert-installation"
        | "custom-alert-created"
        | "custom-alert-deleted"
        | "custom-alert-updated"
        | "custom-environments-settings-updated"
        | "custom-metric-metadata-deleted"
        | "custom-metric-metadata-updated"
        | "custom-suffix-clear"
        | "custom-suffix-disable"
        | "custom-suffix-enable"
        | "custom-suffix-pending"
        | "custom-suffix-ready"
        | "deploy-hook-created"
        | "deploy-hook-deduped"
        | "deploy-hook-deleted"
        | "deploy-hook-processed"
        | "deployment"
        | "deployment-check-created"
        | "deployment-check-deleted"
        | "deployment-check-updated"
        | "deployment-chown"
        | "deployment-creation-blocked"
        | "deployment-delete"
        | "deployment-policy-blocked"
        | "deployment-undeleted"
        | "disabled-integration-installation-removed"
        | "disconnect-bitbucket-app"
        | "disconnect-github"
        | "disconnect-github-custom-host"
        | "disconnect-github-limited"
        | "disconnect-gitlab-app"
        | "dns-add"
        | "dns-delete"
        | "dns-record-internal"
        | "dns-update"
        | "dns-zonefile-import"
        | "domain"
        | "domain-buy"
        | "domain-cdn"
        | "domain-chown"
        | "domain-custom-ns-change"
        | "domain-delegated"
        | "domain-delete"
        | "domain-ech-change"
        | "domain-move-in"
        | "domain-move-out"
        | "domain-move-out-request-sent"
        | "domain-renew-change"
        | "domain-service-type-updated"
        | "domain-transfer-in"
        | "domain-transfer-in-canceled"
        | "domain-transfer-in-completed"
        | "domain-zone-change"
        | "domain-zone-change-internal"
        | "drain-created"
        | "drain-deleted"
        | "drain-disabled"
        | "drain-enabled"
        | "drain-updated"
        | "edge-cache-dangerously-delete-by-src-images"
        | "edge-cache-dangerously-delete-by-tags"
        | "edge-cache-dangerously-delete-immutable-static"
        | "edge-cache-invalidate-by-src-images"
        | "edge-cache-invalidate-by-tags"
        | "edge-cache-purge-all"
        | "edge-cache-rollback-purge"
        | "edge-config-backup-restored"
        | "edge-config-created"
        | "edge-config-deleted"
        | "edge-config-items-updated"
        | "edge-config-schema-deleted"
        | "edge-config-schema-updated"
        | "edge-config-token-created"
        | "edge-config-token-deleted"
        | "edge-config-transfer-in"
        | "edge-config-transfer-out"
        | "edge-config-updated"
        | "email"
        | "email-notification-rule-removed"
        | "email-notification-rule-updated"
        | "emu-member-removed-unverified-domain"
        | "enforce-disjunctive-production-secrets"
        | "enforce-sensitive-environment-variables"
        | "env-variable-add"
        | "env-variable-delete"
        | "env-variable-edit"
        | "env-variable-masked"
        | "env-variable-read"
        | "env-variable-read:cli:dev"
        | "env-variable-read:cli:env:add"
        | "env-variable-read:cli:env:ls"
        | "env-variable-read:cli:env:pull"
        | "env-variable-read:cli:env:rm"
        | "env-variable-read:cli:pull"
        | "env-variable-read:unknown-source"
        | "env-variable-read:v0:env:pull"
        | "env-variable-rotated"
        | "experiment-created"
        | "experiment-deleted"
        | "experiment-transitioned"
        | "experiment-updated"
        | "firewall-bypass-created"
        | "firewall-bypass-deleted"
        | "firewall-config-modified"
        | "firewall-config-promoted"
        | "firewall-config-removed"
        | "firewall-managed-rulegroup-updated"
        | "firewall-managed-ruleset-updated"
        | "flag"
        | "flag-archived"
        | "flag-created"
        | "flag-deleted"
        | "flag-unarchived"
        | "flag-updated"
        | "flags-explorer-subscription"
        | "flags-sdk-key"
        | "flags-sdk-key-added"
        | "flags-sdk-key-deleted"
        | "flags-sdk-key-read"
        | "flags-segment"
        | "flags-settings"
        | "flags-transferred"
        | "git-integration-repo-push"
        | "git_account_integration_link_added"
        | "global-config-backup-restored"
        | "global-config-created"
        | "global-config-deleted"
        | "global-config-items-updated"
        | "global-config-schema-deleted"
        | "global-config-schema-updated"
        | "global-config-token-created"
        | "global-config-token-deleted"
        | "global-config-transfer-in"
        | "global-config-transfer-out"
        | "global-config-updated"
        | "instant-rollback-created"
        | "integration-configuration-credential-revoked"
        | "integration-configuration-credential-rotated"
        | "integration-configuration-owner-changed"
        | "integration-configuration-scope-change-confirmed"
        | "integration-configuration-transfer-in-success"
        | "integration-configuration-transfer-out-success"
        | "integration-configurations-disabled"
        | "integration-installation-billing-plan-updated"
        | "integration-installation-completed"
        | "integration-installation-permission-updated"
        | "integration-installation-removed"
        | "integration-resource-redis-command-executed"
        | "integration-resource-sql-query-executed"
        | "integration-scope-changed"
        | "invoice-modified"
        | "invoice-refunded"
        | "kms-issuer-created"
        | "kms-issuer-deleted"
        | "kms-issuer-key-activated"
        | "kms-issuer-key-created"
        | "kms-issuer-key-revoked"
        | "kms-issuer-key-rotated"
        | "kms-issuer-policy-created"
        | "kms-issuer-policy-deleted"
        | "kms-issuer-policy-updated"
        | "kms-issuer-updated"
        | "log-drain-created"
        | "log-drain-deleted"
        | "log-drain-disabled"
        | "log-drain-enabled"
        | "login"
        | "login-connection-linked"
        | "login-connection-unlinked"
        | "manual-deployment-promotion-created"
        | "marketplace-flex-commit-opt-in"
        | "marketplace-integration-allowlist-updated"
        | "microfrontend-group-added"
        | "microfrontend-group-deleted"
        | "microfrontend-group-updated"
        | "microfrontend-project-added-to-group"
        | "microfrontend-project-removed-from-group"
        | "microfrontend-project-updated"
        | "monitoring-alert-updated"
        | "monitoring-disabled"
        | "monitoring-enabled"
        | "oauth-app-connection-created"
        | "oauth-app-connection-removed"
        | "oauth-app-connection-updated"
        | "oauth-app-created"
        | "oauth-app-deleted"
        | "oauth-app-secret-deleted"
        | "oauth-app-secret-generated"
        | "oauth-app-token-created"
        | "oauth-app-updated"
        | "observability-disabled"
        | "observability-enabled"
        | "observability-plus-project-disabled"
        | "observability-plus-project-enabled"
        | "oidc-policy-created"
        | "oidc-policy-deleted"
        | "oidc-policy-updated"
        | "oidc-policy-used-to-obtain-app-token"
        | "organization-create"
        | "organization-delete"
        | "organization-dsync-group-delete"
        | "organization-dsync-group-upsert"
        | "organization-slug-update"
        | "organization-team-add"
        | "organization-team-create"
        | "organization-team-delete"
        | "owner-blocked"
        | "owner-soft-blocked"
        | "owner-soft-unblocked"
        | "owner-unblocked"
        | "page-integrity-config-updated"
        | "page-integrity-header-approved"
        | "page-integrity-header-rejected"
        | "page-integrity-inventory-cleared"
        | "page-integrity-resource-approved"
        | "page-integrity-resource-deleted"
        | "page-integrity-resource-rejected"
        | "page-integrity-script-approval-rule-created"
        | "page-integrity-script-approval-rule-deleted"
        | "passkey-created"
        | "passkey-deleted"
        | "passkey-updated"
        | "passport-access-granted"
        | "password-protection-disabled"
        | "password-protection-enabled"
        | "payment-method-added"
        | "payment-method-default-updated"
        | "payment-method-removed"
        | "plan"
        | "preview-deployment-suffix-disabled"
        | "preview-deployment-suffix-enabled"
        | "preview-deployment-suffix-update"
        | "privatelink-endpoint-created"
        | "privatelink-endpoint-deleted"
        | "privatelink-endpoint-updated"
        | "production-branch-updated"
        | "project-add-alias"
        | "project-add-redirect"
        | "project-affected-projects-deployments-updated"
        | "project-alias-configured-change"
        | "project-analytics-disabled"
        | "project-analytics-enabled"
        | "project-auto-assign-custom-production-domains-updated"
        | "project-automation-bypass"
        | "project-avatar-update"
        | "project-build-command-updated"
        | "project-build-logs-and-source-protection-updated"
        | "project-build-machine-updated"
        | "project-card-widget-preference-updated"
        | "project-client-cert-delete"
        | "project-client-cert-upload"
        | "project-connect-configurations"
        | "project-consolidated-git-commit-status-updated"
        | "project-created"
        | "project-cron-jobs-toggled"
        | "project-custom-environment-created"
        | "project-custom-environment-deleted"
        | "project-custom-environment-updated"
        | "project-customer-success-code-visibility-updated"
        | "project-delete"
        | "project-deployment-policy-updated"
        | "project-deployment-retention-updated"
        | "project-directory-listing"
        | "project-domain-deleted"
        | "project-domain-moved"
        | "project-domain-unverified"
        | "project-domain-updated"
        | "project-domain-verified"
        | "project-elastic-concurrency-updated"
        | "project-expiration-locked"
        | "project-expiration-reached"
        | "project-expiration-scheduled"
        | "project-expiration-unlocked"
        | "project-external-rewrite-caching-updated"
        | "project-framework-updated"
        | "project-function-cpu-memory"
        | "project-function-failover"
        | "project-function-max-duration"
        | "project-function-regions"
        | "project-functions-beta-updated"
        | "project-functions-fluid-disabled"
        | "project-functions-fluid-enabled"
        | "project-git-commit-comments-toggled"
        | "project-git-commit-status-toggled"
        | "project-git-create-deployments-toggled"
        | "project-git-fork-protection-updated"
        | "project-git-lfs-toggled"
        | "project-git-pr-comments-toggled"
        | "project-git-repository-connected"
        | "project-git-repository-disconnected"
        | "project-git-repository-dispatch-events-toggled"
        | "project-git-require-verified-commits-toggled"
        | "project-ignored-build-step-updated"
        | "project-install-command-updated"
        | "project-member-added"
        | "project-member-invited"
        | "project-member-removed"
        | "project-member-removed-batch"
        | "project-member-updated"
        | "project-move-in-success"
        | "project-move-out-failed"
        | "project-move-out-started"
        | "project-move-out-success"
        | "project-name"
        | "project-node-version-updated"
        | "project-oidc-issuer-mode-updated"
        | "project-oidc-token-created"
        | "project-options-allowlist"
        | "project-output-directory-updated"
        | "project-passport-updated"
        | "project-password-protection"
        | "project-paused"
        | "project-preview-deployment-suffix"
        | "project-preview-environment-branch-tracking-updated"
        | "project-prioritize-production-builds-updated"
        | "project-program-enrollment-changed"
        | "project-protected-sourcemaps-updated"
        | "project-rollback-description-updated"
        | "project-rolling-release-aborted"
        | "project-rolling-release-approved"
        | "project-rolling-release-completed"
        | "project-rolling-release-configured"
        | "project-rolling-release-continued"
        | "project-rolling-release-disabled"
        | "project-rolling-release-enabled"
        | "project-rolling-release-paused"
        | "project-rolling-release-started"
        | "project-rolling-release-suggested-actions-generated"
        | "project-rolling-release-timer"
        | "project-root-directory-updated"
        | "project-routes-version-promoted"
        | "project-routes-version-restored"
        | "project-sandbox-config-updated"
        | "project-sandbox-url-protection-updated"
        | "project-skew-protection-allowed-domains-updated"
        | "project-skew-protection-max-age-updated"
        | "project-skew-protection-threshold-updated"
        | "project-source-files-outside-root-directory-updated"
        | "project-speed-insights-disabled"
        | "project-speed-insights-enabled"
        | "project-speed-insights-free-data-started"
        | "project-sso-protection"
        | "project-static-ips-updated"
        | "project-trusted-ips"
        | "project-trusted-sources"
        | "project-unpaused"
        | "project-web-analytics-disabled"
        | "project-web-analytics-enabled"
        | "protected-git-scope-added"
        | "protected-git-scope-removed"
        | "runtime-cache-purge-all"
        | "saml-connection-created"
        | "saml-connection-deleted"
        | "sandbox-alias-assigned"
        | "sandbox-alias-delete"
        | "sandbox-drive-created"
        | "sandbox-drive-deleted"
        | "sandbox-snapshot-regions-updated"
        | "scale"
        | "scale-auto"
        | "secondary-email-added"
        | "secondary-email-removed"
        | "secondary-email-verified"
        | "secret-add"
        | "secret-delete"
        | "secret-rename"
        | "security-list-created"
        | "security-list-deleted"
        | "security-list-updated"
        | "security-plus-updated"
        | "set-bio"
        | "set-name"
        | "set-profiles"
        | "set-scale"
        | "shared-env-variable-create"
        | "shared-env-variable-delete"
        | "shared-env-variable-read"
        | "shared-env-variable-update"
        | "show-ip-addresses"
        | "signup"
        | "signup-via-bitbucket"
        | "signup-via-github"
        | "signup-via-gitlab"
        | "speed-insights-settings-updated"
        | "spend-created"
        | "spend-deleted"
        | "spend-updated"
        | "sso-login"
        | "storage-accept-tos"
        | "storage-access-token-set"
        | "storage-accessed-data-browser"
        | "storage-connect-project"
        | "storage-create"
        | "storage-delete"
        | "storage-disconnect-project"
        | "storage-disconnect-projects"
        | "storage-inactive-store-deleted"
        | "storage-reset-credentials"
        | "storage-resource-repl-command"
        | "storage-set-locked"
        | "storage-transfer-in-success"
        | "storage-transfer-out-success"
        | "storage-transfer-request-created"
        | "storage-update"
        | "storage-update-project-connection"
        | "storage-upgrade-project-connection-to-oidc"
        | "storage-view-secret"
        | "strict-deployment-protection-settings"
        | "strict-password-protection-settings"
        | "strict-shareable-links"
        | "subscription-created"
        | "subscription-product-added"
        | "subscription-product-removed"
        | "subscription-updated"
        | "support-session-created"
        | "team"
        | "team-agent-billing-migration-decision-changed"
        | "team-avatar-update"
        | "team-collaboration-settings-updated"
        | "team-default-build-machine-updated"
        | "team-default-passport-updated"
        | "team-delete"
        | "team-deployment-policy-updated"
        | "team-domain-verification-created"
        | "team-domain-verification-deleted"
        | "team-domain-verification-verified"
        | "team-email-domain-update"
        | "team-emu-updated"
        | "team-ended-trial"
        | "team-firewall-config-modified"
        | "team-firewall-config-promoted"
        | "team-git-repository-dispatch-events-toggled"
        | "team-git-require-verified-commits-toggled"
        | "team-invite-bulk-delete"
        | "team-invite-code-reset"
        | "team-invite-link-created"
        | "team-invite-link-deleted"
        | "team-ip-blocking-rules-created"
        | "team-ip-blocking-rules-removed"
        | "team-member-add"
        | "team-member-confirm-request"
        | "team-member-decline-request"
        | "team-member-delete"
        | "team-member-entitlement-added"
        | "team-member-entitlement-canceled"
        | "team-member-entitlement-reactivated"
        | "team-member-entitlement-removed"
        | "team-member-join"
        | "team-member-leave"
        | "team-member-request-access"
        | "team-member-role-update"
        | "team-member-sso-authorization-attempt"
        | "team-mfa-enforcement-updated"
        | "team-name-update"
        | "team-paid-invoice"
        | "team-program-enrollment-changed"
        | "team-remote-caching-purge"
        | "team-remote-caching-update"
        | "team-saml-enforced"
        | "team-saml-roles"
        | "team-slug-update"
        | "team-tokens-invalidated"
        | "tracing-configured"
        | "tracing-disabled"
        | "tracing-paused"
        | "tracing-resumed"
        | "unlink-login-connection"
        | "update-account-flow-dismissed"
        | "update-account-flow-triggered"
        | "user-auto-block-configured"
        | "user-blocked"
        | "user-delete"
        | "user-delete-requested"
        | "user-emu-account-archived"
        | "user-emu-account-deleted"
        | "user-emu-account-recovered"
        | "user-emu-account-update-opted-in"
        | "user-emu-account-update-opted-out"
        | "user-emu-recovery-email-sent"
        | "user-emu-recovery-initiated"
        | "user-emu-toggled"
        | "user-mfa-challenge-failed"
        | "user-mfa-challenge-initiated"
        | "user-mfa-challenge-verified"
        | "user-mfa-change-failed"
        | "user-mfa-configuration-updated"
        | "user-mfa-recovery-code-used"
        | "user-mfa-recovery-codes-regenerated"
        | "user-mfa-removed"
        | "user-mfa-setup-skipped"
        | "user-mfa-totp-verification-started"
        | "user-mfa-totp-verified"
        | "user-phone-removed"
        | "user-phone-updated"
        | "user-primary-email-updated"
        | "user-provider-email-claim-evaluated"
        | "user-sudo-mode-removed"
        | "user-token-created"
        | "user-token-deleted"
        | "user-tokens-deleted"
        | "user-unblocked"
        | "username"
        | "v0-chat-ai-usage"
        | "v0-chat-created"
        | "v0-chat-message-sent"
        | "vcr-image-deleted"
        | "vcr-image-pushed"
        | "vcr-repository-created"
        | "vcr-repository-deleted"
        | "vcr-repository-permission-added"
        | "vcr-repository-permission-removed"
        | "vcr-repository-permissions-cleared"
        | "vcr-repository-visibility-changed"
        | "vercel-agent-elevated-permissions-approved"
        | "vercel-agent-elevated-permissions-requested"
        | "vercel-agent-session-created"
        | "vercel-agent-team-trial-credits-applied"
        | "vercel-app-installation-request-dismissed"
        | "vercel-app-installation-requested"
        | "vercel-app-installation-updated"
        | "vercel-app-installed"
        | "vercel-app-tokens-revoked"
        | "vercel-app-uninstalled"
        | "vercel-toolbar"
        | "vpc-peering-connection-accepted"
        | "vpc-peering-connection-deleted"
        | "vpc-peering-connection-rejected"
        | "vpc-peering-connection-updated"
        | "vulnerability-banner-dismissed"
        | "web-analytics-tier-updated"
        | "webhook-created"
        | "webhook-deleted"
        | "webhook-updated"
        | "workflow-deployment-key-accessed"
      )
    | undefined;
  categories?:
    | Array<
        | "account"
        | "ai"
        | "ai-gateway"
        | "billing"
        | "connect"
        | "deployment"
        | "domain"
        | "edge"
        | "env-variable"
        | "feature-flags"
        | "firewall"
        | "integration"
        | "microfrontends"
        | "network"
        | "observability"
        | "other"
        | "project"
        | "security"
        | "storage"
        | "team"
        | "v0"
        | "vercel-app"
        | "workflow"
      >
    | undefined;
  createdAt: number;
  user?:
    | { slug?: string | undefined; avatar: string; email: string; username: string; uid: string }
    | undefined;
  principal?:
    | (
        | {
            type?: "user" | undefined;
            avatar: string;
            email: string;
            slug?: string | undefined;
            uid: string;
            username: string;
          }
        | { type: "app"; id?: string | undefined; clientId: string; name: string }
        | { type: "external"; id: string; name: string; email?: string | undefined }
        | { type: "system" }
      )
    | undefined;
  via?:
    | Array<
        | {
            type?: "user" | undefined;
            avatar: string;
            email: string;
            slug?: string | undefined;
            uid: string;
            username: string;
          }
        | { type: "app"; id?: string | undefined; clientId: string; name: string }
        | { type: "external"; id: string; name: string; email?: string | undefined }
        | { type: "system" }
      >
    | undefined;
  userId?: string | undefined;
  principalId: string;
  viaIds?: Array<string> | undefined;
  payload?:
    | (
        | Record<string, never>
        | {
            action: "archived" | "created" | "deleted" | "unarchived" | "updated";
            id: string;
            slug: string;
            projectId: string;
            projectName?: string | undefined;
          }
        | {
            action: "created" | "deleted" | "transitioned" | "updated";
            id: string;
            name: string;
            slug: string;
            state: string;
            projectId: string;
            projectName?: string | undefined;
          }
        | {
            action: "added" | "deleted" | "rotated";
            label?: string | undefined;
            projectName?: string | undefined;
            projectId?: string | undefined;
            environment: string;
          }
        | {
            action: "read";
            projectName?: string | undefined;
            projectId?: string | undefined;
            environment: Array<string>;
          }
        | {
            provider?: ("chatgpt" | "stripe") | undefined;
            providerAccount?: string | undefined;
            stripeAccount?: string | undefined;
            stripeOrganisation?: string | undefined;
            teamId: string;
            accountRequestId: string;
          }
        | {
            provider?: ("chatgpt" | "stripe") | undefined;
            providerAccount?: string | undefined;
            stripeAccount?: string | undefined;
            stripeOrganisation?: string | undefined;
            teamId: string;
          }
        | {
            provider?: ("chatgpt" | "stripe") | undefined;
            providerAccount?: string | undefined;
            stripeAccount?: string | undefined;
            stripeOrganisation?: string | undefined;
            teamId: string;
            teamSlug: string;
          }
        | {
            provider?: ("chatgpt" | "stripe") | undefined;
            providerAccount?: string | undefined;
            stripeAccount?: string | undefined;
            stripeOrganisation?: string | undefined;
            reason: string;
            blockCode: string;
          }
        | {
            provider?: ("chatgpt" | "stripe") | undefined;
            providerAccount?: string | undefined;
            stripeAccount?: string | undefined;
            resourceId: string;
            projectName: string;
          }
        | {
            provider?: ("chatgpt" | "stripe") | undefined;
            providerAccount?: string | undefined;
            stripeAccount?: string | undefined;
            stripeOrganisation?: string | undefined;
            teamId: string;
            actorId: string;
            actorType: "admin";
            actorName?: string | undefined;
          }
        | {
            provider?: ("chatgpt" | "stripe") | undefined;
            providerAccount?: string | undefined;
            stripeAccount?: string | undefined;
            stripeOrganisation?: string | undefined;
            teamId: string;
            resourceId: string;
            fromPlan: "hobby" | "pro";
            toPlan: "hobby" | "pro";
          }
        | {
            apiKey: { id: string; name: string };
            budget?:
              | ({
                  limitAmount: number;
                  refreshPeriod: "daily" | "monthly" | "none" | "weekly";
                } | null)
              | undefined;
            zdrExemption?: boolean | undefined;
            bypassAll?: boolean | undefined;
          }
        | { apiKey: { id: string; name: string } }
        | {
            apiKey: { id: string; name: string };
            budget?:
              | ({
                  limitAmount: number;
                  refreshPeriod: "daily" | "monthly" | "none" | "weekly";
                } | null)
              | undefined;
            change: "disable" | "enable" | "remove" | "set";
          }
        | {
            change: "disable" | "disable-commitment" | "enable" | "enable-commitment" | "update";
            settings?:
              | {
                  minimumBalance: string;
                  targetBalance: string;
                  maximumMonthlySpend: string | null;
                }
              | undefined;
            previous?:
              | {
                  minimumBalance: string;
                  targetBalance: string;
                  maximumMonthlySpend: string | null;
                }
              | undefined;
            commitment?:
              | { maximumMonthlySpend: string | null; deferredInvoiceTargetBalance: string }
              | undefined;
          }
        | {
            scopeType: "api-key" | "project" | "team" | "user";
            budget?:
              | ({
                  limitAmount: number;
                  refreshPeriod: "daily" | "monthly" | "none" | "weekly";
                } | null)
              | undefined;
            change: "disable" | "enable" | "remove" | "set";
          }
        | {
            scopeType: "project" | "team" | "user";
            projectId?: string | undefined;
            projectName?: string | undefined;
            userId?: string | undefined;
            userName?: string | undefined;
            budget?:
              | ({
                  limitAmount: number;
                  refreshPeriod: "daily" | "monthly" | "none" | "weekly";
                } | null)
              | undefined;
            change: "disable" | "enable" | "remove" | "set";
          }
        | { credential: { id: string; name: string; providerSlug: string } }
        | { amount: string; purchaseIntentId: string }
        | { enabled: boolean }
        | { added: Array<string>; removed: Array<string> }
        | { privateModel: { slug: string; providerSlug: string } }
        | { privateModel: { slug: string } }
        | { privateProvider: { slug: string } }
        | {
            piiRedaction: { from: boolean; to: boolean };
            moderationPolicyCount: number;
            policiesAdded: Array<string>;
            policiesRemoved: Array<string>;
            policiesModified: Array<string>;
          }
        | {
            retention: {
              defaultMode: "days" | "until-requested";
              defaultDays?: number | undefined;
              ceilingMode: "days" | "until-requested";
              ceilingDays?: number | undefined;
            };
          }
        | {
            rule: {
              id: string;
              type: string;
              model?: string | undefined;
              rewriteModel?: string | undefined;
            };
          }
        | { rule: { id: string; type: string; model?: string | undefined } }
        | {
            rule: { id: string; type: string; model?: string | undefined };
            enabled?: boolean | undefined;
          }
        | {
            virtualModelConfig: {
              id: string;
              displayName?: string | undefined;
              modelSlug?: string | undefined;
            };
          }
        | {
            accessGroup: { id: string; name: string };
            teamRoles?: Array<string> | undefined;
            teamPermissions?: Array<string> | undefined;
            entitlements?: Array<string> | undefined;
          }
        | { author: string; accessGroup: { id: string; name: string } }
        | {
            accessGroup: { id: string; name: string };
            project: { id: string; name?: string | undefined };
            next_role?:
              | ("ADMIN" | "PROJECT_DEVELOPER" | "PROJECT_GUEST" | "PROJECT_VIEWER" | "null" | null)
              | undefined;
            previous_role?:
              | ("ADMIN" | "PROJECT_DEVELOPER" | "PROJECT_GUEST" | "PROJECT_VIEWER")
              | undefined;
          }
        | {
            accessGroup: { id: string; name: string };
            name?: string | undefined;
            previousName?: string | undefined;
            teamRoles?: Array<string> | undefined;
            previousTeamRoles?: Array<string> | undefined;
            teamPermissions?: Array<string> | undefined;
            previousTeamPermissions?: Array<string> | undefined;
            entitlementsAdded?: Array<string> | undefined;
            entitlementsRemoved?: Array<string> | undefined;
          }
        | {
            accessGroup: { id: string; name?: string | undefined };
            user: { id: string; username?: string | undefined };
            directoryType?: string | undefined;
          }
        | { price?: number | undefined; currency?: string | undefined }
        | {
            alias?: string | undefined;
            deployment?:
              | ({
                  id: string;
                  name: string;
                  url: string;
                  meta: Record<string, string>;
                  readyState?: string | undefined;
                  allowListedReadyStateReasonInternal?:
                    | (
                        | "EARLY_IGNORE_STEP"
                        | "IGNORE_STEP"
                        | "NAMESPACE_PRUNED"
                        | "UNAFFECTED_PROJECT"
                        | "UNVERIFIED_COMMIT"
                      )
                    | undefined;
                } | null)
              | undefined;
            ruleCount?: number | undefined;
            deploymentUrl?: string | undefined;
            aliasId?: string | undefined;
            deploymentId?: (string | null) | undefined;
            oldDeploymentId?: (string | null) | undefined;
            redirect?: string | undefined;
            redirectStatusCode?: (number | null) | undefined;
            target?: (string | null) | undefined;
            system?: boolean | undefined;
            aliasUpdatedAt?: number | undefined;
          }
        | {
            projectId: string;
            aliasCount: number;
            deployment?:
              | ({
                  id: string;
                  name: string;
                  url: string;
                  meta: Record<string, string>;
                  readyState?: string | undefined;
                  allowListedReadyStateReasonInternal?:
                    | (
                        | "EARLY_IGNORE_STEP"
                        | "IGNORE_STEP"
                        | "NAMESPACE_PRUNED"
                        | "UNAFFECTED_PROJECT"
                        | "UNVERIFIED_COMMIT"
                      )
                    | undefined;
                } | null)
              | undefined;
          }
        | {
            name?: string | undefined;
            alias: string;
            oldTeam?: { name: string } | undefined;
            newTeam?: { name: string } | undefined;
          }
        | { name?: string | undefined; alias: string; aliasId: string; deploymentId: string | null }
        | { alias?: string | undefined; email?: string | undefined; username?: string | undefined }
        | { alias?: string | undefined }
        | { alias?: string | undefined; email?: string | undefined }
        | {
            aliasId?: string | undefined;
            alias?: string | undefined;
            projectId?: string | undefined;
            projectName?: string | undefined;
          }
        | {
            projectId?: string | undefined;
            projectName: string;
            alias: string;
            action: "created" | "removed";
          }
        | { alias: string; deploymentUrl: string }
        | { alias?: string | undefined; userId?: string | undefined; username?: string | undefined }
        | {
            alias?: string | undefined;
            aliasId?: string | undefined;
            userId?: string | undefined;
            username?: string | undefined;
          }
        | {
            appName: string;
            appId?: string | undefined;
            scopes: Array<"email" | "offline_access" | "openid" | "profile">;
            permissions?:
              | Array<
                  | "*"
                  | "manage:speed-insights"
                  | "manage:web-analytics"
                  | "read-write:ai-gateway-api-key"
                  | "read-write:ai-gateway-guardrails"
                  | "read-write:ai-gateway-private-models"
                  | "read-write:ai-gateway-rules"
                  | "read-write:ai-gateway-virtual-model-configs"
                  | "read-write:alerts"
                  | "read-write:billing"
                  | "read-write:blob"
                  | "read-write:connect"
                  | "read-write:deployment"
                  | "read-write:domain"
                  | "read-write:domain-registrar"
                  | "read-write:drains"
                  | "read-write:edge-cache"
                  | "read-write:edge-config"
                  | "read-write:firewall"
                  | "read-write:integration-configuration"
                  | "read-write:integration-resource"
                  | "read-write:kms"
                  | "read-write:project"
                  | "read-write:project-env-vars"
                  | "read-write:project-env-vars-non-production"
                  | "read-write:project-env-vars-production"
                  | "read-write:project-flags-non-production"
                  | "read-write:project-flags-production"
                  | "read-write:project-protection-bypass"
                  | "read-write:remote-cache"
                  | "read-write:sandbox"
                  | "read-write:team-members"
                  | "read-write:vcr"
                  | "read:access-group"
                  | "read:ai-gateway-guardrails"
                  | "read:ai-gateway-private-models"
                  | "read:ai-gateway-rules"
                  | "read:ai-gateway-virtual-model-configs"
                  | "read:alerts"
                  | "read:billing"
                  | "read:deployment"
                  | "read:domain"
                  | "read:event"
                  | "read:firewall"
                  | "read:integration-configuration"
                  | "read:integration-resource"
                  | "read:kms"
                  | "read:monitoring"
                  | "read:project"
                  | "read:project-env-vars-non-production"
                  | "read:project-env-vars-production"
                  | "read:project-flags"
                  | "read:remote-cache"
                  | "read:sandbox"
                  | "read:speed-insights"
                  | "read:team"
                  | "read:user"
                  | "read:vcr"
                  | "read:web-analytics"
                  | "use:ai-gateway"
                >
              | undefined;
          }
        | { appName: string; appId?: string | undefined }
        | {
            appName: string;
            appId?: string | undefined;
            nextScopes: Array<"email" | "offline_access" | "openid" | "profile">;
            nextPermissions?:
              | Array<
                  | "*"
                  | "manage:speed-insights"
                  | "manage:web-analytics"
                  | "read-write:ai-gateway-api-key"
                  | "read-write:ai-gateway-guardrails"
                  | "read-write:ai-gateway-private-models"
                  | "read-write:ai-gateway-rules"
                  | "read-write:ai-gateway-virtual-model-configs"
                  | "read-write:alerts"
                  | "read-write:billing"
                  | "read-write:blob"
                  | "read-write:connect"
                  | "read-write:deployment"
                  | "read-write:domain"
                  | "read-write:domain-registrar"
                  | "read-write:drains"
                  | "read-write:edge-cache"
                  | "read-write:edge-config"
                  | "read-write:firewall"
                  | "read-write:integration-configuration"
                  | "read-write:integration-resource"
                  | "read-write:kms"
                  | "read-write:project"
                  | "read-write:project-env-vars"
                  | "read-write:project-env-vars-non-production"
                  | "read-write:project-env-vars-production"
                  | "read-write:project-flags-non-production"
                  | "read-write:project-flags-production"
                  | "read-write:project-protection-bypass"
                  | "read-write:remote-cache"
                  | "read-write:sandbox"
                  | "read-write:team-members"
                  | "read-write:vcr"
                  | "read:access-group"
                  | "read:ai-gateway-guardrails"
                  | "read:ai-gateway-private-models"
                  | "read:ai-gateway-rules"
                  | "read:ai-gateway-virtual-model-configs"
                  | "read:alerts"
                  | "read:billing"
                  | "read:deployment"
                  | "read:domain"
                  | "read:event"
                  | "read:firewall"
                  | "read:integration-configuration"
                  | "read:integration-resource"
                  | "read:kms"
                  | "read:monitoring"
                  | "read:project"
                  | "read:project-env-vars-non-production"
                  | "read:project-env-vars-production"
                  | "read:project-flags"
                  | "read:remote-cache"
                  | "read:sandbox"
                  | "read:speed-insights"
                  | "read:team"
                  | "read:user"
                  | "read:vcr"
                  | "read:web-analytics"
                  | "use:ai-gateway"
                >
              | undefined;
          }
        | {
            appName: string;
            appId?: string | undefined;
            installationId?: string | undefined;
            before?:
              | {
                  resources?:
                    | { projectIds: { type: "list"; required: true; items: { type: "string" } } }
                    | undefined;
                  permissions?:
                    | Array<
                        | "manage:speed-insights"
                        | "manage:web-analytics"
                        | "read-write:ai-gateway-api-key"
                        | "read-write:ai-gateway-guardrails"
                        | "read-write:ai-gateway-private-models"
                        | "read-write:ai-gateway-rules"
                        | "read-write:ai-gateway-virtual-model-configs"
                        | "read-write:alerts"
                        | "read-write:billing"
                        | "read-write:blob"
                        | "read-write:connect"
                        | "read-write:deployment"
                        | "read-write:domain"
                        | "read-write:domain-registrar"
                        | "read-write:drains"
                        | "read-write:edge-cache"
                        | "read-write:edge-config"
                        | "read-write:firewall"
                        | "read-write:integration-configuration"
                        | "read-write:integration-resource"
                        | "read-write:kms"
                        | "read-write:project"
                        | "read-write:project-env-vars"
                        | "read-write:project-env-vars-non-production"
                        | "read-write:project-env-vars-production"
                        | "read-write:project-flags-non-production"
                        | "read-write:project-flags-production"
                        | "read-write:project-protection-bypass"
                        | "read-write:remote-cache"
                        | "read-write:sandbox"
                        | "read-write:team-members"
                        | "read-write:vcr"
                        | "read:access-group"
                        | "read:ai-gateway-guardrails"
                        | "read:ai-gateway-private-models"
                        | "read:ai-gateway-rules"
                        | "read:ai-gateway-virtual-model-configs"
                        | "read:alerts"
                        | "read:billing"
                        | "read:deployment"
                        | "read:domain"
                        | "read:event"
                        | "read:firewall"
                        | "read:integration-configuration"
                        | "read:integration-resource"
                        | "read:kms"
                        | "read:monitoring"
                        | "read:project"
                        | "read:project-env-vars-non-production"
                        | "read:project-env-vars-production"
                        | "read:project-flags"
                        | "read:remote-cache"
                        | "read:sandbox"
                        | "read:speed-insights"
                        | "read:team"
                        | "read:vcr"
                        | "read:web-analytics"
                        | "use:ai-gateway"
                      >
                    | undefined;
                }
              | undefined;
            after?:
              | {
                  resources?:
                    | { projectIds: { type: "list"; required: true; items: { type: "string" } } }
                    | undefined;
                  permissions?:
                    | Array<
                        | "manage:speed-insights"
                        | "manage:web-analytics"
                        | "read-write:ai-gateway-api-key"
                        | "read-write:ai-gateway-guardrails"
                        | "read-write:ai-gateway-private-models"
                        | "read-write:ai-gateway-rules"
                        | "read-write:ai-gateway-virtual-model-configs"
                        | "read-write:alerts"
                        | "read-write:billing"
                        | "read-write:blob"
                        | "read-write:connect"
                        | "read-write:deployment"
                        | "read-write:domain"
                        | "read-write:domain-registrar"
                        | "read-write:drains"
                        | "read-write:edge-cache"
                        | "read-write:edge-config"
                        | "read-write:firewall"
                        | "read-write:integration-configuration"
                        | "read-write:integration-resource"
                        | "read-write:kms"
                        | "read-write:project"
                        | "read-write:project-env-vars"
                        | "read-write:project-env-vars-non-production"
                        | "read-write:project-env-vars-production"
                        | "read-write:project-flags-non-production"
                        | "read-write:project-flags-production"
                        | "read-write:project-protection-bypass"
                        | "read-write:remote-cache"
                        | "read-write:sandbox"
                        | "read-write:team-members"
                        | "read-write:vcr"
                        | "read:access-group"
                        | "read:ai-gateway-guardrails"
                        | "read:ai-gateway-private-models"
                        | "read:ai-gateway-rules"
                        | "read:ai-gateway-virtual-model-configs"
                        | "read:alerts"
                        | "read:billing"
                        | "read:deployment"
                        | "read:domain"
                        | "read:event"
                        | "read:firewall"
                        | "read:integration-configuration"
                        | "read:integration-resource"
                        | "read:kms"
                        | "read:monitoring"
                        | "read:project"
                        | "read:project-env-vars-non-production"
                        | "read:project-env-vars-production"
                        | "read:project-flags"
                        | "read:remote-cache"
                        | "read:sandbox"
                        | "read:speed-insights"
                        | "read:team"
                        | "read:vcr"
                        | "read:web-analytics"
                        | "use:ai-gateway"
                      >
                    | undefined;
                }
              | undefined;
          }
        | {
            appName: string;
            appId?: string | undefined;
            resources?:
              | { projectIds: { type: "list"; required: true; items: { type: "string" } } }
              | undefined;
            permissions?:
              | Array<
                  | "manage:speed-insights"
                  | "manage:web-analytics"
                  | "read-write:ai-gateway-api-key"
                  | "read-write:ai-gateway-guardrails"
                  | "read-write:ai-gateway-private-models"
                  | "read-write:ai-gateway-rules"
                  | "read-write:ai-gateway-virtual-model-configs"
                  | "read-write:alerts"
                  | "read-write:billing"
                  | "read-write:blob"
                  | "read-write:connect"
                  | "read-write:deployment"
                  | "read-write:domain"
                  | "read-write:domain-registrar"
                  | "read-write:drains"
                  | "read-write:edge-cache"
                  | "read-write:edge-config"
                  | "read-write:firewall"
                  | "read-write:integration-configuration"
                  | "read-write:integration-resource"
                  | "read-write:kms"
                  | "read-write:project"
                  | "read-write:project-env-vars"
                  | "read-write:project-env-vars-non-production"
                  | "read-write:project-env-vars-production"
                  | "read-write:project-flags-non-production"
                  | "read-write:project-flags-production"
                  | "read-write:project-protection-bypass"
                  | "read-write:remote-cache"
                  | "read-write:sandbox"
                  | "read-write:team-members"
                  | "read-write:vcr"
                  | "read:access-group"
                  | "read:ai-gateway-guardrails"
                  | "read:ai-gateway-private-models"
                  | "read:ai-gateway-rules"
                  | "read:ai-gateway-virtual-model-configs"
                  | "read:alerts"
                  | "read:billing"
                  | "read:deployment"
                  | "read:domain"
                  | "read:event"
                  | "read:firewall"
                  | "read:integration-configuration"
                  | "read:integration-resource"
                  | "read:kms"
                  | "read:monitoring"
                  | "read:project"
                  | "read:project-env-vars-non-production"
                  | "read:project-env-vars-production"
                  | "read:project-flags"
                  | "read:remote-cache"
                  | "read:sandbox"
                  | "read:speed-insights"
                  | "read:team"
                  | "read:vcr"
                  | "read:web-analytics"
                  | "use:ai-gateway"
                >
              | undefined;
          }
        | { appName: string; appId?: string | undefined; secretLastFourChars?: string | undefined }
        | {
            appName: string;
            appId?: string | undefined;
            app?: { id: string; name: string } | undefined;
            issuedBefore?: number | undefined;
          }
        | {
            projectId: string;
            prevAttackModeEnabled?: boolean | undefined;
            prevAttackModeActiveUntil?: (number | null) | undefined;
            attackModeEnabled: boolean;
            attackModeActiveUntil?: (number | null) | undefined;
          }
        | { projectId?: string | undefined; projectName: string; autoExposeSystemEnvs: boolean }
        | { avatar?: string | undefined }
        | { invoiceId: string; amount: number; refundReason: string; lineItemCount: number }
        | {
            invoiceId: string;
            newInvoiceId: string;
            settlementMethod:
              | "credited-paid"
              | "credited-payment-pending"
              | "refunded-paid"
              | "refunded-payment-pending";
            amount: number;
          }
        | { paymentMethodId: string; brand?: string | undefined; last4?: string | undefined }
        | { subscriptionId?: string | undefined; planSlug: string }
        | {
            subscriptionId?: string | undefined;
            action: "cancel_plan";
            data: { planSlug: "v0_business" | "v0_teams"; reason?: "non-payment" | undefined };
          }
        | {
            subscriptionId?: string | undefined;
            action: "resume_plan";
            data: { planSlug: "v0_business" | "v0_teams" };
          }
        | { subscriptionId?: string | undefined; action: "mutate"; data: Record<string, unknown> }
        | { subscriptionId?: string | undefined; productAliases: Array<string> }
        | {
            project: { id: string; name: string };
            bulkRedirectsLimit: number;
            prevBulkRedirectsLimit: number;
          }
        | { project: { id: string; name: string }; versionId: string }
        | {
            cn?: string | undefined;
            cns?: Array<string> | undefined;
            custom: boolean;
            id?: string | undefined;
          }
        | { id: string; cns: Array<string>; custom: boolean }
        | { cn?: string | undefined; cns?: Array<string> | undefined; id?: string | undefined }
        | {
            id: string;
            oldTeam?: { name: string } | undefined;
            newTeam?: { name: string } | undefined;
          }
        | { src: string; dst: string }
        | { id: string; cn?: string | undefined; cns?: Array<string> | undefined }
        | { cn?: string | undefined; cns?: Array<string> | undefined }
        | {
            gitOwnerName: string;
            gitRepositoryName: string;
            previous: { enabled: boolean; autoAddReviewers: boolean };
            next: { enabled: boolean; autoAddReviewers: boolean };
          }
        | { slug: string; documentId: string; title: string; fingerprint: string }
        | {
            count: number;
            documents: Array<{
              slug: string;
              documentId: string;
              title: string;
              fingerprint: string;
            }>;
          }
        | { configuration: { id: string; name: string } }
        | {
            team: { name: string; id: string };
            configuration: { id: string; name?: string | undefined };
            project: { id: string; name?: string | undefined };
            buildsEnabled?: boolean | undefined;
          }
        | {
            team: { name: string; id: string };
            configuration: { id: string; name?: string | undefined };
            project: { id: string; name?: string | undefined };
            buildsEnabled?: boolean | undefined;
            passive?: boolean | undefined;
          }
        | {
            team: { name: string; id: string };
            configuration: { id: string; name?: string | undefined };
            project: { id: string; name?: string | undefined };
          }
        | {
            team: { name: string; id: string };
            configuration: { id: string; name?: string | undefined };
            newName: string;
          }
        | { githubLogin: string; host?: string | undefined }
        | { githubLogin: string }
        | { githubLogin: string; host: string }
        | {
            gitlabLogin: string;
            gitlabEmail: string;
            gitlabName?: string | undefined;
            zeitAccount?: string | undefined;
            zeitAccountType?: string | undefined;
          }
        | { gitlabLogin: string; gitlabUserId: number }
        | { bitbucketEmail: string; bitbucketLogin: string; bitbucketName?: string | undefined }
        | { bitbucketLogin: string; bitbucketAccountId: string }
        | {
            clientId?: string | undefined;
            clientUid?: string | undefined;
            clientName?: string | undefined;
            projectId?: string | undefined;
            installationId?: string | undefined;
            subjectType?: ("app" | "user") | undefined;
            fields?: Array<string> | undefined;
            environments?: Array<string> | undefined;
            triggerDestinationCount?: number | undefined;
            tokenCount?: number | undefined;
            acceptedTokenCount?: number | undefined;
            importedTokenCount?: number | undefined;
            tokensDeleted?: number | undefined;
          }
        | {
            project: { id: string; name: string };
            purchasedAmount: number;
            prevPurchasedAmount: number;
          }
        | { metricName: string }
        | Record<string, unknown>
        | { reason?: string | undefined; suffix: string }
        | { status: string; suffix: string }
        | { suffix: string }
        | { projectId: string; projectName: string; hookName: string; ref: string }
        | {
            project: { name: string };
            job: {
              deployHook: { createdAt: number; id: string; name: string; ref: string };
              state: string;
            };
          }
        | { projectId: string; projectName: string; checkId: string; checkName: string }
        | {
            name?: string | undefined;
            alias?: Array<string> | undefined;
            target?: (string | null) | undefined;
            deployment?:
              | ({
                  id: string;
                  name: string;
                  url: string;
                  meta: Record<string, string>;
                  readyState?: string | undefined;
                  allowListedReadyStateReasonInternal?:
                    | (
                        | "EARLY_IGNORE_STEP"
                        | "IGNORE_STEP"
                        | "NAMESPACE_PRUNED"
                        | "UNAFFECTED_PROJECT"
                        | "UNVERIFIED_COMMIT"
                      )
                    | undefined;
                } | null)
              | undefined;
            url: string;
            forced?: boolean | undefined;
            gitCredentialSource?: "external-token" | undefined;
            deploymentId?: string | undefined;
            plan?: string | undefined;
            project?: string | undefined;
            projectId?: string | undefined;
            regions?: Array<string> | undefined;
            type?: string | undefined;
          }
        | {
            job:
              | {
                  type: "bitbucket-push";
                  authorized?: boolean | undefined;
                  authorizedBy?: string | undefined;
                  jobProjectIds?: Array<string> | undefined;
                  jobPairs?: Array<Array<string | string>> | undefined;
                  skippedJobPairs?: Array<Array<string | string>> | undefined;
                  gitHashtagVercel?:
                    | Array<
                        | "#VERCEL_BUILD_PRIO_1"
                        | "#VERCEL_BUILD_PRIO_10"
                        | "#VERCEL_BUILD_PRIO_2"
                        | "#VERCEL_BUILD_PRIO_3"
                        | "#VERCEL_BUILD_PRIO_4"
                        | "#VERCEL_BUILD_PRIO_5"
                        | "#VERCEL_BUILD_PRIO_6"
                        | "#VERCEL_BUILD_PRIO_7"
                        | "#VERCEL_BUILD_PRIO_8"
                        | "#VERCEL_BUILD_PRIO_9"
                        | "#VERCEL_SDDJ_AFTER_GET_REPO_FORCE_CANCEL"
                        | "#VERCEL_SDDJ_AFTER_GET_REPO_FORCE_ERROR"
                        | "#VERCEL_SDDJ_AFTER_VERIFY_FORCE_CANCEL"
                        | "#VERCEL_SDDJ_AFTER_VERIFY_FORCE_ERROR"
                        | "#VERCEL_SDDJ_BEFORE_BUILD_JOB_QUEUED_ERROR"
                        | "#VERCEL_SDDJ_FORCE_GIT_FORK_ERROR"
                        | "#VERCEL_SKIP"
                        | "#VERCEL_V0_MESSAGE"
                      >
                    | undefined;
                  connectedProjectCount?: number | undefined;
                  prIdOrZero?: number | undefined;
                  gitComments?: { onPullRequest: boolean; onCommit: boolean } | undefined;
                  isManualGitDeploy?: boolean | undefined;
                  commitVerification?: ("unknown" | "unverified" | "verified") | undefined;
                  nsnbSideEffect?:
                    | {
                        action: "auto-approved-member" | "auto-approved-pending-invite";
                        gitUserLogin: string;
                      }
                    | undefined;
                  createdAt?: number | undefined;
                  deploymentId?: string | undefined;
                  deployHook?:
                    | { createdAt: number; id: string; name: string; ref: string }
                    | undefined;
                  eventful?: boolean | undefined;
                  forceNew?: boolean | undefined;
                  headInfo: {
                    owner: string;
                    ref: string;
                    repoUuid: string;
                    sha: string;
                    slug: string;
                  };
                  linkedProjectId?: string | undefined;
                  name: string;
                  owner: string;
                  prId?: number | undefined;
                  projectId?: string | undefined;
                  customEnvId?: (string | null) | undefined;
                  ref: string;
                  repoPushedAt?: (number | null) | undefined;
                  repoUuid: string;
                  sha: string;
                  silent?: boolean | undefined;
                  slug: string;
                  target?: (string | null) | undefined;
                  url?: string | undefined;
                  withCache?: boolean | undefined;
                  workspaceUuid: string;
                  provider: "bitbucket";
                }
              | {
                  createdAt?: number | undefined;
                  eventful?: boolean | undefined;
                  headInfo: {
                    owner: string;
                    ref: string;
                    repoUuid: string;
                    sha: string;
                    slug: string;
                  };
                  linkedProjectId?: string | undefined;
                  name: string;
                  owner: string;
                  prId: number;
                  projectId?: string | undefined;
                  customEnvId?: (string | null) | undefined;
                  ref: string;
                  repoUuid: string;
                  sha: string;
                  slug: string;
                  type: "bitbucket-now-comment";
                  workspaceUuid: string;
                  gitComments?: { onPullRequest: boolean; onCommit: boolean } | undefined;
                  provider: "bitbucket";
                }
              | {
                  prId: number;
                  type: "pr";
                  authorized?: boolean | undefined;
                  authorizedBy?: string | undefined;
                  jobProjectIds?: Array<string> | undefined;
                  jobPairs?: Array<Array<string | string>> | undefined;
                  skippedJobPairs?: Array<Array<string | string>> | undefined;
                  gitHashtagVercel?:
                    | Array<
                        | "#VERCEL_BUILD_PRIO_1"
                        | "#VERCEL_BUILD_PRIO_10"
                        | "#VERCEL_BUILD_PRIO_2"
                        | "#VERCEL_BUILD_PRIO_3"
                        | "#VERCEL_BUILD_PRIO_4"
                        | "#VERCEL_BUILD_PRIO_5"
                        | "#VERCEL_BUILD_PRIO_6"
                        | "#VERCEL_BUILD_PRIO_7"
                        | "#VERCEL_BUILD_PRIO_8"
                        | "#VERCEL_BUILD_PRIO_9"
                        | "#VERCEL_SDDJ_AFTER_GET_REPO_FORCE_CANCEL"
                        | "#VERCEL_SDDJ_AFTER_GET_REPO_FORCE_ERROR"
                        | "#VERCEL_SDDJ_AFTER_VERIFY_FORCE_CANCEL"
                        | "#VERCEL_SDDJ_AFTER_VERIFY_FORCE_ERROR"
                        | "#VERCEL_SDDJ_BEFORE_BUILD_JOB_QUEUED_ERROR"
                        | "#VERCEL_SDDJ_FORCE_GIT_FORK_ERROR"
                        | "#VERCEL_SKIP"
                        | "#VERCEL_V0_MESSAGE"
                      >
                    | undefined;
                  connectedProjectCount?: number | undefined;
                  prIdOrZero?: number | undefined;
                  gitComments?: { onPullRequest: boolean; onCommit: boolean } | undefined;
                  isManualGitDeploy?: boolean | undefined;
                  commitVerification?: ("unknown" | "unverified" | "verified") | undefined;
                  nsnbSideEffect?:
                    | {
                        action: "auto-approved-member" | "auto-approved-pending-invite";
                        gitUserLogin: string;
                      }
                    | undefined;
                  committerGitUserId?: number | undefined;
                  committerGitUserType?: string | undefined;
                  createdAt?: number | undefined;
                  forceNew?: boolean | undefined;
                  deploymentId?: string | undefined;
                  deployHook?:
                    | { createdAt: number; id: string; name: string; ref: string }
                    | undefined;
                  beforeSha?: string | undefined;
                  defaultBranch?: string | undefined;
                  eventful?: boolean | undefined;
                  githubDeploymentId?: string | undefined;
                  headInfo: { org: string; ref: string; repo: string; repoId: number; sha: string };
                  installationId: number;
                  isPrivate: boolean;
                  linkedProjectId?: string | undefined;
                  org: string;
                  projectId?: string | undefined;
                  customEnvId?: (string | null) | undefined;
                  repo: string;
                  repoId: number;
                  target?: (string | null) | undefined;
                  url?: string | undefined;
                  withCache?: boolean | undefined;
                  provider: "github" | "github-custom-host" | "github-limited";
                  customHost?: string | undefined;
                }
              | {
                  repoPushedAt: number | null;
                  commitInfo?: { total: number; earliestSha?: string | undefined } | undefined;
                  forced?: boolean | undefined;
                  type: "push";
                  authorized?: boolean | undefined;
                  authorizedBy?: string | undefined;
                  jobProjectIds?: Array<string> | undefined;
                  jobPairs?: Array<Array<string | string>> | undefined;
                  skippedJobPairs?: Array<Array<string | string>> | undefined;
                  gitHashtagVercel?:
                    | Array<
                        | "#VERCEL_BUILD_PRIO_1"
                        | "#VERCEL_BUILD_PRIO_10"
                        | "#VERCEL_BUILD_PRIO_2"
                        | "#VERCEL_BUILD_PRIO_3"
                        | "#VERCEL_BUILD_PRIO_4"
                        | "#VERCEL_BUILD_PRIO_5"
                        | "#VERCEL_BUILD_PRIO_6"
                        | "#VERCEL_BUILD_PRIO_7"
                        | "#VERCEL_BUILD_PRIO_8"
                        | "#VERCEL_BUILD_PRIO_9"
                        | "#VERCEL_SDDJ_AFTER_GET_REPO_FORCE_CANCEL"
                        | "#VERCEL_SDDJ_AFTER_GET_REPO_FORCE_ERROR"
                        | "#VERCEL_SDDJ_AFTER_VERIFY_FORCE_CANCEL"
                        | "#VERCEL_SDDJ_AFTER_VERIFY_FORCE_ERROR"
                        | "#VERCEL_SDDJ_BEFORE_BUILD_JOB_QUEUED_ERROR"
                        | "#VERCEL_SDDJ_FORCE_GIT_FORK_ERROR"
                        | "#VERCEL_SKIP"
                        | "#VERCEL_V0_MESSAGE"
                      >
                    | undefined;
                  connectedProjectCount?: number | undefined;
                  prIdOrZero?: number | undefined;
                  gitComments?: { onPullRequest: boolean; onCommit: boolean } | undefined;
                  isManualGitDeploy?: boolean | undefined;
                  commitVerification?: ("unknown" | "unverified" | "verified") | undefined;
                  nsnbSideEffect?:
                    | {
                        action: "auto-approved-member" | "auto-approved-pending-invite";
                        gitUserLogin: string;
                      }
                    | undefined;
                  committerGitUserId?: number | undefined;
                  committerGitUserType?: string | undefined;
                  createdAt?: number | undefined;
                  forceNew?: boolean | undefined;
                  deploymentId?: string | undefined;
                  deployHook?:
                    | { createdAt: number; id: string; name: string; ref: string }
                    | undefined;
                  beforeSha?: string | undefined;
                  defaultBranch?: string | undefined;
                  eventful?: boolean | undefined;
                  githubDeploymentId?: string | undefined;
                  headInfo: { org: string; ref: string; repo: string; repoId: number; sha: string };
                  installationId: number;
                  isPrivate: boolean;
                  linkedProjectId?: string | undefined;
                  org: string;
                  prId: number | null;
                  projectId?: string | undefined;
                  customEnvId?: (string | null) | undefined;
                  repo: string;
                  repoId: number;
                  target?: (string | null) | undefined;
                  url?: string | undefined;
                  withCache?: boolean | undefined;
                  provider: "github" | "github-custom-host" | "github-limited";
                  customHost?: string | undefined;
                }
              | {
                  createdAt?: number | undefined;
                  eventful?: boolean | undefined;
                  headInfo: { org: string; ref: string; repo: string; repoId: number; sha: string };
                  beforeSha?: string | undefined;
                  installationId: number;
                  isPrivate: boolean;
                  linkedProjectId?: string | undefined;
                  org: string;
                  prId: number;
                  projectId: unknown;
                  customEnvId: unknown;
                  repo: string;
                  repoId: number;
                  type: "now-comment";
                  gitComments?: { onPullRequest: boolean; onCommit: boolean } | undefined;
                  provider: "github" | "github-custom-host" | "github-limited";
                  customHost?: string | undefined;
                }
              | {
                  type: "gitlab-push";
                  authorized?: boolean | undefined;
                  authorizedBy?: string | undefined;
                  jobProjectIds?: Array<string> | undefined;
                  jobPairs?: Array<Array<string | string>> | undefined;
                  skippedJobPairs?: Array<Array<string | string>> | undefined;
                  gitHashtagVercel?:
                    | Array<
                        | "#VERCEL_BUILD_PRIO_1"
                        | "#VERCEL_BUILD_PRIO_10"
                        | "#VERCEL_BUILD_PRIO_2"
                        | "#VERCEL_BUILD_PRIO_3"
                        | "#VERCEL_BUILD_PRIO_4"
                        | "#VERCEL_BUILD_PRIO_5"
                        | "#VERCEL_BUILD_PRIO_6"
                        | "#VERCEL_BUILD_PRIO_7"
                        | "#VERCEL_BUILD_PRIO_8"
                        | "#VERCEL_BUILD_PRIO_9"
                        | "#VERCEL_SDDJ_AFTER_GET_REPO_FORCE_CANCEL"
                        | "#VERCEL_SDDJ_AFTER_GET_REPO_FORCE_ERROR"
                        | "#VERCEL_SDDJ_AFTER_VERIFY_FORCE_CANCEL"
                        | "#VERCEL_SDDJ_AFTER_VERIFY_FORCE_ERROR"
                        | "#VERCEL_SDDJ_BEFORE_BUILD_JOB_QUEUED_ERROR"
                        | "#VERCEL_SDDJ_FORCE_GIT_FORK_ERROR"
                        | "#VERCEL_SKIP"
                        | "#VERCEL_V0_MESSAGE"
                      >
                    | undefined;
                  connectedProjectCount?: number | undefined;
                  prIdOrZero?: number | undefined;
                  gitComments?: { onPullRequest: boolean; onCommit: boolean } | undefined;
                  isManualGitDeploy?: boolean | undefined;
                  commitVerification?: ("unknown" | "unverified" | "verified") | undefined;
                  nsnbSideEffect?:
                    | {
                        action: "auto-approved-member" | "auto-approved-pending-invite";
                        gitUserLogin: string;
                      }
                    | undefined;
                  commit?:
                    | {
                        id: string;
                        authorAvatar?: (string | null) | undefined;
                        authorEmail?: (string | null) | undefined;
                        authorId?: (number | null) | undefined;
                        authorLogin?: (string | null) | undefined;
                        authorName?: (string | null) | undefined;
                      }
                    | undefined;
                  createdAt?: number | undefined;
                  deployHook?:
                    | { createdAt: number; id: string; name: string; ref: string }
                    | undefined;
                  deploymentId?: string | undefined;
                  eventful?: boolean | undefined;
                  forceNew?: boolean | undefined;
                  headInfo: {
                    project: {
                      defaultBranch?: (string | null) | undefined;
                      id: string;
                      name?: (string | null) | undefined;
                      namespace?: (string | null) | undefined;
                      path?: (string | null) | undefined;
                      url?: (string | null) | undefined;
                    };
                    ref: string;
                    sha: string;
                  };
                  linkedProjectId?: string | undefined;
                  prId?: number | undefined;
                  project: {
                    defaultBranch?: (string | null) | undefined;
                    id: string;
                    name?: (string | null) | undefined;
                    namespace?: (string | null) | undefined;
                    path?: (string | null) | undefined;
                    url?: (string | null) | undefined;
                  };
                  projectId?: string | undefined;
                  customEnvId?: (string | null) | undefined;
                  ref: string;
                  repoPushedAt?: (number | null) | undefined;
                  sha: string;
                  silent?: boolean | undefined;
                  target?: (string | null) | undefined;
                  url?: string | undefined;
                  withCache?: boolean | undefined;
                  provider: "gitlab";
                }
              | {
                  createdAt?: number | undefined;
                  eventful?: boolean | undefined;
                  headInfo: {
                    project: {
                      defaultBranch?: (string | null) | undefined;
                      id: string;
                      name?: (string | null) | undefined;
                      namespace?: (string | null) | undefined;
                      path?: (string | null) | undefined;
                      url?: (string | null) | undefined;
                    };
                    ref: string;
                    sha: string;
                  };
                  linkedProjectId?: string | undefined;
                  prId: number;
                  project: {
                    defaultBranch?: (string | null) | undefined;
                    id: string;
                    name?: (string | null) | undefined;
                    namespace?: (string | null) | undefined;
                    path?: (string | null) | undefined;
                    url?: (string | null) | undefined;
                  };
                  projectId?: string | undefined;
                  customEnvId?: (string | null) | undefined;
                  ref: string;
                  sha: string;
                  type: "gitlab-now-comment";
                  gitComments?: { onPullRequest: boolean; onCommit: boolean } | undefined;
                  provider: "gitlab";
                }
              | {
                  type: "vercel-push";
                  ref: string;
                  repo: string;
                  sha: string;
                  repoPushedAt?: (number | null) | undefined;
                  deployHook?:
                    | { createdAt: number; id: string; name: string; ref: string }
                    | undefined;
                  url?: string | undefined;
                  target?: (string | null) | undefined;
                  deploymentId?: string | undefined;
                  linkedProjectId?: string | undefined;
                  projectId?: string | undefined;
                  authorized?: boolean | undefined;
                  authorizedBy?: string | undefined;
                  jobProjectIds?: Array<string> | undefined;
                  jobPairs?: Array<Array<string | string>> | undefined;
                  skippedJobPairs?: Array<Array<string | string>> | undefined;
                  gitHashtagVercel?:
                    | Array<
                        | "#VERCEL_BUILD_PRIO_1"
                        | "#VERCEL_BUILD_PRIO_10"
                        | "#VERCEL_BUILD_PRIO_2"
                        | "#VERCEL_BUILD_PRIO_3"
                        | "#VERCEL_BUILD_PRIO_4"
                        | "#VERCEL_BUILD_PRIO_5"
                        | "#VERCEL_BUILD_PRIO_6"
                        | "#VERCEL_BUILD_PRIO_7"
                        | "#VERCEL_BUILD_PRIO_8"
                        | "#VERCEL_BUILD_PRIO_9"
                        | "#VERCEL_SDDJ_AFTER_GET_REPO_FORCE_CANCEL"
                        | "#VERCEL_SDDJ_AFTER_GET_REPO_FORCE_ERROR"
                        | "#VERCEL_SDDJ_AFTER_VERIFY_FORCE_CANCEL"
                        | "#VERCEL_SDDJ_AFTER_VERIFY_FORCE_ERROR"
                        | "#VERCEL_SDDJ_BEFORE_BUILD_JOB_QUEUED_ERROR"
                        | "#VERCEL_SDDJ_FORCE_GIT_FORK_ERROR"
                        | "#VERCEL_SKIP"
                        | "#VERCEL_V0_MESSAGE"
                      >
                    | undefined;
                  connectedProjectCount?: number | undefined;
                  prIdOrZero?: number | undefined;
                  gitComments?: { onPullRequest: boolean; onCommit: boolean } | undefined;
                  isManualGitDeploy?: boolean | undefined;
                  commitVerification?: ("unknown" | "unverified" | "verified") | undefined;
                  nsnbSideEffect?:
                    | {
                        action: "auto-approved-member" | "auto-approved-pending-invite";
                        gitUserLogin: string;
                      }
                    | undefined;
                  headInfo: { org: string; ref: string; repo: string; sha: string };
                  org: string;
                  provider: "vercel";
                  customEnvId?: (string | null) | undefined;
                  prId?: (number | null) | undefined;
                }
              | {
                  type: "cursor-origin-push";
                  ref: string;
                  sha: string;
                  beforeSha?: string | undefined;
                  defaultBranch?: string | undefined;
                  forced?: boolean | undefined;
                  repoPushedAt?: (number | null) | undefined;
                  deployHook?:
                    | { createdAt: number; id: string; name: string; ref: string }
                    | undefined;
                  url?: string | undefined;
                  target?: (string | null) | undefined;
                  deploymentId?: string | undefined;
                  linkedProjectId?: string | undefined;
                  projectId?: string | undefined;
                  createdAt?: number | undefined;
                  eventful?: boolean | undefined;
                  forceNew?: boolean | undefined;
                  authorized?: boolean | undefined;
                  authorizedBy?: string | undefined;
                  jobProjectIds?: Array<string> | undefined;
                  jobPairs?: Array<Array<string | string>> | undefined;
                  skippedJobPairs?: Array<Array<string | string>> | undefined;
                  gitHashtagVercel?:
                    | Array<
                        | "#VERCEL_BUILD_PRIO_1"
                        | "#VERCEL_BUILD_PRIO_10"
                        | "#VERCEL_BUILD_PRIO_2"
                        | "#VERCEL_BUILD_PRIO_3"
                        | "#VERCEL_BUILD_PRIO_4"
                        | "#VERCEL_BUILD_PRIO_5"
                        | "#VERCEL_BUILD_PRIO_6"
                        | "#VERCEL_BUILD_PRIO_7"
                        | "#VERCEL_BUILD_PRIO_8"
                        | "#VERCEL_BUILD_PRIO_9"
                        | "#VERCEL_SDDJ_AFTER_GET_REPO_FORCE_CANCEL"
                        | "#VERCEL_SDDJ_AFTER_GET_REPO_FORCE_ERROR"
                        | "#VERCEL_SDDJ_AFTER_VERIFY_FORCE_CANCEL"
                        | "#VERCEL_SDDJ_AFTER_VERIFY_FORCE_ERROR"
                        | "#VERCEL_SDDJ_BEFORE_BUILD_JOB_QUEUED_ERROR"
                        | "#VERCEL_SDDJ_FORCE_GIT_FORK_ERROR"
                        | "#VERCEL_SKIP"
                        | "#VERCEL_V0_MESSAGE"
                      >
                    | undefined;
                  connectedProjectCount?: number | undefined;
                  prIdOrZero?: number | undefined;
                  gitComments?: { onPullRequest: boolean; onCommit: boolean } | undefined;
                  isManualGitDeploy?: boolean | undefined;
                  commitVerification?: ("unknown" | "unverified" | "verified") | undefined;
                  nsnbSideEffect?:
                    | {
                        action: "auto-approved-member" | "auto-approved-pending-invite";
                        gitUserLogin: string;
                      }
                    | undefined;
                  headInfo: {
                    owner: string;
                    ownerId: string;
                    ref: string;
                    repo: string;
                    repoId: string;
                    sha: string;
                  };
                  installationId: string;
                  owner: string;
                  repo: string;
                  repoId: string;
                  provider: "cursor-origin";
                  customEnvId?: (string | null) | undefined;
                  prId?: (number | null) | undefined;
                }
              | {
                  createdAt?: number | undefined;
                  eventful?: boolean | undefined;
                  headInfo: {
                    owner: string;
                    ownerId: string;
                    ref: string;
                    repo: string;
                    repoId: string;
                    sha: string;
                  };
                  installationId: string;
                  linkedProjectId?: string | undefined;
                  owner: string;
                  prId: number;
                  projectId: unknown;
                  customEnvId: unknown;
                  repo: string;
                  repoId: string;
                  type: "cursor-origin-now-comment";
                  gitComments?: { onPullRequest: boolean; onCommit: boolean } | undefined;
                  provider: "cursor-origin";
                };
          }
        | {
            url: string;
            oldTeam?: { name: string } | undefined;
            newTeam?: { name: string } | undefined;
          }
        | {
            sha: string;
            gitUserPlatform: string;
            projectId?: string | undefined;
            projectName: string;
            gitCommitterName: string;
            source: string;
            reason?: "ip_allow_list" | undefined;
          }
        | {
            deployment: { name: string; id: string; meta: Record<string, string>; url: string };
            deploymentId: string;
            url: string;
          }
        | {
            projectId?: string | undefined;
            projectName: string;
            deploymentId?: string | undefined;
            source: string;
            ruleName: "deploymentSources" | "gitSources";
            ruleProvenance: "default" | "project" | "team";
          }
        | {
            deploymentId: string;
            deploymentUrl: string | null;
            deploymentName: string | null;
            projectId: string;
            projectName: string;
          }
        | {
            integrationId: string;
            configurationId: string;
            integrationSlug: string;
            integrationName: string;
            ownerId: string;
            projectIds?: Array<string> | undefined;
          }
        | {
            id: string;
            value: string;
            name: string;
            domain: string;
            type: string;
            mxPriority?: number | undefined;
          }
        | {
            action: "add" | "delete" | "update";
            initiator: "system" | "user";
            id: string;
            domain: string;
            name: string;
            type: string;
            value: string;
            mxPriority?: number | undefined;
            previousValue?: string | undefined;
            source?: string | undefined;
          }
        | { id: string; value: string; name: string; domain: string; type: string }
        | { name: string; zone?: boolean | undefined }
        | { name: string; price: number; currency?: string | undefined }
        | { name: string; cdnEnabled: boolean }
        | {
            name: string;
            oldTeam?: { name: string } | undefined;
            newTeam?: { name: string } | undefined;
          }
        | { name: string; userId: string; teamId: string; ownerName: string }
        | { domainId: string; name: string }
        | {
            previousServiceType: string;
            serviceType: string;
            id: string;
            name: string;
            nameservers: Array<string>;
          }
        | {
            domain: string;
            customNameservers: Array<string> | null;
            prevCustomNameservers: Array<string> | null;
          }
        | { domain: string }
        | {
            domain: string;
            echMode: "auto" | "disabled" | "enabled";
            previousEchMode: "auto" | "disabled" | "enabled";
          }
        | { domain: string; zone: boolean }
        | {
            domain: string;
            zone: boolean;
            initiator: "system" | "user";
            source?: string | undefined;
            previousZone?: boolean | undefined;
          }
        | { name: string; fromId: string | null; fromName: string | null }
        | { name: string; destinationId: string | null; destinationName: string | null }
        | { name: string; destinationId: string; destinationName: string }
        | { renew?: boolean | undefined; domain: string }
        | { name: string; price?: number | undefined; currency?: string | undefined }
        | { name: string }
        | {
            drainUrl: string | null;
            drainName: string | null;
            integrationName?: string | undefined;
          }
        | { drainUrl: string | null; integrationName?: string | undefined }
        | { projectId: string; projectName: string; srcImages: Array<string> }
        | {
            projectId: string;
            projectName: string;
            tags: Array<string>;
            target?: string | undefined;
          }
        | { projectId: string; projectName: string; path: string }
        | { projectId: string; projectName: string }
        | { edgeConfigId: string; edgeConfigSlug: string; edgeConfigDigest: string }
        | {
            edgeConfigId: string;
            edgeConfigSlug: string;
            edgeConfigDigest: string;
            edgeConfigBackupVersionId: string;
          }
        | {
            edgeConfigId: string;
            edgeConfigSlug: string;
            edgeConfigSchema?: Record<string, never> | undefined;
          }
        | { edgeConfigId: string; edgeConfigSlug: string; edgeConfigDigest?: string | undefined }
        | {
            edgeConfig: { id: string; slug: string };
            fromAccount: {
              id: string;
              type: "team" | "user";
              slug?: string | undefined;
              username?: string | undefined;
            };
            toAccount: {
              id: string;
              type: "team" | "user";
              slug?: string | undefined;
              username?: string | undefined;
            };
          }
        | { edgeConfigId: string; edgeConfigSlug: string; edgeConfigTokenId: string; label: string }
        | { edgeConfigId: string; edgeConfigSlug: string; edgeConfigTokenIds: Array<string> }
        | { email: string; name: string }
        | { team: { id: string; name?: string | undefined }; previousRule: { email: string } }
        | {
            team: { id: string; name?: string | undefined };
            previousRule?: { email: string } | undefined;
            nextRule?: { email: string } | undefined;
          }
        | {
            deletedUser?: { username: string; email: string } | undefined;
            deletedUid?: string | undefined;
            emailDomain?: string | undefined;
          }
        | {
            key?: string | undefined;
            projectId?: string | undefined;
            projectName?: string | undefined;
            target?: (string | Array<string>) | undefined;
            customEnvironmentSlugs?: Array<string> | undefined;
            id?: string | undefined;
            gitBranch?: string | undefined;
            edgeConfigId?: (string | null) | undefined;
            edgeConfigTokenId?: (string | null) | undefined;
            source?: string | undefined;
            ipAddress?: string | undefined;
          }
        | {
            key?: string | undefined;
            projectId?: string | undefined;
            projectName?: string | undefined;
            target?: (string | Array<string>) | undefined;
            customEnvironmentSlugs?: Array<string> | undefined;
            id?: string | undefined;
            gitBranch?: string | undefined;
            edgeConfigId?: (string | null) | undefined;
            edgeConfigTokenId?: (string | null) | undefined;
            source?: string | undefined;
            ipAddress?: string | undefined;
            deploymentId: string;
            deploymentUrl: string;
          }
        | {
            created?: string | undefined;
            key?: string | undefined;
            ownerId?: (string | null) | undefined;
            id?: string | undefined;
            createdBy?: (string | null) | undefined;
            deletedBy?: (string | null) | undefined;
            updatedBy?: (string | null) | undefined;
            createdAt?: number | undefined;
            deletedAt?: number | undefined;
            updatedAt?: number | undefined;
            value?: string | undefined;
            projectId?: Array<string> | undefined;
            type?: ("encrypted" | "plain" | "sensitive" | "system") | undefined;
            target?: Array<"development" | "preview" | "production"> | undefined;
            applyToAllCustomEnvironments?: boolean | undefined;
            customEnvironmentIds?: Array<string> | undefined;
            decrypted?: boolean | undefined;
            comment?: string | undefined;
            lastEditedByDisplayName?: string | undefined;
            projectNames?: Array<string> | undefined;
            ipAddress?: string | undefined;
          }
        | {
            oldEnvVar?:
              | {
                  created?: string | undefined;
                  key?: string | undefined;
                  ownerId?: (string | null) | undefined;
                  id?: string | undefined;
                  createdBy?: (string | null) | undefined;
                  deletedBy?: (string | null) | undefined;
                  updatedBy?: (string | null) | undefined;
                  createdAt?: number | undefined;
                  deletedAt?: number | undefined;
                  updatedAt?: number | undefined;
                  value?: string | undefined;
                  projectId?: Array<string> | undefined;
                  type?: ("encrypted" | "plain" | "sensitive" | "system") | undefined;
                  target?: Array<"development" | "preview" | "production"> | undefined;
                  applyToAllCustomEnvironments?: boolean | undefined;
                  customEnvironmentIds?: Array<string> | undefined;
                  decrypted?: boolean | undefined;
                  comment?: string | undefined;
                  lastEditedByDisplayName?: string | undefined;
                }
              | undefined;
            newEnvVar?:
              | {
                  created?: string | undefined;
                  key?: string | undefined;
                  ownerId?: (string | null) | undefined;
                  id?: string | undefined;
                  createdBy?: (string | null) | undefined;
                  deletedBy?: (string | null) | undefined;
                  updatedBy?: (string | null) | undefined;
                  createdAt?: number | undefined;
                  deletedAt?: number | undefined;
                  updatedAt?: number | undefined;
                  value?: string | undefined;
                  projectId?: Array<string> | undefined;
                  type?: ("encrypted" | "plain" | "sensitive" | "system") | undefined;
                  target?: Array<"development" | "preview" | "production"> | undefined;
                  applyToAllCustomEnvironments?: boolean | undefined;
                  customEnvironmentIds?: Array<string> | undefined;
                  decrypted?: boolean | undefined;
                  comment?: string | undefined;
                  lastEditedByDisplayName?: string | undefined;
                }
              | undefined;
            updateDiff?:
              | {
                  id: string;
                  key?: string | undefined;
                  newKey?: string | undefined;
                  oldTarget?: Array<"development" | "preview" | "production"> | undefined;
                  newTarget?: Array<"development" | "preview" | "production"> | undefined;
                  oldType?: string | undefined;
                  newType?: string | undefined;
                  oldProjects?:
                    | Array<{ projectName?: string | undefined; projectId: string }>
                    | undefined;
                  newProjects?:
                    | Array<{ projectName?: string | undefined; projectId: string }>
                    | undefined;
                  oldCustomEnvironmentIds?: Array<string> | undefined;
                  newCustomEnvironmentIds?: Array<string> | undefined;
                  changedValue: boolean;
                }
              | undefined;
          }
        | {
            projectId: string;
            scope: string;
            source: string;
            expiresAt?: (number | null) | undefined;
          }
        | { projectId: string; scope: string; source: string }
        | { projectId: string; projectName: string; configVersion: string | number }
        | { configVersion: string | number }
        | {
            configVersion: string | number;
            configChangeCount?: number | undefined;
            configChanges?: Array<Record<string, never>> | undefined;
          }
        | {
            projectId: string;
            projectName?: string | undefined;
            restore: boolean;
            configVersion: number;
            configChangeCount: number;
            configChanges: Array<Record<string, never>>;
          }
        | {
            projectId: string;
            rulesetName: string;
            ruleGroups: Record<
              string,
              { active: boolean; action?: ("challenge" | "deny" | "log") | undefined }
            >;
          }
        | {
            projectId: string;
            rulesetName: string;
            active: boolean;
            action?: ("challenge" | "deny" | "log") | undefined;
          }
        | { projectId: string; previousOwnerId: string; newOwnerId: string }
        | { action: "disable" | "enable" }
        | {
            provider: "bitbucket" | "cursor-origin" | "github" | "gitlab";
            actorLogin: string | null;
            actorAccountId: string | null;
            installationId: string | null;
            usedAppToken: boolean;
            sourceRepo: string | null;
            sourceCommitSha: string | null;
            destinationRepo: string;
            destinationBranch: string | null;
            resultCommitSha: string | null;
            outcome: "failure" | "success";
            failureStage?:
              | ("authorization" | "push" | "unexpected" | "unknown" | "validation")
              | undefined;
            failureCode?: string | undefined;
          }
        | {
            projectId: string;
            fromDeploymentId: string;
            toDeploymentId: string;
            projectName: string;
            reason?: string | undefined;
          }
        | {
            integrationId: string;
            configurationId: string;
            integrationSlug: string;
            integrationName: string;
          }
        | {
            userId: string;
            integrationId: string;
            configurationId: string;
            integrationSlug: string;
            integrationName?: string | undefined;
            newOwner: {
              abuse?:
                | {
                    blockHistory?:
                      | Array<{
                          action: "blocked" | "hard-blocked" | "soft-blocked" | "unblocked";
                          createdAt: number;
                          caseId?: string | undefined;
                          reason: string;
                          actor?: string | undefined;
                          statusCode?: number | undefined;
                          comment?: string | undefined;
                          ineligibleForAppeal?: boolean | undefined;
                        }>
                      | undefined;
                    gitAuthHistory?: Array<string> | undefined;
                    history?:
                      | Array<{
                          scanner: string;
                          reason: string;
                          by: string;
                          byId: string;
                          at: number;
                        }>
                      | undefined;
                    gitLineageBlocks?: number | undefined;
                    gitLineageBlocksDry?: number | undefined;
                    scanner?: string | undefined;
                    scheduledUnblockAt?: string | undefined;
                    scheduledBlock?:
                      | {
                          executeAt: number;
                          reason: string;
                          source: string;
                          createdAt: number;
                          caseId?: string | undefined;
                          scheduleName?: string | undefined;
                        }
                      | undefined;
                    updatedAt: number;
                    creationUserAgent?: string | undefined;
                    creationIp?: string | undefined;
                    removedPhoneNumbers?: string | undefined;
                  }
                | undefined;
              acceptanceState?: string | undefined;
              acceptedAt?: number | undefined;
              avatar?: string | undefined;
              billing: { plan: "enterprise" | "hobby" | "pro" };
              blocked: number | null;
              blockReason?: string | undefined;
              created?: number | undefined;
              createdAt: number;
              credentials?:
                | Array<
                    | {
                        type:
                          | "apple"
                          | "bitbucket"
                          | "chatgpt"
                          | "github-oauth"
                          | "github-oauth-limited"
                          | "gitlab"
                          | "google"
                          | "vercel";
                        id: string;
                      }
                    | { type: "github-oauth-custom-host"; host: string; id: string }
                  >
                | undefined;
              customerId?: (string | null) | undefined;
              orbCustomerId?: (string | null) | undefined;
              dataCache?: { excessBillingEnabled?: boolean | undefined } | undefined;
              deletedAt?: (number | null) | undefined;
              deploymentSecret: string;
              dismissedTeams?: Array<string> | undefined;
              dismissedToasts?:
                | Array<{ name: string; dismissals: Array<{ scopeId: string; createdAt: number }> }>
                | undefined;
              favoriteProjectsAndSpaces?: Array<{ teamId: string; projectId: string }> | undefined;
              email: string;
              id: string;
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
              isDomainReseller?: boolean | undefined;
              isZeitPub?: boolean | undefined;
              testAccountExpiresAt?: number | undefined;
              maxActiveSlots?: number | undefined;
              name?: string | undefined;
              phoneNumber?: string | undefined;
              platformVersion: number | null;
              preventAutoBlocking?: (number | boolean) | undefined;
              projectDomainsLimit?: number | undefined;
              projectCardWidgetPreferences?:
                | Array<{
                    projectId: string;
                    widget:
                      | "analytics-online"
                      | "analytics-page-views"
                      | "analytics-visitors"
                      | "firewall-allowed"
                      | "firewall-denied"
                      | "observability-alert"
                      | "observability-edge-requests"
                      | "observability-error-rate"
                      | "observability-function-invocations"
                      | "speed-insights-cls"
                      | "speed-insights-lcp"
                      | "speed-insights-res";
                  }>
                | undefined;
              remoteCaching?: { enabled?: boolean | undefined } | undefined;
              removedAliasesAt?: number | undefined;
              removedBillingSubscriptionAt?: number | undefined;
              removedConfigurationsAt?: number | undefined;
              removedDeploymentsAt?: number | undefined;
              removedDomiansAt?: number | undefined;
              removedEventsAt?: number | undefined;
              removedProjectsAt?: number | undefined;
              removedSecretsAt?: number | undefined;
              removedSharedEnvVarsAt?: number | undefined;
              removedEdgeConfigsAt?: number | undefined;
              resourceConfig?:
                | {
                    concurrentBuilds?: number | undefined;
                    nodeType?: string | undefined;
                    elasticConcurrencyEnabled?: boolean | undefined;
                    buildEntitlements?: { enhancedBuilds?: boolean | undefined } | undefined;
                    buildQueue?:
                      | {
                          configuration?:
                            | ("SKIP_NAMESPACE_QUEUE" | "WAIT_FOR_NAMESPACE_QUEUE")
                            | undefined;
                        }
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
                    buildMachine?:
                      | {
                          default?:
                            | ("basic" | "elastic" | "enhanced" | "standard" | "turbo")
                            | undefined;
                        }
                      | undefined;
                  }
                | undefined;
              resourceLimits?:
                | Record<
                    string,
                    | { max: number; duration: number }
                    | {
                        minRate?: number | undefined;
                        maxRate?: number | undefined;
                        stepPerMinute?: number | undefined;
                      }
                  >
                | undefined;
              activeDashboardViews?:
                | Array<{
                    scopeId: string;
                    viewPreference?: ("cards" | "list" | "null" | null) | undefined;
                    favoritesViewPreference?: ("closed" | "open" | "null" | null) | undefined;
                    recentsViewPreference?: ("closed" | "open" | "null" | null) | undefined;
                  }>
                | undefined;
              secondaryEmails?: Array<{ email: string; verified: boolean }> | undefined;
              emailDomains?: Array<string> | undefined;
              emailNotifications?:
                | { rules?: Record<string, { email: string }> | undefined }
                | undefined;
              siftScore?: number | undefined;
              siftScores?:
                | Record<string, { score: number; reasons: Array<{ name: string; value: string }> }>
                | undefined;
              siftRoute?: { name: "string" } | undefined;
              sfdcId?: string | undefined;
              softBlock?:
                | ({
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
                  } | null)
                | undefined;
              stagingPrefix: string;
              sysToken: string;
              teams?:
                | Array<{
                    teamId: string;
                    createdAt: number;
                    role:
                      | "BILLING"
                      | "CONTRIBUTOR"
                      | "DEVELOPER"
                      | "MEMBER"
                      | "OWNER"
                      | "SECURITY"
                      | "VIEWER"
                      | "VIEWER_FOR_PLUS";
                    confirmed: true;
                    confirmedAt: number;
                    accessRequestedAt?: number | undefined;
                    teamRoles?:
                      | Array<
                          | "BILLING"
                          | "CONTRIBUTOR"
                          | "DEVELOPER"
                          | "MEMBER"
                          | "OWNER"
                          | "SECURITY"
                          | "VIEWER"
                          | "VIEWER_FOR_PLUS"
                        >
                      | undefined;
                    teamPermissions?:
                      | Array<
                          | "AiGatewayApiKeyOwnedBySelf"
                          | "AiGatewayBudgetManager"
                          | "AiGatewayCredits"
                          | "AiGatewaySettings"
                          | "ConnectorManager"
                          | "CreateProject"
                          | "EnvVariableManager"
                          | "EnvironmentManager"
                          | "FullProductionDeployment"
                          | "IntegrationManager"
                          | "OrgAdmin"
                          | "OrgViewer"
                          | "UsageViewer"
                          | "V0Builder"
                          | "V0Chatter"
                          | "V0Viewer"
                          | "WorkflowDecryptor"
                        >
                      | undefined;
                    created: number;
                    joinedFrom?:
                      | {
                          origin:
                            | "account-update"
                            | "bitbucket"
                            | "dsync"
                            | "feedback"
                            | "github"
                            | "gitlab"
                            | "import"
                            | "link"
                            | "mail"
                            | "nsnb-auto-approve"
                            | "nsnb-hobby-upgrade"
                            | "nsnb-invite"
                            | "nsnb-redeploy"
                            | "nsnb-redeploy-attribution-card"
                            | "nsnb-request-access"
                            | "nsnb-viewer-upgrade"
                            | "organization-teams"
                            | "saml"
                            | "teams";
                          commitId?: string | undefined;
                          repoId?: string | undefined;
                          repoPath?: string | undefined;
                          gitUserId?: (string | number) | undefined;
                          gitUserLogin?: string | undefined;
                          ssoUserId?: string | undefined;
                          ssoConnectedAt?: number | undefined;
                          idpUserId?: string | undefined;
                          dsyncUserId?: string | undefined;
                          dsyncConnectedAt?: number | undefined;
                        }
                      | undefined;
                  }>
                | undefined;
              trialTeamIds?: Array<string> | undefined;
              maxTrials?: number | undefined;
              trialTeamId?: string | undefined;
              type: "user";
              usageAlerts?:
                | ({
                    warningAt?: (number | null) | undefined;
                    blockingAt?: (number | null) | undefined;
                  } | null)
                | undefined;
              overageUsageAlerts?:
                | {
                    analyticsUsage?:
                      | {
                          currentThreshold: number;
                          warningAt?: (number | null) | undefined;
                          blockedAt?: (number | null) | undefined;
                        }
                      | undefined;
                    artifacts?:
                      | {
                          currentThreshold: number;
                          warningAt?: (number | null) | undefined;
                          blockedAt?: (number | null) | undefined;
                        }
                      | undefined;
                    bandwidth?:
                      | {
                          currentThreshold: number;
                          warningAt?: (number | null) | undefined;
                          blockedAt?: (number | null) | undefined;
                        }
                      | undefined;
                    blobTotalAdvancedRequests?:
                      | {
                          currentThreshold: number;
                          warningAt?: (number | null) | undefined;
                          blockedAt?: (number | null) | undefined;
                        }
                      | undefined;
                    blobTotalAvgSizeInBytes?:
                      | {
                          currentThreshold: number;
                          warningAt?: (number | null) | undefined;
                          blockedAt?: (number | null) | undefined;
                        }
                      | undefined;
                    blobTotalGetResponseObjectSizeInBytes?:
                      | {
                          currentThreshold: number;
                          warningAt?: (number | null) | undefined;
                          blockedAt?: (number | null) | undefined;
                        }
                      | undefined;
                    blobTotalSimpleRequests?:
                      | {
                          currentThreshold: number;
                          warningAt?: (number | null) | undefined;
                          blockedAt?: (number | null) | undefined;
                        }
                      | undefined;
                    connectDataTransfer?:
                      | {
                          currentThreshold: number;
                          warningAt?: (number | null) | undefined;
                          blockedAt?: (number | null) | undefined;
                        }
                      | undefined;
                    dataCacheRead?:
                      | {
                          currentThreshold: number;
                          warningAt?: (number | null) | undefined;
                          blockedAt?: (number | null) | undefined;
                        }
                      | undefined;
                    dataCacheWrite?:
                      | {
                          currentThreshold: number;
                          warningAt?: (number | null) | undefined;
                          blockedAt?: (number | null) | undefined;
                        }
                      | undefined;
                    edgeConfigRead?:
                      | {
                          currentThreshold: number;
                          warningAt?: (number | null) | undefined;
                          blockedAt?: (number | null) | undefined;
                        }
                      | undefined;
                    edgeConfigWrite?:
                      | {
                          currentThreshold: number;
                          warningAt?: (number | null) | undefined;
                          blockedAt?: (number | null) | undefined;
                        }
                      | undefined;
                    edgeFunctionExecutionUnits?:
                      | {
                          currentThreshold: number;
                          warningAt?: (number | null) | undefined;
                          blockedAt?: (number | null) | undefined;
                        }
                      | undefined;
                    edgeMiddlewareInvocations?:
                      | {
                          currentThreshold: number;
                          warningAt?: (number | null) | undefined;
                          blockedAt?: (number | null) | undefined;
                        }
                      | undefined;
                    edgeRequestAdditionalCpuDuration?:
                      | {
                          currentThreshold: number;
                          warningAt?: (number | null) | undefined;
                          blockedAt?: (number | null) | undefined;
                        }
                      | undefined;
                    edgeRequest?:
                      | {
                          currentThreshold: number;
                          warningAt?: (number | null) | undefined;
                          blockedAt?: (number | null) | undefined;
                        }
                      | undefined;
                    elasticConcurrencyBuildSlots?:
                      | {
                          currentThreshold: number;
                          warningAt?: (number | null) | undefined;
                          blockedAt?: (number | null) | undefined;
                        }
                      | undefined;
                    fastDataTransfer?:
                      | {
                          currentThreshold: number;
                          warningAt?: (number | null) | undefined;
                          blockedAt?: (number | null) | undefined;
                        }
                      | undefined;
                    fastOriginTransfer?:
                      | {
                          currentThreshold: number;
                          warningAt?: (number | null) | undefined;
                          blockedAt?: (number | null) | undefined;
                        }
                      | undefined;
                    fluidCpuDuration?:
                      | {
                          currentThreshold: number;
                          warningAt?: (number | null) | undefined;
                          blockedAt?: (number | null) | undefined;
                        }
                      | undefined;
                    fluidDuration?:
                      | {
                          currentThreshold: number;
                          warningAt?: (number | null) | undefined;
                          blockedAt?: (number | null) | undefined;
                        }
                      | undefined;
                    functionDuration?:
                      | {
                          currentThreshold: number;
                          warningAt?: (number | null) | undefined;
                          blockedAt?: (number | null) | undefined;
                        }
                      | undefined;
                    functionInvocation?:
                      | {
                          currentThreshold: number;
                          warningAt?: (number | null) | undefined;
                          blockedAt?: (number | null) | undefined;
                        }
                      | undefined;
                    imageOptimizationCacheRead?:
                      | {
                          currentThreshold: number;
                          warningAt?: (number | null) | undefined;
                          blockedAt?: (number | null) | undefined;
                        }
                      | undefined;
                    imageOptimizationCacheWrite?:
                      | {
                          currentThreshold: number;
                          warningAt?: (number | null) | undefined;
                          blockedAt?: (number | null) | undefined;
                        }
                      | undefined;
                    imageOptimizationTransformation?:
                      | {
                          currentThreshold: number;
                          warningAt?: (number | null) | undefined;
                          blockedAt?: (number | null) | undefined;
                        }
                      | undefined;
                    logDrainsVolume?:
                      | {
                          currentThreshold: number;
                          warningAt?: (number | null) | undefined;
                          blockedAt?: (number | null) | undefined;
                        }
                      | undefined;
                    monitoringMetric?:
                      | {
                          currentThreshold: number;
                          warningAt?: (number | null) | undefined;
                          blockedAt?: (number | null) | undefined;
                        }
                      | undefined;
                    blobDataTransfer?:
                      | {
                          currentThreshold: number;
                          warningAt?: (number | null) | undefined;
                          blockedAt?: (number | null) | undefined;
                        }
                      | undefined;
                    observabilityEvent?:
                      | {
                          currentThreshold: number;
                          warningAt?: (number | null) | undefined;
                          blockedAt?: (number | null) | undefined;
                        }
                      | undefined;
                    onDemandConcurrencyMinutes?:
                      | {
                          currentThreshold: number;
                          warningAt?: (number | null) | undefined;
                          blockedAt?: (number | null) | undefined;
                        }
                      | undefined;
                    runtimeCacheRead?:
                      | {
                          currentThreshold: number;
                          warningAt?: (number | null) | undefined;
                          blockedAt?: (number | null) | undefined;
                        }
                      | undefined;
                    runtimeCacheWrite?:
                      | {
                          currentThreshold: number;
                          warningAt?: (number | null) | undefined;
                          blockedAt?: (number | null) | undefined;
                        }
                      | undefined;
                    serverlessFunctionExecution?:
                      | {
                          currentThreshold: number;
                          warningAt?: (number | null) | undefined;
                          blockedAt?: (number | null) | undefined;
                        }
                      | undefined;
                    sourceImages?:
                      | {
                          currentThreshold: number;
                          warningAt?: (number | null) | undefined;
                          blockedAt?: (number | null) | undefined;
                        }
                      | undefined;
                    wafOwaspExcessBytes?:
                      | {
                          currentThreshold: number;
                          warningAt?: (number | null) | undefined;
                          blockedAt?: (number | null) | undefined;
                        }
                      | undefined;
                    wafOwaspRequests?:
                      | {
                          currentThreshold: number;
                          warningAt?: (number | null) | undefined;
                          blockedAt?: (number | null) | undefined;
                        }
                      | undefined;
                    wafRateLimitRequest?:
                      | {
                          currentThreshold: number;
                          warningAt?: (number | null) | undefined;
                          blockedAt?: (number | null) | undefined;
                        }
                      | undefined;
                    webAnalyticsEvent?:
                      | {
                          currentThreshold: number;
                          warningAt?: (number | null) | undefined;
                          blockedAt?: (number | null) | undefined;
                        }
                      | undefined;
                  }
                | undefined;
              overageMetadata?:
                | {
                    firstTimeOnDemandNotificationSentAt?: number | undefined;
                    dailyOverageSummaryEmailSentAt?: number | undefined;
                    weeklyOverageSummaryEmailSentAt?: number | undefined;
                    overageSummaryExpiresAt?: number | undefined;
                    increasedOnDemandEmailSentAt?: number | undefined;
                    increasedOnDemandEmailAttemptedAt?: number | undefined;
                    hobbyPolicyNoticeSlackSentAt?: number | undefined;
                    hobbyWarningV2SlackSentAt?: number | undefined;
                    hobbyWarningV2At100SlackSentAt?: number | undefined;
                    hobbyPauseNoticeSlackSentAt?: number | undefined;
                    hobbyPolicySlackThreadTs?: string | undefined;
                  }
                | undefined;
              speedInsightsFreeUsageAlert?:
                | { currentThreshold: number; notifiedAt: number }
                | undefined;
              username: string;
              updatedAt: number;
              enablePreviewFeedback?:
                | ("default" | "default-force" | "off" | "off-force" | "on" | "on-force")
                | undefined;
              featureBlocks?:
                | {
                    webAnalytics?:
                      | {
                          updatedAt: number;
                          blockedFrom?: number | undefined;
                          blockedUntil?: number | undefined;
                          blockReason: "admin_override" | "hard_blocked" | "limits_exceeded";
                          graceEmailSentAt?: number | undefined;
                        }
                      | undefined;
                    monitoring?:
                      | {
                          updatedAt: number;
                          blockedFrom?: number | undefined;
                          blockedUntil?: number | undefined;
                          blockReason: "admin_override" | "hard_blocked" | "limits_exceeded";
                          blockType: "hard" | "soft";
                        }
                      | undefined;
                    observabilityPlus?:
                      | {
                          updatedAt: number;
                          blockedFrom?: number | undefined;
                          blockedUntil?: number | undefined;
                          blockReason: "admin_override" | "hard_blocked" | "limits_exceeded";
                          blockType: "hard" | "soft";
                        }
                      | undefined;
                    dataCache?:
                      | {
                          updatedAt: number;
                          blockedFrom?: number | undefined;
                          blockedUntil?: number | undefined;
                          blockReason: "admin_override" | "hard_blocked" | "limits_exceeded";
                        }
                      | undefined;
                    imageOptimizationTransformation?:
                      | {
                          updatedAt: number;
                          blockedFrom?: number | undefined;
                          blockedUntil?: number | undefined;
                          blockReason: "admin_override" | "hard_blocked" | "limits_exceeded";
                        }
                      | undefined;
                    sourceImages?:
                      | {
                          updatedAt: number;
                          blockedFrom?: number | undefined;
                          blockedUntil?: number | undefined;
                          blockReason: "admin_override" | "hard_blocked" | "limits_exceeded";
                        }
                      | undefined;
                    blob?:
                      | (
                          | {
                              updatedAt: number;
                              blockedFrom?: number | undefined;
                              blockedUntil?: number | undefined;
                              blockReason: "limits_exceeded";
                              overageReason:
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
                            }
                          | {
                              updatedAt: number;
                              blockedFrom?: number | undefined;
                              blockedUntil?: number | undefined;
                              blockReason: "admin_override" | "hard_blocked";
                            }
                        )
                      | undefined;
                    postgres?:
                      | (
                          | {
                              updatedAt: number;
                              blockedFrom?: number | undefined;
                              blockedUntil?: number | undefined;
                              blockReason: "limits_exceeded";
                              overageReason:
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
                            }
                          | {
                              updatedAt: number;
                              blockedFrom?: number | undefined;
                              blockedUntil?: number | undefined;
                              blockReason: "admin_override" | "hard_blocked";
                            }
                        )
                      | undefined;
                    redis?:
                      | (
                          | {
                              updatedAt: number;
                              blockedFrom?: number | undefined;
                              blockedUntil?: number | undefined;
                              blockReason: "limits_exceeded";
                              overageReason:
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
                            }
                          | {
                              updatedAt: number;
                              blockedFrom?: number | undefined;
                              blockedUntil?: number | undefined;
                              blockReason: "admin_override" | "hard_blocked";
                            }
                        )
                      | undefined;
                    microfrontendsRequest?:
                      | {
                          updatedAt: number;
                          blockedFrom?: number | undefined;
                          blockedUntil?: number | undefined;
                          blockReason: "admin_override" | "hard_blocked" | "limits_exceeded";
                        }
                      | undefined;
                    workflowStorageWrite?:
                      | {
                          updatedAt: number;
                          blockedFrom?: number | undefined;
                          blockedUntil?: number | undefined;
                          blockReason: "admin_override" | "hard_blocked" | "limits_exceeded";
                        }
                      | undefined;
                    workflowEvents?:
                      | {
                          updatedAt: number;
                          blockedFrom?: number | undefined;
                          blockedUntil?: number | undefined;
                          blockReason: "admin_override" | "hard_blocked" | "limits_exceeded";
                        }
                      | undefined;
                    connexForwardTriggers?:
                      | {
                          updatedAt: number;
                          blockedFrom?: number | undefined;
                          blockedUntil?: number | undefined;
                          blockReason: "admin_override" | "hard_blocked" | "limits_exceeded";
                        }
                      | undefined;
                    connexTokenRequests?:
                      | {
                          updatedAt: number;
                          blockedFrom?: number | undefined;
                          blockedUntil?: number | undefined;
                          blockReason: "admin_override" | "hard_blocked" | "limits_exceeded";
                        }
                      | undefined;
                    kmsOperations?:
                      | {
                          updatedAt: number;
                          blockedFrom?: number | undefined;
                          blockedUntil?: number | undefined;
                          blockReason: "admin_override" | "hard_blocked" | "limits_exceeded";
                        }
                      | undefined;
                    tracing?:
                      | {
                          updatedAt: number;
                          blockedFrom?: number | undefined;
                          blockedUntil?: number | undefined;
                          blockReason: "admin_override" | "hard_blocked" | "limits_exceeded";
                        }
                      | undefined;
                    vcr?:
                      | {
                          updatedAt: number;
                          blockedFrom?: number | undefined;
                          blockedUntil?: number | undefined;
                          blockReason: "admin_override" | "hard_blocked" | "limits_exceeded";
                        }
                      | undefined;
                    speedInsightsFree?:
                      | {
                          updatedAt: number;
                          blockedFrom?: number | undefined;
                          blockedUntil?: number | undefined;
                          blockReason: "admin_override" | "hard_blocked" | "limits_exceeded";
                        }
                      | undefined;
                  }
                | undefined;
              defaultTeamId?: string | undefined;
              version: "northstar";
              isMFAEnforced?: boolean | undefined;
              northstarMigration?:
                | {
                    teamId: string;
                    projects: number;
                    stores: number;
                    integrationConfigurations: number;
                    integrationClients: number;
                    startTime: number;
                    endTime: number;
                  }
                | undefined;
              opportunityId?: string | undefined;
              mfaConfiguration?:
                | {
                    enabled: boolean;
                    enabledAt?: number | undefined;
                    recoveryCodes: Array<string>;
                    totp?: { secret: string; createdAt: number } | undefined;
                    history?:
                      | Array<{
                          action: "disabled" | "enabled";
                          timestamp: number | null;
                          method:
                            | "admin_removal"
                            | "passkey"
                            | "self_serve_recovery"
                            | "totp"
                            | "unknown"
                            | "user_disabled";
                          actorId: string;
                          actorType: "admin" | "user";
                          reason?: string | undefined;
                        }>
                      | undefined;
                  }
                | undefined;
              isEnterpriseManaged?: boolean | undefined;
            } | null;
          }
        | {
            integrationId: string;
            configurationId: string;
            integrationSlug: string;
            integrationName: string;
            ownerId: string;
            projectIds?: Array<string> | undefined;
            confirmedScopes: Array<string>;
          }
        | {
            integration: { id: string; slug: string; name: string; configurationId: string };
            destinationTeamId: string;
            destinationTeamName: string;
          }
        | {
            integration: { id: string; slug: string; name: string; configurationId: string };
            originTeamId: string;
            originTeamName: string;
          }
        | {
            configurations: Array<{
              integrationId: string;
              configurationId: string;
              integrationSlug: string;
              integrationName?: string | undefined;
            }>;
            ownerId: string;
          }
        | {
            integrationId: string;
            configurationId: string;
            integrationSlug: string;
            integrationName: string;
            ownerId: string;
            billingPlanId: string;
            billingPlanName?: string | undefined;
          }
        | {
            integrationId: string;
            configurationId: string;
            integrationSlug: string;
            integrationName: string;
            ownerId: string;
            projectIds?: (Array<string> | "all") | undefined;
          }
        | {
            resourceId: string;
            integrationId: string;
            integrationSlug: string;
            integrationProductSlug: string;
            configurationId: string;
            databaseName: string;
            queryType: "data-edit" | "data-view" | "schema" | "user";
            readonly: boolean;
            rolledBack: boolean;
            failedQueryIndex: number | null;
            errorCode: string | null;
            queryCount: number;
            queries: Array<{
              command: string | null;
              rowCount?: number | undefined;
              tables?: Array<string> | undefined;
              primaryKey?: Array<{ column: string; value: string | null }> | undefined;
            }>;
          }
        | {
            resourceId: string;
            integrationId: string;
            integrationSlug: string;
            integrationProductSlug: string;
            configurationId: string;
            error?: string | undefined;
            requestKind: "raw_commands";
            readonly: boolean;
            commands: Array<string>;
            failedIndex?: number | undefined;
          }
        | {
            resourceId: string;
            integrationId: string;
            integrationSlug: string;
            integrationProductSlug: string;
            configurationId: string;
            error?: string | undefined;
            requestKind: "list_keys";
            pattern?: string | undefined;
            type?: string | undefined;
          }
        | {
            resourceId: string;
            integrationId: string;
            integrationSlug: string;
            integrationProductSlug: string;
            configurationId: string;
            error?: string | undefined;
            requestKind: "get_keys_metadata";
            keys: Array<string>;
          }
        | {
            resourceId: string;
            integrationId: string;
            integrationSlug: string;
            integrationProductSlug: string;
            configurationId: string;
            error?: string | undefined;
            requestKind: "get_key_data";
            key: string;
          }
        | { integrationId: string; integrationSlug: string; integrationName: string }
        | {
            issuerId: string;
            issuerName: string;
            algorithm: string;
            origin: string;
            managedBy?: string | undefined;
          }
        | { issuerId: string; issuerName: string; managedBy?: string | undefined }
        | { issuerId: string; issuerName: string; keyId?: string | undefined }
        | {
            issuerId: string;
            issuerName: string;
            kind: string;
            projectId?: string | undefined;
            clientId?: string | undefined;
            environments?: Array<string> | undefined;
          }
        | { issuerId: string; issuerName: string; kind: string; policyKey: string }
        | { logDrainUrl: string | null; integrationName?: string | undefined }
        | { logDrainUrl: string; integrationName?: string | undefined }
        | {
            provider:
              | "apple"
              | "bitbucket"
              | "chatgpt"
              | "github"
              | "github-custom-host"
              | "github-limited"
              | "gitlab"
              | "google"
              | "saml";
            login: string;
          }
        | {
            provider:
              | "apple"
              | "bitbucket"
              | "chatgpt"
              | "github"
              | "github-custom-host"
              | "github-limited"
              | "gitlab"
              | "google"
              | "saml";
          }
        | {
            userAgent?: string | undefined;
            geolocation?:
              | ({
                  city?: { names: { en: string } } | undefined;
                  country: { names: { en: string } };
                  most_specific_subdivision?: { names: { en: string } } | undefined;
                  regionName?: string | undefined;
                } | null)
              | undefined;
            env?: string | undefined;
            os?: string | undefined;
            loginSessionId?: string | undefined;
            username?: string | undefined;
            ssoType?: string | undefined;
            factors?:
              | (
                  | Array<{
                      origin:
                        | "apple"
                        | "bitbucket"
                        | "chatgpt"
                        | "email"
                        | "emu-recovery"
                        | "github"
                        | "gitlab"
                        | "google"
                        | "invite"
                        | "magic-link"
                        | "otp"
                        | "otp-link"
                        | "saml"
                        | "webauthn";
                      username?: string | undefined;
                      teamId?: string | undefined;
                      legacy?: boolean | undefined;
                      ssoType?: string | undefined;
                    }>
                  | Array<
                      | {
                          origin:
                            | "apple"
                            | "bitbucket"
                            | "chatgpt"
                            | "email"
                            | "emu-recovery"
                            | "github"
                            | "gitlab"
                            | "google"
                            | "invite"
                            | "magic-link"
                            | "otp"
                            | "otp-link"
                            | "saml"
                            | "webauthn";
                          username?: string | undefined;
                          teamId?: string | undefined;
                          legacy?: boolean | undefined;
                          ssoType?: string | undefined;
                        }
                      | { origin: "recovery-code" | "totp" | "webauthn" }
                    >
                )
              | undefined;
            viaOTP?: boolean | undefined;
            viaGithub?: boolean | undefined;
            viaGitlab?: boolean | undefined;
            viaBitbucket?: boolean | undefined;
            viaGoogle?: boolean | undefined;
            viaApple?: boolean | undefined;
            viaSamlSso?: boolean | undefined;
            viaPasskey?: boolean | undefined;
          }
        | { projectId: string; toDeploymentId: string; projectName: string }
        | {
            periods: Array<{
              periodNumber: number;
              percent: string;
              startDate: string;
              endDate: string;
            }>;
          }
        | {
            enabled: boolean;
            allowedIntegrationCount?: number | undefined;
            allowedIntegrationIds?: Array<string> | undefined;
          }
        | { id: string; slug: string; name: string }
        | {
            id: string;
            slug?: string | undefined;
            name?: string | undefined;
            fallbackEnvironment?: string | undefined;
            enablePolyrepoBranchRouting?: boolean | undefined;
            prev: {
              name: string;
              slug: string;
              fallbackEnvironment: string;
              enablePolyrepoBranchRouting?: boolean | undefined;
            };
          }
        | {
            project: { id: string; name: string };
            group: { id: string; slug: string; name: string };
          }
        | {
            project: {
              id: string;
              name: string;
              microfrontends?:
                | (
                    | {
                        isDefaultApp: true;
                        updatedAt: number;
                        groupIds: Array<string>;
                        enabled: true;
                        defaultRoute?: string | undefined;
                        freeProjectForLegacyLimits?: boolean | undefined;
                      }
                    | {
                        isDefaultApp?: false | undefined;
                        routeObservabilityToThisProject?: boolean | undefined;
                        doNotRouteWithMicrofrontendsRouting?: boolean | undefined;
                        updatedAt: number;
                        groupIds: Array<string>;
                        enabled: true;
                        defaultRoute?: string | undefined;
                        freeProjectForLegacyLimits?: boolean | undefined;
                      }
                    | {
                        updatedAt: number;
                        groupIds: Array<unknown>;
                        enabled: false;
                        freeProjectForLegacyLimits?: boolean | undefined;
                      }
                  )
                | undefined;
            };
            prev: {
              project: {
                microfrontends?:
                  | (
                      | {
                          isDefaultApp: true;
                          updatedAt: number;
                          groupIds: Array<string>;
                          enabled: true;
                          defaultRoute?: string | undefined;
                          freeProjectForLegacyLimits?: boolean | undefined;
                        }
                      | {
                          isDefaultApp?: false | undefined;
                          routeObservabilityToThisProject?: boolean | undefined;
                          doNotRouteWithMicrofrontendsRouting?: boolean | undefined;
                          updatedAt: number;
                          groupIds: Array<string>;
                          enabled: true;
                          defaultRoute?: string | undefined;
                          freeProjectForLegacyLimits?: boolean | undefined;
                        }
                      | {
                          updatedAt: number;
                          groupIds: Array<unknown>;
                          enabled: false;
                          freeProjectForLegacyLimits?: boolean | undefined;
                        }
                    )
                  | undefined;
              };
            };
            group: { id: string; slug: string; name: string };
          }
        | { alertId: string; alertName: string }
        | { projectId?: string | undefined; projectName: string }
        | { organizationId: string; rootTeamId: string; slug: string; name: string }
        | {
            directoryGroupId: string;
            directoryId: string;
            groupName: string;
            next: {
              default?:
                | (
                    | "BILLING"
                    | "CONTRIBUTOR"
                    | "DEVELOPER"
                    | "MEMBER"
                    | "OWNER"
                    | "SECURITY"
                    | "VIEWER"
                    | "VIEWER_FOR_PLUS"
                  )
                | undefined;
              roles: Record<
                string,
                | "BILLING"
                | "CONTRIBUTOR"
                | "DEVELOPER"
                | "MEMBER"
                | "OWNER"
                | "SECURITY"
                | "VIEWER"
                | "VIEWER_FOR_PLUS"
              >;
            };
            organizationId: string;
          }
        | { directoryGroupId: string; directoryId: string; organizationId: string }
        | { organizationId: string; slug: string }
        | { organizationId: string; teamId: string; billingPlan: "enterprise" | "platform" }
        | {
            ownerId: string;
            source: string;
            cause: string;
            blockReason?: string | undefined;
            siftRoute?: { name: string } | undefined;
          }
        | { ownerId: string; source: string; cause: string; reason?: (string | null) | undefined }
        | { ownerId: string; source: string; cause: string; blockReason?: string | undefined }
        | { ownerId: string; source: string; cause: string }
        | {
            projectId: string;
            previous: {
              enabled: boolean;
              mode: string;
              enforcementScope?: ("all" | "preview") | undefined;
              enforcePercentage: number;
              newResourceBlockingPolicy: "allow" | "block";
              allowUnsafeScriptSrcKeywords: boolean;
              omitScriptNonce?: boolean | undefined;
              connectSrcNotificationsEnabled?: boolean | undefined;
              computedScriptSrc?: string | undefined;
              computedScriptSrcPreview?: string | undefined;
              computedConnectSrc?: string | undefined;
              computedConnectSrcPreview?: string | undefined;
            } | null;
            next: {
              enabled: boolean;
              mode: string;
              enforcementScope?: ("all" | "preview") | undefined;
              enforcePercentage: number;
              newResourceBlockingPolicy: "allow" | "block";
              allowUnsafeScriptSrcKeywords: boolean;
              omitScriptNonce?: boolean | undefined;
              connectSrcNotificationsEnabled?: boolean | undefined;
              computedScriptSrc?: string | undefined;
              computedScriptSrcPreview?: string | undefined;
              computedConnectSrc?: string | undefined;
              computedConnectSrcPreview?: string | undefined;
            };
          }
        | { projectId: string; headerName: string; previousStatus: string; justification: string }
        | {
            projectId: string;
            headerName: string;
            previousStatus: string;
            justification: string | null;
          }
        | {
            projectId: string;
            projectName: string;
            deletedCount: number;
            scriptCount: number;
            connectSrcCount: number;
            connectSrcOriginCount: number;
            headerCount: number;
            connectSrcUserNormalizationRuleCount?: number | undefined;
            connectSrcNormalizationRulesCleared?: boolean | undefined;
          }
        | {
            projectId: string;
            url: string;
            previousStatus: string;
            justification: string;
            approvalScope?: ("all" | "preview") | undefined;
            kind?: ("connectSrc" | "script") | undefined;
          }
        | { projectId: string; type: "script"; resourceUrl: string }
        | { projectId: string; type: "header"; headerName: string }
        | { projectId: string; type: "connectSrc"; resourceUrl: string }
        | {
            projectId: string;
            url?: string | undefined;
            headerName?: string | undefined;
            previousStatus: string;
            justification: string | null;
            kind?: ("connectSrc" | "script") | undefined;
          }
        | { projectId: string; projectName: string; pattern: string; justification: string }
        | Record<string, unknown>
        | { oldName: string; newName: string }
        | {
            projectId: string;
            environment: string;
            host: string;
            connectorId: string;
            connectorType: string;
            connectorService: string;
            externalIssuer: string;
            externalSubject: string;
            sessionId: string;
            emailVerified?: boolean | undefined;
            tenantId?: string | undefined;
            installationId?: string | undefined;
          }
        | {
            projectId: string;
            projectName: string;
            previous: {
              passport?:
                | ({
                    connectorId: string;
                    deploymentType:
                      | "all"
                      | "all_except_custom_domains"
                      | "preview"
                      | "prod_deployment_urls_and_all_previews";
                  } | null)
                | undefined;
            };
            next: {
              passport?:
                | ({
                    connectorId: string;
                    deploymentType:
                      | "all"
                      | "all_except_custom_domains"
                      | "preview"
                      | "prod_deployment_urls_and_all_previews";
                  } | null)
                | undefined;
            };
          }
        | {
            previous: {
              passport?:
                | ({
                    connectorId: string;
                    deploymentType:
                      | "all"
                      | "all_except_custom_domains"
                      | "preview"
                      | "prod_deployment_urls_and_all_previews";
                  } | null)
                | undefined;
            };
            next: {
              passport?:
                | ({
                    connectorId: string;
                    deploymentType:
                      | "all"
                      | "all_except_custom_domains"
                      | "preview"
                      | "prod_deployment_urls_and_all_previews";
                  } | null)
                | undefined;
            };
          }
        | {
            plan: string;
            removedUsers?:
              | Record<
                  string,
                  {
                    role:
                      | "BILLING"
                      | "CONTRIBUTOR"
                      | "DEVELOPER"
                      | "MEMBER"
                      | "OWNER"
                      | "SECURITY"
                      | "VIEWER"
                      | "VIEWER_FOR_PLUS";
                    confirmed: boolean;
                    confirmedAt?: number | undefined;
                    joinedFrom?:
                      | {
                          origin:
                            | "account-update"
                            | "bitbucket"
                            | "dsync"
                            | "feedback"
                            | "github"
                            | "gitlab"
                            | "import"
                            | "link"
                            | "mail"
                            | "nsnb-auto-approve"
                            | "nsnb-hobby-upgrade"
                            | "nsnb-invite"
                            | "nsnb-redeploy"
                            | "nsnb-redeploy-attribution-card"
                            | "nsnb-request-access"
                            | "nsnb-viewer-upgrade"
                            | "organization-teams"
                            | "saml"
                            | "teams";
                          commitId?: string | undefined;
                          repoId?: string | undefined;
                          repoPath?: string | undefined;
                          gitUserId?: (string | number) | undefined;
                          gitUserLogin?: string | undefined;
                          ssoUserId?: string | undefined;
                          ssoConnectedAt?: number | undefined;
                          idpUserId?: string | undefined;
                          dsyncUserId?: string | undefined;
                          dsyncConnectedAt?: number | undefined;
                        }
                      | undefined;
                  }
                >
              | undefined;
            prevPlan?: string | undefined;
            priorPlan?: string | undefined;
            isDowngrade?: boolean | undefined;
            userAgent?: string | undefined;
            isReactivate?: boolean | undefined;
            isTrialUpgrade?: boolean | undefined;
            automated?: boolean | undefined;
            reason?: string | undefined;
            timestamp?: number | undefined;
            removedMemberCount?: number | undefined;
          }
        | {
            plan: string;
            removedUsers?:
              | Record<
                  string,
                  {
                    role:
                      | "BILLING"
                      | "CONTRIBUTOR"
                      | "DEVELOPER"
                      | "MEMBER"
                      | "OWNER"
                      | "SECURITY"
                      | "VIEWER"
                      | "VIEWER_FOR_PLUS";
                    confirmed: boolean;
                    confirmedAt?: number | undefined;
                    joinedFrom?:
                      | {
                          origin:
                            | "account-update"
                            | "bitbucket"
                            | "dsync"
                            | "feedback"
                            | "github"
                            | "gitlab"
                            | "import"
                            | "link"
                            | "mail"
                            | "nsnb-auto-approve"
                            | "nsnb-hobby-upgrade"
                            | "nsnb-invite"
                            | "nsnb-redeploy"
                            | "nsnb-redeploy-attribution-card"
                            | "nsnb-request-access"
                            | "nsnb-viewer-upgrade"
                            | "organization-teams"
                            | "saml"
                            | "teams";
                          commitId?: string | undefined;
                          repoId?: string | undefined;
                          repoPath?: string | undefined;
                          gitUserId?: (string | number) | undefined;
                          gitUserLogin?: string | undefined;
                          ssoUserId?: string | undefined;
                          ssoConnectedAt?: number | undefined;
                          idpUserId?: string | undefined;
                          dsyncUserId?: string | undefined;
                          dsyncConnectedAt?: number | undefined;
                        }
                      | undefined;
                  }
                >
              | undefined;
            prevPlan?: string | undefined;
            priorPlan?: string | undefined;
            isDowngrade?: boolean | undefined;
            userAgent?: string | undefined;
            isReactivate?: boolean | undefined;
            isTrialUpgrade?: boolean | undefined;
            automated?: boolean | undefined;
            reason?: string | undefined;
            timestamp?: number | undefined;
            removedMemberCount?: number | undefined;
            actorId: string;
            actorType: "admin";
            actorName?: string | undefined;
          }
        | {
            price?: number | undefined;
            currency?: string | undefined;
            enabled?: boolean | undefined;
          }
        | {
            previewDeploymentSuffix?: (string | null) | undefined;
            previousPreviewDeploymentSuffix?: (string | null) | undefined;
          }
        | {
            endpoint: {
              id: string;
              name: string;
              projectId: string;
              vercelRegion: string;
              awsServiceName: string;
              privateDnsNames?: Array<string> | undefined;
            };
          }
        | { privateLinkEndpoint: { id: string; name: string }; projectId: string }
        | {
            prev: {
              id: string;
              name: string;
              projectId: string;
              vercelRegion: string;
              awsServiceName: string;
              privateDnsNames?: Array<string> | undefined;
            };
            current: {
              id: string;
              name: string;
              projectId: string;
              vercelRegion: string;
              awsServiceName: string;
              privateDnsNames?: Array<string> | undefined;
            };
          }
        | {
            privateLinkEndpoint: {
              id: string;
              name: string;
              environmentIds?: Array<string> | undefined;
              privateDnsNames?: Array<string> | undefined;
            };
            projectId: string;
            previousEndpoint: {
              name: string;
              environmentIds?: Array<string> | undefined;
              privateDnsNames?: Array<string> | undefined;
            };
          }
        | { projectId?: string | undefined; projectName: string; branch: string }
        | { projectId: string; projectName: string; directoryListing: boolean }
        | {
            projectName?: string | undefined;
            projectId: string;
            projectAnalytics: {
              id: string;
              canceledAt?: (number | null) | undefined;
              disabledAt: number;
              enabledAt: number;
              paidAt?: number | undefined;
              sampleRatePercent?: (number | null) | undefined;
              spendLimitInDollars?: (number | null) | undefined;
            } | null;
            prevProjectAnalytics: {
              id: string;
              canceledAt?: (number | null) | undefined;
              disabledAt: number;
              enabledAt: number;
              paidAt?: number | undefined;
              sampleRatePercent?: (number | null) | undefined;
              spendLimitInDollars?: (number | null) | undefined;
            } | null;
          }
        | {
            projectName?: string | undefined;
            projectId: string;
            projectAnalytics?: Record<string, unknown> | undefined;
            prevProjectAnalytics?: (Record<string, unknown> | null) | undefined;
          }
        | {
            projectId: string;
            projectName: string;
            action: "disabled" | "enabled" | "regenerated" | "updated";
            isEnvVar?: boolean | undefined;
            note?: string | undefined;
          }
        | { projectId: string; projectName: string; avatar?: (string | null) | undefined }
        | { projectId: string; projectName: string; enableAffectedProjectsDeployments: boolean }
        | { projectId: string; projectName: string; enableExternalRewriteCaching: boolean }
        | {
            projectId: string;
            projectName: string;
            previous: Record<string, never>;
            next: Record<string, never>;
          }
        | { projectId: string; projectName: string; productionDeploymentsFastLane: boolean }
        | { projectId: string; projectName: string; sourceFilesOutsideRootDirectory: boolean }
        | {
            projectId?: string | undefined;
            projectName: string;
            deploymentId?: string | undefined;
            previousBuildMachineType?: string | undefined;
            nextBuildMachineType: string;
            previousBuildMachineSelection: string;
            nextBuildMachineSelection: string;
            isSystemInitiated?: boolean | undefined;
            reason?: string | undefined;
          }
        | {
            projectId: string;
            projectName: string;
            widget:
              | "alert"
              | "analytics-online"
              | "analytics-page-views"
              | "analytics-visitors"
              | "firewall-allowed"
              | "firewall-denied"
              | "observability-alert"
              | "observability-edge-requests"
              | "observability-error-rate"
              | "observability-function-invocations"
              | "online"
              | "res"
              | "speed-insights-cls"
              | "speed-insights-lcp"
              | "speed-insights-res"
              | "null"
              | null;
          }
        | {
            projectId?: string | undefined;
            projectName?: string | undefined;
            certId?: string | undefined;
            origin?: string | undefined;
          }
        | {
            projectId?: string | undefined;
            projectName?: string | undefined;
            target?: Array<string> | undefined;
            updated?: boolean | undefined;
          }
        | {
            team: { name: string; id: string };
            project: {
              id: string;
              name?: string | undefined;
              oldConnectConfigurations: Array<{
                envId: string | "preview" | "production";
                connectConfigurationId: string;
                dc?: string | undefined;
                passive: boolean;
                buildsEnabled: boolean;
                aws?:
                  | { subnetIds: Array<string>; securityGroupId?: string | undefined }
                  | undefined;
                createdAt: number;
                updatedAt: number;
              }> | null;
              newConnectConfigurations: Array<{
                envId: string | "preview" | "production";
                connectConfigurationId: string;
                dc?: string | undefined;
                passive: boolean;
                buildsEnabled: boolean;
                aws?:
                  | { subnetIds: Array<string>; securityGroupId?: string | undefined }
                  | undefined;
                createdAt: number;
                updatedAt: number;
              }> | null;
            };
          }
        | { projectName?: string | undefined; projectId: string }
        | { projectId: string; projectName: string; action: "disabled" | "enabled" }
        | { name: string; ownerId: string }
        | {
            projectId: string;
            projectName: string;
            elasticConcurrencyEnabled: boolean;
            oldElasticConcurrencyEnabled: boolean;
            buildQueueConfiguration?:
              | ("SKIP_NAMESPACE_QUEUE" | "WAIT_FOR_NAMESPACE_QUEUE")
              | undefined;
            oldBuildQueueConfiguration?:
              | ("SKIP_NAMESPACE_QUEUE" | "WAIT_FOR_NAMESPACE_QUEUE")
              | undefined;
          }
        | { projectId: string; projectName: string; autoAssignCustomDomains: boolean }
        | { projectId: string; projectName: string; previewDeploymentsEnabled: boolean }
        | {
            projectId: string;
            projectName: string;
            customEnvironmentId: string;
            customEnvironmentSlug: string;
            previous: {
              branchMatcher?:
                | { type: "endsWith" | "equals" | "startsWith"; pattern: string }
                | undefined;
            };
            next: {
              branchMatcher?:
                | { type: "endsWith" | "equals" | "startsWith"; pattern: string }
                | undefined;
            };
          }
        | {
            projectId: string;
            projectName: string;
            customEnvironmentId: string;
            customEnvironmentSlug: string;
          }
        | { projectName?: string | undefined; projectId: string; enableFunctionsBeta: boolean }
        | {
            projectId: string;
            projectName: string;
            previous: { functionDefaultTimeout: number | null };
            next: { functionDefaultTimeout: number };
          }
        | {
            projectId: string;
            projectName: string;
            previous: { functionDefaultMemoryType: string | null };
            next: { functionDefaultMemoryType: string };
          }
        | {
            projectId: string;
            projectName: string;
            previous: { functionDefaultRegions: Array<string> | null };
            next: { functionDefaultRegions: Array<string> };
          }
        | {
            projectId: string;
            projectName: string;
            previous: { functionZeroConfigFailover: boolean | null };
            next: { functionZeroConfigFailover: boolean };
          }
        | { projectId: string; projectName: string; previewDeploymentSuffix: string | null }
        | { projectId: string; projectName: string; newProjectName: string }
        | {
            projectId: string;
            projectName: string;
            previous?:
              | {
                  gitProvider:
                    | "bitbucket"
                    | "cursor-origin"
                    | "github"
                    | "github-custom-host"
                    | "github-limited"
                    | "gitlab"
                    | "vercel";
                  gitRepoId: string;
                  gitRepositoryName: string;
                }
              | undefined;
            next: {
              gitProvider:
                | "bitbucket"
                | "cursor-origin"
                | "github"
                | "github-custom-host"
                | "github-limited"
                | "gitlab"
                | "vercel";
              gitRepoId: string;
              gitRepositoryName: string;
            };
          }
        | {
            projectId: string;
            projectName: string;
            gitProvider:
              | "bitbucket"
              | "cursor-origin"
              | "github"
              | "github-custom-host"
              | "github-limited"
              | "gitlab"
              | "vercel";
            gitRepoId: string;
            gitRepositoryName: string;
          }
        | { projectId: string; projectName: string; onPullRequest: boolean }
        | { projectId: string; projectName: string; onCommit: boolean }
        | { projectId: string; projectName: string; disableRepositoryDispatchEvents: boolean }
        | { projectId: string; projectName: string; createDeployments: "disabled" | "enabled" }
        | { projectId: string; projectName: string; requireVerifiedCommits: boolean | null }
        | { requireVerifiedCommits: boolean }
        | { disableRepositoryDispatchEvents: boolean }
        | { projectId: string; projectName: string; gitCommitStatus: boolean }
        | { projectId: string; projectName: string; gitLFS: boolean }
        | {
            projectId: string;
            projectName: string;
            consolidatedGitCommitStatus: { enabled: boolean; propagateFailures: boolean } | null;
          }
        | {
            projectId: string;
            projectName: string;
            previous: { commandForIgnoringBuildStep?: string | undefined };
            next: { commandForIgnoringBuildStep?: string | undefined };
          }
        | {
            projectId: string;
            projectName: string;
            domain: string;
            target: string;
            redirect: string | null;
            redirectStatusCode: number | null;
            gitBranch: string | null;
            configuredBy?: string | undefined;
          }
        | {
            projectId: string;
            projectName: string;
            domain: string;
            target: string;
            redirect?: (string | null) | undefined;
            redirectStatusCode?: (number | null) | undefined;
          }
        | {
            oldProjectId: string;
            oldProjectName: string;
            newProjectId: string;
            newProjectName: string;
            domain: string;
          }
        | {
            projectId: string;
            projectName: string;
            domain: string;
            redirect?: (string | null) | undefined;
            redirectStatusCode?: (number | null) | undefined;
          }
        | {
            projects: Array<{
              projectId: string;
              role: "ADMIN" | "PROJECT_DEVELOPER" | "PROJECT_GUEST" | "PROJECT_VIEWER";
              membershipCreatedAt: number;
            }>;
            teamMembership?: { uid: string; username?: string | undefined } | undefined;
            directoryType?: string | undefined;
          }
        | {
            projectId: string;
            projectName: string;
            target: string;
            domain: string;
            configuredBy?: (string | null) | undefined;
            prevConfiguredBy?: (string | null) | undefined;
          }
        | {
            project: { name: string; id?: string | undefined };
            projectMembership: {
              role: "ADMIN" | "PROJECT_DEVELOPER" | "PROJECT_GUEST" | "PROJECT_VIEWER";
              uid: string;
              createdAt: number;
              username?: string | undefined;
            } | null;
          }
        | {
            project: {
              name: string;
              role: "ADMIN" | "PROJECT_DEVELOPER" | "PROJECT_GUEST" | "PROJECT_VIEWER";
              invitedUserName: string;
              id?: string | undefined;
              invitedUserId?: string | undefined;
            };
          }
        | {
            project: { name: string; id?: string | undefined };
            removedMembership: {
              role: "ADMIN" | "PROJECT_DEVELOPER" | "PROJECT_GUEST" | "PROJECT_VIEWER";
              uid: string;
              createdAt: number;
              username?: string | undefined;
            };
          }
        | {
            project: { id: string; name: string };
            projectMembership: {
              role?:
                | ("ADMIN" | "PROJECT_DEVELOPER" | "PROJECT_GUEST" | "PROJECT_VIEWER")
                | undefined;
              uid?: string | undefined;
              createdAt?: number | undefined;
              username?: string | undefined;
              previousRole?:
                | ("ADMIN" | "PROJECT_DEVELOPER" | "PROJECT_GUEST" | "PROJECT_VIEWER")
                | undefined;
            };
          }
        | {
            previousProjectId?: string | undefined;
            newProjectId?: string | undefined;
            previousProjectName: string;
            newProjectName: string;
            originAccountName: string;
            transferId?: string | undefined;
          }
        | {
            previousProjectId?: string | undefined;
            projectName: string;
            destinationAccountName: string | null;
            transferId?: string | undefined;
          }
        | {
            projectId: string;
            projectName: string;
            originAccountName: string;
            destinationAccountName: string;
            destinationAccountId: string;
            transferId?: string | undefined;
          }
        | {
            previousProjectId?: string | undefined;
            newProjectId?: string | undefined;
            previousProjectName: string;
            newProjectName: string;
            destinationAccountName: string;
            transferId?: string | undefined;
          }
        | { source: string; projectId: string; projectName: string }
        | {
            projectId: string;
            projectName: string;
            optionsAllowlist?: ({ paths: Array<{ value: string }> } | null) | undefined;
            oldOptionsAllowlist?: ({ paths: Array<{ value: string }> } | null) | undefined;
          }
        | {
            projectId?: string | undefined;
            projectName?: string | undefined;
            passwordProtection:
              | {
                  deploymentType:
                    | "all"
                    | "all_except_custom_domains"
                    | "preview"
                    | "prod_deployment_urls_and_all_previews";
                }
              | "all"
              | "all_except_custom_domains"
              | "preview"
              | "prod_deployment_urls_and_all_previews"
              | null;
            oldPasswordProtection:
              | {
                  deploymentType:
                    | "all"
                    | "all_except_custom_domains"
                    | "preview"
                    | "prod_deployment_urls_and_all_previews";
                }
              | "all"
              | "all_except_custom_domains"
              | "preview"
              | "prod_deployment_urls_and_all_previews"
              | null;
          }
        | { projectId: string }
        | { projectId: string; expiresAt: number }
        | {
            projectId: string;
            projectName?: string | undefined;
            reasonCode?: ("BACKOFFICE" | "BUDGET_REACHED" | "PUBLIC_API") | undefined;
          }
        | { projectId?: string | undefined; projectName: string; consent: "granted" | "refused" }
        | {
            projectId: string;
            projectName: string;
            projectAccountId: string;
            deploymentId: string;
            rollbackDescription?:
              | { userId: string; username: string; description: string; createdAt: number }
              | undefined;
          }
        | { projectId: string; projectName: string; targetDeploymentId?: string | undefined }
        | {
            projectId: string;
            projectName: string;
            targetDeploymentId?: string | undefined;
            newTargetPercentage?: number | undefined;
          }
        | {
            projectId: string;
            projectName: string;
            targetDeploymentId?: string | undefined;
            action?: string | undefined;
          }
        | {
            projectId: string;
            projectName: string;
            previous: Record<string, never> | null;
            next: Record<string, never> | null;
          }
        | {
            projectId: string;
            projectName: string;
            region?: string | undefined;
            failoverRegions?: Array<string> | undefined;
          }
        | {
            projectId: string;
            projectName: string;
            previous: { issuerMode?: ("global" | "team") | undefined };
            next: { issuerMode: "global" | "team" };
          }
        | { projectId: string; projectName: string; customerSupportCodeVisibility: boolean }
        | { projectId: string; projectName: string; gitForkProtection: boolean }
        | { projectId: string; projectName: string; protectedSourcemaps: boolean }
        | { projectId: string; projectName: string; inheritDeploymentProtection: boolean }
        | { projectId: string; projectName: string; publicSource: boolean }
        | {
            projectId?: string | undefined;
            projectName?: string | undefined;
            previous: {
              expiration?: string | undefined;
              expirationProduction?: string | undefined;
              expirationCanceled?: string | undefined;
              expirationErrored?: string | undefined;
            };
            next: {
              expiration?: string | undefined;
              expirationProduction?: string | undefined;
              expirationCanceled?: string | undefined;
              expirationErrored?: string | undefined;
            };
          }
        | {
            projectId: string;
            projectName: string;
            next: { skewProtectionBoundaryAt: number };
            previous: { skewProtectionBoundaryAt?: number | undefined };
          }
        | {
            projectId: string;
            projectName: string;
            next: { skewProtectionMaxAge: number };
            previous: { skewProtectionMaxAge?: number | undefined };
          }
        | {
            projectId: string;
            projectName: string;
            next: { skewProtectionAllowedDomains: Array<string> };
            previous: { skewProtectionAllowedDomains?: Array<string> | undefined };
          }
        | {
            projectId?: string | undefined;
            projectName?: string | undefined;
            ssoProtection:
              | {
                  deploymentType:
                    | "all"
                    | "all_except_custom_domains"
                    | "preview"
                    | "prod_deployment_urls_and_all_previews";
                  cve55182MigrationAppliedFrom?:
                    | (
                        | "all"
                        | "all_except_custom_domains"
                        | "preview"
                        | "prod_deployment_urls_and_all_previews"
                        | "null"
                        | null
                      )
                    | undefined;
                  april2026SecurityIncidentMigrationAppliedFrom?:
                    | (
                        | "all"
                        | "all_except_custom_domains"
                        | "preview"
                        | "prod_deployment_urls_and_all_previews"
                        | "null"
                        | null
                      )
                    | undefined;
                }
              | "all"
              | "all_except_custom_domains"
              | "preview"
              | "prod_deployment_urls_and_all_previews"
              | null;
            oldSsoProtection:
              | {
                  deploymentType:
                    | "all"
                    | "all_except_custom_domains"
                    | "preview"
                    | "prod_deployment_urls_and_all_previews";
                  cve55182MigrationAppliedFrom?:
                    | (
                        | "all"
                        | "all_except_custom_domains"
                        | "preview"
                        | "prod_deployment_urls_and_all_previews"
                        | "null"
                        | null
                      )
                    | undefined;
                  april2026SecurityIncidentMigrationAppliedFrom?:
                    | (
                        | "all"
                        | "all_except_custom_domains"
                        | "preview"
                        | "prod_deployment_urls_and_all_previews"
                        | "null"
                        | null
                      )
                    | undefined;
                }
              | "all"
              | "all_except_custom_domains"
              | "preview"
              | "prod_deployment_urls_and_all_previews"
              | null;
          }
        | {
            projectId: string;
            projectName: string;
            next: {
              project: {
                id?: string | undefined;
                staticIps: {
                  builds?: boolean | undefined;
                  buildRegion?: string | undefined;
                  enabled: boolean;
                  regions?: Array<string> | undefined;
                };
              };
            };
            previous: {
              project: {
                id?: string | undefined;
                staticIps: {
                  builds?: boolean | undefined;
                  buildRegion?: string | undefined;
                  enabled: boolean;
                  regions?: Array<string> | undefined;
                };
              };
            };
          }
        | {
            projectId: string;
            projectName: string;
            trustedIps?:
              | (
                  | "all"
                  | "all_except_custom_domains"
                  | "preview"
                  | "prod_deployment_urls_and_all_previews"
                  | "production"
                  | "null"
                  | null
                )
              | undefined;
            oldTrustedIps?:
              | (
                  | "all"
                  | "all_except_custom_domains"
                  | "preview"
                  | "prod_deployment_urls_and_all_previews"
                  | "production"
                  | "null"
                  | null
                )
              | undefined;
            addedAddresses?: (Array<string> | null) | undefined;
            removedAddresses?: (Array<string> | null) | undefined;
          }
        | {
            projectId: string;
            projectName: string;
            addedProjects: Array<{ id: string; name: string }>;
            removedProjects: Array<{ id: string; name: string }>;
            addedProviders: Array<string>;
            removedProviders: Array<string>;
          }
        | {
            projectId: string;
            projectName?: string | undefined;
            reasonCode?: ("BACKOFFICE" | "PUBLIC_API") | undefined;
          }
        | {
            projectId: string;
            projectName: string;
            projectWebAnalytics?:
              | {
                  id: string;
                  disabledAt?: number | undefined;
                  canceledAt?: number | undefined;
                  enabledAt?: number | undefined;
                  hasData?: true | undefined;
                }
              | undefined;
            prevProjectWebAnalytics?:
              | ({
                  id: string;
                  disabledAt?: number | undefined;
                  canceledAt?: number | undefined;
                  enabledAt?: number | undefined;
                  hasData?: true | undefined;
                } | null)
              | undefined;
          }
        | { gitProvider: string; gitProviderGroupDescriptor: string; gitScope: string }
        | { connectionId: string; connectionType: string }
        | {
            alias: string;
            sandboxName: string;
            sandboxId?: string | undefined;
            projectId?: string | undefined;
          }
        | { driveName: string; projectId: string; projectName: string; region: string }
        | {
            projectId: string;
            projectName: string;
            snapshotId: string;
            targetRegions: Array<string>;
          }
        | { instances: number; url: string }
        | { email: string; verified: boolean }
        | {
            email: string;
            verified: boolean;
            actorId: string;
            actorType: "admin";
            actorName?: string | undefined;
          }
        | { email: string }
        | { uid: string; name: string | { name: string } }
        | { oldName: string; newName: string; uid?: string | undefined }
        | {
            enabled: boolean;
            updatedAt: number;
            firstEnabledAt?: number | undefined;
            projectId?: string | undefined;
            projectName?: string | undefined;
          }
        | { bio: string }
        | {
            scalingRules: Record<string, { min: number; max: number }>;
            min: number;
            max: number;
            url: string;
          }
        | {
            userAgent?: string | undefined;
            geolocation?:
              | ({
                  city?: { names: { en: string } } | undefined;
                  country: { names: { en: string } };
                  most_specific_subdivision?: { names: { en: string } } | undefined;
                  regionName?: string | undefined;
                } | null)
              | undefined;
            env?: string | undefined;
            os?: string | undefined;
            username?: string | undefined;
            ssoType?: string | undefined;
            factors?:
              | Array<{
                  origin:
                    | "apple"
                    | "bitbucket"
                    | "chatgpt"
                    | "email"
                    | "github"
                    | "gitlab"
                    | "google"
                    | "otp"
                    | "saml";
                  username?: string | undefined;
                  teamId?: string | undefined;
                  legacy?: boolean | undefined;
                  ssoType?: string | undefined;
                }>
              | undefined;
            viaOTP?: boolean | undefined;
            viaGithub?: boolean | undefined;
            viaGitlab?: boolean | undefined;
            viaBitbucket?: boolean | undefined;
            viaGoogle?: boolean | undefined;
            viaApple?: boolean | undefined;
            viaSamlSso?: boolean | undefined;
            viaPasskey?: boolean | undefined;
          }
        | {
            email: string;
            bitbucketLogin: string;
            bitbucketEmail: string;
            bitbucketName: string;
            zeitAccount: string;
            zeitAccountType: string;
          }
        | { email: string; githubLogin: string; zeitAccount: string; zeitAccountType: string }
        | {
            email: string;
            gitlabLogin: string;
            gitlabEmail: string;
            gitlabName: string;
            zeitAccount: string;
            zeitAccountType: string;
          }
        | {
            projectId?: string | undefined;
            projectName?: string | undefined;
            analyticsId?: string | undefined;
            sampleRatePercent: number | null;
            spendLimitInDollars: number | null;
            previous: { sampleRatePercent: number | null; spendLimitInDollars: number | null };
          }
        | {
            budget: {
              budgetItem: {
                type: "fixed";
                fixedBudget: number;
                previousSpend: Array<number>;
                notifiedAt: Array<number>;
                webhookId?: string | undefined;
                webhookNotified?: boolean | undefined;
                createdAt: number;
                updatedAt?: number | undefined;
                isActive: boolean;
                pauseProjects?: boolean | undefined;
                pricingPlan?: ("flex" | "legacy" | "platform" | "plus" | "unbundled") | undefined;
                teamId: string;
                id: string;
              };
            };
          }
        | {
            budget: {
              type: "fixed";
              fixedBudget: number;
              previousSpend: Array<number>;
              notifiedAt: Array<number>;
              webhookId?: string | undefined;
              webhookNotified?: boolean | undefined;
              createdAt: number;
              updatedAt?: number | undefined;
              isActive: boolean;
              pauseProjects?: boolean | undefined;
              pricingPlan?: ("flex" | "legacy" | "platform" | "plus" | "unbundled") | undefined;
              teamId: string;
              id: string;
            };
          }
        | {
            budget: {
              type: "fixed";
              fixedBudget: number;
              previousSpend: Array<number>;
              notifiedAt: Array<number>;
              webhookId?: string | undefined;
              webhookNotified?: boolean | undefined;
              createdAt: number;
              updatedAt?: number | undefined;
              isActive: boolean;
              pauseProjects?: boolean | undefined;
              pricingPlan?: ("flex" | "legacy" | "platform" | "plus" | "unbundled") | undefined;
              teamId: string;
              id: string;
            };
            webhookUrl?: string | undefined;
          }
        | {
            budget: {
              type: "fixed";
              fixedBudget: number;
              previousSpend: Array<number>;
              notifiedAt: Array<number>;
              webhookId?: string | undefined;
              webhookNotified?: boolean | undefined;
              createdAt: number;
              updatedAt?: number | undefined;
              isActive: boolean;
              pauseProjects?: boolean | undefined;
              pricingPlan?: ("flex" | "legacy" | "platform" | "plus" | "unbundled") | undefined;
              teamId: string;
              id: string;
            };
            prevBudget?:
              | {
                  type: "fixed";
                  fixedBudget: number;
                  previousSpend: Array<number>;
                  notifiedAt: Array<number>;
                  webhookId?: string | undefined;
                  webhookNotified?: boolean | undefined;
                  createdAt: number;
                  updatedAt?: number | undefined;
                  isActive: boolean;
                  pauseProjects?: boolean | undefined;
                  pricingPlan?: ("flex" | "legacy" | "platform" | "plus" | "unbundled") | undefined;
                  teamId: string;
                  id: string;
                }
              | undefined;
            webhookUrl?: string | undefined;
            prevWebhookUrl?: string | undefined;
          }
        | { webhookUrl?: string | undefined }
        | { storeType: "postgres" | "redis" }
        | {
            transferRequestCode: string;
            store: {
              id: string;
              name?: string | undefined;
              type: "blob" | "edge-config" | "integration" | "postgres" | "redis";
            };
          }
        | {
            transferRequestCode: string;
            store: {
              id: string;
              name?: string | undefined;
              type: "blob" | "edge-config" | "integration" | "postgres" | "redis";
            };
            destinationTeamId: string;
            destinationTeamName: string;
          }
        | {
            transferRequestCode: string;
            store: {
              id: string;
              name?: string | undefined;
              type: "blob" | "edge-config" | "integration" | "postgres" | "redis";
            };
            originTeamId: string;
            originTeamName: string;
          }
        | {
            id: string;
            name?: string | undefined;
            computeUnitsMax?: number | undefined;
            computeUnitsMin?: number | undefined;
            suspendTimeoutSeconds?: number | undefined;
            type: "blob" | "edge-config" | "integration" | "postgres" | "redis";
            access?: ("private" | "public") | undefined;
          }
        | { store: { name: string; id: string }; ownerId?: string | undefined }
        | {
            id: string;
            name?: string | undefined;
            computeUnitsMax?: number | undefined;
            computeUnitsMin?: number | undefined;
            suspendTimeoutSeconds?: number | undefined;
            type: "blob" | "edge-config" | "integration" | "postgres" | "redis";
            access?: ("private" | "public") | undefined;
            locked: boolean;
          }
        | {
            actorId?: string | undefined;
            actorType?: ("admin" | "user") | undefined;
            reason?: string | undefined;
            caseNumber?: string | undefined;
            client?: string | undefined;
          }
        | { slug: string }
        | {
            previous?:
              | {
                  enabled: boolean;
                  scope: "all" | "private" | "public" | "selected_repos";
                  includeDrafts: boolean;
                  selectedRepos?: (Array<string> | null) | undefined;
                }
              | undefined;
            next: {
              enabled: boolean;
              scope: "all" | "private" | "public" | "selected_repos";
              includeDrafts: boolean;
              selectedRepos?: (Array<string> | null) | undefined;
            };
          }
        | { trialCreditsIssuedAt: number; expiresAt: string; amount: string; currency: string }
        | {
            eventId: string;
            sessionId: string;
            sessionKind: string;
            surface: string;
            occurredAt: number;
          }
        | {
            eventId: string;
            sessionId: string;
            sessionKind: string;
            surface: string;
            occurredAt: number;
            planId: string;
            requestedScopes: Array<string>;
            elevatedScopes: Array<string>;
            mergedScopes: Array<string>;
            githubScopes: Array<string>;
            requestedScopeCount: number;
            elevatedScopeCount: number;
            mergedScopeCount: number;
            githubScopeCount: number;
          }
        | {
            previous: "auto-approval" | "block" | "manual-approval" | "null" | null;
            next: "auto-approval" | "block" | "manual-approval" | "null" | null;
            teamSlug?: string | undefined;
          }
        | {
            previous?: ("basic" | "elastic" | "enhanced" | "standard" | "turbo") | undefined;
            next?: ("basic" | "elastic" | "enhanced" | "standard" | "turbo") | undefined;
            isSystemInitiated?: boolean | undefined;
            reason?:
              | (
                  | "basic-floor"
                  | "build-timeout-failure"
                  | "enospc-failure"
                  | "enterprise-floor"
                  | "high-peak-disk"
                  | "high-peak-memory"
                  | "long-build-duration"
                  | "oom-failure"
                  | "plan-change"
                  | "short-build-duration"
                  | "sustained-high-cpu"
                )
              | undefined;
          }
        | {
            slug: string;
            teamId: string;
            by: string;
            byUid?: string | undefined;
            reasons?: Array<{ slug: string; description: string }> | undefined;
            removedUsers?:
              | Record<
                  string,
                  {
                    role:
                      | "BILLING"
                      | "CONTRIBUTOR"
                      | "DEVELOPER"
                      | "MEMBER"
                      | "OWNER"
                      | "SECURITY"
                      | "VIEWER"
                      | "VIEWER_FOR_PLUS";
                    confirmed: boolean;
                    confirmedAt?: number | undefined;
                  }
                >
              | undefined;
            removedMemberCount?: number | undefined;
            timestamp?: number | undefined;
          }
        | { previous: Record<string, never> | null; next: Record<string, never> | null }
        | { enabled: boolean; domain?: string | undefined }
        | {
            projectId: string;
            projectName: string;
            enabled: boolean | null;
            environment: "preview" | "production";
          }
        | {
            environment: "preview" | "production";
            enabled: "default" | "default-force" | "off" | "off-force" | "on" | "on-force";
          }
        | { emailDomain?: (string | null) | undefined }
        | { deletedCount: number; inviteIds: Array<string> }
        | {
            directoryType?: string | undefined;
            ssoType?: string | undefined;
            invitedUser?: { username: string; email: string } | undefined;
            invitedEmail?: string | undefined;
            invitationRole?: string | undefined;
            entitlements?: Array<string> | undefined;
            invitedUid?: string | undefined;
            origin?: string | undefined;
            teamSlug?: string | undefined;
          }
        | {
            teamName: string;
            username?: string | undefined;
            gitUsername?: string | undefined;
            githubUsername?: (string | null) | undefined;
            gitlabUsername?: (string | null) | undefined;
            bitbucketUsername?: (string | null) | undefined;
            updatedUid?: string | undefined;
            teamId?: string | undefined;
          }
        | {
            teamName: string;
            username?: string | undefined;
            gitUsername?: (string | null) | undefined;
            githubUsername?: (string | null) | undefined;
            gitlabUsername?: (string | null) | undefined;
            bitbucketUsername?: (string | null) | undefined;
          }
        | {
            deletedUser?: { username: string; email: string } | undefined;
            deletedUid?: string | undefined;
            githubUsername?: (string | null) | undefined;
            gitlabUsername?: (string | null) | undefined;
            bitbucketUsername?: (string | null) | undefined;
            directoryType?: string | undefined;
            role?:
              | (
                  | "BILLING"
                  | "CONTRIBUTOR"
                  | "DEVELOPER"
                  | "MEMBER"
                  | "OWNER"
                  | "SECURITY"
                  | "VIEWER"
                  | "VIEWER_FOR_PLUS"
                )
              | undefined;
            reason?: string | undefined;
            previousPlan?: ("enterprise" | "hobby" | "pro") | undefined;
            newPlan?: ("enterprise" | "hobby" | "pro") | undefined;
            automated?: boolean | undefined;
          }
        | { entitlement: string; user: { id: string; username: string } }
        | {
            entitlement: string;
            user: { id: string; username: string };
            previousCanceledAt?: string | undefined;
          }
        | {
            role?: string | undefined;
            uid?: string | undefined;
            updatedUid?: string | undefined;
            updatedUser?: { username: string; email: string } | undefined;
            origin?: string | undefined;
            teamSlug?: string | undefined;
            teamRoles?: Array<string> | undefined;
            teamPermissions?: Array<string> | undefined;
            entitlements?: Array<string> | undefined;
            invitedBy?:
              | { email: string; userId?: string | undefined; name?: string | undefined }
              | undefined;
          }
        | {
            requestedTeamName: string;
            requestedTeamSlug?: string | undefined;
            requestedUserName?: string | undefined;
            gitUsername?: string | undefined;
            githubUsername?: string | undefined;
            gitlabUsername?: string | undefined;
            bitbucketUsername?: string | undefined;
            source?:
              | (
                  | "account-update"
                  | "bitbucket"
                  | "dsync"
                  | "feedback"
                  | "github"
                  | "gitlab"
                  | "import"
                  | "link"
                  | "mail"
                  | "nsnb-auto-approve"
                  | "nsnb-hobby-upgrade"
                  | "nsnb-invite"
                  | "nsnb-redeploy"
                  | "nsnb-redeploy-attribution-card"
                  | "nsnb-request-access"
                  | "nsnb-viewer-upgrade"
                  | "organization-teams"
                  | "saml"
                  | "teams"
                )
              | undefined;
          }
        | {
            directoryType?: string | undefined;
            ssoType?: string | undefined;
            updatedUser?: { username: string; email: string } | undefined;
            role?: string | undefined;
            previousRole: string;
            previousTeamRoles?:
              | Array<
                  | "BILLING"
                  | "CONTRIBUTOR"
                  | "DEVELOPER"
                  | "MEMBER"
                  | "OWNER"
                  | "SECURITY"
                  | "VIEWER"
                  | "VIEWER_FOR_PLUS"
                >
              | undefined;
            teamRoles?:
              | Array<
                  | "BILLING"
                  | "CONTRIBUTOR"
                  | "DEVELOPER"
                  | "MEMBER"
                  | "OWNER"
                  | "SECURITY"
                  | "VIEWER"
                  | "VIEWER_FOR_PLUS"
                >
              | undefined;
            previousTeamPermissions?:
              | Array<
                  | "AiGatewayApiKeyOwnedBySelf"
                  | "AiGatewayBudgetManager"
                  | "AiGatewayCredits"
                  | "AiGatewaySettings"
                  | "ConnectorManager"
                  | "CreateProject"
                  | "EnvVariableManager"
                  | "EnvironmentManager"
                  | "FullProductionDeployment"
                  | "IntegrationManager"
                  | "OrgAdmin"
                  | "OrgViewer"
                  | "UsageViewer"
                  | "V0Builder"
                  | "V0Chatter"
                  | "V0Viewer"
                  | "WorkflowDecryptor"
                >
              | undefined;
            teamPermissions?:
              | Array<
                  | "AiGatewayApiKeyOwnedBySelf"
                  | "AiGatewayBudgetManager"
                  | "AiGatewayCredits"
                  | "AiGatewaySettings"
                  | "ConnectorManager"
                  | "CreateProject"
                  | "EnvVariableManager"
                  | "EnvironmentManager"
                  | "FullProductionDeployment"
                  | "IntegrationManager"
                  | "OrgAdmin"
                  | "OrgViewer"
                  | "UsageViewer"
                  | "V0Builder"
                  | "V0Chatter"
                  | "V0Viewer"
                  | "WorkflowDecryptor"
                >
              | undefined;
            updatedUid?: string | undefined;
            origin?: string | undefined;
            teamSlug?: string | undefined;
          }
        | { email?: string | undefined; authorized: boolean; reason?: string | undefined }
        | { enforced: boolean }
        | {
            publicId: string;
            role: string;
            maxUses: number;
            expiresAt: string;
            name?: string | undefined;
          }
        | { publicId: string; name?: string | undefined }
        | { previousConcurrentBuilds: number; nextConcurrentBuilds: number }
        | {
            plan: "enterprise" | "hobby" | "pro";
            trial?: ({ start: number; end: number } | null) | undefined;
          }
        | { invoiceId: string; convertedFromTrial: boolean; plan: "enterprise" | "hobby" | "pro" }
        | { inviteCode?: string | undefined }
        | { name?: string | undefined }
        | {
            name?: string | undefined;
            actorId: string;
            actorType: "admin";
            actorName?: string | undefined;
          }
        | { decision: "keep_on" | "turn_off"; version: string }
        | { consent: "granted" | "refused" }
        | { remoteCaching?: { enabled?: boolean | undefined } | undefined }
        | { deletedCount: number }
        | { enabled: "default" | "off" | "on" }
        | { enabled: boolean; scope: "dashboard" | "log-drains" }
        | {
            previous?:
              | Record<
                  string,
                  | { accessGroupId: string }
                  | "BILLING"
                  | "CONTRIBUTOR"
                  | "DEVELOPER"
                  | "MEMBER"
                  | "OWNER"
                  | "SECURITY"
                  | "VIEWER"
                  | "VIEWER_FOR_PLUS"
                >
              | undefined;
            next?:
              | Record<
                  string,
                  | { accessGroupId: string }
                  | "BILLING"
                  | "CONTRIBUTOR"
                  | "DEVELOPER"
                  | "MEMBER"
                  | "OWNER"
                  | "SECURITY"
                  | "VIEWER"
                  | "VIEWER_FOR_PLUS"
                >
              | undefined;
          }
        | { domain: string; ips: Array<string> }
        | { tokenTypes: Array<string> }
        | { exportId: string; from: number; to: number; format: string }
        | { fileId: string }
        | { slug?: string | undefined }
        | {
            slug?: string | undefined;
            actorId: string;
            actorType: "admin";
            actorName?: string | undefined;
          }
        | {
            projectId: string;
            projectName: string;
            sampling?:
              | Array<{
                  type: "head_sampling";
                  rate: number;
                  env?: ("preview" | "production") | undefined;
                  requestPath?: string | undefined;
                }>
              | undefined;
          }
        | { reason: "limits-exceeded" }
        | { teamName?: string | undefined }
        | {
            totp: boolean;
            recoveryCodes: number;
            actorId?: string | undefined;
            actorType?: ("admin" | "user") | undefined;
            actorName?: string | undefined;
            reason?: string | undefined;
          }
        | { deletedAt?: (number | null) | undefined; username: string }
        | {
            deletedAt?: (number | null) | undefined;
            username: string;
            actorId: string;
            actorType: "admin";
            actorName?: string | undefined;
          }
        | { username: string }
        | { teamName: string }
        | { teamId: string; teamName: string }
        | { actorId: string; actorType: "admin"; reason?: string | undefined }
        | { actorId: string; actorType: "admin" }
        | { enabled: boolean; actorId: string; actorType: "admin" }
        | {
            autoBlockPrevented: boolean;
            preventUntil?: number | undefined;
            actorId: string;
            actorType: "admin";
            reason?: string | undefined;
          }
        | {
            method: "email-otp" | "recovery-code" | "totp" | "webauthn";
            reason: string;
            flowId?: string | undefined;
            loginSessionId?: string | undefined;
          }
        | {
            allowedMethods: Array<"recovery-code" | "totp" | "webauthn">;
            firstFactor: string;
            flowId: string;
            loginSessionId?: string | undefined;
          }
        | {
            action:
              | "add-passkey"
              | "add-totp"
              | "admin-remove"
              | "disable"
              | "enable"
              | "regenerate-recovery-codes"
              | "remove-passkey";
            reason: string;
          }
        | {
            previous: { enabled: boolean; totpVerified: boolean };
            next: { enabled: boolean; totpVerified: boolean };
            method?: ("passkey" | "self_serve_recovery" | "totp" | "user_disabled") | undefined;
          }
        | { remaining: number; context?: ("login" | "sudo") | undefined }
        | { mfaEnabled: boolean }
        | { mfa: { enabled: boolean; totpVerified: boolean } }
        | { enabled: boolean; totpVerified: boolean }
        | {
            previous: { enabled: boolean; totpVerified: boolean };
            next: { enabled: boolean; totpVerified: boolean };
          }
        | {
            provider: "google";
            providerSubjectId: string;
            outcome: "account-matched" | "linking-required";
            decision: {
              authoritative: boolean;
              basis: "gmail" | "none" | "workspace-mx";
              emailDomain: string;
              emailVerified: boolean;
              hostedDomainMatch: boolean;
              mxOutcome: "google" | "lookup-error" | "non-google" | "not-checked";
            };
          }
        | { email: string; prevEmail: string }
        | {
            email: string;
            prevEmail: string;
            actorId: string;
            actorType: "admin";
            actorName?: string | undefined;
          }
        | { username: string; actorId: string; actorType: "admin"; actorName?: string | undefined }
        | { projectId: string; projectName: string; repositoryName: string }
        | {
            projectId: string;
            projectName: string;
            repositoryName: string;
            reference: string;
            digest: string;
          }
        | { projectId: string; projectName: string; repositoryName: string; reference: string }
        | {
            projectId: string;
            projectName: string;
            repositoryName: string;
            sharedWithTeamId: string;
            sharedWithTeamSlug: string;
          }
        | {
            projectId: string;
            projectName: string;
            repositoryName: string;
            sharedWithTeamId: string;
          }
        | { projectId: string; projectName: string; repositoryName: string; public: boolean }
        | {
            projectId: string;
            projectName: string;
            repositoryName: string;
            removedTeamIds: Array<string>;
          }
        | { ruleName: string }
        | { previousProjectCount: number | null; nextProjectCount: number | null }
        | { customAlertTitle: string }
        | {
            vulnerabilities: Array<string>;
            protectionEnabled: boolean;
            protectedProjectCount: number;
          }
        | {
            team: { name: string; id: string };
            configuration: { id: string; name?: string | undefined };
            peering: { id: string; accountId: string; region: string; vpcId: string };
          }
        | {
            team: { name: string; id: string };
            configuration: { id: string; name?: string | undefined };
            peering: { id: string; name?: string | undefined };
          }
        | {
            team: { name: string; id: string };
            configuration: { id: string; name?: string | undefined };
            peering: { id: string; name?: string | undefined };
            newName?: string | undefined;
          }
        | { tier: "plus" | "pro" }
        | { id: string; url: string }
        | { chatId: string; chatTitle?: string | undefined }
        | {
            model: string;
            useCase: string;
            chatId: string;
            messageId: string;
            inputTokens: number;
            outputTokens: number;
            timestamp: number;
            events: Array<{
              eventId: string;
              modelId: string;
              inputTokens: number;
              outputTokens: number;
              totalTokens: number;
              cacheCreationInputTokens: number;
              cacheReadInputTokens: number;
              timestamp: string;
            }>;
          }
        | { chatId: string; chatTitle?: string | undefined; messageId: string }
        | { deploymentId: string; projectId: string; runId: string }
        | {
            grantType:
              | "authorization_code"
              | "urn:ietf:params:oauth:grant-type:device_code"
              | "urn:ietf:params:oauth:grant-type:token-exchange";
            appName: string;
            atTTL: number;
            rtTTL?: number | undefined;
            scope: string;
            authMethod:
              | "app"
              | "apple"
              | "bitbucket"
              | "chatgpt"
              | "email"
              | "emu"
              | "github"
              | "github-webhook"
              | "gitlab"
              | "google"
              | "invite"
              | "manual"
              | "otp"
              | "passkey"
              | "saml"
              | "sms"
              | "token-exchange-oidc";
            app?:
              | {
                  clientId: string;
                  name: string;
                  clientAuthenticationUsed: {
                    method:
                      | "client_secret_basic"
                      | "client_secret_jwt"
                      | "client_secret_post"
                      | "none"
                      | "oidc_token"
                      | "private_key_jwt";
                    secretId?: string | undefined;
                  };
                }
              | undefined;
            includesRefreshToken?: boolean | undefined;
            publicId?: string | undefined;
            tokenPrefix?: "vca_" | undefined;
            tokenSuffix?: string | undefined;
            refreshTokenPublicId?: string | undefined;
            refreshTokenPrefix?: "vcr_" | undefined;
            refreshTokenSuffix?: string | undefined;
            sessionId?: string | undefined;
            ip?: (string | null) | undefined;
            geolocation?:
              | ({
                  city?: { names: { en: string } } | undefined;
                  country: { names: { en: string } };
                  most_specific_subdivision?: { names: { en: string } } | undefined;
                  regionName?: string | undefined;
                } | null)
              | undefined;
            userAgent?: string | undefined;
            issuerUrl?: string | undefined;
            policyId?: string | undefined;
            oidcSubject?: string | undefined;
          }
        | {
            policy: {
              policyId: string;
              clientId: string;
              issuerUrl: string;
              teamId: string;
              name: string | null;
              claims: Array<{ name: string; values: Array<{ value: string; wildcards: boolean }> }>;
              permissions: Array<string>;
              resources: { projectIds: Array<string> } | null;
              createdAt: number;
              updatedAt: number;
            };
            appName?: string | undefined;
          }
        | {
            before: {
              policyId: string;
              clientId: string;
              issuerUrl: string;
              teamId: string;
              name: string | null;
              claims: Array<{ name: string; values: Array<{ value: string; wildcards: boolean }> }>;
              permissions: Array<string>;
              resources: { projectIds: Array<string> } | null;
              createdAt: number;
              updatedAt: number;
            };
            after: {
              policyId: string;
              clientId: string;
              issuerUrl: string;
              teamId: string;
              name: string | null;
              claims: Array<{ name: string; values: Array<{ value: string; wildcards: boolean }> }>;
              permissions: Array<string>;
              resources: { projectIds: Array<string> } | null;
              createdAt: number;
              updatedAt: number;
            };
            appName?: string | undefined;
          }
        | {
            tokenId: string;
            tokenPrefix?: "vcp_" | undefined;
            tokenSuffix?: string | undefined;
            tokenName: string;
            origin:
              | "app"
              | "apple"
              | "bitbucket"
              | "chatgpt"
              | "email"
              | "emu"
              | "github"
              | "github-webhook"
              | "gitlab"
              | "google"
              | "invite"
              | "manual"
              | "otp"
              | "passkey"
              | "saml"
              | "sms"
              | "token-exchange-oidc";
            scope: "project" | "team" | "user";
            teamId?: string | undefined;
            teamSlug?: string | undefined;
            projectId?: string | undefined;
            projectScope?: ("account" | "project-only") | undefined;
            expiresAt?: number | undefined;
            hasAuthorizationDetails?: boolean | undefined;
            ip?: (string | null) | undefined;
            geolocation?:
              | ({
                  city?: { names: { en: string } } | undefined;
                  country: { names: { en: string } };
                  most_specific_subdivision?: { names: { en: string } } | undefined;
                  regionName?: string | undefined;
                } | null)
              | undefined;
            userAgent?: string | undefined;
            reqId?: string | undefined;
            reqUrl?: string | undefined;
          }
        | {
            tokenId: string;
            tokenType: string;
            tokenName: string;
            actorTokenId: string;
            origin?:
              | (
                  | "app"
                  | "apple"
                  | "bitbucket"
                  | "chatgpt"
                  | "email"
                  | "emu"
                  | "github"
                  | "github-webhook"
                  | "gitlab"
                  | "google"
                  | "invite"
                  | "manual"
                  | "otp"
                  | "passkey"
                  | "saml"
                  | "sms"
                  | "token-exchange-oidc"
                )
              | undefined;
            teamId?: string | undefined;
            expired?: boolean | undefined;
            leaked?: boolean | undefined;
            revoked?: boolean | undefined;
            ip?: (string | null) | undefined;
            geolocation?:
              | ({
                  city?: { names: { en: string } } | undefined;
                  country: { names: { en: string } };
                  most_specific_subdivision?: { names: { en: string } } | undefined;
                  regionName?: string | undefined;
                } | null)
              | undefined;
            userAgent?: string | undefined;
            reqId?: string | undefined;
            reqUrl?: string | undefined;
          }
        | {
            deletedCount: number;
            actorTokenId: string;
            ip?: (string | null) | undefined;
            geolocation?:
              | ({
                  city?: { names: { en: string } } | undefined;
                  country: { names: { en: string } };
                  most_specific_subdivision?: { names: { en: string } } | undefined;
                  regionName?: string | undefined;
                } | null)
              | undefined;
            userAgent?: string | undefined;
            reqId?: string | undefined;
            reqUrl?: string | undefined;
          }
      )
    | undefined;
};

export const userEvent = z.object({
  id: z.string(),
  text: z.string(),
  entities: z.array(
    z.object({
      type: z.enum([
        "app",
        "author",
        "bitbucket_login",
        "bold",
        "deployment_host",
        "deployment_inspector",
        "dns_record",
        "edge-config",
        "env_var_name",
        "flag",
        "flags-segment",
        "flags-settings",
        "git_link",
        "github_login",
        "gitlab_login",
        "hook_name",
        "integration",
        "link",
        "project_name",
        "scaling_rules",
        "store",
        "system",
        "target",
      ]),
      start: z.number(),
      end: z.number(),
    }),
  ),
  type: z
    .enum([
      "access-group-created",
      "access-group-deleted",
      "access-group-project-updated",
      "access-group-updated",
      "access-group-user-added",
      "access-group-user-removed",
      "admin-agentic-provisioning-account-unlinked",
      "admin-plan-updated",
      "admin-secondary-email-added",
      "admin-secondary-email-removed",
      "admin-team-name-update",
      "admin-team-slug-update",
      "admin-user-delete",
      "admin-user-primary-email-updated",
      "admin-username-updated",
      "agentic-provisioning-account-blocked",
      "agentic-provisioning-account-linked",
      "agentic-provisioning-account-relinked",
      "agentic-provisioning-account-unlinked",
      "agentic-provisioning-credentials-rotated",
      "agentic-provisioning-plan-changed",
      "agentic-provisioning-team-created",
      "ai-alert-investigation",
      "ai-code-review",
      "ai-gateway-api-key-created",
      "ai-gateway-api-key-deleted",
      "ai-gateway-api-key-quota-updated",
      "ai-gateway-auto-reload-updated",
      "ai-gateway-budget-default-updated",
      "ai-gateway-byok-credential-created",
      "ai-gateway-byok-credential-deleted",
      "ai-gateway-byok-credential-updated",
      "ai-gateway-credits-purchased",
      "ai-gateway-guardrails-updated",
      "ai-gateway-model-allowlist-models-updated",
      "ai-gateway-model-allowlist-toggled",
      "ai-gateway-private-model-created",
      "ai-gateway-private-model-deleted",
      "ai-gateway-private-model-updated",
      "ai-gateway-private-provider-created",
      "ai-gateway-private-provider-deleted",
      "ai-gateway-private-provider-updated",
      "ai-gateway-provider-allowlist-providers-updated",
      "ai-gateway-provider-allowlist-toggled",
      "ai-gateway-rule-created",
      "ai-gateway-rule-deleted",
      "ai-gateway-rule-updated",
      "ai-gateway-scope-budget-updated",
      "ai-gateway-transcripts-default-disabled",
      "ai-gateway-transcripts-default-enabled",
      "ai-gateway-transcripts-disabled",
      "ai-gateway-transcripts-enabled",
      "ai-gateway-transcripts-retention-updated",
      "ai-gateway-virtual-model-config-archived",
      "ai-gateway-virtual-model-config-created",
      "ai-gateway-virtual-model-config-restored",
      "ai-gateway-virtual-model-config-updated",
      "ai-omniagent",
      "alert-investigation-project-allowlist-updated",
      "alert-rule-created",
      "alert-rule-deleted",
      "alert-rule-updated",
      "alias",
      "alias-chown",
      "alias-delete",
      "alias-invite-created",
      "alias-invite-joined",
      "alias-invite-revoked",
      "alias-protection-bypass-created",
      "alias-protection-bypass-exception",
      "alias-protection-bypass-regenerated",
      "alias-protection-bypass-revoked",
      "alias-system",
      "alias-user-scoped-access-denied",
      "alias-user-scoped-access-granted",
      "alias-user-scoped-access-requested",
      "alias-user-scoped-access-revoked",
      "aliases-assigned",
      "attack-mode-disabled",
      "attack-mode-enabled",
      "audit-log-export-downloaded",
      "audit-log-export-requested",
      "authorize-git-deployment",
      "auto-expose-system-envs",
      "avatar",
      "bulk-redirects-settings-updated",
      "bulk-redirects-version-promoted",
      "bulk-redirects-version-restored",
      "cert",
      "cert-autorenew",
      "cert-chown",
      "cert-clone",
      "cert-delete",
      "cert-renew",
      "cert-replace",
      "cert-system-create",
      "code-owners-config-updated",
      "compliance-document-downloaded",
      "compliance-document-previewed",
      "compliance-documents-bulk-downloaded",
      "concurrent-builds-update",
      "connect-attach-project",
      "connect-bitbucket",
      "connect-bitbucket-app",
      "connect-configuration-created",
      "connect-configuration-deleted",
      "connect-configuration-link-updated",
      "connect-configuration-linked",
      "connect-configuration-unlinked",
      "connect-configuration-updated",
      "connect-create-connector",
      "connect-delete-connector",
      "connect-delete-installation",
      "connect-detach-project",
      "connect-github",
      "connect-github-custom-host",
      "connect-github-limited",
      "connect-gitlab",
      "connect-gitlab-app",
      "connect-import-tokens",
      "connect-revoke-all-tokens",
      "connect-update-connector",
      "connect-update-trigger-destinations",
      "connect-upsert-installation",
      "custom-alert-created",
      "custom-alert-deleted",
      "custom-alert-updated",
      "custom-environments-settings-updated",
      "custom-metric-metadata-deleted",
      "custom-metric-metadata-updated",
      "custom-suffix-clear",
      "custom-suffix-disable",
      "custom-suffix-enable",
      "custom-suffix-pending",
      "custom-suffix-ready",
      "deploy-hook-created",
      "deploy-hook-deduped",
      "deploy-hook-deleted",
      "deploy-hook-processed",
      "deployment",
      "deployment-check-created",
      "deployment-check-deleted",
      "deployment-check-updated",
      "deployment-chown",
      "deployment-creation-blocked",
      "deployment-delete",
      "deployment-policy-blocked",
      "deployment-undeleted",
      "disabled-integration-installation-removed",
      "disconnect-bitbucket-app",
      "disconnect-github",
      "disconnect-github-custom-host",
      "disconnect-github-limited",
      "disconnect-gitlab-app",
      "dns-add",
      "dns-delete",
      "dns-record-internal",
      "dns-update",
      "dns-zonefile-import",
      "domain",
      "domain-buy",
      "domain-cdn",
      "domain-chown",
      "domain-custom-ns-change",
      "domain-delegated",
      "domain-delete",
      "domain-ech-change",
      "domain-move-in",
      "domain-move-out",
      "domain-move-out-request-sent",
      "domain-renew-change",
      "domain-service-type-updated",
      "domain-transfer-in",
      "domain-transfer-in-canceled",
      "domain-transfer-in-completed",
      "domain-zone-change",
      "domain-zone-change-internal",
      "drain-created",
      "drain-deleted",
      "drain-disabled",
      "drain-enabled",
      "drain-updated",
      "edge-cache-dangerously-delete-by-src-images",
      "edge-cache-dangerously-delete-by-tags",
      "edge-cache-dangerously-delete-immutable-static",
      "edge-cache-invalidate-by-src-images",
      "edge-cache-invalidate-by-tags",
      "edge-cache-purge-all",
      "edge-cache-rollback-purge",
      "edge-config-backup-restored",
      "edge-config-created",
      "edge-config-deleted",
      "edge-config-items-updated",
      "edge-config-schema-deleted",
      "edge-config-schema-updated",
      "edge-config-token-created",
      "edge-config-token-deleted",
      "edge-config-transfer-in",
      "edge-config-transfer-out",
      "edge-config-updated",
      "email",
      "email-notification-rule-removed",
      "email-notification-rule-updated",
      "emu-member-removed-unverified-domain",
      "enforce-disjunctive-production-secrets",
      "enforce-sensitive-environment-variables",
      "env-variable-add",
      "env-variable-delete",
      "env-variable-edit",
      "env-variable-masked",
      "env-variable-read",
      "env-variable-read:cli:dev",
      "env-variable-read:cli:env:add",
      "env-variable-read:cli:env:ls",
      "env-variable-read:cli:env:pull",
      "env-variable-read:cli:env:rm",
      "env-variable-read:cli:pull",
      "env-variable-read:unknown-source",
      "env-variable-read:v0:env:pull",
      "env-variable-rotated",
      "experiment-created",
      "experiment-deleted",
      "experiment-transitioned",
      "experiment-updated",
      "firewall-bypass-created",
      "firewall-bypass-deleted",
      "firewall-config-modified",
      "firewall-config-promoted",
      "firewall-config-removed",
      "firewall-managed-rulegroup-updated",
      "firewall-managed-ruleset-updated",
      "flag",
      "flag-archived",
      "flag-created",
      "flag-deleted",
      "flag-unarchived",
      "flag-updated",
      "flags-explorer-subscription",
      "flags-sdk-key",
      "flags-sdk-key-added",
      "flags-sdk-key-deleted",
      "flags-sdk-key-read",
      "flags-segment",
      "flags-settings",
      "flags-transferred",
      "git-integration-repo-push",
      "git_account_integration_link_added",
      "global-config-backup-restored",
      "global-config-created",
      "global-config-deleted",
      "global-config-items-updated",
      "global-config-schema-deleted",
      "global-config-schema-updated",
      "global-config-token-created",
      "global-config-token-deleted",
      "global-config-transfer-in",
      "global-config-transfer-out",
      "global-config-updated",
      "instant-rollback-created",
      "integration-configuration-credential-revoked",
      "integration-configuration-credential-rotated",
      "integration-configuration-owner-changed",
      "integration-configuration-scope-change-confirmed",
      "integration-configuration-transfer-in-success",
      "integration-configuration-transfer-out-success",
      "integration-configurations-disabled",
      "integration-installation-billing-plan-updated",
      "integration-installation-completed",
      "integration-installation-permission-updated",
      "integration-installation-removed",
      "integration-resource-redis-command-executed",
      "integration-resource-sql-query-executed",
      "integration-scope-changed",
      "invoice-modified",
      "invoice-refunded",
      "kms-issuer-created",
      "kms-issuer-deleted",
      "kms-issuer-key-activated",
      "kms-issuer-key-created",
      "kms-issuer-key-revoked",
      "kms-issuer-key-rotated",
      "kms-issuer-policy-created",
      "kms-issuer-policy-deleted",
      "kms-issuer-policy-updated",
      "kms-issuer-updated",
      "log-drain-created",
      "log-drain-deleted",
      "log-drain-disabled",
      "log-drain-enabled",
      "login",
      "login-connection-linked",
      "login-connection-unlinked",
      "manual-deployment-promotion-created",
      "marketplace-flex-commit-opt-in",
      "marketplace-integration-allowlist-updated",
      "microfrontend-group-added",
      "microfrontend-group-deleted",
      "microfrontend-group-updated",
      "microfrontend-project-added-to-group",
      "microfrontend-project-removed-from-group",
      "microfrontend-project-updated",
      "monitoring-alert-updated",
      "monitoring-disabled",
      "monitoring-enabled",
      "oauth-app-connection-created",
      "oauth-app-connection-removed",
      "oauth-app-connection-updated",
      "oauth-app-created",
      "oauth-app-deleted",
      "oauth-app-secret-deleted",
      "oauth-app-secret-generated",
      "oauth-app-token-created",
      "oauth-app-updated",
      "observability-disabled",
      "observability-enabled",
      "observability-plus-project-disabled",
      "observability-plus-project-enabled",
      "oidc-policy-created",
      "oidc-policy-deleted",
      "oidc-policy-updated",
      "oidc-policy-used-to-obtain-app-token",
      "organization-create",
      "organization-delete",
      "organization-dsync-group-delete",
      "organization-dsync-group-upsert",
      "organization-slug-update",
      "organization-team-add",
      "organization-team-create",
      "organization-team-delete",
      "owner-blocked",
      "owner-soft-blocked",
      "owner-soft-unblocked",
      "owner-unblocked",
      "page-integrity-config-updated",
      "page-integrity-header-approved",
      "page-integrity-header-rejected",
      "page-integrity-inventory-cleared",
      "page-integrity-resource-approved",
      "page-integrity-resource-deleted",
      "page-integrity-resource-rejected",
      "page-integrity-script-approval-rule-created",
      "page-integrity-script-approval-rule-deleted",
      "passkey-created",
      "passkey-deleted",
      "passkey-updated",
      "passport-access-granted",
      "password-protection-disabled",
      "password-protection-enabled",
      "payment-method-added",
      "payment-method-default-updated",
      "payment-method-removed",
      "plan",
      "preview-deployment-suffix-disabled",
      "preview-deployment-suffix-enabled",
      "preview-deployment-suffix-update",
      "privatelink-endpoint-created",
      "privatelink-endpoint-deleted",
      "privatelink-endpoint-updated",
      "production-branch-updated",
      "project-add-alias",
      "project-add-redirect",
      "project-affected-projects-deployments-updated",
      "project-alias-configured-change",
      "project-analytics-disabled",
      "project-analytics-enabled",
      "project-auto-assign-custom-production-domains-updated",
      "project-automation-bypass",
      "project-avatar-update",
      "project-build-command-updated",
      "project-build-logs-and-source-protection-updated",
      "project-build-machine-updated",
      "project-card-widget-preference-updated",
      "project-client-cert-delete",
      "project-client-cert-upload",
      "project-connect-configurations",
      "project-consolidated-git-commit-status-updated",
      "project-created",
      "project-cron-jobs-toggled",
      "project-custom-environment-created",
      "project-custom-environment-deleted",
      "project-custom-environment-updated",
      "project-customer-success-code-visibility-updated",
      "project-delete",
      "project-deployment-policy-updated",
      "project-deployment-retention-updated",
      "project-directory-listing",
      "project-domain-deleted",
      "project-domain-moved",
      "project-domain-unverified",
      "project-domain-updated",
      "project-domain-verified",
      "project-elastic-concurrency-updated",
      "project-expiration-locked",
      "project-expiration-reached",
      "project-expiration-scheduled",
      "project-expiration-unlocked",
      "project-external-rewrite-caching-updated",
      "project-framework-updated",
      "project-function-cpu-memory",
      "project-function-failover",
      "project-function-max-duration",
      "project-function-regions",
      "project-functions-beta-updated",
      "project-functions-fluid-disabled",
      "project-functions-fluid-enabled",
      "project-git-commit-comments-toggled",
      "project-git-commit-status-toggled",
      "project-git-create-deployments-toggled",
      "project-git-fork-protection-updated",
      "project-git-lfs-toggled",
      "project-git-pr-comments-toggled",
      "project-git-repository-connected",
      "project-git-repository-disconnected",
      "project-git-repository-dispatch-events-toggled",
      "project-git-require-verified-commits-toggled",
      "project-ignored-build-step-updated",
      "project-install-command-updated",
      "project-member-added",
      "project-member-invited",
      "project-member-removed",
      "project-member-removed-batch",
      "project-member-updated",
      "project-move-in-success",
      "project-move-out-failed",
      "project-move-out-started",
      "project-move-out-success",
      "project-name",
      "project-node-version-updated",
      "project-oidc-issuer-mode-updated",
      "project-oidc-token-created",
      "project-options-allowlist",
      "project-output-directory-updated",
      "project-passport-updated",
      "project-password-protection",
      "project-paused",
      "project-preview-deployment-suffix",
      "project-preview-environment-branch-tracking-updated",
      "project-prioritize-production-builds-updated",
      "project-program-enrollment-changed",
      "project-protected-sourcemaps-updated",
      "project-rollback-description-updated",
      "project-rolling-release-aborted",
      "project-rolling-release-approved",
      "project-rolling-release-completed",
      "project-rolling-release-configured",
      "project-rolling-release-continued",
      "project-rolling-release-disabled",
      "project-rolling-release-enabled",
      "project-rolling-release-paused",
      "project-rolling-release-started",
      "project-rolling-release-suggested-actions-generated",
      "project-rolling-release-timer",
      "project-root-directory-updated",
      "project-routes-version-promoted",
      "project-routes-version-restored",
      "project-sandbox-config-updated",
      "project-sandbox-url-protection-updated",
      "project-skew-protection-allowed-domains-updated",
      "project-skew-protection-max-age-updated",
      "project-skew-protection-threshold-updated",
      "project-source-files-outside-root-directory-updated",
      "project-speed-insights-disabled",
      "project-speed-insights-enabled",
      "project-speed-insights-free-data-started",
      "project-sso-protection",
      "project-static-ips-updated",
      "project-trusted-ips",
      "project-trusted-sources",
      "project-unpaused",
      "project-web-analytics-disabled",
      "project-web-analytics-enabled",
      "protected-git-scope-added",
      "protected-git-scope-removed",
      "runtime-cache-purge-all",
      "saml-connection-created",
      "saml-connection-deleted",
      "sandbox-alias-assigned",
      "sandbox-alias-delete",
      "sandbox-drive-created",
      "sandbox-drive-deleted",
      "sandbox-snapshot-regions-updated",
      "scale",
      "scale-auto",
      "secondary-email-added",
      "secondary-email-removed",
      "secondary-email-verified",
      "secret-add",
      "secret-delete",
      "secret-rename",
      "security-list-created",
      "security-list-deleted",
      "security-list-updated",
      "security-plus-updated",
      "set-bio",
      "set-name",
      "set-profiles",
      "set-scale",
      "shared-env-variable-create",
      "shared-env-variable-delete",
      "shared-env-variable-read",
      "shared-env-variable-update",
      "show-ip-addresses",
      "signup",
      "signup-via-bitbucket",
      "signup-via-github",
      "signup-via-gitlab",
      "speed-insights-settings-updated",
      "spend-created",
      "spend-deleted",
      "spend-updated",
      "sso-login",
      "storage-accept-tos",
      "storage-access-token-set",
      "storage-accessed-data-browser",
      "storage-connect-project",
      "storage-create",
      "storage-delete",
      "storage-disconnect-project",
      "storage-disconnect-projects",
      "storage-inactive-store-deleted",
      "storage-reset-credentials",
      "storage-resource-repl-command",
      "storage-set-locked",
      "storage-transfer-in-success",
      "storage-transfer-out-success",
      "storage-transfer-request-created",
      "storage-update",
      "storage-update-project-connection",
      "storage-upgrade-project-connection-to-oidc",
      "storage-view-secret",
      "strict-deployment-protection-settings",
      "strict-password-protection-settings",
      "strict-shareable-links",
      "subscription-created",
      "subscription-product-added",
      "subscription-product-removed",
      "subscription-updated",
      "support-session-created",
      "team",
      "team-agent-billing-migration-decision-changed",
      "team-avatar-update",
      "team-collaboration-settings-updated",
      "team-default-build-machine-updated",
      "team-default-passport-updated",
      "team-delete",
      "team-deployment-policy-updated",
      "team-domain-verification-created",
      "team-domain-verification-deleted",
      "team-domain-verification-verified",
      "team-email-domain-update",
      "team-emu-updated",
      "team-ended-trial",
      "team-firewall-config-modified",
      "team-firewall-config-promoted",
      "team-git-repository-dispatch-events-toggled",
      "team-git-require-verified-commits-toggled",
      "team-invite-bulk-delete",
      "team-invite-code-reset",
      "team-invite-link-created",
      "team-invite-link-deleted",
      "team-ip-blocking-rules-created",
      "team-ip-blocking-rules-removed",
      "team-member-add",
      "team-member-confirm-request",
      "team-member-decline-request",
      "team-member-delete",
      "team-member-entitlement-added",
      "team-member-entitlement-canceled",
      "team-member-entitlement-reactivated",
      "team-member-entitlement-removed",
      "team-member-join",
      "team-member-leave",
      "team-member-request-access",
      "team-member-role-update",
      "team-member-sso-authorization-attempt",
      "team-mfa-enforcement-updated",
      "team-name-update",
      "team-paid-invoice",
      "team-program-enrollment-changed",
      "team-remote-caching-purge",
      "team-remote-caching-update",
      "team-saml-enforced",
      "team-saml-roles",
      "team-slug-update",
      "team-tokens-invalidated",
      "tracing-configured",
      "tracing-disabled",
      "tracing-paused",
      "tracing-resumed",
      "unlink-login-connection",
      "update-account-flow-dismissed",
      "update-account-flow-triggered",
      "user-auto-block-configured",
      "user-blocked",
      "user-delete",
      "user-delete-requested",
      "user-emu-account-archived",
      "user-emu-account-deleted",
      "user-emu-account-recovered",
      "user-emu-account-update-opted-in",
      "user-emu-account-update-opted-out",
      "user-emu-recovery-email-sent",
      "user-emu-recovery-initiated",
      "user-emu-toggled",
      "user-mfa-challenge-failed",
      "user-mfa-challenge-initiated",
      "user-mfa-challenge-verified",
      "user-mfa-change-failed",
      "user-mfa-configuration-updated",
      "user-mfa-recovery-code-used",
      "user-mfa-recovery-codes-regenerated",
      "user-mfa-removed",
      "user-mfa-setup-skipped",
      "user-mfa-totp-verification-started",
      "user-mfa-totp-verified",
      "user-phone-removed",
      "user-phone-updated",
      "user-primary-email-updated",
      "user-provider-email-claim-evaluated",
      "user-sudo-mode-removed",
      "user-token-created",
      "user-token-deleted",
      "user-tokens-deleted",
      "user-unblocked",
      "username",
      "v0-chat-ai-usage",
      "v0-chat-created",
      "v0-chat-message-sent",
      "vcr-image-deleted",
      "vcr-image-pushed",
      "vcr-repository-created",
      "vcr-repository-deleted",
      "vcr-repository-permission-added",
      "vcr-repository-permission-removed",
      "vcr-repository-permissions-cleared",
      "vcr-repository-visibility-changed",
      "vercel-agent-elevated-permissions-approved",
      "vercel-agent-elevated-permissions-requested",
      "vercel-agent-session-created",
      "vercel-agent-team-trial-credits-applied",
      "vercel-app-installation-request-dismissed",
      "vercel-app-installation-requested",
      "vercel-app-installation-updated",
      "vercel-app-installed",
      "vercel-app-tokens-revoked",
      "vercel-app-uninstalled",
      "vercel-toolbar",
      "vpc-peering-connection-accepted",
      "vpc-peering-connection-deleted",
      "vpc-peering-connection-rejected",
      "vpc-peering-connection-updated",
      "vulnerability-banner-dismissed",
      "web-analytics-tier-updated",
      "webhook-created",
      "webhook-deleted",
      "webhook-updated",
      "workflow-deployment-key-accessed",
    ])
    .optional(),
  categories: z
    .array(
      z.enum([
        "account",
        "ai",
        "ai-gateway",
        "billing",
        "connect",
        "deployment",
        "domain",
        "edge",
        "env-variable",
        "feature-flags",
        "firewall",
        "integration",
        "microfrontends",
        "network",
        "observability",
        "other",
        "project",
        "security",
        "storage",
        "team",
        "v0",
        "vercel-app",
        "workflow",
      ]),
    )
    .optional(),
  createdAt: z.number(),
  user: z
    .object({
      slug: z.string().optional(),
      avatar: z.string(),
      email: z.string(),
      username: z.string(),
      uid: z.string(),
    })
    .optional(),
  principal: z
    .union([
      z.object({
        type: z.literal("user").optional(),
        avatar: z.string(),
        email: z.string(),
        slug: z.string().optional(),
        uid: z.string(),
        username: z.string(),
      }),
      z.object({
        type: z.literal("app"),
        id: z.string().optional(),
        clientId: z.string(),
        name: z.string(),
      }),
      z.object({
        type: z.literal("external"),
        id: z.string(),
        name: z.string(),
        email: z.string().optional(),
      }),
      z.object({ type: z.literal("system") }),
    ])
    .optional(),
  via: z
    .array(
      z.union([
        z.object({
          type: z.literal("user").optional(),
          avatar: z.string(),
          email: z.string(),
          slug: z.string().optional(),
          uid: z.string(),
          username: z.string(),
        }),
        z.object({
          type: z.literal("app"),
          id: z.string().optional(),
          clientId: z.string(),
          name: z.string(),
        }),
        z.object({
          type: z.literal("external"),
          id: z.string(),
          name: z.string(),
          email: z.string().optional(),
        }),
        z.object({ type: z.literal("system") }),
      ]),
    )
    .optional(),
  userId: z.string().optional(),
  principalId: z.string(),
  viaIds: z.array(z.string()).optional(),
  payload: z
    .union([
      z.object({}),
      z.object({
        action: z.enum(["archived", "created", "deleted", "unarchived", "updated"]),
        id: z.string(),
        slug: z.string(),
        projectId: z.string(),
        projectName: z.string().optional(),
      }),
      z.object({
        action: z.enum(["created", "deleted", "transitioned", "updated"]),
        id: z.string(),
        name: z.string(),
        slug: z.string(),
        state: z.string(),
        projectId: z.string(),
        projectName: z.string().optional(),
      }),
      z.object({
        action: z.enum(["added", "deleted", "rotated"]),
        label: z.string().optional(),
        projectName: z.string().optional(),
        projectId: z.string().optional(),
        environment: z.string(),
      }),
      z.object({
        action: z.literal("read"),
        projectName: z.string().optional(),
        projectId: z.string().optional(),
        environment: z.array(z.string()),
      }),
      z.object({
        provider: z.enum(["chatgpt", "stripe"]).optional(),
        providerAccount: z.string().optional(),
        stripeAccount: z.string().optional(),
        stripeOrganisation: z.string().optional(),
        teamId: z.string(),
        accountRequestId: z.string(),
      }),
      z.object({
        provider: z.enum(["chatgpt", "stripe"]).optional(),
        providerAccount: z.string().optional(),
        stripeAccount: z.string().optional(),
        stripeOrganisation: z.string().optional(),
        teamId: z.string(),
      }),
      z.object({
        provider: z.enum(["chatgpt", "stripe"]).optional(),
        providerAccount: z.string().optional(),
        stripeAccount: z.string().optional(),
        stripeOrganisation: z.string().optional(),
        teamId: z.string(),
        teamSlug: z.string(),
      }),
      z.object({
        provider: z.enum(["chatgpt", "stripe"]).optional(),
        providerAccount: z.string().optional(),
        stripeAccount: z.string().optional(),
        stripeOrganisation: z.string().optional(),
        reason: z.string(),
        blockCode: z.string(),
      }),
      z.object({
        provider: z.enum(["chatgpt", "stripe"]).optional(),
        providerAccount: z.string().optional(),
        stripeAccount: z.string().optional(),
        resourceId: z.string(),
        projectName: z.string(),
      }),
      z.object({
        provider: z.enum(["chatgpt", "stripe"]).optional(),
        providerAccount: z.string().optional(),
        stripeAccount: z.string().optional(),
        stripeOrganisation: z.string().optional(),
        teamId: z.string(),
        actorId: z.string(),
        actorType: z.literal("admin"),
        actorName: z.string().optional(),
      }),
      z.object({
        provider: z.enum(["chatgpt", "stripe"]).optional(),
        providerAccount: z.string().optional(),
        stripeAccount: z.string().optional(),
        stripeOrganisation: z.string().optional(),
        teamId: z.string(),
        resourceId: z.string(),
        fromPlan: z.enum(["hobby", "pro"]),
        toPlan: z.enum(["hobby", "pro"]),
      }),
      z.object({
        apiKey: z.object({ id: z.string(), name: z.string() }),
        budget: z
          .object({
            limitAmount: z.number(),
            refreshPeriod: z.enum(["daily", "monthly", "none", "weekly"]),
          })
          .nullable()
          .optional(),
        zdrExemption: z.boolean().optional(),
        bypassAll: z.boolean().optional(),
      }),
      z.object({ apiKey: z.object({ id: z.string(), name: z.string() }) }),
      z.object({
        apiKey: z.object({ id: z.string(), name: z.string() }),
        budget: z
          .object({
            limitAmount: z.number(),
            refreshPeriod: z.enum(["daily", "monthly", "none", "weekly"]),
          })
          .nullable()
          .optional(),
        change: z.enum(["disable", "enable", "remove", "set"]),
      }),
      z.object({
        change: z.enum(["disable", "disable-commitment", "enable", "enable-commitment", "update"]),
        settings: z
          .object({
            minimumBalance: z.string(),
            targetBalance: z.string(),
            maximumMonthlySpend: z.string().nullable(),
          })
          .optional(),
        previous: z
          .object({
            minimumBalance: z.string(),
            targetBalance: z.string(),
            maximumMonthlySpend: z.string().nullable(),
          })
          .optional(),
        commitment: z
          .object({
            maximumMonthlySpend: z.string().nullable(),
            deferredInvoiceTargetBalance: z.string(),
          })
          .optional(),
      }),
      z.object({
        scopeType: z.enum(["api-key", "project", "team", "user"]),
        budget: z
          .object({
            limitAmount: z.number(),
            refreshPeriod: z.enum(["daily", "monthly", "none", "weekly"]),
          })
          .nullable()
          .optional(),
        change: z.enum(["disable", "enable", "remove", "set"]),
      }),
      z.object({
        scopeType: z.enum(["project", "team", "user"]),
        projectId: z.string().optional(),
        projectName: z.string().optional(),
        userId: z.string().optional(),
        userName: z.string().optional(),
        budget: z
          .object({
            limitAmount: z.number(),
            refreshPeriod: z.enum(["daily", "monthly", "none", "weekly"]),
          })
          .nullable()
          .optional(),
        change: z.enum(["disable", "enable", "remove", "set"]),
      }),
      z.object({
        credential: z.object({ id: z.string(), name: z.string(), providerSlug: z.string() }),
      }),
      z.object({ amount: z.string(), purchaseIntentId: z.string() }),
      z.object({ enabled: z.boolean() }),
      z.object({ added: z.array(z.string()), removed: z.array(z.string()) }),
      z.object({ privateModel: z.object({ slug: z.string(), providerSlug: z.string() }) }),
      z.object({ privateModel: z.object({ slug: z.string() }) }),
      z.object({ privateProvider: z.object({ slug: z.string() }) }),
      z.object({
        piiRedaction: z.object({ from: z.boolean(), to: z.boolean() }),
        moderationPolicyCount: z.number(),
        policiesAdded: z.array(z.string()),
        policiesRemoved: z.array(z.string()),
        policiesModified: z.array(z.string()),
      }),
      z.object({
        retention: z.object({
          defaultMode: z.enum(["days", "until-requested"]),
          defaultDays: z.number().optional(),
          ceilingMode: z.enum(["days", "until-requested"]),
          ceilingDays: z.number().optional(),
        }),
      }),
      z.object({
        rule: z.object({
          id: z.string(),
          type: z.string(),
          model: z.string().optional(),
          rewriteModel: z.string().optional(),
        }),
      }),
      z.object({
        rule: z.object({ id: z.string(), type: z.string(), model: z.string().optional() }),
      }),
      z.object({
        rule: z.object({ id: z.string(), type: z.string(), model: z.string().optional() }),
        enabled: z.boolean().optional(),
      }),
      z.object({
        virtualModelConfig: z.object({
          id: z.string(),
          displayName: z.string().optional(),
          modelSlug: z.string().optional(),
        }),
      }),
      z.object({
        accessGroup: z.object({ id: z.string(), name: z.string() }),
        teamRoles: z.array(z.string()).optional(),
        teamPermissions: z.array(z.string()).optional(),
        entitlements: z.array(z.string()).optional(),
      }),
      z.object({ author: z.string(), accessGroup: z.object({ id: z.string(), name: z.string() }) }),
      z.object({
        accessGroup: z.object({ id: z.string(), name: z.string() }),
        project: z.object({ id: z.string(), name: z.string().optional() }),
        next_role: z
          .enum(["ADMIN", "PROJECT_DEVELOPER", "PROJECT_GUEST", "PROJECT_VIEWER", "null"])
          .nullable()
          .optional(),
        previous_role: z
          .enum(["ADMIN", "PROJECT_DEVELOPER", "PROJECT_GUEST", "PROJECT_VIEWER"])
          .optional(),
      }),
      z.object({
        accessGroup: z.object({ id: z.string(), name: z.string() }),
        name: z.string().optional(),
        previousName: z.string().optional(),
        teamRoles: z.array(z.string()).optional(),
        previousTeamRoles: z.array(z.string()).optional(),
        teamPermissions: z.array(z.string()).optional(),
        previousTeamPermissions: z.array(z.string()).optional(),
        entitlementsAdded: z.array(z.string()).optional(),
        entitlementsRemoved: z.array(z.string()).optional(),
      }),
      z.object({
        accessGroup: z.object({ id: z.string(), name: z.string().optional() }),
        user: z.object({ id: z.string(), username: z.string().optional() }),
        directoryType: z.string().optional(),
      }),
      z.object({ price: z.number().optional(), currency: z.string().optional() }),
      z.object({
        alias: z.string().optional(),
        deployment: z
          .object({
            id: z.string(),
            name: z.string(),
            url: z.string(),
            meta: z.record(z.string(), z.string()),
            readyState: z.string().optional(),
            allowListedReadyStateReasonInternal: z
              .enum([
                "EARLY_IGNORE_STEP",
                "IGNORE_STEP",
                "NAMESPACE_PRUNED",
                "UNAFFECTED_PROJECT",
                "UNVERIFIED_COMMIT",
              ])
              .optional(),
          })
          .nullable()
          .optional(),
        ruleCount: z.number().optional(),
        deploymentUrl: z.string().optional(),
        aliasId: z.string().optional(),
        deploymentId: z.string().nullable().optional(),
        oldDeploymentId: z.string().nullable().optional(),
        redirect: z.string().optional(),
        redirectStatusCode: z.number().nullable().optional(),
        target: z.string().nullable().optional(),
        system: z.boolean().optional(),
        aliasUpdatedAt: z.number().optional(),
      }),
      z.object({
        projectId: z.string(),
        aliasCount: z.number(),
        deployment: z
          .object({
            id: z.string(),
            name: z.string(),
            url: z.string(),
            meta: z.record(z.string(), z.string()),
            readyState: z.string().optional(),
            allowListedReadyStateReasonInternal: z
              .enum([
                "EARLY_IGNORE_STEP",
                "IGNORE_STEP",
                "NAMESPACE_PRUNED",
                "UNAFFECTED_PROJECT",
                "UNVERIFIED_COMMIT",
              ])
              .optional(),
          })
          .nullable()
          .optional(),
      }),
      z.object({
        name: z.string().optional(),
        alias: z.string(),
        oldTeam: z.object({ name: z.string() }).optional(),
        newTeam: z.object({ name: z.string() }).optional(),
      }),
      z.object({
        name: z.string().optional(),
        alias: z.string(),
        aliasId: z.string(),
        deploymentId: z.string().nullable(),
      }),
      z.object({
        alias: z.string().optional(),
        email: z.string().optional(),
        username: z.string().optional(),
      }),
      z.object({ alias: z.string().optional() }),
      z.object({ alias: z.string().optional(), email: z.string().optional() }),
      z.object({
        aliasId: z.string().optional(),
        alias: z.string().optional(),
        projectId: z.string().optional(),
        projectName: z.string().optional(),
      }),
      z.object({
        projectId: z.string().optional(),
        projectName: z.string(),
        alias: z.string(),
        action: z.enum(["created", "removed"]),
      }),
      z.object({ alias: z.string(), deploymentUrl: z.string() }),
      z.object({
        alias: z.string().optional(),
        userId: z.string().optional(),
        username: z.string().optional(),
      }),
      z.object({
        alias: z.string().optional(),
        aliasId: z.string().optional(),
        userId: z.string().optional(),
        username: z.string().optional(),
      }),
      z.object({
        appName: z.string(),
        appId: z.string().optional(),
        scopes: z.array(z.enum(["email", "offline_access", "openid", "profile"])),
        permissions: z
          .array(
            z.enum([
              "*",
              "manage:speed-insights",
              "manage:web-analytics",
              "read-write:ai-gateway-api-key",
              "read-write:ai-gateway-guardrails",
              "read-write:ai-gateway-private-models",
              "read-write:ai-gateway-rules",
              "read-write:ai-gateway-virtual-model-configs",
              "read-write:alerts",
              "read-write:billing",
              "read-write:blob",
              "read-write:connect",
              "read-write:deployment",
              "read-write:domain",
              "read-write:domain-registrar",
              "read-write:drains",
              "read-write:edge-cache",
              "read-write:edge-config",
              "read-write:firewall",
              "read-write:integration-configuration",
              "read-write:integration-resource",
              "read-write:kms",
              "read-write:project",
              "read-write:project-env-vars",
              "read-write:project-env-vars-non-production",
              "read-write:project-env-vars-production",
              "read-write:project-flags-non-production",
              "read-write:project-flags-production",
              "read-write:project-protection-bypass",
              "read-write:remote-cache",
              "read-write:sandbox",
              "read-write:team-members",
              "read-write:vcr",
              "read:access-group",
              "read:ai-gateway-guardrails",
              "read:ai-gateway-private-models",
              "read:ai-gateway-rules",
              "read:ai-gateway-virtual-model-configs",
              "read:alerts",
              "read:billing",
              "read:deployment",
              "read:domain",
              "read:event",
              "read:firewall",
              "read:integration-configuration",
              "read:integration-resource",
              "read:kms",
              "read:monitoring",
              "read:project",
              "read:project-env-vars-non-production",
              "read:project-env-vars-production",
              "read:project-flags",
              "read:remote-cache",
              "read:sandbox",
              "read:speed-insights",
              "read:team",
              "read:user",
              "read:vcr",
              "read:web-analytics",
              "use:ai-gateway",
            ]),
          )
          .optional(),
      }),
      z.object({ appName: z.string(), appId: z.string().optional() }),
      z.object({
        appName: z.string(),
        appId: z.string().optional(),
        nextScopes: z.array(z.enum(["email", "offline_access", "openid", "profile"])),
        nextPermissions: z
          .array(
            z.enum([
              "*",
              "manage:speed-insights",
              "manage:web-analytics",
              "read-write:ai-gateway-api-key",
              "read-write:ai-gateway-guardrails",
              "read-write:ai-gateway-private-models",
              "read-write:ai-gateway-rules",
              "read-write:ai-gateway-virtual-model-configs",
              "read-write:alerts",
              "read-write:billing",
              "read-write:blob",
              "read-write:connect",
              "read-write:deployment",
              "read-write:domain",
              "read-write:domain-registrar",
              "read-write:drains",
              "read-write:edge-cache",
              "read-write:edge-config",
              "read-write:firewall",
              "read-write:integration-configuration",
              "read-write:integration-resource",
              "read-write:kms",
              "read-write:project",
              "read-write:project-env-vars",
              "read-write:project-env-vars-non-production",
              "read-write:project-env-vars-production",
              "read-write:project-flags-non-production",
              "read-write:project-flags-production",
              "read-write:project-protection-bypass",
              "read-write:remote-cache",
              "read-write:sandbox",
              "read-write:team-members",
              "read-write:vcr",
              "read:access-group",
              "read:ai-gateway-guardrails",
              "read:ai-gateway-private-models",
              "read:ai-gateway-rules",
              "read:ai-gateway-virtual-model-configs",
              "read:alerts",
              "read:billing",
              "read:deployment",
              "read:domain",
              "read:event",
              "read:firewall",
              "read:integration-configuration",
              "read:integration-resource",
              "read:kms",
              "read:monitoring",
              "read:project",
              "read:project-env-vars-non-production",
              "read:project-env-vars-production",
              "read:project-flags",
              "read:remote-cache",
              "read:sandbox",
              "read:speed-insights",
              "read:team",
              "read:user",
              "read:vcr",
              "read:web-analytics",
              "use:ai-gateway",
            ]),
          )
          .optional(),
      }),
      z.object({
        appName: z.string(),
        appId: z.string().optional(),
        installationId: z.string().optional(),
        before: z
          .object({
            resources: z
              .object({
                projectIds: z.object({
                  type: z.literal("list"),
                  required: z.literal(true),
                  items: z.object({ type: z.literal("string") }),
                }),
              })
              .optional(),
            permissions: z
              .array(
                z.enum([
                  "manage:speed-insights",
                  "manage:web-analytics",
                  "read-write:ai-gateway-api-key",
                  "read-write:ai-gateway-guardrails",
                  "read-write:ai-gateway-private-models",
                  "read-write:ai-gateway-rules",
                  "read-write:ai-gateway-virtual-model-configs",
                  "read-write:alerts",
                  "read-write:billing",
                  "read-write:blob",
                  "read-write:connect",
                  "read-write:deployment",
                  "read-write:domain",
                  "read-write:domain-registrar",
                  "read-write:drains",
                  "read-write:edge-cache",
                  "read-write:edge-config",
                  "read-write:firewall",
                  "read-write:integration-configuration",
                  "read-write:integration-resource",
                  "read-write:kms",
                  "read-write:project",
                  "read-write:project-env-vars",
                  "read-write:project-env-vars-non-production",
                  "read-write:project-env-vars-production",
                  "read-write:project-flags-non-production",
                  "read-write:project-flags-production",
                  "read-write:project-protection-bypass",
                  "read-write:remote-cache",
                  "read-write:sandbox",
                  "read-write:team-members",
                  "read-write:vcr",
                  "read:access-group",
                  "read:ai-gateway-guardrails",
                  "read:ai-gateway-private-models",
                  "read:ai-gateway-rules",
                  "read:ai-gateway-virtual-model-configs",
                  "read:alerts",
                  "read:billing",
                  "read:deployment",
                  "read:domain",
                  "read:event",
                  "read:firewall",
                  "read:integration-configuration",
                  "read:integration-resource",
                  "read:kms",
                  "read:monitoring",
                  "read:project",
                  "read:project-env-vars-non-production",
                  "read:project-env-vars-production",
                  "read:project-flags",
                  "read:remote-cache",
                  "read:sandbox",
                  "read:speed-insights",
                  "read:team",
                  "read:vcr",
                  "read:web-analytics",
                  "use:ai-gateway",
                ]),
              )
              .optional(),
          })
          .optional(),
        after: z
          .object({
            resources: z
              .object({
                projectIds: z.object({
                  type: z.literal("list"),
                  required: z.literal(true),
                  items: z.object({ type: z.literal("string") }),
                }),
              })
              .optional(),
            permissions: z
              .array(
                z.enum([
                  "manage:speed-insights",
                  "manage:web-analytics",
                  "read-write:ai-gateway-api-key",
                  "read-write:ai-gateway-guardrails",
                  "read-write:ai-gateway-private-models",
                  "read-write:ai-gateway-rules",
                  "read-write:ai-gateway-virtual-model-configs",
                  "read-write:alerts",
                  "read-write:billing",
                  "read-write:blob",
                  "read-write:connect",
                  "read-write:deployment",
                  "read-write:domain",
                  "read-write:domain-registrar",
                  "read-write:drains",
                  "read-write:edge-cache",
                  "read-write:edge-config",
                  "read-write:firewall",
                  "read-write:integration-configuration",
                  "read-write:integration-resource",
                  "read-write:kms",
                  "read-write:project",
                  "read-write:project-env-vars",
                  "read-write:project-env-vars-non-production",
                  "read-write:project-env-vars-production",
                  "read-write:project-flags-non-production",
                  "read-write:project-flags-production",
                  "read-write:project-protection-bypass",
                  "read-write:remote-cache",
                  "read-write:sandbox",
                  "read-write:team-members",
                  "read-write:vcr",
                  "read:access-group",
                  "read:ai-gateway-guardrails",
                  "read:ai-gateway-private-models",
                  "read:ai-gateway-rules",
                  "read:ai-gateway-virtual-model-configs",
                  "read:alerts",
                  "read:billing",
                  "read:deployment",
                  "read:domain",
                  "read:event",
                  "read:firewall",
                  "read:integration-configuration",
                  "read:integration-resource",
                  "read:kms",
                  "read:monitoring",
                  "read:project",
                  "read:project-env-vars-non-production",
                  "read:project-env-vars-production",
                  "read:project-flags",
                  "read:remote-cache",
                  "read:sandbox",
                  "read:speed-insights",
                  "read:team",
                  "read:vcr",
                  "read:web-analytics",
                  "use:ai-gateway",
                ]),
              )
              .optional(),
          })
          .optional(),
      }),
      z.object({
        appName: z.string(),
        appId: z.string().optional(),
        resources: z
          .object({
            projectIds: z.object({
              type: z.literal("list"),
              required: z.literal(true),
              items: z.object({ type: z.literal("string") }),
            }),
          })
          .optional(),
        permissions: z
          .array(
            z.enum([
              "manage:speed-insights",
              "manage:web-analytics",
              "read-write:ai-gateway-api-key",
              "read-write:ai-gateway-guardrails",
              "read-write:ai-gateway-private-models",
              "read-write:ai-gateway-rules",
              "read-write:ai-gateway-virtual-model-configs",
              "read-write:alerts",
              "read-write:billing",
              "read-write:blob",
              "read-write:connect",
              "read-write:deployment",
              "read-write:domain",
              "read-write:domain-registrar",
              "read-write:drains",
              "read-write:edge-cache",
              "read-write:edge-config",
              "read-write:firewall",
              "read-write:integration-configuration",
              "read-write:integration-resource",
              "read-write:kms",
              "read-write:project",
              "read-write:project-env-vars",
              "read-write:project-env-vars-non-production",
              "read-write:project-env-vars-production",
              "read-write:project-flags-non-production",
              "read-write:project-flags-production",
              "read-write:project-protection-bypass",
              "read-write:remote-cache",
              "read-write:sandbox",
              "read-write:team-members",
              "read-write:vcr",
              "read:access-group",
              "read:ai-gateway-guardrails",
              "read:ai-gateway-private-models",
              "read:ai-gateway-rules",
              "read:ai-gateway-virtual-model-configs",
              "read:alerts",
              "read:billing",
              "read:deployment",
              "read:domain",
              "read:event",
              "read:firewall",
              "read:integration-configuration",
              "read:integration-resource",
              "read:kms",
              "read:monitoring",
              "read:project",
              "read:project-env-vars-non-production",
              "read:project-env-vars-production",
              "read:project-flags",
              "read:remote-cache",
              "read:sandbox",
              "read:speed-insights",
              "read:team",
              "read:vcr",
              "read:web-analytics",
              "use:ai-gateway",
            ]),
          )
          .optional(),
      }),
      z.object({
        appName: z.string(),
        appId: z.string().optional(),
        secretLastFourChars: z.string().optional(),
      }),
      z.object({
        appName: z.string(),
        appId: z.string().optional(),
        app: z.object({ id: z.string(), name: z.string() }).optional(),
        issuedBefore: z.number().optional(),
      }),
      z.object({
        projectId: z.string(),
        prevAttackModeEnabled: z.boolean().optional(),
        prevAttackModeActiveUntil: z.number().nullable().optional(),
        attackModeEnabled: z.boolean(),
        attackModeActiveUntil: z.number().nullable().optional(),
      }),
      z.object({
        projectId: z.string().optional(),
        projectName: z.string(),
        autoExposeSystemEnvs: z.boolean(),
      }),
      z.object({ avatar: z.string().optional() }),
      z.object({
        invoiceId: z.string(),
        amount: z.number(),
        refundReason: z.string(),
        lineItemCount: z.number(),
      }),
      z.object({
        invoiceId: z.string(),
        newInvoiceId: z.string(),
        settlementMethod: z.enum([
          "credited-paid",
          "credited-payment-pending",
          "refunded-paid",
          "refunded-payment-pending",
        ]),
        amount: z.number(),
      }),
      z.object({
        paymentMethodId: z.string(),
        brand: z.string().optional(),
        last4: z.string().optional(),
      }),
      z.object({ subscriptionId: z.string().optional(), planSlug: z.string() }),
      z.object({
        subscriptionId: z.string().optional(),
        action: z.literal("cancel_plan"),
        data: z.object({
          planSlug: z.enum(["v0_business", "v0_teams"]),
          reason: z.literal("non-payment").optional(),
        }),
      }),
      z.object({
        subscriptionId: z.string().optional(),
        action: z.literal("resume_plan"),
        data: z.object({ planSlug: z.enum(["v0_business", "v0_teams"]) }),
      }),
      z.object({
        subscriptionId: z.string().optional(),
        action: z.literal("mutate"),
        data: z.record(z.string(), z.unknown()),
      }),
      z.object({ subscriptionId: z.string().optional(), productAliases: z.array(z.string()) }),
      z.object({
        project: z.object({ id: z.string(), name: z.string() }),
        bulkRedirectsLimit: z.number(),
        prevBulkRedirectsLimit: z.number(),
      }),
      z.object({ project: z.object({ id: z.string(), name: z.string() }), versionId: z.string() }),
      z.object({
        cn: z.string().optional(),
        cns: z.array(z.string()).optional(),
        custom: z.boolean(),
        id: z.string().optional(),
      }),
      z.object({ id: z.string(), cns: z.array(z.string()), custom: z.boolean() }),
      z.object({
        cn: z.string().optional(),
        cns: z.array(z.string()).optional(),
        id: z.string().optional(),
      }),
      z.object({
        id: z.string(),
        oldTeam: z.object({ name: z.string() }).optional(),
        newTeam: z.object({ name: z.string() }).optional(),
      }),
      z.object({ src: z.string(), dst: z.string() }),
      z.object({ id: z.string(), cn: z.string().optional(), cns: z.array(z.string()).optional() }),
      z.object({ cn: z.string().optional(), cns: z.array(z.string()).optional() }),
      z.object({
        gitOwnerName: z.string(),
        gitRepositoryName: z.string(),
        previous: z.object({ enabled: z.boolean(), autoAddReviewers: z.boolean() }),
        next: z.object({ enabled: z.boolean(), autoAddReviewers: z.boolean() }),
      }),
      z.object({
        slug: z.string(),
        documentId: z.string(),
        title: z.string(),
        fingerprint: z.string(),
      }),
      z.object({
        count: z.number(),
        documents: z.array(
          z.object({
            slug: z.string(),
            documentId: z.string(),
            title: z.string(),
            fingerprint: z.string(),
          }),
        ),
      }),
      z.object({ configuration: z.object({ id: z.string(), name: z.string() }) }),
      z.object({
        team: z.object({ name: z.string(), id: z.string() }),
        configuration: z.object({ id: z.string(), name: z.string().optional() }),
        project: z.object({ id: z.string(), name: z.string().optional() }),
        buildsEnabled: z.boolean().optional(),
      }),
      z.object({
        team: z.object({ name: z.string(), id: z.string() }),
        configuration: z.object({ id: z.string(), name: z.string().optional() }),
        project: z.object({ id: z.string(), name: z.string().optional() }),
        buildsEnabled: z.boolean().optional(),
        passive: z.boolean().optional(),
      }),
      z.object({
        team: z.object({ name: z.string(), id: z.string() }),
        configuration: z.object({ id: z.string(), name: z.string().optional() }),
        project: z.object({ id: z.string(), name: z.string().optional() }),
      }),
      z.object({
        team: z.object({ name: z.string(), id: z.string() }),
        configuration: z.object({ id: z.string(), name: z.string().optional() }),
        newName: z.string(),
      }),
      z.object({ githubLogin: z.string(), host: z.string().optional() }),
      z.object({ githubLogin: z.string() }),
      z.object({ githubLogin: z.string(), host: z.string() }),
      z.object({
        gitlabLogin: z.string(),
        gitlabEmail: z.string(),
        gitlabName: z.string().optional(),
        zeitAccount: z.string().optional(),
        zeitAccountType: z.string().optional(),
      }),
      z.object({ gitlabLogin: z.string(), gitlabUserId: z.number() }),
      z.object({
        bitbucketEmail: z.string(),
        bitbucketLogin: z.string(),
        bitbucketName: z.string().optional(),
      }),
      z.object({ bitbucketLogin: z.string(), bitbucketAccountId: z.string() }),
      z.object({
        clientId: z.string().optional(),
        clientUid: z.string().optional(),
        clientName: z.string().optional(),
        projectId: z.string().optional(),
        installationId: z.string().optional(),
        subjectType: z.enum(["app", "user"]).optional(),
        fields: z.array(z.string()).optional(),
        environments: z.array(z.string()).optional(),
        triggerDestinationCount: z.number().optional(),
        tokenCount: z.number().optional(),
        acceptedTokenCount: z.number().optional(),
        importedTokenCount: z.number().optional(),
        tokensDeleted: z.number().optional(),
      }),
      z.object({
        project: z.object({ id: z.string(), name: z.string() }),
        purchasedAmount: z.number(),
        prevPurchasedAmount: z.number(),
      }),
      z.object({ metricName: z.string() }).and(z.record(z.string(), z.unknown())),
      z.object({ reason: z.string().optional(), suffix: z.string() }),
      z.object({ status: z.string(), suffix: z.string() }),
      z.object({ suffix: z.string() }),
      z.object({
        projectId: z.string(),
        projectName: z.string(),
        hookName: z.string(),
        ref: z.string(),
      }),
      z.object({
        project: z.object({ name: z.string() }),
        job: z.object({
          deployHook: z.object({
            createdAt: z.number(),
            id: z.string(),
            name: z.string(),
            ref: z.string(),
          }),
          state: z.string(),
        }),
      }),
      z.object({
        projectId: z.string(),
        projectName: z.string(),
        checkId: z.string(),
        checkName: z.string(),
      }),
      z.object({
        name: z.string().optional(),
        alias: z.array(z.string()).optional(),
        target: z.string().nullable().optional(),
        deployment: z
          .object({
            id: z.string(),
            name: z.string(),
            url: z.string(),
            meta: z.record(z.string(), z.string()),
            readyState: z.string().optional(),
            allowListedReadyStateReasonInternal: z
              .enum([
                "EARLY_IGNORE_STEP",
                "IGNORE_STEP",
                "NAMESPACE_PRUNED",
                "UNAFFECTED_PROJECT",
                "UNVERIFIED_COMMIT",
              ])
              .optional(),
          })
          .nullable()
          .optional(),
        url: z.string(),
        forced: z.boolean().optional(),
        gitCredentialSource: z.literal("external-token").optional(),
        deploymentId: z.string().optional(),
        plan: z.string().optional(),
        project: z.string().optional(),
        projectId: z.string().optional(),
        regions: z.array(z.string()).optional(),
        type: z.string().optional(),
      }),
      z.object({
        job: z.union([
          z.object({
            type: z.literal("bitbucket-push"),
            authorized: z.boolean().optional(),
            authorizedBy: z.string().optional(),
            jobProjectIds: z.array(z.string()).optional(),
            jobPairs: z.array(z.array(z.union([z.string(), z.string()]))).optional(),
            skippedJobPairs: z.array(z.array(z.union([z.string(), z.string()]))).optional(),
            gitHashtagVercel: z
              .array(
                z.enum([
                  "#VERCEL_BUILD_PRIO_1",
                  "#VERCEL_BUILD_PRIO_10",
                  "#VERCEL_BUILD_PRIO_2",
                  "#VERCEL_BUILD_PRIO_3",
                  "#VERCEL_BUILD_PRIO_4",
                  "#VERCEL_BUILD_PRIO_5",
                  "#VERCEL_BUILD_PRIO_6",
                  "#VERCEL_BUILD_PRIO_7",
                  "#VERCEL_BUILD_PRIO_8",
                  "#VERCEL_BUILD_PRIO_9",
                  "#VERCEL_SDDJ_AFTER_GET_REPO_FORCE_CANCEL",
                  "#VERCEL_SDDJ_AFTER_GET_REPO_FORCE_ERROR",
                  "#VERCEL_SDDJ_AFTER_VERIFY_FORCE_CANCEL",
                  "#VERCEL_SDDJ_AFTER_VERIFY_FORCE_ERROR",
                  "#VERCEL_SDDJ_BEFORE_BUILD_JOB_QUEUED_ERROR",
                  "#VERCEL_SDDJ_FORCE_GIT_FORK_ERROR",
                  "#VERCEL_SKIP",
                  "#VERCEL_V0_MESSAGE",
                ]),
              )
              .optional(),
            connectedProjectCount: z.number().optional(),
            prIdOrZero: z.number().optional(),
            gitComments: z.object({ onPullRequest: z.boolean(), onCommit: z.boolean() }).optional(),
            isManualGitDeploy: z.boolean().optional(),
            commitVerification: z.enum(["unknown", "unverified", "verified"]).optional(),
            nsnbSideEffect: z
              .object({
                action: z.enum(["auto-approved-member", "auto-approved-pending-invite"]),
                gitUserLogin: z.string(),
              })
              .optional(),
            createdAt: z.number().optional(),
            deploymentId: z.string().optional(),
            deployHook: z
              .object({ createdAt: z.number(), id: z.string(), name: z.string(), ref: z.string() })
              .optional(),
            eventful: z.boolean().optional(),
            forceNew: z.boolean().optional(),
            headInfo: z.object({
              owner: z.string(),
              ref: z.string(),
              repoUuid: z.string(),
              sha: z.string(),
              slug: z.string(),
            }),
            linkedProjectId: z.string().optional(),
            name: z.string(),
            owner: z.string(),
            prId: z.number().optional(),
            projectId: z.string().optional(),
            customEnvId: z.string().nullable().optional(),
            ref: z.string(),
            repoPushedAt: z.number().nullable().optional(),
            repoUuid: z.string(),
            sha: z.string(),
            silent: z.boolean().optional(),
            slug: z.string(),
            target: z.string().nullable().optional(),
            url: z.string().optional(),
            withCache: z.boolean().optional(),
            workspaceUuid: z.string(),
            provider: z.literal("bitbucket"),
          }),
          z.object({
            createdAt: z.number().optional(),
            eventful: z.boolean().optional(),
            headInfo: z.object({
              owner: z.string(),
              ref: z.string(),
              repoUuid: z.string(),
              sha: z.string(),
              slug: z.string(),
            }),
            linkedProjectId: z.string().optional(),
            name: z.string(),
            owner: z.string(),
            prId: z.number(),
            projectId: z.string().optional(),
            customEnvId: z.string().nullable().optional(),
            ref: z.string(),
            repoUuid: z.string(),
            sha: z.string(),
            slug: z.string(),
            type: z.literal("bitbucket-now-comment"),
            workspaceUuid: z.string(),
            gitComments: z.object({ onPullRequest: z.boolean(), onCommit: z.boolean() }).optional(),
            provider: z.literal("bitbucket"),
          }),
          z.object({
            prId: z.number(),
            type: z.literal("pr"),
            authorized: z.boolean().optional(),
            authorizedBy: z.string().optional(),
            jobProjectIds: z.array(z.string()).optional(),
            jobPairs: z.array(z.array(z.union([z.string(), z.string()]))).optional(),
            skippedJobPairs: z.array(z.array(z.union([z.string(), z.string()]))).optional(),
            gitHashtagVercel: z
              .array(
                z.enum([
                  "#VERCEL_BUILD_PRIO_1",
                  "#VERCEL_BUILD_PRIO_10",
                  "#VERCEL_BUILD_PRIO_2",
                  "#VERCEL_BUILD_PRIO_3",
                  "#VERCEL_BUILD_PRIO_4",
                  "#VERCEL_BUILD_PRIO_5",
                  "#VERCEL_BUILD_PRIO_6",
                  "#VERCEL_BUILD_PRIO_7",
                  "#VERCEL_BUILD_PRIO_8",
                  "#VERCEL_BUILD_PRIO_9",
                  "#VERCEL_SDDJ_AFTER_GET_REPO_FORCE_CANCEL",
                  "#VERCEL_SDDJ_AFTER_GET_REPO_FORCE_ERROR",
                  "#VERCEL_SDDJ_AFTER_VERIFY_FORCE_CANCEL",
                  "#VERCEL_SDDJ_AFTER_VERIFY_FORCE_ERROR",
                  "#VERCEL_SDDJ_BEFORE_BUILD_JOB_QUEUED_ERROR",
                  "#VERCEL_SDDJ_FORCE_GIT_FORK_ERROR",
                  "#VERCEL_SKIP",
                  "#VERCEL_V0_MESSAGE",
                ]),
              )
              .optional(),
            connectedProjectCount: z.number().optional(),
            prIdOrZero: z.number().optional(),
            gitComments: z.object({ onPullRequest: z.boolean(), onCommit: z.boolean() }).optional(),
            isManualGitDeploy: z.boolean().optional(),
            commitVerification: z.enum(["unknown", "unverified", "verified"]).optional(),
            nsnbSideEffect: z
              .object({
                action: z.enum(["auto-approved-member", "auto-approved-pending-invite"]),
                gitUserLogin: z.string(),
              })
              .optional(),
            committerGitUserId: z.number().optional(),
            committerGitUserType: z.string().optional(),
            createdAt: z.number().optional(),
            forceNew: z.boolean().optional(),
            deploymentId: z.string().optional(),
            deployHook: z
              .object({ createdAt: z.number(), id: z.string(), name: z.string(), ref: z.string() })
              .optional(),
            beforeSha: z.string().optional(),
            defaultBranch: z.string().optional(),
            eventful: z.boolean().optional(),
            githubDeploymentId: z.string().optional(),
            headInfo: z.object({
              org: z.string(),
              ref: z.string(),
              repo: z.string(),
              repoId: z.number(),
              sha: z.string(),
            }),
            installationId: z.number(),
            isPrivate: z.boolean(),
            linkedProjectId: z.string().optional(),
            org: z.string(),
            projectId: z.string().optional(),
            customEnvId: z.string().nullable().optional(),
            repo: z.string(),
            repoId: z.number(),
            target: z.string().nullable().optional(),
            url: z.string().optional(),
            withCache: z.boolean().optional(),
            provider: z.enum(["github", "github-custom-host", "github-limited"]),
            customHost: z.string().optional(),
          }),
          z.object({
            repoPushedAt: z.number().nullable(),
            commitInfo: z
              .object({ total: z.number(), earliestSha: z.string().optional() })
              .optional(),
            forced: z.boolean().optional(),
            type: z.literal("push"),
            authorized: z.boolean().optional(),
            authorizedBy: z.string().optional(),
            jobProjectIds: z.array(z.string()).optional(),
            jobPairs: z.array(z.array(z.union([z.string(), z.string()]))).optional(),
            skippedJobPairs: z.array(z.array(z.union([z.string(), z.string()]))).optional(),
            gitHashtagVercel: z
              .array(
                z.enum([
                  "#VERCEL_BUILD_PRIO_1",
                  "#VERCEL_BUILD_PRIO_10",
                  "#VERCEL_BUILD_PRIO_2",
                  "#VERCEL_BUILD_PRIO_3",
                  "#VERCEL_BUILD_PRIO_4",
                  "#VERCEL_BUILD_PRIO_5",
                  "#VERCEL_BUILD_PRIO_6",
                  "#VERCEL_BUILD_PRIO_7",
                  "#VERCEL_BUILD_PRIO_8",
                  "#VERCEL_BUILD_PRIO_9",
                  "#VERCEL_SDDJ_AFTER_GET_REPO_FORCE_CANCEL",
                  "#VERCEL_SDDJ_AFTER_GET_REPO_FORCE_ERROR",
                  "#VERCEL_SDDJ_AFTER_VERIFY_FORCE_CANCEL",
                  "#VERCEL_SDDJ_AFTER_VERIFY_FORCE_ERROR",
                  "#VERCEL_SDDJ_BEFORE_BUILD_JOB_QUEUED_ERROR",
                  "#VERCEL_SDDJ_FORCE_GIT_FORK_ERROR",
                  "#VERCEL_SKIP",
                  "#VERCEL_V0_MESSAGE",
                ]),
              )
              .optional(),
            connectedProjectCount: z.number().optional(),
            prIdOrZero: z.number().optional(),
            gitComments: z.object({ onPullRequest: z.boolean(), onCommit: z.boolean() }).optional(),
            isManualGitDeploy: z.boolean().optional(),
            commitVerification: z.enum(["unknown", "unverified", "verified"]).optional(),
            nsnbSideEffect: z
              .object({
                action: z.enum(["auto-approved-member", "auto-approved-pending-invite"]),
                gitUserLogin: z.string(),
              })
              .optional(),
            committerGitUserId: z.number().optional(),
            committerGitUserType: z.string().optional(),
            createdAt: z.number().optional(),
            forceNew: z.boolean().optional(),
            deploymentId: z.string().optional(),
            deployHook: z
              .object({ createdAt: z.number(), id: z.string(), name: z.string(), ref: z.string() })
              .optional(),
            beforeSha: z.string().optional(),
            defaultBranch: z.string().optional(),
            eventful: z.boolean().optional(),
            githubDeploymentId: z.string().optional(),
            headInfo: z.object({
              org: z.string(),
              ref: z.string(),
              repo: z.string(),
              repoId: z.number(),
              sha: z.string(),
            }),
            installationId: z.number(),
            isPrivate: z.boolean(),
            linkedProjectId: z.string().optional(),
            org: z.string(),
            prId: z.number().nullable(),
            projectId: z.string().optional(),
            customEnvId: z.string().nullable().optional(),
            repo: z.string(),
            repoId: z.number(),
            target: z.string().nullable().optional(),
            url: z.string().optional(),
            withCache: z.boolean().optional(),
            provider: z.enum(["github", "github-custom-host", "github-limited"]),
            customHost: z.string().optional(),
          }),
          z.object({
            createdAt: z.number().optional(),
            eventful: z.boolean().optional(),
            headInfo: z.object({
              org: z.string(),
              ref: z.string(),
              repo: z.string(),
              repoId: z.number(),
              sha: z.string(),
            }),
            beforeSha: z.string().optional(),
            installationId: z.number(),
            isPrivate: z.boolean(),
            linkedProjectId: z.string().optional(),
            org: z.string(),
            prId: z.number(),
            projectId: z.unknown(),
            customEnvId: z.unknown(),
            repo: z.string(),
            repoId: z.number(),
            type: z.literal("now-comment"),
            gitComments: z.object({ onPullRequest: z.boolean(), onCommit: z.boolean() }).optional(),
            provider: z.enum(["github", "github-custom-host", "github-limited"]),
            customHost: z.string().optional(),
          }),
          z.object({
            type: z.literal("gitlab-push"),
            authorized: z.boolean().optional(),
            authorizedBy: z.string().optional(),
            jobProjectIds: z.array(z.string()).optional(),
            jobPairs: z.array(z.array(z.union([z.string(), z.string()]))).optional(),
            skippedJobPairs: z.array(z.array(z.union([z.string(), z.string()]))).optional(),
            gitHashtagVercel: z
              .array(
                z.enum([
                  "#VERCEL_BUILD_PRIO_1",
                  "#VERCEL_BUILD_PRIO_10",
                  "#VERCEL_BUILD_PRIO_2",
                  "#VERCEL_BUILD_PRIO_3",
                  "#VERCEL_BUILD_PRIO_4",
                  "#VERCEL_BUILD_PRIO_5",
                  "#VERCEL_BUILD_PRIO_6",
                  "#VERCEL_BUILD_PRIO_7",
                  "#VERCEL_BUILD_PRIO_8",
                  "#VERCEL_BUILD_PRIO_9",
                  "#VERCEL_SDDJ_AFTER_GET_REPO_FORCE_CANCEL",
                  "#VERCEL_SDDJ_AFTER_GET_REPO_FORCE_ERROR",
                  "#VERCEL_SDDJ_AFTER_VERIFY_FORCE_CANCEL",
                  "#VERCEL_SDDJ_AFTER_VERIFY_FORCE_ERROR",
                  "#VERCEL_SDDJ_BEFORE_BUILD_JOB_QUEUED_ERROR",
                  "#VERCEL_SDDJ_FORCE_GIT_FORK_ERROR",
                  "#VERCEL_SKIP",
                  "#VERCEL_V0_MESSAGE",
                ]),
              )
              .optional(),
            connectedProjectCount: z.number().optional(),
            prIdOrZero: z.number().optional(),
            gitComments: z.object({ onPullRequest: z.boolean(), onCommit: z.boolean() }).optional(),
            isManualGitDeploy: z.boolean().optional(),
            commitVerification: z.enum(["unknown", "unverified", "verified"]).optional(),
            nsnbSideEffect: z
              .object({
                action: z.enum(["auto-approved-member", "auto-approved-pending-invite"]),
                gitUserLogin: z.string(),
              })
              .optional(),
            commit: z
              .object({
                id: z.string(),
                authorAvatar: z.string().nullable().optional(),
                authorEmail: z.string().nullable().optional(),
                authorId: z.number().nullable().optional(),
                authorLogin: z.string().nullable().optional(),
                authorName: z.string().nullable().optional(),
              })
              .optional(),
            createdAt: z.number().optional(),
            deployHook: z
              .object({ createdAt: z.number(), id: z.string(), name: z.string(), ref: z.string() })
              .optional(),
            deploymentId: z.string().optional(),
            eventful: z.boolean().optional(),
            forceNew: z.boolean().optional(),
            headInfo: z.object({
              project: z.object({
                defaultBranch: z.string().nullable().optional(),
                id: z.string(),
                name: z.string().nullable().optional(),
                namespace: z.string().nullable().optional(),
                path: z.string().nullable().optional(),
                url: z.string().nullable().optional(),
              }),
              ref: z.string(),
              sha: z.string(),
            }),
            linkedProjectId: z.string().optional(),
            prId: z.number().optional(),
            project: z.object({
              defaultBranch: z.string().nullable().optional(),
              id: z.string(),
              name: z.string().nullable().optional(),
              namespace: z.string().nullable().optional(),
              path: z.string().nullable().optional(),
              url: z.string().nullable().optional(),
            }),
            projectId: z.string().optional(),
            customEnvId: z.string().nullable().optional(),
            ref: z.string(),
            repoPushedAt: z.number().nullable().optional(),
            sha: z.string(),
            silent: z.boolean().optional(),
            target: z.string().nullable().optional(),
            url: z.string().optional(),
            withCache: z.boolean().optional(),
            provider: z.literal("gitlab"),
          }),
          z.object({
            createdAt: z.number().optional(),
            eventful: z.boolean().optional(),
            headInfo: z.object({
              project: z.object({
                defaultBranch: z.string().nullable().optional(),
                id: z.string(),
                name: z.string().nullable().optional(),
                namespace: z.string().nullable().optional(),
                path: z.string().nullable().optional(),
                url: z.string().nullable().optional(),
              }),
              ref: z.string(),
              sha: z.string(),
            }),
            linkedProjectId: z.string().optional(),
            prId: z.number(),
            project: z.object({
              defaultBranch: z.string().nullable().optional(),
              id: z.string(),
              name: z.string().nullable().optional(),
              namespace: z.string().nullable().optional(),
              path: z.string().nullable().optional(),
              url: z.string().nullable().optional(),
            }),
            projectId: z.string().optional(),
            customEnvId: z.string().nullable().optional(),
            ref: z.string(),
            sha: z.string(),
            type: z.literal("gitlab-now-comment"),
            gitComments: z.object({ onPullRequest: z.boolean(), onCommit: z.boolean() }).optional(),
            provider: z.literal("gitlab"),
          }),
          z.object({
            type: z.literal("vercel-push"),
            ref: z.string(),
            repo: z.string(),
            sha: z.string(),
            repoPushedAt: z.number().nullable().optional(),
            deployHook: z
              .object({ createdAt: z.number(), id: z.string(), name: z.string(), ref: z.string() })
              .optional(),
            url: z.string().optional(),
            target: z.string().nullable().optional(),
            deploymentId: z.string().optional(),
            linkedProjectId: z.string().optional(),
            projectId: z.string().optional(),
            authorized: z.boolean().optional(),
            authorizedBy: z.string().optional(),
            jobProjectIds: z.array(z.string()).optional(),
            jobPairs: z.array(z.array(z.union([z.string(), z.string()]))).optional(),
            skippedJobPairs: z.array(z.array(z.union([z.string(), z.string()]))).optional(),
            gitHashtagVercel: z
              .array(
                z.enum([
                  "#VERCEL_BUILD_PRIO_1",
                  "#VERCEL_BUILD_PRIO_10",
                  "#VERCEL_BUILD_PRIO_2",
                  "#VERCEL_BUILD_PRIO_3",
                  "#VERCEL_BUILD_PRIO_4",
                  "#VERCEL_BUILD_PRIO_5",
                  "#VERCEL_BUILD_PRIO_6",
                  "#VERCEL_BUILD_PRIO_7",
                  "#VERCEL_BUILD_PRIO_8",
                  "#VERCEL_BUILD_PRIO_9",
                  "#VERCEL_SDDJ_AFTER_GET_REPO_FORCE_CANCEL",
                  "#VERCEL_SDDJ_AFTER_GET_REPO_FORCE_ERROR",
                  "#VERCEL_SDDJ_AFTER_VERIFY_FORCE_CANCEL",
                  "#VERCEL_SDDJ_AFTER_VERIFY_FORCE_ERROR",
                  "#VERCEL_SDDJ_BEFORE_BUILD_JOB_QUEUED_ERROR",
                  "#VERCEL_SDDJ_FORCE_GIT_FORK_ERROR",
                  "#VERCEL_SKIP",
                  "#VERCEL_V0_MESSAGE",
                ]),
              )
              .optional(),
            connectedProjectCount: z.number().optional(),
            prIdOrZero: z.number().optional(),
            gitComments: z.object({ onPullRequest: z.boolean(), onCommit: z.boolean() }).optional(),
            isManualGitDeploy: z.boolean().optional(),
            commitVerification: z.enum(["unknown", "unverified", "verified"]).optional(),
            nsnbSideEffect: z
              .object({
                action: z.enum(["auto-approved-member", "auto-approved-pending-invite"]),
                gitUserLogin: z.string(),
              })
              .optional(),
            headInfo: z.object({
              org: z.string(),
              ref: z.string(),
              repo: z.string(),
              sha: z.string(),
            }),
            org: z.string(),
            provider: z.literal("vercel"),
            customEnvId: z.string().nullable().optional(),
            prId: z.number().nullable().optional(),
          }),
          z.object({
            type: z.literal("cursor-origin-push"),
            ref: z.string(),
            sha: z.string(),
            beforeSha: z.string().optional(),
            defaultBranch: z.string().optional(),
            forced: z.boolean().optional(),
            repoPushedAt: z.number().nullable().optional(),
            deployHook: z
              .object({ createdAt: z.number(), id: z.string(), name: z.string(), ref: z.string() })
              .optional(),
            url: z.string().optional(),
            target: z.string().nullable().optional(),
            deploymentId: z.string().optional(),
            linkedProjectId: z.string().optional(),
            projectId: z.string().optional(),
            createdAt: z.number().optional(),
            eventful: z.boolean().optional(),
            forceNew: z.boolean().optional(),
            authorized: z.boolean().optional(),
            authorizedBy: z.string().optional(),
            jobProjectIds: z.array(z.string()).optional(),
            jobPairs: z.array(z.array(z.union([z.string(), z.string()]))).optional(),
            skippedJobPairs: z.array(z.array(z.union([z.string(), z.string()]))).optional(),
            gitHashtagVercel: z
              .array(
                z.enum([
                  "#VERCEL_BUILD_PRIO_1",
                  "#VERCEL_BUILD_PRIO_10",
                  "#VERCEL_BUILD_PRIO_2",
                  "#VERCEL_BUILD_PRIO_3",
                  "#VERCEL_BUILD_PRIO_4",
                  "#VERCEL_BUILD_PRIO_5",
                  "#VERCEL_BUILD_PRIO_6",
                  "#VERCEL_BUILD_PRIO_7",
                  "#VERCEL_BUILD_PRIO_8",
                  "#VERCEL_BUILD_PRIO_9",
                  "#VERCEL_SDDJ_AFTER_GET_REPO_FORCE_CANCEL",
                  "#VERCEL_SDDJ_AFTER_GET_REPO_FORCE_ERROR",
                  "#VERCEL_SDDJ_AFTER_VERIFY_FORCE_CANCEL",
                  "#VERCEL_SDDJ_AFTER_VERIFY_FORCE_ERROR",
                  "#VERCEL_SDDJ_BEFORE_BUILD_JOB_QUEUED_ERROR",
                  "#VERCEL_SDDJ_FORCE_GIT_FORK_ERROR",
                  "#VERCEL_SKIP",
                  "#VERCEL_V0_MESSAGE",
                ]),
              )
              .optional(),
            connectedProjectCount: z.number().optional(),
            prIdOrZero: z.number().optional(),
            gitComments: z.object({ onPullRequest: z.boolean(), onCommit: z.boolean() }).optional(),
            isManualGitDeploy: z.boolean().optional(),
            commitVerification: z.enum(["unknown", "unverified", "verified"]).optional(),
            nsnbSideEffect: z
              .object({
                action: z.enum(["auto-approved-member", "auto-approved-pending-invite"]),
                gitUserLogin: z.string(),
              })
              .optional(),
            headInfo: z.object({
              owner: z.string(),
              ownerId: z.string(),
              ref: z.string(),
              repo: z.string(),
              repoId: z.string(),
              sha: z.string(),
            }),
            installationId: z.string(),
            owner: z.string(),
            repo: z.string(),
            repoId: z.string(),
            provider: z.literal("cursor-origin"),
            customEnvId: z.string().nullable().optional(),
            prId: z.number().nullable().optional(),
          }),
          z.object({
            createdAt: z.number().optional(),
            eventful: z.boolean().optional(),
            headInfo: z.object({
              owner: z.string(),
              ownerId: z.string(),
              ref: z.string(),
              repo: z.string(),
              repoId: z.string(),
              sha: z.string(),
            }),
            installationId: z.string(),
            linkedProjectId: z.string().optional(),
            owner: z.string(),
            prId: z.number(),
            projectId: z.unknown(),
            customEnvId: z.unknown(),
            repo: z.string(),
            repoId: z.string(),
            type: z.literal("cursor-origin-now-comment"),
            gitComments: z.object({ onPullRequest: z.boolean(), onCommit: z.boolean() }).optional(),
            provider: z.literal("cursor-origin"),
          }),
        ]),
      }),
      z.object({
        url: z.string(),
        oldTeam: z.object({ name: z.string() }).optional(),
        newTeam: z.object({ name: z.string() }).optional(),
      }),
      z.object({
        sha: z.string(),
        gitUserPlatform: z.string(),
        projectId: z.string().optional(),
        projectName: z.string(),
        gitCommitterName: z.string(),
        source: z.string(),
        reason: z.literal("ip_allow_list").optional(),
      }),
      z.object({
        deployment: z.object({
          name: z.string(),
          id: z.string(),
          meta: z.record(z.string(), z.string()),
          url: z.string(),
        }),
        deploymentId: z.string(),
        url: z.string(),
      }),
      z.object({
        projectId: z.string().optional(),
        projectName: z.string(),
        deploymentId: z.string().optional(),
        source: z.string(),
        ruleName: z.enum(["deploymentSources", "gitSources"]),
        ruleProvenance: z.enum(["default", "project", "team"]),
      }),
      z.object({
        deploymentId: z.string(),
        deploymentUrl: z.string().nullable(),
        deploymentName: z.string().nullable(),
        projectId: z.string(),
        projectName: z.string(),
      }),
      z.object({
        integrationId: z.string(),
        configurationId: z.string(),
        integrationSlug: z.string(),
        integrationName: z.string(),
        ownerId: z.string(),
        projectIds: z.array(z.string()).optional(),
      }),
      z.object({
        id: z.string(),
        value: z.string(),
        name: z.string(),
        domain: z.string(),
        type: z.string(),
        mxPriority: z.number().optional(),
      }),
      z.object({
        action: z.enum(["add", "delete", "update"]),
        initiator: z.enum(["system", "user"]),
        id: z.string(),
        domain: z.string(),
        name: z.string(),
        type: z.string(),
        value: z.string(),
        mxPriority: z.number().optional(),
        previousValue: z.string().optional(),
        source: z.string().optional(),
      }),
      z.object({
        id: z.string(),
        value: z.string(),
        name: z.string(),
        domain: z.string(),
        type: z.string(),
      }),
      z.object({ name: z.string(), zone: z.boolean().optional() }),
      z.object({ name: z.string(), price: z.number(), currency: z.string().optional() }),
      z.object({ name: z.string(), cdnEnabled: z.boolean() }),
      z.object({
        name: z.string(),
        oldTeam: z.object({ name: z.string() }).optional(),
        newTeam: z.object({ name: z.string() }).optional(),
      }),
      z.object({ name: z.string(), userId: z.string(), teamId: z.string(), ownerName: z.string() }),
      z.object({ domainId: z.string(), name: z.string() }),
      z.object({
        previousServiceType: z.string(),
        serviceType: z.string(),
        id: z.string(),
        name: z.string(),
        nameservers: z.array(z.string()),
      }),
      z.object({
        domain: z.string(),
        customNameservers: z.array(z.string()).nullable(),
        prevCustomNameservers: z.array(z.string()).nullable(),
      }),
      z.object({ domain: z.string() }),
      z.object({
        domain: z.string(),
        echMode: z.enum(["auto", "disabled", "enabled"]),
        previousEchMode: z.enum(["auto", "disabled", "enabled"]),
      }),
      z.object({ domain: z.string(), zone: z.boolean() }),
      z.object({
        domain: z.string(),
        zone: z.boolean(),
        initiator: z.enum(["system", "user"]),
        source: z.string().optional(),
        previousZone: z.boolean().optional(),
      }),
      z.object({
        name: z.string(),
        fromId: z.string().nullable(),
        fromName: z.string().nullable(),
      }),
      z.object({
        name: z.string(),
        destinationId: z.string().nullable(),
        destinationName: z.string().nullable(),
      }),
      z.object({ name: z.string(), destinationId: z.string(), destinationName: z.string() }),
      z.object({ renew: z.boolean().optional(), domain: z.string() }),
      z.object({ name: z.string(), price: z.number().optional(), currency: z.string().optional() }),
      z.object({ name: z.string() }),
      z.object({
        drainUrl: z.string().nullable(),
        drainName: z.string().nullable(),
        integrationName: z.string().optional(),
      }),
      z.object({ drainUrl: z.string().nullable(), integrationName: z.string().optional() }),
      z.object({ projectId: z.string(), projectName: z.string(), srcImages: z.array(z.string()) }),
      z.object({
        projectId: z.string(),
        projectName: z.string(),
        tags: z.array(z.string()),
        target: z.string().optional(),
      }),
      z.object({ projectId: z.string(), projectName: z.string(), path: z.string() }),
      z.object({ projectId: z.string(), projectName: z.string() }),
      z.object({
        edgeConfigId: z.string(),
        edgeConfigSlug: z.string(),
        edgeConfigDigest: z.string(),
      }),
      z.object({
        edgeConfigId: z.string(),
        edgeConfigSlug: z.string(),
        edgeConfigDigest: z.string(),
        edgeConfigBackupVersionId: z.string(),
      }),
      z.object({
        edgeConfigId: z.string(),
        edgeConfigSlug: z.string(),
        edgeConfigSchema: z.object({}).optional(),
      }),
      z.object({
        edgeConfigId: z.string(),
        edgeConfigSlug: z.string(),
        edgeConfigDigest: z.string().optional(),
      }),
      z.object({
        edgeConfig: z.object({ id: z.string(), slug: z.string() }),
        fromAccount: z.object({
          id: z.string(),
          type: z.enum(["team", "user"]),
          slug: z.string().optional(),
          username: z.string().optional(),
        }),
        toAccount: z.object({
          id: z.string(),
          type: z.enum(["team", "user"]),
          slug: z.string().optional(),
          username: z.string().optional(),
        }),
      }),
      z.object({
        edgeConfigId: z.string(),
        edgeConfigSlug: z.string(),
        edgeConfigTokenId: z.string(),
        label: z.string(),
      }),
      z.object({
        edgeConfigId: z.string(),
        edgeConfigSlug: z.string(),
        edgeConfigTokenIds: z.array(z.string()),
      }),
      z.object({ email: z.string(), name: z.string() }),
      z.object({
        team: z.object({ id: z.string(), name: z.string().optional() }),
        previousRule: z.object({ email: z.string() }),
      }),
      z.object({
        team: z.object({ id: z.string(), name: z.string().optional() }),
        previousRule: z.object({ email: z.string() }).optional(),
        nextRule: z.object({ email: z.string() }).optional(),
      }),
      z.object({
        deletedUser: z.object({ username: z.string(), email: z.string() }).optional(),
        deletedUid: z.string().optional(),
        emailDomain: z.string().optional(),
      }),
      z.object({
        key: z.string().optional(),
        projectId: z.string().optional(),
        projectName: z.string().optional(),
        target: z.union([z.string(), z.array(z.string())]).optional(),
        customEnvironmentSlugs: z.array(z.string()).optional(),
        id: z.string().optional(),
        gitBranch: z.string().optional(),
        edgeConfigId: z.string().nullable().optional(),
        edgeConfigTokenId: z.string().nullable().optional(),
        source: z.string().optional(),
        ipAddress: z.string().optional(),
      }),
      z.object({
        key: z.string().optional(),
        projectId: z.string().optional(),
        projectName: z.string().optional(),
        target: z.union([z.string(), z.array(z.string())]).optional(),
        customEnvironmentSlugs: z.array(z.string()).optional(),
        id: z.string().optional(),
        gitBranch: z.string().optional(),
        edgeConfigId: z.string().nullable().optional(),
        edgeConfigTokenId: z.string().nullable().optional(),
        source: z.string().optional(),
        ipAddress: z.string().optional(),
        deploymentId: z.string(),
        deploymentUrl: z.string(),
      }),
      z.object({
        created: z.string().optional(),
        key: z.string().optional(),
        ownerId: z.string().nullable().optional(),
        id: z.string().optional(),
        createdBy: z.string().nullable().optional(),
        deletedBy: z.string().nullable().optional(),
        updatedBy: z.string().nullable().optional(),
        createdAt: z.number().optional(),
        deletedAt: z.number().optional(),
        updatedAt: z.number().optional(),
        value: z.string().optional(),
        projectId: z.array(z.string()).optional(),
        type: z.enum(["encrypted", "plain", "sensitive", "system"]).optional(),
        target: z.array(z.enum(["development", "preview", "production"])).optional(),
        applyToAllCustomEnvironments: z.boolean().optional(),
        customEnvironmentIds: z.array(z.string()).optional(),
        decrypted: z.boolean().optional(),
        comment: z.string().optional(),
        lastEditedByDisplayName: z.string().optional(),
        projectNames: z.array(z.string()).optional(),
        ipAddress: z.string().optional(),
      }),
      z.object({
        oldEnvVar: z
          .object({
            created: z.string().optional(),
            key: z.string().optional(),
            ownerId: z.string().nullable().optional(),
            id: z.string().optional(),
            createdBy: z.string().nullable().optional(),
            deletedBy: z.string().nullable().optional(),
            updatedBy: z.string().nullable().optional(),
            createdAt: z.number().optional(),
            deletedAt: z.number().optional(),
            updatedAt: z.number().optional(),
            value: z.string().optional(),
            projectId: z.array(z.string()).optional(),
            type: z.enum(["encrypted", "plain", "sensitive", "system"]).optional(),
            target: z.array(z.enum(["development", "preview", "production"])).optional(),
            applyToAllCustomEnvironments: z.boolean().optional(),
            customEnvironmentIds: z.array(z.string()).optional(),
            decrypted: z.boolean().optional(),
            comment: z.string().optional(),
            lastEditedByDisplayName: z.string().optional(),
          })
          .optional(),
        newEnvVar: z
          .object({
            created: z.string().optional(),
            key: z.string().optional(),
            ownerId: z.string().nullable().optional(),
            id: z.string().optional(),
            createdBy: z.string().nullable().optional(),
            deletedBy: z.string().nullable().optional(),
            updatedBy: z.string().nullable().optional(),
            createdAt: z.number().optional(),
            deletedAt: z.number().optional(),
            updatedAt: z.number().optional(),
            value: z.string().optional(),
            projectId: z.array(z.string()).optional(),
            type: z.enum(["encrypted", "plain", "sensitive", "system"]).optional(),
            target: z.array(z.enum(["development", "preview", "production"])).optional(),
            applyToAllCustomEnvironments: z.boolean().optional(),
            customEnvironmentIds: z.array(z.string()).optional(),
            decrypted: z.boolean().optional(),
            comment: z.string().optional(),
            lastEditedByDisplayName: z.string().optional(),
          })
          .optional(),
        updateDiff: z
          .object({
            id: z.string(),
            key: z.string().optional(),
            newKey: z.string().optional(),
            oldTarget: z.array(z.enum(["development", "preview", "production"])).optional(),
            newTarget: z.array(z.enum(["development", "preview", "production"])).optional(),
            oldType: z.string().optional(),
            newType: z.string().optional(),
            oldProjects: z
              .array(z.object({ projectName: z.string().optional(), projectId: z.string() }))
              .optional(),
            newProjects: z
              .array(z.object({ projectName: z.string().optional(), projectId: z.string() }))
              .optional(),
            oldCustomEnvironmentIds: z.array(z.string()).optional(),
            newCustomEnvironmentIds: z.array(z.string()).optional(),
            changedValue: z.boolean(),
          })
          .optional(),
      }),
      z.object({
        projectId: z.string(),
        scope: z.string(),
        source: z.string(),
        expiresAt: z.number().nullable().optional(),
      }),
      z.object({ projectId: z.string(), scope: z.string(), source: z.string() }),
      z.object({
        projectId: z.string(),
        projectName: z.string(),
        configVersion: z.union([z.string(), z.number()]),
      }),
      z.object({ configVersion: z.union([z.string(), z.number()]) }),
      z.object({
        configVersion: z.union([z.string(), z.number()]),
        configChangeCount: z.number().optional(),
        configChanges: z.array(z.object({})).optional(),
      }),
      z.object({
        projectId: z.string(),
        projectName: z.string().optional(),
        restore: z.boolean(),
        configVersion: z.number(),
        configChangeCount: z.number(),
        configChanges: z.array(z.object({})),
      }),
      z.object({
        projectId: z.string(),
        rulesetName: z.string(),
        ruleGroups: z.record(
          z.string(),
          z.object({
            active: z.boolean(),
            action: z.enum(["challenge", "deny", "log"]).optional(),
          }),
        ),
      }),
      z.object({
        projectId: z.string(),
        rulesetName: z.string(),
        active: z.boolean(),
        action: z.enum(["challenge", "deny", "log"]).optional(),
      }),
      z.object({ projectId: z.string(), previousOwnerId: z.string(), newOwnerId: z.string() }),
      z.object({ action: z.enum(["disable", "enable"]) }),
      z.object({
        provider: z.enum(["bitbucket", "cursor-origin", "github", "gitlab"]),
        actorLogin: z.string().nullable(),
        actorAccountId: z.string().nullable(),
        installationId: z.string().nullable(),
        usedAppToken: z.boolean(),
        sourceRepo: z.string().nullable(),
        sourceCommitSha: z.string().nullable(),
        destinationRepo: z.string(),
        destinationBranch: z.string().nullable(),
        resultCommitSha: z.string().nullable(),
        outcome: z.enum(["failure", "success"]),
        failureStage: z
          .enum(["authorization", "push", "unexpected", "unknown", "validation"])
          .optional(),
        failureCode: z.string().optional(),
      }),
      z.object({
        projectId: z.string(),
        fromDeploymentId: z.string(),
        toDeploymentId: z.string(),
        projectName: z.string(),
        reason: z.string().optional(),
      }),
      z.object({
        integrationId: z.string(),
        configurationId: z.string(),
        integrationSlug: z.string(),
        integrationName: z.string(),
      }),
      z.object({
        userId: z.string(),
        integrationId: z.string(),
        configurationId: z.string(),
        integrationSlug: z.string(),
        integrationName: z.string().optional(),
        newOwner: z
          .object({
            abuse: z
              .object({
                blockHistory: z
                  .array(
                    z.object({
                      action: z.enum(["blocked", "hard-blocked", "soft-blocked", "unblocked"]),
                      createdAt: z.number(),
                      caseId: z.string().optional(),
                      reason: z.string(),
                      actor: z.string().optional(),
                      statusCode: z.number().optional(),
                      comment: z.string().optional(),
                      ineligibleForAppeal: z.boolean().optional(),
                    }),
                  )
                  .optional(),
                gitAuthHistory: z.array(z.string()).optional(),
                history: z
                  .array(
                    z.object({
                      scanner: z.string(),
                      reason: z.string(),
                      by: z.string(),
                      byId: z.string(),
                      at: z.number(),
                    }),
                  )
                  .optional(),
                gitLineageBlocks: z.number().optional(),
                gitLineageBlocksDry: z.number().optional(),
                scanner: z.string().optional(),
                scheduledUnblockAt: z.string().optional(),
                scheduledBlock: z
                  .object({
                    executeAt: z.number(),
                    reason: z.string(),
                    source: z.string(),
                    createdAt: z.number(),
                    caseId: z.string().optional(),
                    scheduleName: z.string().optional(),
                  })
                  .optional(),
                updatedAt: z.number(),
                creationUserAgent: z.string().optional(),
                creationIp: z.string().optional(),
                removedPhoneNumbers: z.string().optional(),
              })
              .optional(),
            acceptanceState: z.string().optional(),
            acceptedAt: z.number().optional(),
            avatar: z.string().optional(),
            billing: z.object({ plan: z.enum(["enterprise", "hobby", "pro"]) }),
            blocked: z.number().nullable(),
            blockReason: z.string().optional(),
            created: z.number().optional(),
            createdAt: z.number(),
            credentials: z
              .array(
                z.union([
                  z.object({
                    type: z.enum([
                      "apple",
                      "bitbucket",
                      "chatgpt",
                      "github-oauth",
                      "github-oauth-limited",
                      "gitlab",
                      "google",
                      "vercel",
                    ]),
                    id: z.string(),
                  }),
                  z.object({
                    type: z.literal("github-oauth-custom-host"),
                    host: z.string(),
                    id: z.string(),
                  }),
                ]),
              )
              .optional(),
            customerId: z.string().nullable().optional(),
            orbCustomerId: z.string().nullable().optional(),
            dataCache: z.object({ excessBillingEnabled: z.boolean().optional() }).optional(),
            deletedAt: z.number().nullable().optional(),
            deploymentSecret: z.string(),
            dismissedTeams: z.array(z.string()).optional(),
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
            email: z.string(),
            id: z.string(),
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
            isDomainReseller: z.boolean().optional(),
            isZeitPub: z.boolean().optional(),
            testAccountExpiresAt: z.number().optional(),
            maxActiveSlots: z.number().optional(),
            name: z.string().optional(),
            phoneNumber: z.string().optional(),
            platformVersion: z.number().nullable(),
            preventAutoBlocking: z.union([z.number(), z.boolean()]).optional(),
            projectDomainsLimit: z.number().optional(),
            projectCardWidgetPreferences: z
              .array(
                z.object({
                  projectId: z.string(),
                  widget: z.enum([
                    "analytics-online",
                    "analytics-page-views",
                    "analytics-visitors",
                    "firewall-allowed",
                    "firewall-denied",
                    "observability-alert",
                    "observability-edge-requests",
                    "observability-error-rate",
                    "observability-function-invocations",
                    "speed-insights-cls",
                    "speed-insights-lcp",
                    "speed-insights-res",
                  ]),
                }),
              )
              .optional(),
            remoteCaching: z.object({ enabled: z.boolean().optional() }).optional(),
            removedAliasesAt: z.number().optional(),
            removedBillingSubscriptionAt: z.number().optional(),
            removedConfigurationsAt: z.number().optional(),
            removedDeploymentsAt: z.number().optional(),
            removedDomiansAt: z.number().optional(),
            removedEventsAt: z.number().optional(),
            removedProjectsAt: z.number().optional(),
            removedSecretsAt: z.number().optional(),
            removedSharedEnvVarsAt: z.number().optional(),
            removedEdgeConfigsAt: z.number().optional(),
            resourceConfig: z
              .object({
                concurrentBuilds: z.number().optional(),
                nodeType: z.string().optional(),
                elasticConcurrencyEnabled: z.boolean().optional(),
                buildEntitlements: z.object({ enhancedBuilds: z.boolean().optional() }).optional(),
                buildQueue: z
                  .object({
                    configuration: z
                      .enum(["SKIP_NAMESPACE_QUEUE", "WAIT_FOR_NAMESPACE_QUEUE"])
                      .optional(),
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
                buildMachine: z
                  .object({
                    default: z
                      .enum(["basic", "elastic", "enhanced", "standard", "turbo"])
                      .optional(),
                  })
                  .optional(),
              })
              .optional(),
            resourceLimits: z
              .record(
                z.string(),
                z.union([
                  z.object({ max: z.number(), duration: z.number() }),
                  z.object({
                    minRate: z.number().optional(),
                    maxRate: z.number().optional(),
                    stepPerMinute: z.number().optional(),
                  }),
                ]),
              )
              .optional(),
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
            secondaryEmails: z
              .array(z.object({ email: z.string(), verified: z.boolean() }))
              .optional(),
            emailDomains: z.array(z.string()).optional(),
            emailNotifications: z
              .object({ rules: z.record(z.string(), z.object({ email: z.string() })).optional() })
              .optional(),
            siftScore: z.number().optional(),
            siftScores: z
              .record(
                z.string(),
                z.object({
                  score: z.number(),
                  reasons: z.array(z.object({ name: z.string(), value: z.string() })),
                }),
              )
              .optional(),
            siftRoute: z.object({ name: z.literal("string") }).optional(),
            sfdcId: z.string().optional(),
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
              .nullable()
              .optional(),
            stagingPrefix: z.string(),
            sysToken: z.string(),
            teams: z
              .array(
                z.object({
                  teamId: z.string(),
                  createdAt: z.number(),
                  role: z.enum([
                    "BILLING",
                    "CONTRIBUTOR",
                    "DEVELOPER",
                    "MEMBER",
                    "OWNER",
                    "SECURITY",
                    "VIEWER",
                    "VIEWER_FOR_PLUS",
                  ]),
                  confirmed: z.literal(true),
                  confirmedAt: z.number(),
                  accessRequestedAt: z.number().optional(),
                  teamRoles: z
                    .array(
                      z.enum([
                        "BILLING",
                        "CONTRIBUTOR",
                        "DEVELOPER",
                        "MEMBER",
                        "OWNER",
                        "SECURITY",
                        "VIEWER",
                        "VIEWER_FOR_PLUS",
                      ]),
                    )
                    .optional(),
                  teamPermissions: z
                    .array(
                      z.enum([
                        "AiGatewayApiKeyOwnedBySelf",
                        "AiGatewayBudgetManager",
                        "AiGatewayCredits",
                        "AiGatewaySettings",
                        "ConnectorManager",
                        "CreateProject",
                        "EnvVariableManager",
                        "EnvironmentManager",
                        "FullProductionDeployment",
                        "IntegrationManager",
                        "OrgAdmin",
                        "OrgViewer",
                        "UsageViewer",
                        "V0Builder",
                        "V0Chatter",
                        "V0Viewer",
                        "WorkflowDecryptor",
                      ]),
                    )
                    .optional(),
                  created: z.number(),
                  joinedFrom: z
                    .object({
                      origin: z.enum([
                        "account-update",
                        "bitbucket",
                        "dsync",
                        "feedback",
                        "github",
                        "gitlab",
                        "import",
                        "link",
                        "mail",
                        "nsnb-auto-approve",
                        "nsnb-hobby-upgrade",
                        "nsnb-invite",
                        "nsnb-redeploy",
                        "nsnb-redeploy-attribution-card",
                        "nsnb-request-access",
                        "nsnb-viewer-upgrade",
                        "organization-teams",
                        "saml",
                        "teams",
                      ]),
                      commitId: z.string().optional(),
                      repoId: z.string().optional(),
                      repoPath: z.string().optional(),
                      gitUserId: z.union([z.string(), z.number()]).optional(),
                      gitUserLogin: z.string().optional(),
                      ssoUserId: z.string().optional(),
                      ssoConnectedAt: z.number().optional(),
                      idpUserId: z.string().optional(),
                      dsyncUserId: z.string().optional(),
                      dsyncConnectedAt: z.number().optional(),
                    })
                    .optional(),
                }),
              )
              .optional(),
            trialTeamIds: z.array(z.string()).optional(),
            maxTrials: z.number().optional(),
            trialTeamId: z.string().optional(),
            type: z.literal("user"),
            usageAlerts: z
              .object({
                warningAt: z.number().nullable().optional(),
                blockingAt: z.number().nullable().optional(),
              })
              .nullable()
              .optional(),
            overageUsageAlerts: z
              .object({
                analyticsUsage: z
                  .object({
                    currentThreshold: z.number(),
                    warningAt: z.number().nullable().optional(),
                    blockedAt: z.number().nullable().optional(),
                  })
                  .optional(),
                artifacts: z
                  .object({
                    currentThreshold: z.number(),
                    warningAt: z.number().nullable().optional(),
                    blockedAt: z.number().nullable().optional(),
                  })
                  .optional(),
                bandwidth: z
                  .object({
                    currentThreshold: z.number(),
                    warningAt: z.number().nullable().optional(),
                    blockedAt: z.number().nullable().optional(),
                  })
                  .optional(),
                blobTotalAdvancedRequests: z
                  .object({
                    currentThreshold: z.number(),
                    warningAt: z.number().nullable().optional(),
                    blockedAt: z.number().nullable().optional(),
                  })
                  .optional(),
                blobTotalAvgSizeInBytes: z
                  .object({
                    currentThreshold: z.number(),
                    warningAt: z.number().nullable().optional(),
                    blockedAt: z.number().nullable().optional(),
                  })
                  .optional(),
                blobTotalGetResponseObjectSizeInBytes: z
                  .object({
                    currentThreshold: z.number(),
                    warningAt: z.number().nullable().optional(),
                    blockedAt: z.number().nullable().optional(),
                  })
                  .optional(),
                blobTotalSimpleRequests: z
                  .object({
                    currentThreshold: z.number(),
                    warningAt: z.number().nullable().optional(),
                    blockedAt: z.number().nullable().optional(),
                  })
                  .optional(),
                connectDataTransfer: z
                  .object({
                    currentThreshold: z.number(),
                    warningAt: z.number().nullable().optional(),
                    blockedAt: z.number().nullable().optional(),
                  })
                  .optional(),
                dataCacheRead: z
                  .object({
                    currentThreshold: z.number(),
                    warningAt: z.number().nullable().optional(),
                    blockedAt: z.number().nullable().optional(),
                  })
                  .optional(),
                dataCacheWrite: z
                  .object({
                    currentThreshold: z.number(),
                    warningAt: z.number().nullable().optional(),
                    blockedAt: z.number().nullable().optional(),
                  })
                  .optional(),
                edgeConfigRead: z
                  .object({
                    currentThreshold: z.number(),
                    warningAt: z.number().nullable().optional(),
                    blockedAt: z.number().nullable().optional(),
                  })
                  .optional(),
                edgeConfigWrite: z
                  .object({
                    currentThreshold: z.number(),
                    warningAt: z.number().nullable().optional(),
                    blockedAt: z.number().nullable().optional(),
                  })
                  .optional(),
                edgeFunctionExecutionUnits: z
                  .object({
                    currentThreshold: z.number(),
                    warningAt: z.number().nullable().optional(),
                    blockedAt: z.number().nullable().optional(),
                  })
                  .optional(),
                edgeMiddlewareInvocations: z
                  .object({
                    currentThreshold: z.number(),
                    warningAt: z.number().nullable().optional(),
                    blockedAt: z.number().nullable().optional(),
                  })
                  .optional(),
                edgeRequestAdditionalCpuDuration: z
                  .object({
                    currentThreshold: z.number(),
                    warningAt: z.number().nullable().optional(),
                    blockedAt: z.number().nullable().optional(),
                  })
                  .optional(),
                edgeRequest: z
                  .object({
                    currentThreshold: z.number(),
                    warningAt: z.number().nullable().optional(),
                    blockedAt: z.number().nullable().optional(),
                  })
                  .optional(),
                elasticConcurrencyBuildSlots: z
                  .object({
                    currentThreshold: z.number(),
                    warningAt: z.number().nullable().optional(),
                    blockedAt: z.number().nullable().optional(),
                  })
                  .optional(),
                fastDataTransfer: z
                  .object({
                    currentThreshold: z.number(),
                    warningAt: z.number().nullable().optional(),
                    blockedAt: z.number().nullable().optional(),
                  })
                  .optional(),
                fastOriginTransfer: z
                  .object({
                    currentThreshold: z.number(),
                    warningAt: z.number().nullable().optional(),
                    blockedAt: z.number().nullable().optional(),
                  })
                  .optional(),
                fluidCpuDuration: z
                  .object({
                    currentThreshold: z.number(),
                    warningAt: z.number().nullable().optional(),
                    blockedAt: z.number().nullable().optional(),
                  })
                  .optional(),
                fluidDuration: z
                  .object({
                    currentThreshold: z.number(),
                    warningAt: z.number().nullable().optional(),
                    blockedAt: z.number().nullable().optional(),
                  })
                  .optional(),
                functionDuration: z
                  .object({
                    currentThreshold: z.number(),
                    warningAt: z.number().nullable().optional(),
                    blockedAt: z.number().nullable().optional(),
                  })
                  .optional(),
                functionInvocation: z
                  .object({
                    currentThreshold: z.number(),
                    warningAt: z.number().nullable().optional(),
                    blockedAt: z.number().nullable().optional(),
                  })
                  .optional(),
                imageOptimizationCacheRead: z
                  .object({
                    currentThreshold: z.number(),
                    warningAt: z.number().nullable().optional(),
                    blockedAt: z.number().nullable().optional(),
                  })
                  .optional(),
                imageOptimizationCacheWrite: z
                  .object({
                    currentThreshold: z.number(),
                    warningAt: z.number().nullable().optional(),
                    blockedAt: z.number().nullable().optional(),
                  })
                  .optional(),
                imageOptimizationTransformation: z
                  .object({
                    currentThreshold: z.number(),
                    warningAt: z.number().nullable().optional(),
                    blockedAt: z.number().nullable().optional(),
                  })
                  .optional(),
                logDrainsVolume: z
                  .object({
                    currentThreshold: z.number(),
                    warningAt: z.number().nullable().optional(),
                    blockedAt: z.number().nullable().optional(),
                  })
                  .optional(),
                monitoringMetric: z
                  .object({
                    currentThreshold: z.number(),
                    warningAt: z.number().nullable().optional(),
                    blockedAt: z.number().nullable().optional(),
                  })
                  .optional(),
                blobDataTransfer: z
                  .object({
                    currentThreshold: z.number(),
                    warningAt: z.number().nullable().optional(),
                    blockedAt: z.number().nullable().optional(),
                  })
                  .optional(),
                observabilityEvent: z
                  .object({
                    currentThreshold: z.number(),
                    warningAt: z.number().nullable().optional(),
                    blockedAt: z.number().nullable().optional(),
                  })
                  .optional(),
                onDemandConcurrencyMinutes: z
                  .object({
                    currentThreshold: z.number(),
                    warningAt: z.number().nullable().optional(),
                    blockedAt: z.number().nullable().optional(),
                  })
                  .optional(),
                runtimeCacheRead: z
                  .object({
                    currentThreshold: z.number(),
                    warningAt: z.number().nullable().optional(),
                    blockedAt: z.number().nullable().optional(),
                  })
                  .optional(),
                runtimeCacheWrite: z
                  .object({
                    currentThreshold: z.number(),
                    warningAt: z.number().nullable().optional(),
                    blockedAt: z.number().nullable().optional(),
                  })
                  .optional(),
                serverlessFunctionExecution: z
                  .object({
                    currentThreshold: z.number(),
                    warningAt: z.number().nullable().optional(),
                    blockedAt: z.number().nullable().optional(),
                  })
                  .optional(),
                sourceImages: z
                  .object({
                    currentThreshold: z.number(),
                    warningAt: z.number().nullable().optional(),
                    blockedAt: z.number().nullable().optional(),
                  })
                  .optional(),
                wafOwaspExcessBytes: z
                  .object({
                    currentThreshold: z.number(),
                    warningAt: z.number().nullable().optional(),
                    blockedAt: z.number().nullable().optional(),
                  })
                  .optional(),
                wafOwaspRequests: z
                  .object({
                    currentThreshold: z.number(),
                    warningAt: z.number().nullable().optional(),
                    blockedAt: z.number().nullable().optional(),
                  })
                  .optional(),
                wafRateLimitRequest: z
                  .object({
                    currentThreshold: z.number(),
                    warningAt: z.number().nullable().optional(),
                    blockedAt: z.number().nullable().optional(),
                  })
                  .optional(),
                webAnalyticsEvent: z
                  .object({
                    currentThreshold: z.number(),
                    warningAt: z.number().nullable().optional(),
                    blockedAt: z.number().nullable().optional(),
                  })
                  .optional(),
              })
              .optional(),
            overageMetadata: z
              .object({
                firstTimeOnDemandNotificationSentAt: z.number().optional(),
                dailyOverageSummaryEmailSentAt: z.number().optional(),
                weeklyOverageSummaryEmailSentAt: z.number().optional(),
                overageSummaryExpiresAt: z.number().optional(),
                increasedOnDemandEmailSentAt: z.number().optional(),
                increasedOnDemandEmailAttemptedAt: z.number().optional(),
                hobbyPolicyNoticeSlackSentAt: z.number().optional(),
                hobbyWarningV2SlackSentAt: z.number().optional(),
                hobbyWarningV2At100SlackSentAt: z.number().optional(),
                hobbyPauseNoticeSlackSentAt: z.number().optional(),
                hobbyPolicySlackThreadTs: z.string().optional(),
              })
              .optional(),
            speedInsightsFreeUsageAlert: z
              .object({ currentThreshold: z.number(), notifiedAt: z.number() })
              .optional(),
            username: z.string(),
            updatedAt: z.number(),
            enablePreviewFeedback: z
              .enum(["default", "default-force", "off", "off-force", "on", "on-force"])
              .optional(),
            featureBlocks: z
              .object({
                webAnalytics: z
                  .object({
                    updatedAt: z.number(),
                    blockedFrom: z.number().optional(),
                    blockedUntil: z.number().optional(),
                    blockReason: z.enum(["admin_override", "hard_blocked", "limits_exceeded"]),
                    graceEmailSentAt: z.number().optional(),
                  })
                  .optional(),
                monitoring: z
                  .object({
                    updatedAt: z.number(),
                    blockedFrom: z.number().optional(),
                    blockedUntil: z.number().optional(),
                    blockReason: z.enum(["admin_override", "hard_blocked", "limits_exceeded"]),
                    blockType: z.enum(["hard", "soft"]),
                  })
                  .optional(),
                observabilityPlus: z
                  .object({
                    updatedAt: z.number(),
                    blockedFrom: z.number().optional(),
                    blockedUntil: z.number().optional(),
                    blockReason: z.enum(["admin_override", "hard_blocked", "limits_exceeded"]),
                    blockType: z.enum(["hard", "soft"]),
                  })
                  .optional(),
                dataCache: z
                  .object({
                    updatedAt: z.number(),
                    blockedFrom: z.number().optional(),
                    blockedUntil: z.number().optional(),
                    blockReason: z.enum(["admin_override", "hard_blocked", "limits_exceeded"]),
                  })
                  .optional(),
                imageOptimizationTransformation: z
                  .object({
                    updatedAt: z.number(),
                    blockedFrom: z.number().optional(),
                    blockedUntil: z.number().optional(),
                    blockReason: z.enum(["admin_override", "hard_blocked", "limits_exceeded"]),
                  })
                  .optional(),
                sourceImages: z
                  .object({
                    updatedAt: z.number(),
                    blockedFrom: z.number().optional(),
                    blockedUntil: z.number().optional(),
                    blockReason: z.enum(["admin_override", "hard_blocked", "limits_exceeded"]),
                  })
                  .optional(),
                blob: z
                  .union([
                    z.object({
                      updatedAt: z.number(),
                      blockedFrom: z.number().optional(),
                      blockedUntil: z.number().optional(),
                      blockReason: z.literal("limits_exceeded"),
                      overageReason: z.enum([
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
                    }),
                    z.object({
                      updatedAt: z.number(),
                      blockedFrom: z.number().optional(),
                      blockedUntil: z.number().optional(),
                      blockReason: z.enum(["admin_override", "hard_blocked"]),
                    }),
                  ])
                  .optional(),
                postgres: z
                  .union([
                    z.object({
                      updatedAt: z.number(),
                      blockedFrom: z.number().optional(),
                      blockedUntil: z.number().optional(),
                      blockReason: z.literal("limits_exceeded"),
                      overageReason: z.enum([
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
                    }),
                    z.object({
                      updatedAt: z.number(),
                      blockedFrom: z.number().optional(),
                      blockedUntil: z.number().optional(),
                      blockReason: z.enum(["admin_override", "hard_blocked"]),
                    }),
                  ])
                  .optional(),
                redis: z
                  .union([
                    z.object({
                      updatedAt: z.number(),
                      blockedFrom: z.number().optional(),
                      blockedUntil: z.number().optional(),
                      blockReason: z.literal("limits_exceeded"),
                      overageReason: z.enum([
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
                    }),
                    z.object({
                      updatedAt: z.number(),
                      blockedFrom: z.number().optional(),
                      blockedUntil: z.number().optional(),
                      blockReason: z.enum(["admin_override", "hard_blocked"]),
                    }),
                  ])
                  .optional(),
                microfrontendsRequest: z
                  .object({
                    updatedAt: z.number(),
                    blockedFrom: z.number().optional(),
                    blockedUntil: z.number().optional(),
                    blockReason: z.enum(["admin_override", "hard_blocked", "limits_exceeded"]),
                  })
                  .optional(),
                workflowStorageWrite: z
                  .object({
                    updatedAt: z.number(),
                    blockedFrom: z.number().optional(),
                    blockedUntil: z.number().optional(),
                    blockReason: z.enum(["admin_override", "hard_blocked", "limits_exceeded"]),
                  })
                  .optional(),
                workflowEvents: z
                  .object({
                    updatedAt: z.number(),
                    blockedFrom: z.number().optional(),
                    blockedUntil: z.number().optional(),
                    blockReason: z.enum(["admin_override", "hard_blocked", "limits_exceeded"]),
                  })
                  .optional(),
                connexForwardTriggers: z
                  .object({
                    updatedAt: z.number(),
                    blockedFrom: z.number().optional(),
                    blockedUntil: z.number().optional(),
                    blockReason: z.enum(["admin_override", "hard_blocked", "limits_exceeded"]),
                  })
                  .optional(),
                connexTokenRequests: z
                  .object({
                    updatedAt: z.number(),
                    blockedFrom: z.number().optional(),
                    blockedUntil: z.number().optional(),
                    blockReason: z.enum(["admin_override", "hard_blocked", "limits_exceeded"]),
                  })
                  .optional(),
                kmsOperations: z
                  .object({
                    updatedAt: z.number(),
                    blockedFrom: z.number().optional(),
                    blockedUntil: z.number().optional(),
                    blockReason: z.enum(["admin_override", "hard_blocked", "limits_exceeded"]),
                  })
                  .optional(),
                tracing: z
                  .object({
                    updatedAt: z.number(),
                    blockedFrom: z.number().optional(),
                    blockedUntil: z.number().optional(),
                    blockReason: z.enum(["admin_override", "hard_blocked", "limits_exceeded"]),
                  })
                  .optional(),
                vcr: z
                  .object({
                    updatedAt: z.number(),
                    blockedFrom: z.number().optional(),
                    blockedUntil: z.number().optional(),
                    blockReason: z.enum(["admin_override", "hard_blocked", "limits_exceeded"]),
                  })
                  .optional(),
                speedInsightsFree: z
                  .object({
                    updatedAt: z.number(),
                    blockedFrom: z.number().optional(),
                    blockedUntil: z.number().optional(),
                    blockReason: z.enum(["admin_override", "hard_blocked", "limits_exceeded"]),
                  })
                  .optional(),
              })
              .optional(),
            defaultTeamId: z.string().optional(),
            version: z.literal("northstar"),
            isMFAEnforced: z.boolean().optional(),
            northstarMigration: z
              .object({
                teamId: z.string(),
                projects: z.number(),
                stores: z.number(),
                integrationConfigurations: z.number(),
                integrationClients: z.number(),
                startTime: z.number(),
                endTime: z.number(),
              })
              .optional(),
            opportunityId: z.string().optional(),
            mfaConfiguration: z
              .object({
                enabled: z.boolean(),
                enabledAt: z.number().optional(),
                recoveryCodes: z.array(z.string()),
                totp: z.object({ secret: z.string(), createdAt: z.number() }).optional(),
                history: z
                  .array(
                    z.object({
                      action: z.enum(["disabled", "enabled"]),
                      timestamp: z.number().nullable(),
                      method: z.enum([
                        "admin_removal",
                        "passkey",
                        "self_serve_recovery",
                        "totp",
                        "unknown",
                        "user_disabled",
                      ]),
                      actorId: z.string(),
                      actorType: z.enum(["admin", "user"]),
                      reason: z.string().optional(),
                    }),
                  )
                  .optional(),
              })
              .optional(),
            isEnterpriseManaged: z.boolean().optional(),
          })
          .nullable(),
      }),
      z.object({
        integrationId: z.string(),
        configurationId: z.string(),
        integrationSlug: z.string(),
        integrationName: z.string(),
        ownerId: z.string(),
        projectIds: z.array(z.string()).optional(),
        confirmedScopes: z.array(z.string()),
      }),
      z.object({
        integration: z.object({
          id: z.string(),
          slug: z.string(),
          name: z.string(),
          configurationId: z.string(),
        }),
        destinationTeamId: z.string(),
        destinationTeamName: z.string(),
      }),
      z.object({
        integration: z.object({
          id: z.string(),
          slug: z.string(),
          name: z.string(),
          configurationId: z.string(),
        }),
        originTeamId: z.string(),
        originTeamName: z.string(),
      }),
      z.object({
        configurations: z.array(
          z.object({
            integrationId: z.string(),
            configurationId: z.string(),
            integrationSlug: z.string(),
            integrationName: z.string().optional(),
          }),
        ),
        ownerId: z.string(),
      }),
      z.object({
        integrationId: z.string(),
        configurationId: z.string(),
        integrationSlug: z.string(),
        integrationName: z.string(),
        ownerId: z.string(),
        billingPlanId: z.string(),
        billingPlanName: z.string().optional(),
      }),
      z.object({
        integrationId: z.string(),
        configurationId: z.string(),
        integrationSlug: z.string(),
        integrationName: z.string(),
        ownerId: z.string(),
        projectIds: z.union([z.array(z.string()), z.literal("all")]).optional(),
      }),
      z.object({
        resourceId: z.string(),
        integrationId: z.string(),
        integrationSlug: z.string(),
        integrationProductSlug: z.string(),
        configurationId: z.string(),
        databaseName: z.string(),
        queryType: z.enum(["data-edit", "data-view", "schema", "user"]),
        readonly: z.boolean(),
        rolledBack: z.boolean(),
        failedQueryIndex: z.number().nullable(),
        errorCode: z.string().nullable(),
        queryCount: z.number(),
        queries: z.array(
          z.object({
            command: z.string().nullable(),
            rowCount: z.number().optional(),
            tables: z.array(z.string()).optional(),
            primaryKey: z
              .array(z.object({ column: z.string(), value: z.string().nullable() }))
              .optional(),
          }),
        ),
      }),
      z.object({
        resourceId: z.string(),
        integrationId: z.string(),
        integrationSlug: z.string(),
        integrationProductSlug: z.string(),
        configurationId: z.string(),
        error: z.string().optional(),
        requestKind: z.literal("raw_commands"),
        readonly: z.boolean(),
        commands: z.array(z.string()),
        failedIndex: z.number().optional(),
      }),
      z.object({
        resourceId: z.string(),
        integrationId: z.string(),
        integrationSlug: z.string(),
        integrationProductSlug: z.string(),
        configurationId: z.string(),
        error: z.string().optional(),
        requestKind: z.literal("list_keys"),
        pattern: z.string().optional(),
        type: z.string().optional(),
      }),
      z.object({
        resourceId: z.string(),
        integrationId: z.string(),
        integrationSlug: z.string(),
        integrationProductSlug: z.string(),
        configurationId: z.string(),
        error: z.string().optional(),
        requestKind: z.literal("get_keys_metadata"),
        keys: z.array(z.string()),
      }),
      z.object({
        resourceId: z.string(),
        integrationId: z.string(),
        integrationSlug: z.string(),
        integrationProductSlug: z.string(),
        configurationId: z.string(),
        error: z.string().optional(),
        requestKind: z.literal("get_key_data"),
        key: z.string(),
      }),
      z.object({
        integrationId: z.string(),
        integrationSlug: z.string(),
        integrationName: z.string(),
      }),
      z.object({
        issuerId: z.string(),
        issuerName: z.string(),
        algorithm: z.string(),
        origin: z.string(),
        managedBy: z.string().optional(),
      }),
      z.object({ issuerId: z.string(), issuerName: z.string(), managedBy: z.string().optional() }),
      z.object({ issuerId: z.string(), issuerName: z.string(), keyId: z.string().optional() }),
      z.object({
        issuerId: z.string(),
        issuerName: z.string(),
        kind: z.string(),
        projectId: z.string().optional(),
        clientId: z.string().optional(),
        environments: z.array(z.string()).optional(),
      }),
      z.object({
        issuerId: z.string(),
        issuerName: z.string(),
        kind: z.string(),
        policyKey: z.string(),
      }),
      z.object({ logDrainUrl: z.string().nullable(), integrationName: z.string().optional() }),
      z.object({ logDrainUrl: z.string(), integrationName: z.string().optional() }),
      z.object({
        provider: z.enum([
          "apple",
          "bitbucket",
          "chatgpt",
          "github",
          "github-custom-host",
          "github-limited",
          "gitlab",
          "google",
          "saml",
        ]),
        login: z.string(),
      }),
      z.object({
        provider: z.enum([
          "apple",
          "bitbucket",
          "chatgpt",
          "github",
          "github-custom-host",
          "github-limited",
          "gitlab",
          "google",
          "saml",
        ]),
      }),
      z.object({
        userAgent: z.string().optional(),
        geolocation: z
          .object({
            city: z.object({ names: z.object({ en: z.string() }) }).optional(),
            country: z.object({ names: z.object({ en: z.string() }) }),
            most_specific_subdivision: z.object({ names: z.object({ en: z.string() }) }).optional(),
            regionName: z.string().optional(),
          })
          .nullable()
          .optional(),
        env: z.string().optional(),
        os: z.string().optional(),
        loginSessionId: z.string().optional(),
        username: z.string().optional(),
        ssoType: z.string().optional(),
        factors: z
          .union([
            z.array(
              z.object({
                origin: z.enum([
                  "apple",
                  "bitbucket",
                  "chatgpt",
                  "email",
                  "emu-recovery",
                  "github",
                  "gitlab",
                  "google",
                  "invite",
                  "magic-link",
                  "otp",
                  "otp-link",
                  "saml",
                  "webauthn",
                ]),
                username: z.string().optional(),
                teamId: z.string().optional(),
                legacy: z.boolean().optional(),
                ssoType: z.string().optional(),
              }),
            ),
            z.array(
              z.union([
                z.object({
                  origin: z.enum([
                    "apple",
                    "bitbucket",
                    "chatgpt",
                    "email",
                    "emu-recovery",
                    "github",
                    "gitlab",
                    "google",
                    "invite",
                    "magic-link",
                    "otp",
                    "otp-link",
                    "saml",
                    "webauthn",
                  ]),
                  username: z.string().optional(),
                  teamId: z.string().optional(),
                  legacy: z.boolean().optional(),
                  ssoType: z.string().optional(),
                }),
                z.object({ origin: z.enum(["recovery-code", "totp", "webauthn"]) }),
              ]),
            ),
          ])
          .optional(),
        viaOTP: z.boolean().optional(),
        viaGithub: z.boolean().optional(),
        viaGitlab: z.boolean().optional(),
        viaBitbucket: z.boolean().optional(),
        viaGoogle: z.boolean().optional(),
        viaApple: z.boolean().optional(),
        viaSamlSso: z.boolean().optional(),
        viaPasskey: z.boolean().optional(),
      }),
      z.object({ projectId: z.string(), toDeploymentId: z.string(), projectName: z.string() }),
      z.object({
        periods: z.array(
          z.object({
            periodNumber: z.number(),
            percent: z.string(),
            startDate: z.string(),
            endDate: z.string(),
          }),
        ),
      }),
      z.object({
        enabled: z.boolean(),
        allowedIntegrationCount: z.number().optional(),
        allowedIntegrationIds: z.array(z.string()).optional(),
      }),
      z.object({ id: z.string(), slug: z.string(), name: z.string() }),
      z.object({
        id: z.string(),
        slug: z.string().optional(),
        name: z.string().optional(),
        fallbackEnvironment: z.string().optional(),
        enablePolyrepoBranchRouting: z.boolean().optional(),
        prev: z.object({
          name: z.string(),
          slug: z.string(),
          fallbackEnvironment: z.string(),
          enablePolyrepoBranchRouting: z.boolean().optional(),
        }),
      }),
      z.object({
        project: z.object({ id: z.string(), name: z.string() }),
        group: z.object({ id: z.string(), slug: z.string(), name: z.string() }),
      }),
      z.object({
        project: z.object({
          id: z.string(),
          name: z.string(),
          microfrontends: z
            .union([
              z.object({
                isDefaultApp: z.literal(true),
                updatedAt: z.number(),
                groupIds: z.array(z.string()),
                enabled: z.literal(true),
                defaultRoute: z.string().optional(),
                freeProjectForLegacyLimits: z.boolean().optional(),
              }),
              z.object({
                isDefaultApp: z.literal(false).optional(),
                routeObservabilityToThisProject: z.boolean().optional(),
                doNotRouteWithMicrofrontendsRouting: z.boolean().optional(),
                updatedAt: z.number(),
                groupIds: z.array(z.string()),
                enabled: z.literal(true),
                defaultRoute: z.string().optional(),
                freeProjectForLegacyLimits: z.boolean().optional(),
              }),
              z.object({
                updatedAt: z.number(),
                groupIds: z.array(z.unknown()),
                enabled: z.literal(false),
                freeProjectForLegacyLimits: z.boolean().optional(),
              }),
            ])
            .optional(),
        }),
        prev: z.object({
          project: z.object({
            microfrontends: z
              .union([
                z.object({
                  isDefaultApp: z.literal(true),
                  updatedAt: z.number(),
                  groupIds: z.array(z.string()),
                  enabled: z.literal(true),
                  defaultRoute: z.string().optional(),
                  freeProjectForLegacyLimits: z.boolean().optional(),
                }),
                z.object({
                  isDefaultApp: z.literal(false).optional(),
                  routeObservabilityToThisProject: z.boolean().optional(),
                  doNotRouteWithMicrofrontendsRouting: z.boolean().optional(),
                  updatedAt: z.number(),
                  groupIds: z.array(z.string()),
                  enabled: z.literal(true),
                  defaultRoute: z.string().optional(),
                  freeProjectForLegacyLimits: z.boolean().optional(),
                }),
                z.object({
                  updatedAt: z.number(),
                  groupIds: z.array(z.unknown()),
                  enabled: z.literal(false),
                  freeProjectForLegacyLimits: z.boolean().optional(),
                }),
              ])
              .optional(),
          }),
        }),
        group: z.object({ id: z.string(), slug: z.string(), name: z.string() }),
      }),
      z.object({ alertId: z.string(), alertName: z.string() }),
      z.object({ projectId: z.string().optional(), projectName: z.string() }),
      z.object({
        organizationId: z.string(),
        rootTeamId: z.string(),
        slug: z.string(),
        name: z.string(),
      }),
      z.object({
        directoryGroupId: z.string(),
        directoryId: z.string(),
        groupName: z.string(),
        next: z.object({
          default: z
            .enum([
              "BILLING",
              "CONTRIBUTOR",
              "DEVELOPER",
              "MEMBER",
              "OWNER",
              "SECURITY",
              "VIEWER",
              "VIEWER_FOR_PLUS",
            ])
            .optional(),
          roles: z.record(
            z.string(),
            z.enum([
              "BILLING",
              "CONTRIBUTOR",
              "DEVELOPER",
              "MEMBER",
              "OWNER",
              "SECURITY",
              "VIEWER",
              "VIEWER_FOR_PLUS",
            ]),
          ),
        }),
        organizationId: z.string(),
      }),
      z.object({
        directoryGroupId: z.string(),
        directoryId: z.string(),
        organizationId: z.string(),
      }),
      z.object({ organizationId: z.string(), slug: z.string() }),
      z.object({
        organizationId: z.string(),
        teamId: z.string(),
        billingPlan: z.enum(["enterprise", "platform"]),
      }),
      z.object({
        ownerId: z.string(),
        source: z.string(),
        cause: z.string(),
        blockReason: z.string().optional(),
        siftRoute: z.object({ name: z.string() }).optional(),
      }),
      z.object({
        ownerId: z.string(),
        source: z.string(),
        cause: z.string(),
        reason: z.string().nullable().optional(),
      }),
      z.object({
        ownerId: z.string(),
        source: z.string(),
        cause: z.string(),
        blockReason: z.string().optional(),
      }),
      z.object({ ownerId: z.string(), source: z.string(), cause: z.string() }),
      z.object({
        projectId: z.string(),
        previous: z
          .object({
            enabled: z.boolean(),
            mode: z.string(),
            enforcementScope: z.enum(["all", "preview"]).optional(),
            enforcePercentage: z.number(),
            newResourceBlockingPolicy: z.enum(["allow", "block"]),
            allowUnsafeScriptSrcKeywords: z.boolean(),
            omitScriptNonce: z.boolean().optional(),
            connectSrcNotificationsEnabled: z.boolean().optional(),
            computedScriptSrc: z.string().optional(),
            computedScriptSrcPreview: z.string().optional(),
            computedConnectSrc: z.string().optional(),
            computedConnectSrcPreview: z.string().optional(),
          })
          .nullable(),
        next: z.object({
          enabled: z.boolean(),
          mode: z.string(),
          enforcementScope: z.enum(["all", "preview"]).optional(),
          enforcePercentage: z.number(),
          newResourceBlockingPolicy: z.enum(["allow", "block"]),
          allowUnsafeScriptSrcKeywords: z.boolean(),
          omitScriptNonce: z.boolean().optional(),
          connectSrcNotificationsEnabled: z.boolean().optional(),
          computedScriptSrc: z.string().optional(),
          computedScriptSrcPreview: z.string().optional(),
          computedConnectSrc: z.string().optional(),
          computedConnectSrcPreview: z.string().optional(),
        }),
      }),
      z.object({
        projectId: z.string(),
        headerName: z.string(),
        previousStatus: z.string(),
        justification: z.string(),
      }),
      z.object({
        projectId: z.string(),
        headerName: z.string(),
        previousStatus: z.string(),
        justification: z.string().nullable(),
      }),
      z.object({
        projectId: z.string(),
        projectName: z.string(),
        deletedCount: z.number(),
        scriptCount: z.number(),
        connectSrcCount: z.number(),
        connectSrcOriginCount: z.number(),
        headerCount: z.number(),
        connectSrcUserNormalizationRuleCount: z.number().optional(),
        connectSrcNormalizationRulesCleared: z.boolean().optional(),
      }),
      z.object({
        projectId: z.string(),
        url: z.string(),
        previousStatus: z.string(),
        justification: z.string(),
        approvalScope: z.enum(["all", "preview"]).optional(),
        kind: z.enum(["connectSrc", "script"]).optional(),
      }),
      z.object({ projectId: z.string(), type: z.literal("script"), resourceUrl: z.string() }),
      z.object({ projectId: z.string(), type: z.literal("header"), headerName: z.string() }),
      z.object({ projectId: z.string(), type: z.literal("connectSrc"), resourceUrl: z.string() }),
      z.object({
        projectId: z.string(),
        url: z.string().optional(),
        headerName: z.string().optional(),
        previousStatus: z.string(),
        justification: z.string().nullable(),
        kind: z.enum(["connectSrc", "script"]).optional(),
      }),
      z
        .object({
          projectId: z.string(),
          projectName: z.string(),
          pattern: z.string(),
          justification: z.string(),
        })
        .and(z.record(z.string(), z.unknown())),
      z.object({ oldName: z.string(), newName: z.string() }),
      z.object({
        projectId: z.string(),
        environment: z.string(),
        host: z.string(),
        connectorId: z.string(),
        connectorType: z.string(),
        connectorService: z.string(),
        externalIssuer: z.string(),
        externalSubject: z.string(),
        sessionId: z.string(),
        emailVerified: z.boolean().optional(),
        tenantId: z.string().optional(),
        installationId: z.string().optional(),
      }),
      z.object({
        projectId: z.string(),
        projectName: z.string(),
        previous: z.object({
          passport: z
            .object({
              connectorId: z.string(),
              deploymentType: z.enum([
                "all",
                "all_except_custom_domains",
                "preview",
                "prod_deployment_urls_and_all_previews",
              ]),
            })
            .nullable()
            .optional(),
        }),
        next: z.object({
          passport: z
            .object({
              connectorId: z.string(),
              deploymentType: z.enum([
                "all",
                "all_except_custom_domains",
                "preview",
                "prod_deployment_urls_and_all_previews",
              ]),
            })
            .nullable()
            .optional(),
        }),
      }),
      z.object({
        previous: z.object({
          passport: z
            .object({
              connectorId: z.string(),
              deploymentType: z.enum([
                "all",
                "all_except_custom_domains",
                "preview",
                "prod_deployment_urls_and_all_previews",
              ]),
            })
            .nullable()
            .optional(),
        }),
        next: z.object({
          passport: z
            .object({
              connectorId: z.string(),
              deploymentType: z.enum([
                "all",
                "all_except_custom_domains",
                "preview",
                "prod_deployment_urls_and_all_previews",
              ]),
            })
            .nullable()
            .optional(),
        }),
      }),
      z.object({
        plan: z.string(),
        removedUsers: z
          .record(
            z.string(),
            z.object({
              role: z.enum([
                "BILLING",
                "CONTRIBUTOR",
                "DEVELOPER",
                "MEMBER",
                "OWNER",
                "SECURITY",
                "VIEWER",
                "VIEWER_FOR_PLUS",
              ]),
              confirmed: z.boolean(),
              confirmedAt: z.number().optional(),
              joinedFrom: z
                .object({
                  origin: z.enum([
                    "account-update",
                    "bitbucket",
                    "dsync",
                    "feedback",
                    "github",
                    "gitlab",
                    "import",
                    "link",
                    "mail",
                    "nsnb-auto-approve",
                    "nsnb-hobby-upgrade",
                    "nsnb-invite",
                    "nsnb-redeploy",
                    "nsnb-redeploy-attribution-card",
                    "nsnb-request-access",
                    "nsnb-viewer-upgrade",
                    "organization-teams",
                    "saml",
                    "teams",
                  ]),
                  commitId: z.string().optional(),
                  repoId: z.string().optional(),
                  repoPath: z.string().optional(),
                  gitUserId: z.union([z.string(), z.number()]).optional(),
                  gitUserLogin: z.string().optional(),
                  ssoUserId: z.string().optional(),
                  ssoConnectedAt: z.number().optional(),
                  idpUserId: z.string().optional(),
                  dsyncUserId: z.string().optional(),
                  dsyncConnectedAt: z.number().optional(),
                })
                .optional(),
            }),
          )
          .optional(),
        prevPlan: z.string().optional(),
        priorPlan: z.string().optional(),
        isDowngrade: z.boolean().optional(),
        userAgent: z.string().optional(),
        isReactivate: z.boolean().optional(),
        isTrialUpgrade: z.boolean().optional(),
        automated: z.boolean().optional(),
        reason: z.string().optional(),
        timestamp: z.number().optional(),
        removedMemberCount: z.number().optional(),
      }),
      z.object({
        plan: z.string(),
        removedUsers: z
          .record(
            z.string(),
            z.object({
              role: z.enum([
                "BILLING",
                "CONTRIBUTOR",
                "DEVELOPER",
                "MEMBER",
                "OWNER",
                "SECURITY",
                "VIEWER",
                "VIEWER_FOR_PLUS",
              ]),
              confirmed: z.boolean(),
              confirmedAt: z.number().optional(),
              joinedFrom: z
                .object({
                  origin: z.enum([
                    "account-update",
                    "bitbucket",
                    "dsync",
                    "feedback",
                    "github",
                    "gitlab",
                    "import",
                    "link",
                    "mail",
                    "nsnb-auto-approve",
                    "nsnb-hobby-upgrade",
                    "nsnb-invite",
                    "nsnb-redeploy",
                    "nsnb-redeploy-attribution-card",
                    "nsnb-request-access",
                    "nsnb-viewer-upgrade",
                    "organization-teams",
                    "saml",
                    "teams",
                  ]),
                  commitId: z.string().optional(),
                  repoId: z.string().optional(),
                  repoPath: z.string().optional(),
                  gitUserId: z.union([z.string(), z.number()]).optional(),
                  gitUserLogin: z.string().optional(),
                  ssoUserId: z.string().optional(),
                  ssoConnectedAt: z.number().optional(),
                  idpUserId: z.string().optional(),
                  dsyncUserId: z.string().optional(),
                  dsyncConnectedAt: z.number().optional(),
                })
                .optional(),
            }),
          )
          .optional(),
        prevPlan: z.string().optional(),
        priorPlan: z.string().optional(),
        isDowngrade: z.boolean().optional(),
        userAgent: z.string().optional(),
        isReactivate: z.boolean().optional(),
        isTrialUpgrade: z.boolean().optional(),
        automated: z.boolean().optional(),
        reason: z.string().optional(),
        timestamp: z.number().optional(),
        removedMemberCount: z.number().optional(),
        actorId: z.string(),
        actorType: z.literal("admin"),
        actorName: z.string().optional(),
      }),
      z.object({
        price: z.number().optional(),
        currency: z.string().optional(),
        enabled: z.boolean().optional(),
      }),
      z.object({
        previewDeploymentSuffix: z.string().nullable().optional(),
        previousPreviewDeploymentSuffix: z.string().nullable().optional(),
      }),
      z.object({
        endpoint: z.object({
          id: z.string(),
          name: z.string(),
          projectId: z.string(),
          vercelRegion: z.string(),
          awsServiceName: z.string(),
          privateDnsNames: z.array(z.string()).optional(),
        }),
      }),
      z.object({
        privateLinkEndpoint: z.object({ id: z.string(), name: z.string() }),
        projectId: z.string(),
      }),
      z.object({
        prev: z.object({
          id: z.string(),
          name: z.string(),
          projectId: z.string(),
          vercelRegion: z.string(),
          awsServiceName: z.string(),
          privateDnsNames: z.array(z.string()).optional(),
        }),
        current: z.object({
          id: z.string(),
          name: z.string(),
          projectId: z.string(),
          vercelRegion: z.string(),
          awsServiceName: z.string(),
          privateDnsNames: z.array(z.string()).optional(),
        }),
      }),
      z.object({
        privateLinkEndpoint: z.object({
          id: z.string(),
          name: z.string(),
          environmentIds: z.array(z.string()).optional(),
          privateDnsNames: z.array(z.string()).optional(),
        }),
        projectId: z.string(),
        previousEndpoint: z.object({
          name: z.string(),
          environmentIds: z.array(z.string()).optional(),
          privateDnsNames: z.array(z.string()).optional(),
        }),
      }),
      z.object({ projectId: z.string().optional(), projectName: z.string(), branch: z.string() }),
      z.object({ projectId: z.string(), projectName: z.string(), directoryListing: z.boolean() }),
      z.object({
        projectName: z.string().optional(),
        projectId: z.string(),
        projectAnalytics: z
          .object({
            id: z.string(),
            canceledAt: z.number().nullable().optional(),
            disabledAt: z.number(),
            enabledAt: z.number(),
            paidAt: z.number().optional(),
            sampleRatePercent: z.number().nullable().optional(),
            spendLimitInDollars: z.number().nullable().optional(),
          })
          .nullable(),
        prevProjectAnalytics: z
          .object({
            id: z.string(),
            canceledAt: z.number().nullable().optional(),
            disabledAt: z.number(),
            enabledAt: z.number(),
            paidAt: z.number().optional(),
            sampleRatePercent: z.number().nullable().optional(),
            spendLimitInDollars: z.number().nullable().optional(),
          })
          .nullable(),
      }),
      z.object({
        projectName: z.string().optional(),
        projectId: z.string(),
        projectAnalytics: z.record(z.string(), z.unknown()).optional(),
        prevProjectAnalytics: z.record(z.string(), z.unknown()).nullable().optional(),
      }),
      z.object({
        projectId: z.string(),
        projectName: z.string(),
        action: z.enum(["disabled", "enabled", "regenerated", "updated"]),
        isEnvVar: z.boolean().optional(),
        note: z.string().optional(),
      }),
      z.object({
        projectId: z.string(),
        projectName: z.string(),
        avatar: z.string().nullable().optional(),
      }),
      z.object({
        projectId: z.string(),
        projectName: z.string(),
        enableAffectedProjectsDeployments: z.boolean(),
      }),
      z.object({
        projectId: z.string(),
        projectName: z.string(),
        enableExternalRewriteCaching: z.boolean(),
      }),
      z.object({
        projectId: z.string(),
        projectName: z.string(),
        previous: z.object({}),
        next: z.object({}),
      }),
      z.object({
        projectId: z.string(),
        projectName: z.string(),
        productionDeploymentsFastLane: z.boolean(),
      }),
      z.object({
        projectId: z.string(),
        projectName: z.string(),
        sourceFilesOutsideRootDirectory: z.boolean(),
      }),
      z.object({
        projectId: z.string().optional(),
        projectName: z.string(),
        deploymentId: z.string().optional(),
        previousBuildMachineType: z.string().optional(),
        nextBuildMachineType: z.string(),
        previousBuildMachineSelection: z.string(),
        nextBuildMachineSelection: z.string(),
        isSystemInitiated: z.boolean().optional(),
        reason: z.string().optional(),
      }),
      z.object({
        projectId: z.string(),
        projectName: z.string(),
        widget: z
          .enum([
            "alert",
            "analytics-online",
            "analytics-page-views",
            "analytics-visitors",
            "firewall-allowed",
            "firewall-denied",
            "observability-alert",
            "observability-edge-requests",
            "observability-error-rate",
            "observability-function-invocations",
            "online",
            "res",
            "speed-insights-cls",
            "speed-insights-lcp",
            "speed-insights-res",
            "null",
          ])
          .nullable(),
      }),
      z.object({
        projectId: z.string().optional(),
        projectName: z.string().optional(),
        certId: z.string().optional(),
        origin: z.string().optional(),
      }),
      z.object({
        projectId: z.string().optional(),
        projectName: z.string().optional(),
        target: z.array(z.string()).optional(),
        updated: z.boolean().optional(),
      }),
      z.object({
        team: z.object({ name: z.string(), id: z.string() }),
        project: z.object({
          id: z.string(),
          name: z.string().optional(),
          oldConnectConfigurations: z
            .array(
              z.object({
                envId: z.union([z.string(), z.enum(["preview", "production"])]),
                connectConfigurationId: z.string(),
                dc: z.string().optional(),
                passive: z.boolean(),
                buildsEnabled: z.boolean(),
                aws: z
                  .object({
                    subnetIds: z.array(z.string()),
                    securityGroupId: z.string().optional(),
                  })
                  .optional(),
                createdAt: z.number(),
                updatedAt: z.number(),
              }),
            )
            .nullable(),
          newConnectConfigurations: z
            .array(
              z.object({
                envId: z.union([z.string(), z.enum(["preview", "production"])]),
                connectConfigurationId: z.string(),
                dc: z.string().optional(),
                passive: z.boolean(),
                buildsEnabled: z.boolean(),
                aws: z
                  .object({
                    subnetIds: z.array(z.string()),
                    securityGroupId: z.string().optional(),
                  })
                  .optional(),
                createdAt: z.number(),
                updatedAt: z.number(),
              }),
            )
            .nullable(),
        }),
      }),
      z.object({ projectName: z.string().optional(), projectId: z.string() }),
      z.object({
        projectId: z.string(),
        projectName: z.string(),
        action: z.enum(["disabled", "enabled"]),
      }),
      z.object({ name: z.string(), ownerId: z.string() }),
      z.object({
        projectId: z.string(),
        projectName: z.string(),
        elasticConcurrencyEnabled: z.boolean(),
        oldElasticConcurrencyEnabled: z.boolean(),
        buildQueueConfiguration: z
          .enum(["SKIP_NAMESPACE_QUEUE", "WAIT_FOR_NAMESPACE_QUEUE"])
          .optional(),
        oldBuildQueueConfiguration: z
          .enum(["SKIP_NAMESPACE_QUEUE", "WAIT_FOR_NAMESPACE_QUEUE"])
          .optional(),
      }),
      z.object({
        projectId: z.string(),
        projectName: z.string(),
        autoAssignCustomDomains: z.boolean(),
      }),
      z.object({
        projectId: z.string(),
        projectName: z.string(),
        previewDeploymentsEnabled: z.boolean(),
      }),
      z.object({
        projectId: z.string(),
        projectName: z.string(),
        customEnvironmentId: z.string(),
        customEnvironmentSlug: z.string(),
        previous: z.object({
          branchMatcher: z
            .object({ type: z.enum(["endsWith", "equals", "startsWith"]), pattern: z.string() })
            .optional(),
        }),
        next: z.object({
          branchMatcher: z
            .object({ type: z.enum(["endsWith", "equals", "startsWith"]), pattern: z.string() })
            .optional(),
        }),
      }),
      z.object({
        projectId: z.string(),
        projectName: z.string(),
        customEnvironmentId: z.string(),
        customEnvironmentSlug: z.string(),
      }),
      z.object({
        projectName: z.string().optional(),
        projectId: z.string(),
        enableFunctionsBeta: z.boolean(),
      }),
      z.object({
        projectId: z.string(),
        projectName: z.string(),
        previous: z.object({ functionDefaultTimeout: z.number().nullable() }),
        next: z.object({ functionDefaultTimeout: z.number() }),
      }),
      z.object({
        projectId: z.string(),
        projectName: z.string(),
        previous: z.object({ functionDefaultMemoryType: z.string().nullable() }),
        next: z.object({ functionDefaultMemoryType: z.string() }),
      }),
      z.object({
        projectId: z.string(),
        projectName: z.string(),
        previous: z.object({ functionDefaultRegions: z.array(z.string()).nullable() }),
        next: z.object({ functionDefaultRegions: z.array(z.string()) }),
      }),
      z.object({
        projectId: z.string(),
        projectName: z.string(),
        previous: z.object({ functionZeroConfigFailover: z.boolean().nullable() }),
        next: z.object({ functionZeroConfigFailover: z.boolean() }),
      }),
      z.object({
        projectId: z.string(),
        projectName: z.string(),
        previewDeploymentSuffix: z.string().nullable(),
      }),
      z.object({ projectId: z.string(), projectName: z.string(), newProjectName: z.string() }),
      z.object({
        projectId: z.string(),
        projectName: z.string(),
        previous: z
          .object({
            gitProvider: z.enum([
              "bitbucket",
              "cursor-origin",
              "github",
              "github-custom-host",
              "github-limited",
              "gitlab",
              "vercel",
            ]),
            gitRepoId: z.string(),
            gitRepositoryName: z.string(),
          })
          .optional(),
        next: z.object({
          gitProvider: z.enum([
            "bitbucket",
            "cursor-origin",
            "github",
            "github-custom-host",
            "github-limited",
            "gitlab",
            "vercel",
          ]),
          gitRepoId: z.string(),
          gitRepositoryName: z.string(),
        }),
      }),
      z.object({
        projectId: z.string(),
        projectName: z.string(),
        gitProvider: z.enum([
          "bitbucket",
          "cursor-origin",
          "github",
          "github-custom-host",
          "github-limited",
          "gitlab",
          "vercel",
        ]),
        gitRepoId: z.string(),
        gitRepositoryName: z.string(),
      }),
      z.object({ projectId: z.string(), projectName: z.string(), onPullRequest: z.boolean() }),
      z.object({ projectId: z.string(), projectName: z.string(), onCommit: z.boolean() }),
      z.object({
        projectId: z.string(),
        projectName: z.string(),
        disableRepositoryDispatchEvents: z.boolean(),
      }),
      z.object({
        projectId: z.string(),
        projectName: z.string(),
        createDeployments: z.enum(["disabled", "enabled"]),
      }),
      z.object({
        projectId: z.string(),
        projectName: z.string(),
        requireVerifiedCommits: z.boolean().nullable(),
      }),
      z.object({ requireVerifiedCommits: z.boolean() }),
      z.object({ disableRepositoryDispatchEvents: z.boolean() }),
      z.object({ projectId: z.string(), projectName: z.string(), gitCommitStatus: z.boolean() }),
      z.object({ projectId: z.string(), projectName: z.string(), gitLFS: z.boolean() }),
      z.object({
        projectId: z.string(),
        projectName: z.string(),
        consolidatedGitCommitStatus: z
          .object({ enabled: z.boolean(), propagateFailures: z.boolean() })
          .nullable(),
      }),
      z.object({
        projectId: z.string(),
        projectName: z.string(),
        previous: z.object({ commandForIgnoringBuildStep: z.string().optional() }),
        next: z.object({ commandForIgnoringBuildStep: z.string().optional() }),
      }),
      z.object({
        projectId: z.string(),
        projectName: z.string(),
        domain: z.string(),
        target: z.string(),
        redirect: z.string().nullable(),
        redirectStatusCode: z.number().nullable(),
        gitBranch: z.string().nullable(),
        configuredBy: z.string().optional(),
      }),
      z.object({
        projectId: z.string(),
        projectName: z.string(),
        domain: z.string(),
        target: z.string(),
        redirect: z.string().nullable().optional(),
        redirectStatusCode: z.number().nullable().optional(),
      }),
      z.object({
        oldProjectId: z.string(),
        oldProjectName: z.string(),
        newProjectId: z.string(),
        newProjectName: z.string(),
        domain: z.string(),
      }),
      z.object({
        projectId: z.string(),
        projectName: z.string(),
        domain: z.string(),
        redirect: z.string().nullable().optional(),
        redirectStatusCode: z.number().nullable().optional(),
      }),
      z.object({
        projects: z.array(
          z.object({
            projectId: z.string(),
            role: z.enum(["ADMIN", "PROJECT_DEVELOPER", "PROJECT_GUEST", "PROJECT_VIEWER"]),
            membershipCreatedAt: z.number(),
          }),
        ),
        teamMembership: z.object({ uid: z.string(), username: z.string().optional() }).optional(),
        directoryType: z.string().optional(),
      }),
      z.object({
        projectId: z.string(),
        projectName: z.string(),
        target: z.string(),
        domain: z.string(),
        configuredBy: z.string().nullable().optional(),
        prevConfiguredBy: z.string().nullable().optional(),
      }),
      z.object({
        project: z.object({ name: z.string(), id: z.string().optional() }),
        projectMembership: z
          .object({
            role: z.enum(["ADMIN", "PROJECT_DEVELOPER", "PROJECT_GUEST", "PROJECT_VIEWER"]),
            uid: z.string(),
            createdAt: z.number(),
            username: z.string().optional(),
          })
          .nullable(),
      }),
      z.object({
        project: z.object({
          name: z.string(),
          role: z.enum(["ADMIN", "PROJECT_DEVELOPER", "PROJECT_GUEST", "PROJECT_VIEWER"]),
          invitedUserName: z.string(),
          id: z.string().optional(),
          invitedUserId: z.string().optional(),
        }),
      }),
      z.object({
        project: z.object({ name: z.string(), id: z.string().optional() }),
        removedMembership: z.object({
          role: z.enum(["ADMIN", "PROJECT_DEVELOPER", "PROJECT_GUEST", "PROJECT_VIEWER"]),
          uid: z.string(),
          createdAt: z.number(),
          username: z.string().optional(),
        }),
      }),
      z.object({
        project: z.object({ id: z.string(), name: z.string() }),
        projectMembership: z.object({
          role: z
            .enum(["ADMIN", "PROJECT_DEVELOPER", "PROJECT_GUEST", "PROJECT_VIEWER"])
            .optional(),
          uid: z.string().optional(),
          createdAt: z.number().optional(),
          username: z.string().optional(),
          previousRole: z
            .enum(["ADMIN", "PROJECT_DEVELOPER", "PROJECT_GUEST", "PROJECT_VIEWER"])
            .optional(),
        }),
      }),
      z.object({
        previousProjectId: z.string().optional(),
        newProjectId: z.string().optional(),
        previousProjectName: z.string(),
        newProjectName: z.string(),
        originAccountName: z.string(),
        transferId: z.string().optional(),
      }),
      z.object({
        previousProjectId: z.string().optional(),
        projectName: z.string(),
        destinationAccountName: z.string().nullable(),
        transferId: z.string().optional(),
      }),
      z.object({
        projectId: z.string(),
        projectName: z.string(),
        originAccountName: z.string(),
        destinationAccountName: z.string(),
        destinationAccountId: z.string(),
        transferId: z.string().optional(),
      }),
      z.object({
        previousProjectId: z.string().optional(),
        newProjectId: z.string().optional(),
        previousProjectName: z.string(),
        newProjectName: z.string(),
        destinationAccountName: z.string(),
        transferId: z.string().optional(),
      }),
      z.object({ source: z.string(), projectId: z.string(), projectName: z.string() }),
      z.object({
        projectId: z.string(),
        projectName: z.string(),
        optionsAllowlist: z
          .object({ paths: z.array(z.object({ value: z.string() })) })
          .nullable()
          .optional(),
        oldOptionsAllowlist: z
          .object({ paths: z.array(z.object({ value: z.string() })) })
          .nullable()
          .optional(),
      }),
      z.object({
        projectId: z.string().optional(),
        projectName: z.string().optional(),
        passwordProtection: z
          .union([
            z.object({
              deploymentType: z.enum([
                "all",
                "all_except_custom_domains",
                "preview",
                "prod_deployment_urls_and_all_previews",
              ]),
            }),
            z.enum([
              "all",
              "all_except_custom_domains",
              "preview",
              "prod_deployment_urls_and_all_previews",
            ]),
          ])
          .nullable(),
        oldPasswordProtection: z
          .union([
            z.object({
              deploymentType: z.enum([
                "all",
                "all_except_custom_domains",
                "preview",
                "prod_deployment_urls_and_all_previews",
              ]),
            }),
            z.enum([
              "all",
              "all_except_custom_domains",
              "preview",
              "prod_deployment_urls_and_all_previews",
            ]),
          ])
          .nullable(),
      }),
      z.object({ projectId: z.string() }),
      z.object({ projectId: z.string(), expiresAt: z.number() }),
      z.object({
        projectId: z.string(),
        projectName: z.string().optional(),
        reasonCode: z.enum(["BACKOFFICE", "BUDGET_REACHED", "PUBLIC_API"]).optional(),
      }),
      z.object({
        projectId: z.string().optional(),
        projectName: z.string(),
        consent: z.enum(["granted", "refused"]),
      }),
      z.object({
        projectId: z.string(),
        projectName: z.string(),
        projectAccountId: z.string(),
        deploymentId: z.string(),
        rollbackDescription: z
          .object({
            userId: z.string(),
            username: z.string(),
            description: z.string(),
            createdAt: z.number(),
          })
          .optional(),
      }),
      z.object({
        projectId: z.string(),
        projectName: z.string(),
        targetDeploymentId: z.string().optional(),
      }),
      z.object({
        projectId: z.string(),
        projectName: z.string(),
        targetDeploymentId: z.string().optional(),
        newTargetPercentage: z.number().optional(),
      }),
      z.object({
        projectId: z.string(),
        projectName: z.string(),
        targetDeploymentId: z.string().optional(),
        action: z.string().optional(),
      }),
      z.object({
        projectId: z.string(),
        projectName: z.string(),
        previous: z.object({}).nullable(),
        next: z.object({}).nullable(),
      }),
      z.object({
        projectId: z.string(),
        projectName: z.string(),
        region: z.string().optional(),
        failoverRegions: z.array(z.string()).optional(),
      }),
      z.object({
        projectId: z.string(),
        projectName: z.string(),
        previous: z.object({ issuerMode: z.enum(["global", "team"]).optional() }),
        next: z.object({ issuerMode: z.enum(["global", "team"]) }),
      }),
      z.object({
        projectId: z.string(),
        projectName: z.string(),
        customerSupportCodeVisibility: z.boolean(),
      }),
      z.object({ projectId: z.string(), projectName: z.string(), gitForkProtection: z.boolean() }),
      z.object({
        projectId: z.string(),
        projectName: z.string(),
        protectedSourcemaps: z.boolean(),
      }),
      z.object({
        projectId: z.string(),
        projectName: z.string(),
        inheritDeploymentProtection: z.boolean(),
      }),
      z.object({ projectId: z.string(), projectName: z.string(), publicSource: z.boolean() }),
      z.object({
        projectId: z.string().optional(),
        projectName: z.string().optional(),
        previous: z.object({
          expiration: z.string().optional(),
          expirationProduction: z.string().optional(),
          expirationCanceled: z.string().optional(),
          expirationErrored: z.string().optional(),
        }),
        next: z.object({
          expiration: z.string().optional(),
          expirationProduction: z.string().optional(),
          expirationCanceled: z.string().optional(),
          expirationErrored: z.string().optional(),
        }),
      }),
      z.object({
        projectId: z.string(),
        projectName: z.string(),
        next: z.object({ skewProtectionBoundaryAt: z.number() }),
        previous: z.object({ skewProtectionBoundaryAt: z.number().optional() }),
      }),
      z.object({
        projectId: z.string(),
        projectName: z.string(),
        next: z.object({ skewProtectionMaxAge: z.number() }),
        previous: z.object({ skewProtectionMaxAge: z.number().optional() }),
      }),
      z.object({
        projectId: z.string(),
        projectName: z.string(),
        next: z.object({ skewProtectionAllowedDomains: z.array(z.string()) }),
        previous: z.object({ skewProtectionAllowedDomains: z.array(z.string()).optional() }),
      }),
      z.object({
        projectId: z.string().optional(),
        projectName: z.string().optional(),
        ssoProtection: z
          .union([
            z.object({
              deploymentType: z.enum([
                "all",
                "all_except_custom_domains",
                "preview",
                "prod_deployment_urls_and_all_previews",
              ]),
              cve55182MigrationAppliedFrom: z
                .enum([
                  "all",
                  "all_except_custom_domains",
                  "preview",
                  "prod_deployment_urls_and_all_previews",
                  "null",
                ])
                .nullable()
                .optional(),
              april2026SecurityIncidentMigrationAppliedFrom: z
                .enum([
                  "all",
                  "all_except_custom_domains",
                  "preview",
                  "prod_deployment_urls_and_all_previews",
                  "null",
                ])
                .nullable()
                .optional(),
            }),
            z.enum([
              "all",
              "all_except_custom_domains",
              "preview",
              "prod_deployment_urls_and_all_previews",
            ]),
          ])
          .nullable(),
        oldSsoProtection: z
          .union([
            z.object({
              deploymentType: z.enum([
                "all",
                "all_except_custom_domains",
                "preview",
                "prod_deployment_urls_and_all_previews",
              ]),
              cve55182MigrationAppliedFrom: z
                .enum([
                  "all",
                  "all_except_custom_domains",
                  "preview",
                  "prod_deployment_urls_and_all_previews",
                  "null",
                ])
                .nullable()
                .optional(),
              april2026SecurityIncidentMigrationAppliedFrom: z
                .enum([
                  "all",
                  "all_except_custom_domains",
                  "preview",
                  "prod_deployment_urls_and_all_previews",
                  "null",
                ])
                .nullable()
                .optional(),
            }),
            z.enum([
              "all",
              "all_except_custom_domains",
              "preview",
              "prod_deployment_urls_and_all_previews",
            ]),
          ])
          .nullable(),
      }),
      z.object({
        projectId: z.string(),
        projectName: z.string(),
        next: z.object({
          project: z.object({
            id: z.string().optional(),
            staticIps: z.object({
              builds: z.boolean().optional(),
              buildRegion: z.string().optional(),
              enabled: z.boolean(),
              regions: z.array(z.string()).optional(),
            }),
          }),
        }),
        previous: z.object({
          project: z.object({
            id: z.string().optional(),
            staticIps: z.object({
              builds: z.boolean().optional(),
              buildRegion: z.string().optional(),
              enabled: z.boolean(),
              regions: z.array(z.string()).optional(),
            }),
          }),
        }),
      }),
      z.object({
        projectId: z.string(),
        projectName: z.string(),
        trustedIps: z
          .enum([
            "all",
            "all_except_custom_domains",
            "preview",
            "prod_deployment_urls_and_all_previews",
            "production",
            "null",
          ])
          .nullable()
          .optional(),
        oldTrustedIps: z
          .enum([
            "all",
            "all_except_custom_domains",
            "preview",
            "prod_deployment_urls_and_all_previews",
            "production",
            "null",
          ])
          .nullable()
          .optional(),
        addedAddresses: z.array(z.string()).nullable().optional(),
        removedAddresses: z.array(z.string()).nullable().optional(),
      }),
      z.object({
        projectId: z.string(),
        projectName: z.string(),
        addedProjects: z.array(z.object({ id: z.string(), name: z.string() })),
        removedProjects: z.array(z.object({ id: z.string(), name: z.string() })),
        addedProviders: z.array(z.string()),
        removedProviders: z.array(z.string()),
      }),
      z.object({
        projectId: z.string(),
        projectName: z.string().optional(),
        reasonCode: z.enum(["BACKOFFICE", "PUBLIC_API"]).optional(),
      }),
      z.object({
        projectId: z.string(),
        projectName: z.string(),
        projectWebAnalytics: z
          .object({
            id: z.string(),
            disabledAt: z.number().optional(),
            canceledAt: z.number().optional(),
            enabledAt: z.number().optional(),
            hasData: z.literal(true).optional(),
          })
          .optional(),
        prevProjectWebAnalytics: z
          .object({
            id: z.string(),
            disabledAt: z.number().optional(),
            canceledAt: z.number().optional(),
            enabledAt: z.number().optional(),
            hasData: z.literal(true).optional(),
          })
          .nullable()
          .optional(),
      }),
      z.object({
        gitProvider: z.string(),
        gitProviderGroupDescriptor: z.string(),
        gitScope: z.string(),
      }),
      z.object({ connectionId: z.string(), connectionType: z.string() }),
      z.object({
        alias: z.string(),
        sandboxName: z.string(),
        sandboxId: z.string().optional(),
        projectId: z.string().optional(),
      }),
      z.object({
        driveName: z.string(),
        projectId: z.string(),
        projectName: z.string(),
        region: z.string(),
      }),
      z.object({
        projectId: z.string(),
        projectName: z.string(),
        snapshotId: z.string(),
        targetRegions: z.array(z.string()),
      }),
      z.object({ instances: z.number(), url: z.string() }),
      z.object({ email: z.string(), verified: z.boolean() }),
      z.object({
        email: z.string(),
        verified: z.boolean(),
        actorId: z.string(),
        actorType: z.literal("admin"),
        actorName: z.string().optional(),
      }),
      z.object({ email: z.string() }),
      z.object({ uid: z.string(), name: z.union([z.string(), z.object({ name: z.string() })]) }),
      z.object({ oldName: z.string(), newName: z.string(), uid: z.string().optional() }),
      z.object({
        enabled: z.boolean(),
        updatedAt: z.number(),
        firstEnabledAt: z.number().optional(),
        projectId: z.string().optional(),
        projectName: z.string().optional(),
      }),
      z.object({ bio: z.string() }),
      z.object({
        scalingRules: z.record(z.string(), z.object({ min: z.number(), max: z.number() })),
        min: z.number(),
        max: z.number(),
        url: z.string(),
      }),
      z.object({
        userAgent: z.string().optional(),
        geolocation: z
          .object({
            city: z.object({ names: z.object({ en: z.string() }) }).optional(),
            country: z.object({ names: z.object({ en: z.string() }) }),
            most_specific_subdivision: z.object({ names: z.object({ en: z.string() }) }).optional(),
            regionName: z.string().optional(),
          })
          .nullable()
          .optional(),
        env: z.string().optional(),
        os: z.string().optional(),
        username: z.string().optional(),
        ssoType: z.string().optional(),
        factors: z
          .array(
            z.object({
              origin: z.enum([
                "apple",
                "bitbucket",
                "chatgpt",
                "email",
                "github",
                "gitlab",
                "google",
                "otp",
                "saml",
              ]),
              username: z.string().optional(),
              teamId: z.string().optional(),
              legacy: z.boolean().optional(),
              ssoType: z.string().optional(),
            }),
          )
          .optional(),
        viaOTP: z.boolean().optional(),
        viaGithub: z.boolean().optional(),
        viaGitlab: z.boolean().optional(),
        viaBitbucket: z.boolean().optional(),
        viaGoogle: z.boolean().optional(),
        viaApple: z.boolean().optional(),
        viaSamlSso: z.boolean().optional(),
        viaPasskey: z.boolean().optional(),
      }),
      z.object({
        email: z.string(),
        bitbucketLogin: z.string(),
        bitbucketEmail: z.string(),
        bitbucketName: z.string(),
        zeitAccount: z.string(),
        zeitAccountType: z.string(),
      }),
      z.object({
        email: z.string(),
        githubLogin: z.string(),
        zeitAccount: z.string(),
        zeitAccountType: z.string(),
      }),
      z.object({
        email: z.string(),
        gitlabLogin: z.string(),
        gitlabEmail: z.string(),
        gitlabName: z.string(),
        zeitAccount: z.string(),
        zeitAccountType: z.string(),
      }),
      z.object({
        projectId: z.string().optional(),
        projectName: z.string().optional(),
        analyticsId: z.string().optional(),
        sampleRatePercent: z.number().nullable(),
        spendLimitInDollars: z.number().nullable(),
        previous: z.object({
          sampleRatePercent: z.number().nullable(),
          spendLimitInDollars: z.number().nullable(),
        }),
      }),
      z.object({
        budget: z.object({
          budgetItem: z.object({
            type: z.literal("fixed"),
            fixedBudget: z.number(),
            previousSpend: z.array(z.number()),
            notifiedAt: z.array(z.number()),
            webhookId: z.string().optional(),
            webhookNotified: z.boolean().optional(),
            createdAt: z.number(),
            updatedAt: z.number().optional(),
            isActive: z.boolean(),
            pauseProjects: z.boolean().optional(),
            pricingPlan: z.enum(["flex", "legacy", "platform", "plus", "unbundled"]).optional(),
            teamId: z.string(),
            id: z.string(),
          }),
        }),
      }),
      z.object({
        budget: z.object({
          type: z.literal("fixed"),
          fixedBudget: z.number(),
          previousSpend: z.array(z.number()),
          notifiedAt: z.array(z.number()),
          webhookId: z.string().optional(),
          webhookNotified: z.boolean().optional(),
          createdAt: z.number(),
          updatedAt: z.number().optional(),
          isActive: z.boolean(),
          pauseProjects: z.boolean().optional(),
          pricingPlan: z.enum(["flex", "legacy", "platform", "plus", "unbundled"]).optional(),
          teamId: z.string(),
          id: z.string(),
        }),
      }),
      z.object({
        budget: z.object({
          type: z.literal("fixed"),
          fixedBudget: z.number(),
          previousSpend: z.array(z.number()),
          notifiedAt: z.array(z.number()),
          webhookId: z.string().optional(),
          webhookNotified: z.boolean().optional(),
          createdAt: z.number(),
          updatedAt: z.number().optional(),
          isActive: z.boolean(),
          pauseProjects: z.boolean().optional(),
          pricingPlan: z.enum(["flex", "legacy", "platform", "plus", "unbundled"]).optional(),
          teamId: z.string(),
          id: z.string(),
        }),
        webhookUrl: z.string().optional(),
      }),
      z.object({
        budget: z.object({
          type: z.literal("fixed"),
          fixedBudget: z.number(),
          previousSpend: z.array(z.number()),
          notifiedAt: z.array(z.number()),
          webhookId: z.string().optional(),
          webhookNotified: z.boolean().optional(),
          createdAt: z.number(),
          updatedAt: z.number().optional(),
          isActive: z.boolean(),
          pauseProjects: z.boolean().optional(),
          pricingPlan: z.enum(["flex", "legacy", "platform", "plus", "unbundled"]).optional(),
          teamId: z.string(),
          id: z.string(),
        }),
        prevBudget: z
          .object({
            type: z.literal("fixed"),
            fixedBudget: z.number(),
            previousSpend: z.array(z.number()),
            notifiedAt: z.array(z.number()),
            webhookId: z.string().optional(),
            webhookNotified: z.boolean().optional(),
            createdAt: z.number(),
            updatedAt: z.number().optional(),
            isActive: z.boolean(),
            pauseProjects: z.boolean().optional(),
            pricingPlan: z.enum(["flex", "legacy", "platform", "plus", "unbundled"]).optional(),
            teamId: z.string(),
            id: z.string(),
          })
          .optional(),
        webhookUrl: z.string().optional(),
        prevWebhookUrl: z.string().optional(),
      }),
      z.object({ webhookUrl: z.string().optional() }),
      z.object({ storeType: z.enum(["postgres", "redis"]) }),
      z.object({
        transferRequestCode: z.string(),
        store: z.object({
          id: z.string(),
          name: z.string().optional(),
          type: z.enum(["blob", "edge-config", "integration", "postgres", "redis"]),
        }),
      }),
      z.object({
        transferRequestCode: z.string(),
        store: z.object({
          id: z.string(),
          name: z.string().optional(),
          type: z.enum(["blob", "edge-config", "integration", "postgres", "redis"]),
        }),
        destinationTeamId: z.string(),
        destinationTeamName: z.string(),
      }),
      z.object({
        transferRequestCode: z.string(),
        store: z.object({
          id: z.string(),
          name: z.string().optional(),
          type: z.enum(["blob", "edge-config", "integration", "postgres", "redis"]),
        }),
        originTeamId: z.string(),
        originTeamName: z.string(),
      }),
      z.object({
        id: z.string(),
        name: z.string().optional(),
        computeUnitsMax: z.number().optional(),
        computeUnitsMin: z.number().optional(),
        suspendTimeoutSeconds: z.number().optional(),
        type: z.enum(["blob", "edge-config", "integration", "postgres", "redis"]),
        access: z.enum(["private", "public"]).optional(),
      }),
      z.object({
        store: z.object({ name: z.string(), id: z.string() }),
        ownerId: z.string().optional(),
      }),
      z.object({
        id: z.string(),
        name: z.string().optional(),
        computeUnitsMax: z.number().optional(),
        computeUnitsMin: z.number().optional(),
        suspendTimeoutSeconds: z.number().optional(),
        type: z.enum(["blob", "edge-config", "integration", "postgres", "redis"]),
        access: z.enum(["private", "public"]).optional(),
        locked: z.boolean(),
      }),
      z.object({
        actorId: z.string().optional(),
        actorType: z.enum(["admin", "user"]).optional(),
        reason: z.string().optional(),
        caseNumber: z.string().optional(),
        client: z.string().optional(),
      }),
      z.object({ slug: z.string() }),
      z.object({
        previous: z
          .object({
            enabled: z.boolean(),
            scope: z.enum(["all", "private", "public", "selected_repos"]),
            includeDrafts: z.boolean(),
            selectedRepos: z.array(z.string()).nullable().optional(),
          })
          .optional(),
        next: z.object({
          enabled: z.boolean(),
          scope: z.enum(["all", "private", "public", "selected_repos"]),
          includeDrafts: z.boolean(),
          selectedRepos: z.array(z.string()).nullable().optional(),
        }),
      }),
      z.object({
        trialCreditsIssuedAt: z.number(),
        expiresAt: z.string(),
        amount: z.string(),
        currency: z.string(),
      }),
      z.object({
        eventId: z.string(),
        sessionId: z.string(),
        sessionKind: z.string(),
        surface: z.string(),
        occurredAt: z.number(),
      }),
      z.object({
        eventId: z.string(),
        sessionId: z.string(),
        sessionKind: z.string(),
        surface: z.string(),
        occurredAt: z.number(),
        planId: z.string(),
        requestedScopes: z.array(z.string()),
        elevatedScopes: z.array(z.string()),
        mergedScopes: z.array(z.string()),
        githubScopes: z.array(z.string()),
        requestedScopeCount: z.number(),
        elevatedScopeCount: z.number(),
        mergedScopeCount: z.number(),
        githubScopeCount: z.number(),
      }),
      z.object({
        previous: z.enum(["auto-approval", "block", "manual-approval", "null"]).nullable(),
        next: z.enum(["auto-approval", "block", "manual-approval", "null"]).nullable(),
        teamSlug: z.string().optional(),
      }),
      z.object({
        previous: z.enum(["basic", "elastic", "enhanced", "standard", "turbo"]).optional(),
        next: z.enum(["basic", "elastic", "enhanced", "standard", "turbo"]).optional(),
        isSystemInitiated: z.boolean().optional(),
        reason: z
          .enum([
            "basic-floor",
            "build-timeout-failure",
            "enospc-failure",
            "enterprise-floor",
            "high-peak-disk",
            "high-peak-memory",
            "long-build-duration",
            "oom-failure",
            "plan-change",
            "short-build-duration",
            "sustained-high-cpu",
          ])
          .optional(),
      }),
      z.object({
        slug: z.string(),
        teamId: z.string(),
        by: z.string(),
        byUid: z.string().optional(),
        reasons: z.array(z.object({ slug: z.string(), description: z.string() })).optional(),
        removedUsers: z
          .record(
            z.string(),
            z.object({
              role: z.enum([
                "BILLING",
                "CONTRIBUTOR",
                "DEVELOPER",
                "MEMBER",
                "OWNER",
                "SECURITY",
                "VIEWER",
                "VIEWER_FOR_PLUS",
              ]),
              confirmed: z.boolean(),
              confirmedAt: z.number().optional(),
            }),
          )
          .optional(),
        removedMemberCount: z.number().optional(),
        timestamp: z.number().optional(),
      }),
      z.object({ previous: z.object({}).nullable(), next: z.object({}).nullable() }),
      z.object({ enabled: z.boolean(), domain: z.string().optional() }),
      z.object({
        projectId: z.string(),
        projectName: z.string(),
        enabled: z.boolean().nullable(),
        environment: z.enum(["preview", "production"]),
      }),
      z.object({
        environment: z.enum(["preview", "production"]),
        enabled: z.enum(["default", "default-force", "off", "off-force", "on", "on-force"]),
      }),
      z.object({ emailDomain: z.string().nullable().optional() }),
      z.object({ deletedCount: z.number(), inviteIds: z.array(z.string()) }),
      z.object({
        directoryType: z.string().optional(),
        ssoType: z.string().optional(),
        invitedUser: z.object({ username: z.string(), email: z.string() }).optional(),
        invitedEmail: z.string().optional(),
        invitationRole: z.string().optional(),
        entitlements: z.array(z.string()).optional(),
        invitedUid: z.string().optional(),
        origin: z.string().optional(),
        teamSlug: z.string().optional(),
      }),
      z.object({
        teamName: z.string(),
        username: z.string().optional(),
        gitUsername: z.string().optional(),
        githubUsername: z.string().nullable().optional(),
        gitlabUsername: z.string().nullable().optional(),
        bitbucketUsername: z.string().nullable().optional(),
        updatedUid: z.string().optional(),
        teamId: z.string().optional(),
      }),
      z.object({
        teamName: z.string(),
        username: z.string().optional(),
        gitUsername: z.string().nullable().optional(),
        githubUsername: z.string().nullable().optional(),
        gitlabUsername: z.string().nullable().optional(),
        bitbucketUsername: z.string().nullable().optional(),
      }),
      z.object({
        deletedUser: z.object({ username: z.string(), email: z.string() }).optional(),
        deletedUid: z.string().optional(),
        githubUsername: z.string().nullable().optional(),
        gitlabUsername: z.string().nullable().optional(),
        bitbucketUsername: z.string().nullable().optional(),
        directoryType: z.string().optional(),
        role: z
          .enum([
            "BILLING",
            "CONTRIBUTOR",
            "DEVELOPER",
            "MEMBER",
            "OWNER",
            "SECURITY",
            "VIEWER",
            "VIEWER_FOR_PLUS",
          ])
          .optional(),
        reason: z.string().optional(),
        previousPlan: z.enum(["enterprise", "hobby", "pro"]).optional(),
        newPlan: z.enum(["enterprise", "hobby", "pro"]).optional(),
        automated: z.boolean().optional(),
      }),
      z.object({
        entitlement: z.string(),
        user: z.object({ id: z.string(), username: z.string() }),
      }),
      z.object({
        entitlement: z.string(),
        user: z.object({ id: z.string(), username: z.string() }),
        previousCanceledAt: z.string().optional(),
      }),
      z.object({
        role: z.string().optional(),
        uid: z.string().optional(),
        updatedUid: z.string().optional(),
        updatedUser: z.object({ username: z.string(), email: z.string() }).optional(),
        origin: z.string().optional(),
        teamSlug: z.string().optional(),
        teamRoles: z.array(z.string()).optional(),
        teamPermissions: z.array(z.string()).optional(),
        entitlements: z.array(z.string()).optional(),
        invitedBy: z
          .object({ email: z.string(), userId: z.string().optional(), name: z.string().optional() })
          .optional(),
      }),
      z.object({
        requestedTeamName: z.string(),
        requestedTeamSlug: z.string().optional(),
        requestedUserName: z.string().optional(),
        gitUsername: z.string().optional(),
        githubUsername: z.string().optional(),
        gitlabUsername: z.string().optional(),
        bitbucketUsername: z.string().optional(),
        source: z
          .enum([
            "account-update",
            "bitbucket",
            "dsync",
            "feedback",
            "github",
            "gitlab",
            "import",
            "link",
            "mail",
            "nsnb-auto-approve",
            "nsnb-hobby-upgrade",
            "nsnb-invite",
            "nsnb-redeploy",
            "nsnb-redeploy-attribution-card",
            "nsnb-request-access",
            "nsnb-viewer-upgrade",
            "organization-teams",
            "saml",
            "teams",
          ])
          .optional(),
      }),
      z.object({
        directoryType: z.string().optional(),
        ssoType: z.string().optional(),
        updatedUser: z.object({ username: z.string(), email: z.string() }).optional(),
        role: z.string().optional(),
        previousRole: z.string(),
        previousTeamRoles: z
          .array(
            z.enum([
              "BILLING",
              "CONTRIBUTOR",
              "DEVELOPER",
              "MEMBER",
              "OWNER",
              "SECURITY",
              "VIEWER",
              "VIEWER_FOR_PLUS",
            ]),
          )
          .optional(),
        teamRoles: z
          .array(
            z.enum([
              "BILLING",
              "CONTRIBUTOR",
              "DEVELOPER",
              "MEMBER",
              "OWNER",
              "SECURITY",
              "VIEWER",
              "VIEWER_FOR_PLUS",
            ]),
          )
          .optional(),
        previousTeamPermissions: z
          .array(
            z.enum([
              "AiGatewayApiKeyOwnedBySelf",
              "AiGatewayBudgetManager",
              "AiGatewayCredits",
              "AiGatewaySettings",
              "ConnectorManager",
              "CreateProject",
              "EnvVariableManager",
              "EnvironmentManager",
              "FullProductionDeployment",
              "IntegrationManager",
              "OrgAdmin",
              "OrgViewer",
              "UsageViewer",
              "V0Builder",
              "V0Chatter",
              "V0Viewer",
              "WorkflowDecryptor",
            ]),
          )
          .optional(),
        teamPermissions: z
          .array(
            z.enum([
              "AiGatewayApiKeyOwnedBySelf",
              "AiGatewayBudgetManager",
              "AiGatewayCredits",
              "AiGatewaySettings",
              "ConnectorManager",
              "CreateProject",
              "EnvVariableManager",
              "EnvironmentManager",
              "FullProductionDeployment",
              "IntegrationManager",
              "OrgAdmin",
              "OrgViewer",
              "UsageViewer",
              "V0Builder",
              "V0Chatter",
              "V0Viewer",
              "WorkflowDecryptor",
            ]),
          )
          .optional(),
        updatedUid: z.string().optional(),
        origin: z.string().optional(),
        teamSlug: z.string().optional(),
      }),
      z.object({
        email: z.string().optional(),
        authorized: z.boolean(),
        reason: z.string().optional(),
      }),
      z.object({ enforced: z.boolean() }),
      z.object({
        publicId: z.string(),
        role: z.string(),
        maxUses: z.number(),
        expiresAt: z.string(),
        name: z.string().optional(),
      }),
      z.object({ publicId: z.string(), name: z.string().optional() }),
      z.object({ previousConcurrentBuilds: z.number(), nextConcurrentBuilds: z.number() }),
      z.object({
        plan: z.enum(["enterprise", "hobby", "pro"]),
        trial: z.object({ start: z.number(), end: z.number() }).nullable().optional(),
      }),
      z.object({
        invoiceId: z.string(),
        convertedFromTrial: z.boolean(),
        plan: z.enum(["enterprise", "hobby", "pro"]),
      }),
      z.object({ inviteCode: z.string().optional() }),
      z.object({ name: z.string().optional() }),
      z.object({
        name: z.string().optional(),
        actorId: z.string(),
        actorType: z.literal("admin"),
        actorName: z.string().optional(),
      }),
      z.object({ decision: z.enum(["keep_on", "turn_off"]), version: z.string() }),
      z.object({ consent: z.enum(["granted", "refused"]) }),
      z.object({ remoteCaching: z.object({ enabled: z.boolean().optional() }).optional() }),
      z.object({ deletedCount: z.number() }),
      z.object({ enabled: z.enum(["default", "off", "on"]) }),
      z.object({ enabled: z.boolean(), scope: z.enum(["dashboard", "log-drains"]) }),
      z.object({
        previous: z
          .record(
            z.string(),
            z.union([
              z.object({ accessGroupId: z.string() }),
              z.enum([
                "BILLING",
                "CONTRIBUTOR",
                "DEVELOPER",
                "MEMBER",
                "OWNER",
                "SECURITY",
                "VIEWER",
                "VIEWER_FOR_PLUS",
              ]),
            ]),
          )
          .optional(),
        next: z
          .record(
            z.string(),
            z.union([
              z.object({ accessGroupId: z.string() }),
              z.enum([
                "BILLING",
                "CONTRIBUTOR",
                "DEVELOPER",
                "MEMBER",
                "OWNER",
                "SECURITY",
                "VIEWER",
                "VIEWER_FOR_PLUS",
              ]),
            ]),
          )
          .optional(),
      }),
      z.object({ domain: z.string(), ips: z.array(z.string()) }),
      z.object({ tokenTypes: z.array(z.string()) }),
      z.object({ exportId: z.string(), from: z.number(), to: z.number(), format: z.string() }),
      z.object({ fileId: z.string() }),
      z.object({ slug: z.string().optional() }),
      z.object({
        slug: z.string().optional(),
        actorId: z.string(),
        actorType: z.literal("admin"),
        actorName: z.string().optional(),
      }),
      z.object({
        projectId: z.string(),
        projectName: z.string(),
        sampling: z
          .array(
            z.object({
              type: z.literal("head_sampling"),
              rate: z.number(),
              env: z.enum(["preview", "production"]).optional(),
              requestPath: z.string().optional(),
            }),
          )
          .optional(),
      }),
      z.object({ reason: z.literal("limits-exceeded") }),
      z.object({ teamName: z.string().optional() }),
      z.object({
        totp: z.boolean(),
        recoveryCodes: z.number(),
        actorId: z.string().optional(),
        actorType: z.enum(["admin", "user"]).optional(),
        actorName: z.string().optional(),
        reason: z.string().optional(),
      }),
      z.object({ deletedAt: z.number().nullable().optional(), username: z.string() }),
      z.object({
        deletedAt: z.number().nullable().optional(),
        username: z.string(),
        actorId: z.string(),
        actorType: z.literal("admin"),
        actorName: z.string().optional(),
      }),
      z.object({ username: z.string() }),
      z.object({ teamName: z.string() }),
      z.object({ teamId: z.string(), teamName: z.string() }),
      z.object({
        actorId: z.string(),
        actorType: z.literal("admin"),
        reason: z.string().optional(),
      }),
      z.object({ actorId: z.string(), actorType: z.literal("admin") }),
      z.object({ enabled: z.boolean(), actorId: z.string(), actorType: z.literal("admin") }),
      z.object({
        autoBlockPrevented: z.boolean(),
        preventUntil: z.number().optional(),
        actorId: z.string(),
        actorType: z.literal("admin"),
        reason: z.string().optional(),
      }),
      z.object({
        method: z.enum(["email-otp", "recovery-code", "totp", "webauthn"]),
        reason: z.string(),
        flowId: z.string().optional(),
        loginSessionId: z.string().optional(),
      }),
      z.object({
        allowedMethods: z.array(z.enum(["recovery-code", "totp", "webauthn"])),
        firstFactor: z.string(),
        flowId: z.string(),
        loginSessionId: z.string().optional(),
      }),
      z.object({
        action: z.enum([
          "add-passkey",
          "add-totp",
          "admin-remove",
          "disable",
          "enable",
          "regenerate-recovery-codes",
          "remove-passkey",
        ]),
        reason: z.string(),
      }),
      z.object({
        previous: z.object({ enabled: z.boolean(), totpVerified: z.boolean() }),
        next: z.object({ enabled: z.boolean(), totpVerified: z.boolean() }),
        method: z.enum(["passkey", "self_serve_recovery", "totp", "user_disabled"]).optional(),
      }),
      z.object({ remaining: z.number(), context: z.enum(["login", "sudo"]).optional() }),
      z.object({ mfaEnabled: z.boolean() }),
      z.object({ mfa: z.object({ enabled: z.boolean(), totpVerified: z.boolean() }) }),
      z.object({ enabled: z.boolean(), totpVerified: z.boolean() }),
      z.object({
        previous: z.object({ enabled: z.boolean(), totpVerified: z.boolean() }),
        next: z.object({ enabled: z.boolean(), totpVerified: z.boolean() }),
      }),
      z.object({
        provider: z.literal("google"),
        providerSubjectId: z.string(),
        outcome: z.enum(["account-matched", "linking-required"]),
        decision: z.object({
          authoritative: z.boolean(),
          basis: z.enum(["gmail", "none", "workspace-mx"]),
          emailDomain: z.string(),
          emailVerified: z.boolean(),
          hostedDomainMatch: z.boolean(),
          mxOutcome: z.enum(["google", "lookup-error", "non-google", "not-checked"]),
        }),
      }),
      z.object({ email: z.string(), prevEmail: z.string() }),
      z.object({
        email: z.string(),
        prevEmail: z.string(),
        actorId: z.string(),
        actorType: z.literal("admin"),
        actorName: z.string().optional(),
      }),
      z.object({
        username: z.string(),
        actorId: z.string(),
        actorType: z.literal("admin"),
        actorName: z.string().optional(),
      }),
      z.object({ projectId: z.string(), projectName: z.string(), repositoryName: z.string() }),
      z.object({
        projectId: z.string(),
        projectName: z.string(),
        repositoryName: z.string(),
        reference: z.string(),
        digest: z.string(),
      }),
      z.object({
        projectId: z.string(),
        projectName: z.string(),
        repositoryName: z.string(),
        reference: z.string(),
      }),
      z.object({
        projectId: z.string(),
        projectName: z.string(),
        repositoryName: z.string(),
        sharedWithTeamId: z.string(),
        sharedWithTeamSlug: z.string(),
      }),
      z.object({
        projectId: z.string(),
        projectName: z.string(),
        repositoryName: z.string(),
        sharedWithTeamId: z.string(),
      }),
      z.object({
        projectId: z.string(),
        projectName: z.string(),
        repositoryName: z.string(),
        public: z.boolean(),
      }),
      z.object({
        projectId: z.string(),
        projectName: z.string(),
        repositoryName: z.string(),
        removedTeamIds: z.array(z.string()),
      }),
      z.object({ ruleName: z.string() }),
      z.object({
        previousProjectCount: z.number().nullable(),
        nextProjectCount: z.number().nullable(),
      }),
      z.object({ customAlertTitle: z.string() }),
      z.object({
        vulnerabilities: z.array(z.string()),
        protectionEnabled: z.boolean(),
        protectedProjectCount: z.number(),
      }),
      z.object({
        team: z.object({ name: z.string(), id: z.string() }),
        configuration: z.object({ id: z.string(), name: z.string().optional() }),
        peering: z.object({
          id: z.string(),
          accountId: z.string(),
          region: z.string(),
          vpcId: z.string(),
        }),
      }),
      z.object({
        team: z.object({ name: z.string(), id: z.string() }),
        configuration: z.object({ id: z.string(), name: z.string().optional() }),
        peering: z.object({ id: z.string(), name: z.string().optional() }),
      }),
      z.object({
        team: z.object({ name: z.string(), id: z.string() }),
        configuration: z.object({ id: z.string(), name: z.string().optional() }),
        peering: z.object({ id: z.string(), name: z.string().optional() }),
        newName: z.string().optional(),
      }),
      z.object({ tier: z.enum(["plus", "pro"]) }),
      z.object({ id: z.string(), url: z.string() }),
      z.object({ chatId: z.string(), chatTitle: z.string().optional() }),
      z.object({
        model: z.string(),
        useCase: z.string(),
        chatId: z.string(),
        messageId: z.string(),
        inputTokens: z.number(),
        outputTokens: z.number(),
        timestamp: z.number(),
        events: z.array(
          z.object({
            eventId: z.string(),
            modelId: z.string(),
            inputTokens: z.number(),
            outputTokens: z.number(),
            totalTokens: z.number(),
            cacheCreationInputTokens: z.number(),
            cacheReadInputTokens: z.number(),
            timestamp: z.string(),
          }),
        ),
      }),
      z.object({ chatId: z.string(), chatTitle: z.string().optional(), messageId: z.string() }),
      z.object({ deploymentId: z.string(), projectId: z.string(), runId: z.string() }),
      z.object({
        grantType: z.enum([
          "authorization_code",
          "urn:ietf:params:oauth:grant-type:device_code",
          "urn:ietf:params:oauth:grant-type:token-exchange",
        ]),
        appName: z.string(),
        atTTL: z.number(),
        rtTTL: z.number().optional(),
        scope: z.string(),
        authMethod: z.enum([
          "app",
          "apple",
          "bitbucket",
          "chatgpt",
          "email",
          "emu",
          "github",
          "github-webhook",
          "gitlab",
          "google",
          "invite",
          "manual",
          "otp",
          "passkey",
          "saml",
          "sms",
          "token-exchange-oidc",
        ]),
        app: z
          .object({
            clientId: z.string(),
            name: z.string(),
            clientAuthenticationUsed: z.object({
              method: z.enum([
                "client_secret_basic",
                "client_secret_jwt",
                "client_secret_post",
                "none",
                "oidc_token",
                "private_key_jwt",
              ]),
              secretId: z.string().optional(),
            }),
          })
          .optional(),
        includesRefreshToken: z.boolean().optional(),
        publicId: z.string().optional(),
        tokenPrefix: z.literal("vca_").optional(),
        tokenSuffix: z.string().optional(),
        refreshTokenPublicId: z.string().optional(),
        refreshTokenPrefix: z.literal("vcr_").optional(),
        refreshTokenSuffix: z.string().optional(),
        sessionId: z.string().optional(),
        ip: z.string().nullable().optional(),
        geolocation: z
          .object({
            city: z.object({ names: z.object({ en: z.string() }) }).optional(),
            country: z.object({ names: z.object({ en: z.string() }) }),
            most_specific_subdivision: z.object({ names: z.object({ en: z.string() }) }).optional(),
            regionName: z.string().optional(),
          })
          .nullable()
          .optional(),
        userAgent: z.string().optional(),
        issuerUrl: z.string().optional(),
        policyId: z.string().optional(),
        oidcSubject: z.string().optional(),
      }),
      z.object({
        policy: z.object({
          policyId: z.string(),
          clientId: z.string(),
          issuerUrl: z.string(),
          teamId: z.string(),
          name: z.string().nullable(),
          claims: z.array(
            z.object({
              name: z.string(),
              values: z.array(z.object({ value: z.string(), wildcards: z.boolean() })),
            }),
          ),
          permissions: z.array(z.string()),
          resources: z.object({ projectIds: z.array(z.string()) }).nullable(),
          createdAt: z.number(),
          updatedAt: z.number(),
        }),
        appName: z.string().optional(),
      }),
      z.object({
        before: z.object({
          policyId: z.string(),
          clientId: z.string(),
          issuerUrl: z.string(),
          teamId: z.string(),
          name: z.string().nullable(),
          claims: z.array(
            z.object({
              name: z.string(),
              values: z.array(z.object({ value: z.string(), wildcards: z.boolean() })),
            }),
          ),
          permissions: z.array(z.string()),
          resources: z.object({ projectIds: z.array(z.string()) }).nullable(),
          createdAt: z.number(),
          updatedAt: z.number(),
        }),
        after: z.object({
          policyId: z.string(),
          clientId: z.string(),
          issuerUrl: z.string(),
          teamId: z.string(),
          name: z.string().nullable(),
          claims: z.array(
            z.object({
              name: z.string(),
              values: z.array(z.object({ value: z.string(), wildcards: z.boolean() })),
            }),
          ),
          permissions: z.array(z.string()),
          resources: z.object({ projectIds: z.array(z.string()) }).nullable(),
          createdAt: z.number(),
          updatedAt: z.number(),
        }),
        appName: z.string().optional(),
      }),
      z.object({
        tokenId: z.string(),
        tokenPrefix: z.literal("vcp_").optional(),
        tokenSuffix: z.string().optional(),
        tokenName: z.string(),
        origin: z.enum([
          "app",
          "apple",
          "bitbucket",
          "chatgpt",
          "email",
          "emu",
          "github",
          "github-webhook",
          "gitlab",
          "google",
          "invite",
          "manual",
          "otp",
          "passkey",
          "saml",
          "sms",
          "token-exchange-oidc",
        ]),
        scope: z.enum(["project", "team", "user"]),
        teamId: z.string().optional(),
        teamSlug: z.string().optional(),
        projectId: z.string().optional(),
        projectScope: z.enum(["account", "project-only"]).optional(),
        expiresAt: z.number().optional(),
        hasAuthorizationDetails: z.boolean().optional(),
        ip: z.string().nullable().optional(),
        geolocation: z
          .object({
            city: z.object({ names: z.object({ en: z.string() }) }).optional(),
            country: z.object({ names: z.object({ en: z.string() }) }),
            most_specific_subdivision: z.object({ names: z.object({ en: z.string() }) }).optional(),
            regionName: z.string().optional(),
          })
          .nullable()
          .optional(),
        userAgent: z.string().optional(),
        reqId: z.string().optional(),
        reqUrl: z.string().optional(),
      }),
      z.object({
        tokenId: z.string(),
        tokenType: z.string(),
        tokenName: z.string(),
        actorTokenId: z.string(),
        origin: z
          .enum([
            "app",
            "apple",
            "bitbucket",
            "chatgpt",
            "email",
            "emu",
            "github",
            "github-webhook",
            "gitlab",
            "google",
            "invite",
            "manual",
            "otp",
            "passkey",
            "saml",
            "sms",
            "token-exchange-oidc",
          ])
          .optional(),
        teamId: z.string().optional(),
        expired: z.boolean().optional(),
        leaked: z.boolean().optional(),
        revoked: z.boolean().optional(),
        ip: z.string().nullable().optional(),
        geolocation: z
          .object({
            city: z.object({ names: z.object({ en: z.string() }) }).optional(),
            country: z.object({ names: z.object({ en: z.string() }) }),
            most_specific_subdivision: z.object({ names: z.object({ en: z.string() }) }).optional(),
            regionName: z.string().optional(),
          })
          .nullable()
          .optional(),
        userAgent: z.string().optional(),
        reqId: z.string().optional(),
        reqUrl: z.string().optional(),
      }),
      z.object({
        deletedCount: z.number(),
        actorTokenId: z.string(),
        ip: z.string().nullable().optional(),
        geolocation: z
          .object({
            city: z.object({ names: z.object({ en: z.string() }) }).optional(),
            country: z.object({ names: z.object({ en: z.string() }) }),
            most_specific_subdivision: z.object({ names: z.object({ en: z.string() }) }).optional(),
            regionName: z.string().optional(),
          })
          .nullable()
          .optional(),
        userAgent: z.string().optional(),
        reqId: z.string().optional(),
        reqUrl: z.string().optional(),
      }),
    ])
    .optional(),
});
