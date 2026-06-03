<script setup lang="ts">
import { ref } from "vue";
import Switch from "../../../lib/components/form/Switch.vue";
import Label from "../../../lib/components/primitives/Label.vue";

const enabled = ref(true);
</script>

<template>
    <div class="flex items-center gap-2">
        <Switch id="airplane" v-model="enabled" />
        <Label for="airplane">Airplane mode</Label>
    </div>
</template>
