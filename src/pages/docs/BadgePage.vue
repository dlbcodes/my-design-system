<script setup lang="ts">
import DocPage from "../../components/DocPage.vue";
import DocExample from "../../components/DocExample.vue";
import Badge from "../../../lib/components/primitives/Badge.vue";
</script>

<template>
    <DocPage
        name="Badge"
        description="A small status / label chip. Status variants are tokenized; the text should carry the meaning (see accessibility note)."
    >
        <DocExample title="Status variants">
            <Badge variant="success">Active</Badge>
            <Badge variant="pending">Pending</Badge>
            <Badge variant="info">New</Badge>
            <Badge variant="destructive">Failed</Badge>
        </DocExample>

        <DocExample title="Neutral / brand">
            <Badge variant="neutral">Draft</Badge>
            <Badge variant="primary">Pro</Badge>
            <Badge variant="outline">Beta</Badge>
        </DocExample>

        <DocExample
            title="With an icon"
            description="An icon reinforces the status beyond color (recommended — see note)."
        >
            <Badge variant="success">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="3"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                >
                    <path d="M5 13l4 4L19 7" />
                </svg>
                Verified
            </Badge>
            <Badge variant="destructive">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="3"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                >
                    <path d="M18 6L6 18M6 6l12 12" />
                </svg>
                Rejected
            </Badge>
        </DocExample>

        <!-- Accessibility guidance -->
        <section
            class="flex flex-col gap-y-2 rounded-xl border border-warning-border bg-warning-surface p-4"
        >
            <h2 class="text-sm font-semibold text-warning-text">
                Accessibility
            </h2>
            <p class="text-sm text-text-secondary">
                Don't rely on color alone to convey status (WCAG 1.4.1). The
                badge's text must carry the meaning — "Failed", not just a red
                chip. For icon-heavy or terse badges, add an icon so the status
                is distinguishable without color. The component needs no ARIA:
                it's inline text where the text is the label.
            </p>
        </section>
    </DocPage>
</template>
