<script setup lang="ts">
import DocPage from "../../components/DocPage.vue";
import DocExample from "../../components/DocExample.vue";
import Button from "../../../lib/components/primitives/Button.vue";
</script>

<template>
    <DocPage
        name="Button"
        description="A flat, tokenized button. Renders a <button>, or a router link when given a to."
    >
        <DocExample title="Variants">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="destructive">Delete</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
        </DocExample>

        <DocExample title="Sizes">
            <Button size="sm">Small</Button>
            <Button size="base">Base</Button>
            <Button size="lg">Large</Button>
            <Button size="xl">Extra large</Button>
        </DocExample>

        <DocExample
            title="Loading"
            description="Shows a spinner + text; aria-busy is set."
        >
            <Button loading>Save</Button>
            <Button loading loading-text="Saving changes…">Save</Button>
        </DocExample>

        <DocExample title="Disabled">
            <Button disabled>Disabled</Button>
            <Button variant="secondary" disabled>Disabled</Button>
        </DocExample>

        <DocExample
            title="As a link"
            description="With a `to`, renders RouterLink (works in Nuxt too); pass `as` to override."
        >
            <Button to="/components" variant="outline">Go to components</Button>
        </DocExample>
    </DocPage>
</template>
