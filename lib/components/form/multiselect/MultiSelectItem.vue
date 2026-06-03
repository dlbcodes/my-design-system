<script setup lang="ts">
import { computed } from "vue";
import Checkbox from "../../form/Checkbox.vue";
import { useMultiSelectContext } from "./use-context";

interface Props {
    value: string;
    label: string;
    disabled?: boolean;
}

const props = defineProps<Props>();

const ctx = useMultiSelectContext("MultiSelectItem");

const selected = computed(() => ctx.isSelected(props.value));
const visible = computed(() => ctx.matchesQuery(props.label));
</script>

<template>
    <button
        v-show="visible"
        type="button"
        :disabled="disabled"
        :aria-pressed="selected"
        class="flex w-full cursor-pointer select-none items-center gap-x-2 rounded-lg px-3 py-2 text-left text-base text-text-primary transition-colors hover:bg-bg-surface disabled:pointer-events-none disabled:opacity-50"
        @click="ctx.toggle(value)"
    >
        <Checkbox :model-value="selected" visual />
        <slot :selected="selected">
            <span
                class="truncate"
                :class="selected ? 'font-medium' : 'font-normal'"
            >
                {{ label }}
            </span>
        </slot>
    </button>
</template>
