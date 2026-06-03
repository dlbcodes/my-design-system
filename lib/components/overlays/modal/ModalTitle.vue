<script setup lang="ts">
import { onMounted, onUnmounted, useId, type HTMLAttributes } from "vue";
import { cn } from "../../../utils/cn";
import { useModalContext } from "./modal-context";

interface Props {
    class?: HTMLAttributes["class"];
}

const props = defineProps<Props>();

const { setLabelId } = useModalContext();
const id = useId();

onMounted(() => setLabelId(id));
onUnmounted(() => setLabelId(undefined));
</script>

<template>
    <h2
        :id="id"
        :class="cn('text-lg font-medium text-text-primary', props.class)"
    >
        <slot />
    </h2>
</template>
