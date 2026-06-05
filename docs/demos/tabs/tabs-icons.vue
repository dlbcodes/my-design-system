<script setup lang="ts">
import Tabs from "../../../lib/components/primitives/tabs/Tabs.vue";
import TabsList from "../../../lib/components/primitives/tabs/TabsList.vue";
import TabsTrigger from "../../../lib/components/primitives/tabs/TabsTrigger.vue";
import TabsPanels from "../../../lib/components/primitives/tabs/TabsPanels.vue";
import TabsContent from "../../../lib/components/primitives/tabs/TabsContent.vue";
import { PhUser, PhLock, PhBell } from "@phosphor-icons/vue";
</script>

<template>
    <Tabs>
        <TabsList>
            <TabsTrigger>
                <PhUser class="size-4" />
                Account
            </TabsTrigger>
            <TabsTrigger>
                <PhLock class="size-4" />
                Security
            </TabsTrigger>
            <TabsTrigger>
                <PhBell class="size-4" />
                Alerts
            </TabsTrigger>
        </TabsList>
        <TabsPanels>
            <TabsContent
                ><p class="text-sm text-text-secondary">
                    Account panel.
                </p></TabsContent
            >
            <TabsContent
                ><p class="text-sm text-text-secondary">
                    Security panel.
                </p></TabsContent
            >
            <TabsContent
                ><p class="text-sm text-text-secondary">
                    Alerts panel.
                </p></TabsContent
            >
        </TabsPanels>
    </Tabs>
</template>
