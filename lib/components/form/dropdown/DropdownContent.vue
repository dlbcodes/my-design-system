<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { MenuItems } from "@headlessui/vue";
import { cn } from "../../../utils/cn";
import {
    popoverVariants,
    type PopoverVariantsProps,
} from "../../../variants/popover";

interface Props {
    size?: PopoverVariantsProps["size"];
    class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<Props>(), {
    size: "full",
});
</script>

<template>
    <Transition
        enter="transition ease-out duration-200"
        enter-from="opacity-0 scale-95"
        enter-to="opacity-100 scale-100"
        leave="transition ease-in duration-150"
        leave-from="opacity-100 scale-100"
        leave-to="opacity-0 scale-95"
    >
        <MenuItems
            :class="cn(popoverVariants({ size: props.size }), props.class)"
        >
            <slot />
        </MenuItems>
    </Transition>
</template>
