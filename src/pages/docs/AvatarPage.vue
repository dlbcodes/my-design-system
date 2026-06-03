<script setup lang="ts">
import DocPage from "../../components/DocPage.vue";
import DocExample from "../../components/DocExample.vue";
import Avatar from "../../../lib/components/primitives/Avatar.vue";

// A small inline data-URI so the demo works offline (a gray circle).
const sampleSrc =
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
        `<svg xmlns='http://www.w3.org/2000/svg' width='64' height='64'><rect width='64' height='64' fill='%23c4b8a8'/></svg>`,
    );
</script>

<template>
    <DocPage
        name="Avatar"
        description="A user avatar. Shows the image when given a src, otherwise the name's initial, otherwise a neutral fallback."
    >
        <DocExample title="With image">
            <Avatar :src="sampleSrc" name="Ana Silva" />
        </DocExample>

        <DocExample
            title="Initial fallback"
            description="No image — shows the first letter of the name."
        >
            <Avatar name="Ana Silva" />
            <Avatar name="Bruno Costa" />
            <Avatar name="carla dias" />
        </DocExample>

        <DocExample
            title="No name"
            description="Neutral fallback when there's nothing to show."
        >
            <Avatar />
        </DocExample>

        <DocExample title="Sizes">
            <Avatar name="A" size="sm" />
            <Avatar name="A" size="base" />
            <Avatar name="A" size="lg" />
        </DocExample>
    </DocPage>
</template>
