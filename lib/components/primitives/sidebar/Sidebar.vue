<script setup lang="ts">
import { watch, type HTMLAttributes } from "vue";
import { useScrollLock } from "@vueuse/core";
import { cn } from "../../../utils/cn";
import { useSidebar } from "./context";

interface Props {
    class?: HTMLAttributes["class"];
}
const props = defineProps<Props>();
const { isMobile, mobileOpen, collapsed, close } = useSidebar();

const locked = useScrollLock(
    typeof document !== "undefined" ? document.body : null,
);
watch(mobileOpen, (isOpen) => {
    locked.value = isOpen && isMobile.value;
});

const onKeydown = (e: KeyboardEvent) => {
    if (e.key === "Escape") close();
};
</script>

<template>
    <!-- Desktop: inline sidebar, hidden when collapsed -->
    <template v-if="!isMobile">
        <aside
            v-if="!collapsed"
            :class="
                cn(
                    'flex h-full w-64 flex-col border-r border-border-subtle bg-bg-surface',
                    props.class,
                )
            "
        >
            <slot />
        </aside>
    </template>

    <!-- Mobile: overlay drawer (unchanged) -->
    <template v-else>
        <Transition
            enter-active-class="transition-opacity duration-200"
            enter-from-class="opacity-0"
            leave-active-class="transition-opacity duration-200"
            leave-to-class="opacity-0"
        >
            <div
                v-if="mobileOpen"
                class="fixed inset-0 z-40 bg-black/40"
                @click="close"
            ></div>
        </Transition>

        <Transition
            enter-active-class="transition-transform duration-200 ease-out"
            enter-from-class="-translate-x-full"
            leave-active-class="transition-transform duration-200 ease-in"
            leave-to-class="-translate-x-full"
        >
            <aside
                v-if="mobileOpen"
                :class="
                    cn(
                        'fixed inset-y-0 left-0 z-50 flex h-full w-64 flex-col border-r border-border-subtle bg-bg-surface',
                        props.class,
                    )
                "
                tabindex="-1"
                @keydown="onKeydown"
            >
                <slot />
            </aside>
        </Transition>
    </template>
</template>
