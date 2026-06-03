<script setup lang="ts">
import { ref, watch, type HTMLAttributes } from "vue";
import { onKeyStroke, useScrollLock } from "@vueuse/core";
import { useFocusTrap } from "@vueuse/integrations/useFocusTrap";
import { cn } from "../../../utils/cn";
import { provideModalContext } from "./modal-context";

type ModalSize =
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "full";

interface Props {
    modelValue: boolean;
    size?: ModalSize;
    closeOnBackdrop?: boolean;
    persistent?: boolean;
    class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<Props>(), {
    size: "md",
    closeOnBackdrop: true,
    persistent: false,
});

const emit = defineEmits<{
    "update:modelValue": [value: boolean];
    close: [];
}>();

const SIZE_CLASSES: Record<ModalSize, string> = {
    sm: "md:max-w-sm",
    md: "md:max-w-md",
    lg: "md:max-w-lg",
    xl: "md:max-w-xl",
    "2xl": "md:max-w-2xl",
    "3xl": "md:max-w-3xl",
    "4xl": "md:max-w-4xl",
    "5xl": "md:max-w-5xl",
    full: "md:max-w-full h-full rounded-t-none md:rounded-none",
};

const close = (): void => {
    emit("update:modelValue", false);
    emit("close");
};

const handleBackdropClick = (): void => {
    if (props.persistent || !props.closeOnBackdrop) return;
    close();
};

onKeyStroke("Escape", (e) => {
    if (!props.modelValue || props.persistent) return;
    e.preventDefault();
    close();
});

// SSR-safe (the published lib may run in a Nuxt/SSR consumer).
const isScrollLocked = useScrollLock(
    typeof document !== "undefined" ? document.body : null,
);

const dialogRef = ref<HTMLElement | null>(null);
const { activate, deactivate } = useFocusTrap(dialogRef, {
    immediate: false,
    escapeDeactivates: false,
    allowOutsideClick: true,
});

const labelId = ref<string | undefined>(undefined);
const descriptionId = ref<string | undefined>(undefined);
provideModalContext({
    close,
    labelId,
    setLabelId: (id) => {
        labelId.value = id;
    },
    descriptionId,
    setDescriptionId: (id) => {
        descriptionId.value = id;
    },
});

watch(
    () => props.modelValue,
    (isOpen) => {
        isScrollLocked.value = isOpen;
        if (!isOpen) deactivate();
    },
);
</script>

<template>
    <Teleport to="body">
        <Transition
            enter-active-class="transition-opacity duration-200"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition-opacity duration-200"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
        >
            <div
                v-if="modelValue"
                class="fixed inset-0 z-50 flex items-end justify-center bg-bg-inverse/50 md:items-center"
                @click.self="handleBackdropClick"
            >
                <Transition
                    appear
                    enter-active-class="transition-all duration-200"
                    enter-from-class="opacity-0 scale-95"
                    enter-to-class="opacity-100 scale-100"
                    leave-active-class="transition-all duration-200"
                    leave-from-class="opacity-100 scale-100"
                    leave-to-class="opacity-0 scale-95"
                    @after-enter="() => activate()"
                >
                    <div
                        ref="dialogRef"
                        :class="
                            cn(
                                'relative flex max-h-[calc(100vh-100px)] w-full flex-col overflow-y-auto rounded-3xl border border-border-subtle bg-bg-surface shadow-xs',
                                SIZE_CLASSES[size],
                                props.class,
                            )
                        "
                        role="dialog"
                        aria-modal="true"
                        :aria-labelledby="labelId"
                        :aria-describedby="descriptionId"
                    >
                        <slot :close="close" />
                    </div>
                </Transition>
            </div>
        </Transition>
    </Teleport>
</template>
