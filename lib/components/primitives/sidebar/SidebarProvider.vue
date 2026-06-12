<script setup lang="ts">
import { ref, watch } from "vue";
import { useMediaQuery } from "@vueuse/core";
import { provideSidebar } from "./context";

const isMobile = useMediaQuery("(max-width: 767px)");
const mobileOpen = ref(false);
const collapsed = ref(false); // desktop hidden state

const open = () => {
    if (isMobile.value) mobileOpen.value = true;
    else collapsed.value = false;
};
const close = () => {
    if (isMobile.value) mobileOpen.value = false;
    else collapsed.value = true;
};
// One trigger, breakpoint-aware: mobile opens/closes drawer, desktop collapses/expands.
const toggle = () => {
    if (isMobile.value) mobileOpen.value = !mobileOpen.value;
    else collapsed.value = !collapsed.value;
};

// Reset the drawer when crossing to desktop.
watch(isMobile, (mobile) => {
    if (!mobile) mobileOpen.value = false;
});

provideSidebar({ isMobile, mobileOpen, collapsed, open, close, toggle });
</script>

<template>
    <slot />
</template>
