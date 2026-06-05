<script setup lang="ts">
import Alert from "../../../lib/components/primitives/alert/Alert.vue";
import AlertTitle from "../../../lib/components/primitives/alert/AlertTitle.vue";
import AlertDescription from "../../../lib/components/primitives/alert/AlertDescription.vue";
import Button from "../../../lib/components/primitives/Button.vue";
import { PhSealWarning } from "@phosphor-icons/vue";
</script>

<template>
    <div class="w-full max-w-md">
        <Alert variant="warning">
            <template #icon><PhSealWarning /></template>
            <AlertTitle>Subscription expiring</AlertTitle>
            <AlertDescription>Your plan renews in 3 days.</AlertDescription>
            <template #action>
                <Button variant="ghost" size="sm">Renew</Button>
            </template>
        </Alert>
    </div>
</template>
