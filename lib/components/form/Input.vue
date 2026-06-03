<script setup lang="ts">
import { computed, inject, type HTMLAttributes } from "vue";
import { cn } from "../../utils/cn";
import { FieldKey } from "../../core/field-context";
import { inputVariants, type InputProps } from "../../variants/input";

interface Props {
    variant?: InputProps["variant"];
    size?: InputProps["size"];
    id?: string;
    placeholder?: string;
    type?: string;
    required?: boolean;
    disabled?: boolean;
    invalid?: boolean;
    class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<Props>(), {
    variant: "primary",
    size: "base",
    type: "text",
    disabled: undefined,
    invalid: undefined,
    required: undefined,
});

// Optional by design: no v-model → nobody listens, input runs uncontrolled.
const model = defineModel<string | number | null>();

const field = inject(FieldKey, null);

// props-win precedence: explicit prop > field context > local default.
const resolvedId = computed(() => props.id ?? field?.id.value);
const resolvedInvalid = computed(
    () => props.invalid ?? field?.invalid.value ?? false,
);
const resolvedDisabled = computed(
    () => props.disabled ?? field?.disabled.value ?? false,
);
const resolvedRequired = computed(
    () => props.required ?? field?.required.value ?? false,
);
const describedById = computed(() => field?.describedById.value);

const wrapperClass = computed(() =>
    cn(
        inputVariants({
            variant: props.variant,
            size: props.size,
            invalid: resolvedInvalid.value,
        }),
        props.class,
    ),
);

const onInput = (event: Event): void => {
    model.value = (event.target as HTMLInputElement).value;
};
</script>

<template>
    <div :class="wrapperClass" :data-invalid="resolvedInvalid || undefined">
        <span class="flex items-center gap-1 text-text-secondary">
            <slot />
        </span>

        <input
            :id="resolvedId"
            :type="type"
            :value="model ?? ''"
            :disabled="resolvedDisabled"
            :placeholder="placeholder"
            :required="resolvedRequired"
            :aria-invalid="resolvedInvalid || undefined"
            :aria-required="resolvedRequired || undefined"
            :aria-describedby="describedById"
            :data-invalid="resolvedInvalid || undefined"
            class="h-full w-full bg-transparent text-text-primary/70 outline-none transition-colors group-hover:text-text-primary focus:text-text-primary disabled:cursor-not-allowed"
            @input="onInput"
        />
    </div>
</template>
