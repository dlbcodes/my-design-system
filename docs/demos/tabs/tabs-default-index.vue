<script setup lang="ts">
import Tabs from "../../../lib/components/primitives/tabs/Tabs.vue";
import TabsList from "../../../lib/components/primitives/tabs/TabsList.vue";
import TabsTrigger from "../../../lib/components/primitives/tabs/TabsTrigger.vue";
import TabsPanels from "../../../lib/components/primitives/tabs/TabsPanels.vue";
import TabsContent from "../../../lib/components/primitives/tabs/TabsContent.vue";
</script>

<template>
    <Tabs :default-index="1">
        <TabsList>
            <TabsTrigger>Overview</TabsTrigger>
            <TabsTrigger>Analytics</TabsTrigger>
            <TabsTrigger>Reports</TabsTrigger>
        </TabsList>
        <TabsPanels>
            <TabsContent
                ><p class="text-sm text-text-secondary">
                    Overview content.
                </p></TabsContent
            >
            <TabsContent
                ><p class="text-sm text-text-secondary">
                    Analytics content — selected by default.
                </p></TabsContent
            >
            <TabsContent
                ><p class="text-sm text-text-secondary">
                    Reports content.
                </p></TabsContent
            >
        </TabsPanels>
    </Tabs>
</template>
