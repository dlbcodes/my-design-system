<script setup lang="ts">
export interface PropDef {
    name: string;
    type: string;
    default?: string;
    required?: boolean;
    description: string;
}

interface Props {
    props: PropDef[];
}

defineProps<Props>();
</script>

<template>
    <div class="overflow-hidden rounded-xl border border-border-subtle">
        <table class="w-full border-collapse text-left text-sm">
            <thead>
                <tr
                    class="border-b border-border-subtle bg-bg-surface text-text-secondary"
                >
                    <th class="px-4 py-2.5 font-medium">Prop</th>
                    <th class="px-4 py-2.5 font-medium">Type</th>
                    <th class="px-4 py-2.5 font-medium">Default</th>
                    <th class="px-4 py-2.5 font-medium">Description</th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="p in props"
                    :key="p.name"
                    class="border-b border-border-subtle last:border-0 align-top"
                >
                    <td class="px-4 py-2.5">
                        <code
                            class="rounded bg-bg-subtle px-1.5 py-0.5 text-xs font-medium text-text-primary"
                        >
                            {{ p.name }}
                        </code>
                        <span
                            v-if="p.required"
                            class="ml-1 text-xs text-danger-100"
                            >*</span
                        >
                    </td>
                    <td class="px-4 py-2.5">
                        <code class="text-xs text-text-secondary">{{
                            p.type
                        }}</code>
                    </td>
                    <td class="px-4 py-2.5">
                        <code
                            v-if="p.default"
                            class="text-xs text-text-tertiary"
                            >{{ p.default }}</code
                        >
                        <span v-else class="text-xs text-text-tertiary">—</span>
                    </td>
                    <td class="px-4 py-2.5 text-text-secondary">
                        {{ p.description }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
