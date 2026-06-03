<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "../../utils/cn";

interface Props {
    /**
     * Optional spoken name for the whole combo, e.g. "Command K". Useful when
     * the keys are symbols (⌘, ⇧) that screen readers may not read clearly.
     * When set, the group is announced as one label instead of per-key.
     */
    ariaLabel?: string;
    class?: HTMLAttributes["class"];
}

const props = defineProps<Props>();
</script>

<template>
    <div
        :class="cn('inline-flex items-center gap-1', props.class)"
        :aria-label="ariaLabel"
        :role="ariaLabel ? 'group' : undefined"
    >
        <slot />
    </div>
</template>
