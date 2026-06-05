<script setup lang="ts">
import { inject } from "vue";
import { PhMagnifyingGlass } from "@phosphor-icons/vue";
import { SelectKey } from "./context";

interface Props {
    placeholder?: string;
}

withDefaults(defineProps<Props>(), {
    placeholder: "Search...",
});

const ctx = inject(SelectKey);
if (!ctx) throw new Error("SelectSearch must be used inside Select");
</script>

<template>
    <div
        class="sticky top-0 z-10 flex items-center gap-x-2 border-b border-border-subtle bg-bg-base px-2 py-2"
    >
        <PhMagnifyingGlass class="size-4 shrink-0 text-text-tertiary" />
        <input
            v-model="ctx.query.value"
            type="text"
            :placeholder="placeholder"
            class="w-full bg-transparent text-sm font-medium text-text-primary outline-none placeholder:text-text-tertiary"
            @click.stop
            @keydown.stop
        />
    </div>
</template>
