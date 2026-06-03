<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { MenuItem } from "@headlessui/vue";
import { cn } from "../../../utils/cn";

interface Props {
    disabled?: boolean;
    class?: HTMLAttributes["class"];
}

const props = defineProps<Props>();

const emit = defineEmits<{ select: [] }>();
</script>

<template>
    <MenuItem v-slot="{ active }" :disabled="disabled">
        <button
            type="button"
            :disabled="disabled"
            :data-active="active || undefined"
            :class="
                cn(
                    'flex w-full cursor-pointer select-none items-center gap-x-2 rounded-lg px-2 py-1.5 text-sm text-text-primary outline-none transition-colors data-active:bg-bg-subtle disabled:pointer-events-none disabled:opacity-50',
                    props.class,
                )
            "
            @click="emit('select')"
        >
            <slot :active="active" />
        </button>
    </MenuItem>
</template>
