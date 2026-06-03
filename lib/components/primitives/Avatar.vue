<script setup lang="ts">
import { computed } from "vue";
import type { HTMLAttributes } from "vue";
import { cn } from "../../utils/cn";
import { avatarVariants, type AvatarProps } from "../../variants/avatar";

interface Props {
    size?: AvatarProps["size"];
    src?: string | null;
    name?: string | null;
    class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<Props>(), {
    size: "base",
    src: null,
    name: null,
});

const initial = computed(() => {
    const name = props.name?.trim();
    return name ? name.charAt(0).toUpperCase() : "?";
});

// Alt is the name when known; otherwise the image is decorative (the initial
// is already shown), so empty alt avoids a screen reader announcing "?".
const alt = computed(() => props.name?.trim() ?? "");
</script>

<template>
    <div :class="cn(avatarVariants({ size }), props.class)">
        <img
            v-if="src"
            :src="src"
            :alt="alt"
            class="size-full rounded-full object-cover"
        />
        <div v-else class="flex size-full items-center justify-center">
            {{ initial }}
        </div>
    </div>
</template>
