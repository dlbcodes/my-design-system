<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Tab } from "@headlessui/vue";
import { cn } from "../../../utils/cn";
import { tabVariants } from "../../../variants/tabs";

interface Props {
    disabled?: boolean;
    class?: HTMLAttributes["class"];
}

const props = defineProps<Props>();
</script>

<template>
    <!-- as="template" forwards Headless UI's state to our button; we render a
         single real <button> child (required, or Headless UI errors). -->
    <Tab v-slot="{ selected }" as="template" :disabled="disabled">
        <button
            type="button"
            :class="cn(tabVariants({ selected }), props.class)"
        >
            <slot :selected="selected" />
        </button>
    </Tab>
</template>
