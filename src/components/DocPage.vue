<script setup lang="ts">
import { RouterLink } from "vue-router";
import { useSlots } from "vue";

interface Props {
    name: string;
    description?: string;
}

defineProps<Props>();
const slots = useSlots();
</script>

<template>
    <article class="flex flex-col gap-y-10">
        <!-- Header -->
        <div class="flex flex-col gap-y-2">
            <RouterLink to="/components" class="text-xs text-text-tertiary">
                ← Components
            </RouterLink>
            <h1 class="text-2xl font-semibold text-text-primary">{{ name }}</h1>
            <p v-if="description" class="text-sm text-text-secondary">
                {{ description }}
            </p>
        </div>

        <!-- Intro / explanation (optional) — capped for readable prose -->
        <section
            v-if="slots.intro"
            class="doc-prose max-w-2xl text-sm leading-relaxed text-text-secondary"
        >
            <slot name="intro" />
        </section>

        <!-- Examples (default slot) -->
        <div class="flex flex-col gap-y-10">
            <slot />
        </div>

        <!-- Props reference (optional) -->
        <section v-if="slots.props" class="flex flex-col gap-y-3">
            <h2 class="text-sm font-semibold text-text-primary">Props</h2>
            <slot name="props" />
        </section>
    </article>
</template>
