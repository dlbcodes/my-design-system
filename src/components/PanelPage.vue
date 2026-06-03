<script setup lang="ts">
import DocPage from "../layout/DocPage.vue";
import DocExample from "../layout/DocExample.vue";
import {
    Panel,
    PanelHeader,
    PanelContent,
    PanelFooter,
} from "../../lib/components/primitives/panel/index.ts";
</script>

<template>
    <DocPage
        name="Panel"
        description="A layout container that groups content into a rounded surface. Header, content, and footer are independent parts — use any subset and compose what goes inside them."
    >
        <DocExample
            title="Full panel"
            description="Header, content, and footer. Each part is an unstyled slot you fill yourself."
        >
            <div class="w-full max-w-sm">
                <Panel>
                    <PanelHeader>
                        <span class="font-medium text-text-primary"
                            >Project</span
                        >
                    </PanelHeader>
                    <PanelContent>
                        The content box nests concentrically inside the panel's
                        padding.
                    </PanelContent>
                    <PanelFooter>
                        <span class="text-text-primary">Footer region</span>
                    </PanelFooter>
                </Panel>
            </div>
        </DocExample>

        <DocExample
            title="Content only"
            description="Header and footer are optional — omit them and only the content box renders."
        >
            <div class="w-full max-w-sm">
                <Panel>
                    <PanelContent
                        >Just content, no header or footer.</PanelContent
                    >
                </Panel>
            </div>
        </DocExample>

        <DocExample
            title="Header + content"
            description="Any subset of parts works; here there's no footer."
        >
            <div class="w-full max-w-sm">
                <Panel>
                    <PanelHeader>
                        <span class="font-medium text-text-primary"
                            >Settings</span
                        >
                    </PanelHeader>
                    <PanelContent>Content with a header above it.</PanelContent>
                </Panel>
            </div>
        </DocExample>
    </DocPage>
</template>
