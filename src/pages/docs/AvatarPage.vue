<script setup lang="ts">
import DocPage from "../../components/DocPage.vue";
import DocExample from "../../components/DocExample.vue";
import DocProps, { type PropDef } from "../../components/DocProps.vue";
import Avatar from "../../../lib/components/primitives/Avatar.vue";

const sampleSrc =
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
        `<svg xmlns='http://www.w3.org/2000/svg' width='64' height='64'><rect width='64' height='64' fill='%23c4b8a8'/></svg>`,
    );

// Hand-authored, mirroring Avatar.vue's Props interface + JSDoc.
const avatarProps: PropDef[] = [
    {
        name: "src",
        type: "string | null",
        default: "null",
        description:
            "Image URL. When present, shows the image; otherwise falls back to the initial.",
    },
    {
        name: "name",
        type: "string | null",
        default: "null",
        description:
            "User's name. Its first letter is the fallback when there's no src, and it's used as the image's alt text.",
    },
    {
        name: "size",
        type: '"sm" | "base" | "lg"',
        default: '"base"',
        description: "Avatar size.",
    },
    {
        name: "class",
        type: "string",
        description: "Additional classes merged onto the root.",
    },
];
</script>

<template>
    <DocPage
        name="Avatar"
        description="A user avatar with image and initial fallbacks."
    >
        <template #intro>
            <p>
                An avatar identifies a person compactly. It shows their image
                when given a <code>src</code>; without one, it falls back to the
                first letter of their <code>name</code>; with neither, a neutral
                placeholder. Use it in lists, comments, headers, and anywhere
                you need to represent a user at a glance.
            </p>
        </template>

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

        <DocExample title="Sizes">
            <Avatar name="A" size="sm" />
            <Avatar name="A" size="base" />
            <Avatar name="A" size="lg" />
        </DocExample>

        <template #props>
            <DocProps :props="avatarProps" />
        </template>
    </DocPage>
</template>
