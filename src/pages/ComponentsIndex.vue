<script setup lang="ts">
import { RouterLink } from "vue-router";
import { components } from "../registry";
</script>

<template>
    <div class="flex flex-col gap-y-6">
        <div class="flex flex-col gap-y-1">
            <h1 class="text-2xl font-semibold text-text-primary">Components</h1>
            <p class="text-sm text-text-secondary">
                {{ components.length }} component{{
                    components.length === 1 ? "" : "s"
                }}
            </p>
        </div>

        <ul class="flex flex-col divide-y divide-border-subtle">
            <li v-for="c in components" :key="c.slug">
                <RouterLink
                    :to="`/components/${c.slug}`"
                    class="flex flex-col gap-y-0.5 py-3 transition-colors hover:text-text-primary"
                >
                    <span class="font-medium text-text-primary">
                        {{ c.name }}
                    </span>
                    <span class="text-sm text-text-secondary">
                        {{ c.description }}
                    </span>
                </RouterLink>
            </li>
        </ul>
    </div>
</template>
