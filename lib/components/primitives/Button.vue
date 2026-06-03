<script setup lang="ts">
import { computed } from "vue";
import type { Component, HTMLAttributes } from "vue";
import { RouterLink } from "vue-router";
import { cn } from "../../utils/cn";
import { buttonVariants, type ButtonProps } from "../../variants/button";
import Spinner from "./Spinner.vue";

interface Props {
    variant?: ButtonProps["variant"];
    size?: ButtonProps["size"];
    class?: HTMLAttributes["class"];
    /** When set, renders a link (RouterLink by default). */
    to?: string;
    /** Override the link component — e.g. NuxtLink for Nuxt's extras. */
    as?: Component | string;
    type?: "button" | "submit" | "reset";
    loading?: boolean;
    disabled?: boolean;
    loadingText?: string;
}

const props = withDefaults(defineProps<Props>(), {
    variant: "primary",
    size: "base",
    type: "button",
    loading: false,
    disabled: false,
    loadingText: "Loading…",
});

const isLink = computed(() => Boolean(props.to));
const isDisabled = computed(() => props.loading || props.disabled);

// Link → the provided component (or RouterLink); otherwise a button.
const component = computed(() =>
    isLink.value ? (props.as ?? RouterLink) : "button",
);

const classes = computed(() =>
    cn(
        buttonVariants({ variant: props.variant, size: props.size }),
        isDisabled.value && "pointer-events-none opacity-60",
        props.class,
    ),
);
</script>

<template>
    <component
        :is="component"
        :to="isLink && !isDisabled ? props.to : undefined"
        :type="!isLink ? props.type : undefined"
        :disabled="!isLink ? isDisabled : undefined"
        :aria-disabled="isDisabled || undefined"
        :aria-busy="loading || undefined"
        :class="classes"
    >
        <template v-if="loading">
            <Spinner class="size-4 shrink-0" :label="loadingText" />
            <span>{{ loadingText }}</span>
        </template>

        <slot v-else />
    </component>
</template>
