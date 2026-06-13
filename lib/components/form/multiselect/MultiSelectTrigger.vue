<script setup lang="ts">
import { inject, type HTMLAttributes } from "vue";
import { PopoverButton } from "@headlessui/vue";
import { FloatReference } from "@headlessui-float/vue";
import { PhCaretUpDown } from "@phosphor-icons/vue";
import { cn } from "../../../utils/cn";
import { inputVariants, type InputProps } from "../../../variants/input";
import { FieldKey } from "../../../core/field-context";

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

// Optional Field integration — adopt the Field's id/aria/state when wrapped in a <Field>.
const field = inject(FieldKey, null);
</script>

<template>
    <FloatReference>
        <PopoverButton
            as="button"
            :id="field?.id.value"
            :aria-describedby="field?.describedById.value"
            :aria-invalid="field?.invalid.value || undefined"
            :data-invalid="field?.invalid.value || undefined"
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
