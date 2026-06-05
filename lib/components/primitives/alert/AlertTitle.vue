<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "../../../utils/cn";

interface Props {
    class?: HTMLAttributes["class"];
}

const props = defineProps<Props>();
</script>

<template>
    <div :class="cn('font-medium', props.class)">
        <slot />
    </div>
</template>
