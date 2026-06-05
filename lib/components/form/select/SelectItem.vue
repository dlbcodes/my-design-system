<script setup lang="ts">
import { computed, inject, ref } from "vue";
import { ListboxOption } from "@headlessui/vue";
import { PhCheck } from "@phosphor-icons/vue";
import { SelectKey } from "./context";

interface Props {
    value: string;
    disabled?: boolean;
}

const props = defineProps<Props>();

const ctx = inject(SelectKey);
if (!ctx) throw new Error("SelectItem must be used inside Select");

// Ref to the rendered label element, so we can read its text for the trigger
// display and for search matching (the label is now slot content, not a prop).
const labelEl = ref<HTMLElement>();

const labelText = (): string => labelEl.value?.textContent?.trim() ?? "";

// Self-filter: when searching, hide items whose text doesn't match.
const visible = computed(() => {
    if (!ctx.searchable.value) return true;
    const q = ctx.query.value.trim().toLowerCase();
    return !q || labelText().toLowerCase().includes(q);
});

// On click, capture this item's rendered text as the label and select it.
const onSelect = (): void => {
    if (props.disabled) return;
    ctx.select(props.value, labelText());
};
</script>

<template>
    <ListboxOption
        v-show="visible"
        v-slot="{ active, selected }"
        :value="value"
        :disabled="disabled"
        as="template"
    >
        <li
            :class="[
                'relative flex cursor-pointer select-none items-center rounded-lg py-2 pl-3 pr-9',
                active && 'bg-bg-surface',
                disabled && 'pointer-events-none opacity-50',
            ]"
            @click="onSelect"
        >
            <span
                ref="labelEl"
                :class="['block truncate', selected && 'font-semibold']"
            >
                <slot :active="active" :selected="selected" />
            </span>
            <span
                v-if="selected"
                class="absolute inset-y-0 right-0 flex items-center pr-3 text-accent-pro-200"
            >
                <PhCheck class="size-5" aria-hidden="true" />
            </span>
        </li>
    </ListboxOption>
</template>
