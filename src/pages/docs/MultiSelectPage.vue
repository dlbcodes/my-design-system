<script setup lang="ts">
import { ref } from "vue";
import DocPage from "../../components/DocPage.vue";
import DocExample from "../../components/DocExample.vue";
import {
    MultiSelect,
    MultiSelectTrigger,
    MultiSelectContent,
    MultiSelectSearch,
    MultiSelectItem,
} from "../../../lib/components/form/multiselect/index.ts";

const fruits = [
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
    { label: "Cherry", value: "cherry" },
    { label: "Dragonfruit", value: "dragonfruit" },
    { label: "Elderberry", value: "elderberry" },
];

const countries = [
    { label: "Portugal", value: "pt" },
    { label: "Spain", value: "es" },
    { label: "France", value: "fr" },
    { label: "Germany", value: "de" },
    { label: "Italy", value: "it" },
    { label: "Netherlands", value: "nl" },
    { label: "Belgium", value: "be" },
    { label: "Austria", value: "at" },
];

const basic = ref<string[]>([]);
const searchable = ref<string[]>(["pt", "es"]);
const withControls = ref<string[]>([]);
const fixedWidth = ref<string[]>([]);
</script>

<template>
    <DocPage
        name="MultiSelect"
        description="A multi-select compound built on Headless UI's Popover + Float. Root owns the option list and selection; the trigger is input-styled and the panel matches its width (adaptive-width). Item-level state flows through context; widget-level helpers (label, count, toggleAll, clear) are exposed as slot props on Root."
    >
        <DocExample
            title="Basic"
            description="v-model is a string[]. The trigger shows the placeholder, then the single label, then a summary once more than one is selected. Each Item is a checkbox row that toggles its value."
        >
            <div class="w-full max-w-sm">
                <MultiSelect
                    v-model="basic"
                    :options="fruits"
                    v-slot="{ label, empty }"
                >
                    <MultiSelectTrigger :label="label" :empty="empty" />
                    <MultiSelectContent>
                        <MultiSelectItem
                            v-for="o in fruits"
                            :key="o.value"
                            :value="o.value"
                            :label="o.label"
                        />
                    </MultiSelectContent>
                </MultiSelect>
                <p class="mt-2 text-sm text-text-secondary">
                    Selected:
                    <span class="font-mono text-text-primary">{{ basic }}</span>
                </p>
            </div>
        </DocExample>

        <DocExample
            title="Searchable"
            description="searchable adds a sticky search box (MultiSelectSearch). Items self-filter against the query via context. NOTE: typing filters, but arrow-key navigation through results is limited — see the keyboard caveat below."
        >
            <div class="w-full max-w-sm">
                <MultiSelect
                    v-model="searchable"
                    :options="countries"
                    searchable
                    placeholder="Select countries"
                    v-slot="{ label, empty }"
                >
                    <MultiSelectTrigger :label="label" :empty="empty" />
                    <MultiSelectContent size="fit">
                        <MultiSelectSearch placeholder="Search countries..." />
                        <MultiSelectItem
                            v-for="o in countries"
                            :key="o.value"
                            :value="o.value"
                            :label="o.label"
                        />
                    </MultiSelectContent>
                </MultiSelect>
            </div>
        </DocExample>

        <DocExample
            title="With controls (select all / clear)"
            description="Root exposes toggleAll, clear, allSelected, and visibleCount as slot props. A controls row composes them — toggleAll respects the current search filter."
        >
            <div class="w-full max-w-sm">
                <MultiSelect
                    v-model="withControls"
                    :options="countries"
                    searchable
                    v-slot="{
                        label,
                        empty,
                        toggleAll,
                        clear,
                        allSelected,
                        visibleCount,
                        count,
                    }"
                >
                    <MultiSelectTrigger :label="label" :empty="empty" />
                    <MultiSelectContent class="full">
                        <MultiSelectSearch />
                        <div
                            class="flex items-center justify-between px-2 py-1.5 text-xs"
                        >
                            <button
                                type="button"
                                class="font-medium text-accent-brand hover:underline"
                                @click="toggleAll"
                            >
                                {{ allSelected ? "Deselect" : "Select" }}
                                {{ visibleCount }}
                            </button>
                            <button
                                type="button"
                                class="text-text-tertiary hover:text-text-primary disabled:opacity-50"
                                :disabled="count === 0"
                                @click="clear"
                            >
                                Clear
                            </button>
                        </div>
                        <MultiSelectItem
                            v-for="o in countries"
                            :key="o.value"
                            :value="o.value"
                            :label="o.label"
                        />
                    </MultiSelectContent>
                </MultiSelect>
            </div>
        </DocExample>

        <DocExample
            title="Sizes"
            description="size sets the panel width from the popover scale (fit, xs–lg, full). The panel is content/token-sized, independent of the trigger width — same model as Popover."
        >
            <div class="flex flex-wrap items-start gap-6">
                <div class="w-48">
                    <MultiSelect
                        v-model="basic"
                        :options="fruits"
                        v-slot="{ label, empty }"
                    >
                        <MultiSelectTrigger :label="label" :empty="empty" />
                        <MultiSelectContent size="xs">
                            <MultiSelectItem
                                v-for="o in fruits"
                                :key="o.value"
                                :value="o.value"
                                :label="o.label"
                            />
                        </MultiSelectContent>
                    </MultiSelect>
                    <p class="mt-1 text-xs text-text-tertiary">size="xs"</p>
                </div>

                <div class="w-48">
                    <MultiSelect
                        v-model="fixedWidth"
                        :options="fruits"
                        v-slot="{ label, empty }"
                    >
                        <MultiSelectTrigger :label="label" :empty="empty" />
                        <MultiSelectContent size="md">
                            <MultiSelectItem
                                v-for="o in fruits"
                                :key="o.value"
                                :value="o.value"
                                :label="o.label"
                            />
                        </MultiSelectContent>
                    </MultiSelect>
                    <p class="mt-1 text-xs text-text-tertiary">size="md"</p>
                </div>

                <div class="w-48">
                    <MultiSelect
                        v-model="basic"
                        :options="fruits"
                        v-slot="{ label, empty }"
                    >
                        <MultiSelectTrigger :label="label" :empty="empty" />
                        <MultiSelectContent size="fit">
                            <MultiSelectItem
                                v-for="o in fruits"
                                :key="o.value"
                                :value="o.value"
                                :label="o.label"
                            />
                        </MultiSelectContent>
                    </MultiSelect>
                    <p class="mt-1 text-xs text-text-tertiary">size="fit"</p>
                </div>
            </div>
        </DocExample>
    </DocPage>
</template>
