<script setup lang="ts">
import { RouterView, RouterLink } from "vue-router";
import { PhGithubLogo } from "@phosphor-icons/vue";

const navigation = [
    {
        label: "Home",
        to: "/",
    },
    {
        label: "Components",
        to: "/components",
    },
];
</script>

<template>
    <div class="min-h-screen bg-bg-base text-text-primary">
        <header class="sticky top-0 z-50 w-full bg-bg-base">
            <div class="flex items-center justify-between px-6 h-16">
                <div class="flex items-center gap-x-8">
                    <RouterLink
                        to="/"
                        class="flex h-16 items-center gap-2 text-sm font-semibold tracking-tight"
                    >
                        <span
                            class="size-2.5 rounded-full bg-brand-200"
                            aria-hidden="true"
                        />
                        Design System
                    </RouterLink>
                    <nav class="flex items-center gap-x-2">
                        <RouterLink
                            v-for="item in navigation"
                            :to="item.to"
                            class="flex items-center text-sm font-medium whitespace-nowrap rounded-md h-8 px-1.5 transition-all outline-none focus-visible:ring-1 focus-visible:border-border-default hover:bg-bg-subtle"
                        >
                            {{ item.label }}
                        </RouterLink>
                    </nav>
                </div>

                <div>
                    <RouterLink
                        to="/"
                        class="flex items-center text-sm font-medium whitespace-nowrap rounded-md h-8 px-1.5 transition-all outline-none focus-visible:ring-1 focus-visible:border-border-default hover:bg-bg-subtle"
                    >
                        <PhGithubLogo class="size-5" />
                    </RouterLink>
                </div>
            </div>
        </header>

        <main class="">
            <RouterView />
        </main>
    </div>
</template>
