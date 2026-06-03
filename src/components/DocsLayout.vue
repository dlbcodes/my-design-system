<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from "vue-router";
import { components } from "../registry";

const route = useRoute();
const isActive = (slug: string) => route.name === slug;
</script>

<template>
    <div class="flex">
        <!-- Sidebar: sits below the 64px header, fills remaining height, scrolls independently -->
        <aside
            class="sticky top-16 hidden h-[calc(100vh-4rem)] w-64 shrink-0 flex-col overflow-y-auto md:flex"
        >
            <nav class="flex-1 px-3 py-6">
                <p
                    class="px-3 pb-1 text-xs font-medium uppercase tracking-normal text-text-tertiary"
                >
                    Components
                </p>
                <ul class="space-y-0.5">
                    <li v-for="c in components" :key="c.slug">
                        <RouterLink
                            :to="`/components/${c.slug}`"
                            class="block rounded-lg px-3 py-1.5 text-sm transition-colors"
                            :class="
                                isActive(c.slug)
                                    ? 'bg-bg-subtle font-medium text-text-primary'
                                    : 'text-text-secondary hover:bg-bg-subtle hover:text-text-primary'
                            "
                        >
                            {{ c.name }}
                        </RouterLink>
                    </li>
                </ul>
            </nav>
        </aside>

        <!-- Content -->
        <main class="min-w-0 flex-1 px-6 py-10 md:px-10 md:py-14">
            <div class="mx-auto max-w-5xl">
                <RouterView />
            </div>
        </main>
    </div>
</template>
