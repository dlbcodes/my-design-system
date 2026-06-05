<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "../../../utils/cn";
import {
    alertVariants,
    type AlertVariantsProps,
} from "../../../variants/alert";

interface Props {
    variant?: AlertVariantsProps["variant"];
    class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<Props>(), {
    variant: "neutral",
});
</script>

<template>
    <div role="alert" :class="cn(alertVariants({ variant }), props.class)">
        <!-- Optional leading icon -->
        <span v-if="$slots.icon" class="mt-0.5 shrink-0 [&>svg]:size-5">
            <slot name="icon" />
        </span>
        <!-- Title + description -->
        <div class="flex min-w-0 flex-1 flex-col gap-0.5">
            <slot />
        </div>
        <!-- Optional action, top-right -->
        <div v-if="$slots.action" class="shrink-0">
            <slot name="action" />
        </div>
    </div>
</template>
