<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { MenuButton } from "@headlessui/vue";
import { cn } from "../../../utils/cn";

interface Props {
    class?: HTMLAttributes["class"];
}

const props = defineProps<Props>();
</script>

<template>
    <MenuButton
        v-slot="{ open }"
        :class="
            cn(
                'cursor-pointer rounded-lg leading-none outline-none',
                props.class,
            )
        "
    >
        <slot :open="open" />
    </MenuButton>
</template>
