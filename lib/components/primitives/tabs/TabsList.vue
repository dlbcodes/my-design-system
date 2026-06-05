<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { TabList } from "@headlessui/vue";
import { cn } from "../../../utils/cn";
import { tabGroupVariants } from "../../../variants/tabs";

interface Props {
    class?: HTMLAttributes["class"];
}

const props = defineProps<Props>();
</script>

<template>
    <TabList :class="cn(tabGroupVariants(), props.class)">
        <slot />
    </TabList>
</template>
