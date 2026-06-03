<script setup lang="ts">
import { ref } from "vue";
import MultiSelect from "../../../lib/components/form/multiselect/MultiSelect.vue";
import MultiSelectTrigger from "../../../lib/components/form/multiselect/MultiSelectTrigger.vue";
import MultiSelectContent from "../../../lib/components/form/multiselect/MultiSelectContent.vue";
import MultiSelectItem from "../../../lib/components/form/multiselect/MultiSelectItem.vue";

const selected = ref<string[]>([]);
const options = [
    { value: "vue", label: "Vue" },
    { value: "react", label: "React" },
    { value: "svelte", label: "Svelte" },
    { value: "angular", label: "Angular" },
    { value: "solid", label: "Solid" },
];
</script>

<template>
    <div class="w-full max-w-xs">
        <MultiSelect
            v-model="selected"
            :options="options"
            v-slot="{ label, empty }"
        >
            <MultiSelectTrigger :label="label" :empty="empty" />
            <MultiSelectContent>
                <MultiSelectItem
                    v-for="o in options"
                    :key="o.value"
                    :value="o.value"
                    :label="o.label"
                />
            </MultiSelectContent>
        </MultiSelect>
        <p class="mt-2 text-sm text-text-secondary">
            Selected: {{ selected.join(", ") || "none" }}
        </p>
    </div>
</template>
