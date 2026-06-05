<script setup lang="ts">
import Alert from "../../../lib/components/primitives/alert/Alert.vue";
import AlertTitle from "../../../lib/components/primitives/alert/AlertTitle.vue";
import AlertDescription from "../../../lib/components/primitives/alert/AlertDescription.vue";
</script>

<template>
    <div class="w-full max-w-md">
        <Alert>
            <AlertTitle>Heads up</AlertTitle>
            <AlertDescription>
                This is a neutral alert with a title and a short description.
            </AlertDescription>
        </Alert>
    </div>
</template>
