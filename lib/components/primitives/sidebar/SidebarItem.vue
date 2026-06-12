<script setup lang="ts">
import type { Component, HTMLAttributes } from "vue";
import { cn } from "../../../utils/cn";
import { sidebarItemVariants } from "../../../variants/sidebar";
import { useSidebar } from "./context";

interface Props {
    /**
     * The element/component to render as. Use "a" for a plain link,
     * or pass RouterLink (Vue) / NuxtLink (Nuxt) for SPA navigation.
     */
    as?: string | Component;
    /** Whether this item is the active route (consumer-controlled). */
    active?: boolean;
    /** Whether this item is disabled (visible but not interactive). */
    disabled?: boolean;
    class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<Props>(), {
    as: "a",
    active: false,
    disabled: false,
});

const sidebar = useSidebar();

const onClick = (e: MouseEvent): void => {
    if (props.disabled) {
        // Block navigation and interaction for disabled items.
        e.preventDefault();
        e.stopPropagation();
        return;
    }
    // On mobile, navigating away should close the drawer (it covers the
    // content). On desktop the sidebar is persistent, so do nothing.
    if (sidebar.isMobile.value) sidebar.close();
};
</script>

<template>
    <component
        :is="disabled ? 'span' : as"
        :class="
            cn(
                sidebarItemVariants({ active }),
                disabled && 'pointer-events-none opacity-50',
                props.class,
            )
        "
        :aria-disabled="disabled || undefined"
        :tabindex="disabled ? -1 : undefined"
        @click="onClick"
    >
        <slot />
    </component>
</template>
