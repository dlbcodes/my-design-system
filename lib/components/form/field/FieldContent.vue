<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "../../../utils/cn";

interface Props {
    class?: HTMLAttributes["class"];
}

const props = defineProps<Props>();
</script>

<template>
    <div :class="cn('flex flex-col gap-y-0.5', props.class)">
        <slot />
    </div>
</template>
