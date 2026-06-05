<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { TabPanel } from "@headlessui/vue";
import { cn } from "../../../utils/cn";

interface Props {
    class?: HTMLAttributes["class"];
}

const props = defineProps<Props>();
</script>

<template>
    <TabPanel
        :class="
            cn(
                'outline-none focus-visible:ring-2 focus-visible:ring-border-strong rounded-xl',
                props.class,
            )
        "
    >
        <slot />
    </TabPanel>
</template>
