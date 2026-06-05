<script setup lang="ts">
import Tabs from "../../../lib/components/primitives/tabs/Tabs.vue";
import TabsList from "../../../lib/components/primitives/tabs/TabsList.vue";
import TabsTrigger from "../../../lib/components/primitives/tabs/TabsTrigger.vue";
import TabsPanels from "../../../lib/components/primitives/tabs/TabsPanels.vue";
import TabsContent from "../../../lib/components/primitives/tabs/TabsContent.vue";
</script>

<template>
    <Tabs>
        <TabsList>
            <TabsTrigger>Account</TabsTrigger>
            <TabsTrigger>Password</TabsTrigger>
            <TabsTrigger>Notifications</TabsTrigger>
        </TabsList>
        <TabsPanels>
            <TabsContent>
                <p class="text-sm text-text-secondary">
                    Manage your account details and profile.
                </p>
            </TabsContent>
            <TabsContent>
                <p class="text-sm text-text-secondary">
                    Update your password and security settings.
                </p>
            </TabsContent>
            <TabsContent>
                <p class="text-sm text-text-secondary">
                    Choose what you get notified about.
                </p>
            </TabsContent>
        </TabsPanels>
    </Tabs>
</template>
