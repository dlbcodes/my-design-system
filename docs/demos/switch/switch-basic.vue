<script setup lang="ts">
import { ref } from "vue";
import Switch from "../../../lib/components/form/Switch.vue";

const on = ref(false);
</script>

<template>
    <Switch v-model="on" aria-label="Toggle setting" />
</template>
