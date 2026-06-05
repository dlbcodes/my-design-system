<script setup lang="ts">
import { computed, provide, ref, useId } from "vue";
import { Listbox } from "@headlessui/vue";
import { Float } from "@headlessui-float/vue";
import { cn } from "../../../utils/cn";
import { SelectKey, type SelectContext } from "./context";

type Placement =
    | "bottom-start"
    | "bottom-end"
    | "bottom"
    | "top-start"
    | "top-end"
    | "top";

interface Props {
    modelValue: string;
    searchable?: boolean;
    placement?: Placement;
    offset?: number;
    class?: string;
}

const props = withDefaults(defineProps<Props>(), {
    searchable: false,
    placement: "bottom-start",
    offset: 4,
});

const emit = defineEmits<{
    "update:modelValue": [value: string];
}>();

const query = ref("");

// The label captured from the chosen item. Falls back to the raw value for a
// pre-filled selection the user hasn't opened/picked yet.
const capturedLabel = ref("");

const selected = computed({
    get: () => props.modelValue,
    set: (value: string) => emit("update:modelValue", value),
});

const selectedLabel = computed(() => capturedLabel.value || props.modelValue);

provide<SelectContext>(SelectKey, {
    selected: computed(() => props.modelValue),
    selectedLabel,
    select: (value: string, label: string) => {
        capturedLabel.value = label;
        selected.value = value;
        query.value = "";
    },
    isSelected: (value: string) => props.modelValue === value,
    query,
    searchable: computed(() => props.searchable),
    id: useId(),
});
</script>

<template>
    <Listbox v-model="selected" as="div" class="w-full">
        <!--
      CSS adaptive-width: Float renders as a relative div, the floating element
      is positioned directly (floating-as="template"). The trigger and panel are
      both children of this relative box, so a w-full panel matches the w-full
      trigger. Width is controlled entirely by the class on the panel (Content),
      with no adaptive-width JS and no portal.
    -->
        <Float
            as="div"
            :class="cn('relative', props.class)"
            composable
            floating-as="template"
            :placement="placement"
            :offset="offset"
            flip
            :z-index="50"
        >
            <slot />
        </Float>
    </Listbox>
</template>
