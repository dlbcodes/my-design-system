<script setup lang="ts">
import { RouterLink } from "vue-router";
import { components } from "../registry";
</script>

<template>
    <div class="mx-auto max-w-2xl px-6 py-16">
        <h1 class="text-3xl font-semibold text-text-primary">
            My Design System
        </h1>
        <p class="mt-3 text-text-secondary">
            A tokenized, accessible Vue 3 component library.
            {{ components.length }}
            components and counting.
        </p>
        <RouterLink
            to="/components"
            class="mt-6 inline-flex items-center rounded-xl bg-brand-200 px-5 py-2.5 text-sm font-medium text-text-inverse hover:bg-brand-100"
        >
            Browse components →
        </RouterLink>
    </div>
</template>
