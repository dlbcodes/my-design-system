<script setup lang="ts">
import { inject } from "vue";
import { ListboxButton } from "@headlessui/vue";
import { FloatReference } from "@headlessui-float/vue";
import { PhCaretUpDown } from "@phosphor-icons/vue";
import { cn } from "../../../utils/cn";
import { inputVariants, type InputProps } from "../../../variants/input";
import { SelectKey } from "./context";

interface Props {
    placeholder?: string;
    variant?: InputProps["variant"];
    size?: InputProps["size"];
    class?: string;
}

const props = withDefaults(defineProps<Props>(), {
    placeholder: "Select an option",
    variant: "primary",
    size: "base",
});

const ctx = inject(SelectKey);
if (!ctx) throw new Error("SelectTrigger must be used inside Select");
</script>

<template>
    <FloatReference>
        <ListboxButton
            as="button"
            type="button"
            :class="
                cn(
                    inputVariants({ variant, size }),
                    'relative cursor-pointer',
                    props.class,
                )
            "
        >
            <span
                class="block truncate"
                :class="!ctx.selected.value && 'text-text-tertiary'"
            >
                <!-- Shows the captured label of the selection; falls back to
                     the placeholder when nothing is selected. -->
                <slot
                    :selected="ctx.selected.value"
                    :label="ctx.selectedLabel.value"
                >
                    {{
                        ctx.selected.value
                            ? ctx.selectedLabel.value
                            : placeholder
                    }}
                </slot>
            </span>

            <span
                class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
            >
                <PhCaretUpDown
                    class="size-5 text-text-tertiary"
                    aria-hidden="true"
                />
            </span>
        </ListboxButton>
    </FloatReference>
</template>
