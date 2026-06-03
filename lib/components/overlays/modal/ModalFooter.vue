<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "../../../utils/cn";

interface Props {
    class?: HTMLAttributes["class"];
}

const props = defineProps<Props>();
</script>

<template>
    <div
        :class="
            cn(
                'flex items-center justify-end gap-3 px-6 pb-4 pt-2',
                props.class,
            )
        "
    >
        <slot />
    </div>
</template>
