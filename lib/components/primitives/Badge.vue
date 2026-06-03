<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "../../utils/cn";
import { badgeVariants, type BadgeProps } from "../../variants/badge";

interface Props {
    variant?: BadgeProps["variant"];
    class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<Props>(), {
    variant: "neutral",
});
</script>

<template>
    <span :class="cn(badgeVariants({ variant: props.variant }), props.class)">
        <slot />
    </span>
</template>
