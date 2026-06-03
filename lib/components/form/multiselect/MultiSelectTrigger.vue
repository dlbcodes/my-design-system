<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { PopoverButton } from "@headlessui/vue";
import { FloatReference } from "@headlessui-float/vue";
import { PhCaretUpDown } from "@phosphor-icons/vue";
import { cn } from "../../../utils/cn";
import { inputVariants, type InputProps } from "../../../variants/input";

interface Props {
    label?: string;
    empty?: boolean;
    variant?: InputProps["variant"];
    size?: InputProps["size"];
    class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<Props>(), {
    variant: "primary",
    size: "base",
});
</script>

<template>
    <FloatReference>
        <PopoverButton
            as="div"
            :class="
                cn(
                    inputVariants({ variant, size }),
                    'relative cursor-pointer',
                    props.class,
                )
            "
        >
            <span class="block truncate" :class="empty && 'text-text-tertiary'">
                <slot>{{ label }}</slot>
            </span>
            <span
                class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
            >
                <PhCaretUpDown
                    class="size-4 text-text-tertiary"
                    aria-hidden="true"
                />
            </span>
        </PopoverButton>
    </FloatReference>
</template>
