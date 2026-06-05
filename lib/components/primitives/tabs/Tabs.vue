<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { TabGroup } from "@headlessui/vue";
import { cn } from "../../../utils/cn";

interface Props {
    /** Initial selected tab index (uncontrolled). */
    defaultIndex?: number;
    /** Controlled selected tab index. */
    selectedIndex?: number;
    /** Only change tab on Enter/Space, not on focus. */
    manual?: boolean;
    class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<Props>(), {
    defaultIndex: 0,
    manual: false,
});

const emit = defineEmits<{
    change: [index: number];
}>();
</script>

<template>
    <TabGroup
        as="div"
        :default-index="defaultIndex"
        :selected-index="selectedIndex"
        :manual="manual"
        :class="cn('flex flex-col gap-4', props.class)"
        @change="(i: number) => emit('change', i)"
    >
        <slot />
    </TabGroup>
</template>
