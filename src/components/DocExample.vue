<script setup lang="ts">
interface Props {
    title: string;
    description?: string;
}

defineProps<Props>();
</script>

<template>
    <section class="flex flex-col gap-y-3">
        <div class="flex flex-col gap-y-0.5">
            <h2 class="text-sm font-semibold text-text-primary">{{ title }}</h2>
            <p v-if="description" class="text-xs text-text-secondary">
                {{ description }}
            </p>
        </div>

        <div
            class="flex flex-wrap items-center gap-4 rounded-xl border border-border-subtle bg-bg-raised p-6"
        >
            <slot />
        </div>
    </section>
</template>
