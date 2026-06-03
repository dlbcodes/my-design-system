<script setup lang="ts">
import { RouterLink } from "vue-router";

interface Props {
    name: string;
    description?: string;
}

defineProps<Props>();
</script>

<template>
    <article class="flex flex-col gap-y-8">
        <div class="flex flex-col gap-y-2">
            <RouterLink to="/components" class="text-xs text-text-tertiary">
                ← Components
            </RouterLink>
            <h1 class="text-2xl font-semibold text-text-primary">{{ name }}</h1>
            <p v-if="description" class="text-sm text-text-secondary">
                {{ description }}
            </p>
        </div>

        <slot />
    </article>
</template>
