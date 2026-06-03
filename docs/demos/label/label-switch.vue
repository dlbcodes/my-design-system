<script setup lang="ts">
import { ref } from "vue";
import Label from "../../../lib/components/primitives/Label.vue";
import Switch from "../../../lib/components/form/Switch.vue";

const enabled = ref(false);
</script>

<template>
    <div class="flex items-center gap-2">
        <Switch id="notifications" v-model="enabled" />
        <Label for="notifications">Enable notifications</Label>
    </div>
</template>
